import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  const apiKey = (process.env.GROQ_API_KEY || "").trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const rawInput = typeof body.rawInput === "string" ? body.rawInput.trim() : "";
    const tone = typeof body.tone === "string" ? body.tone.trim() : "Professional";

    if (!rawInput) {
      return NextResponse.json({ error: "Content input cannot be empty." }, { status: 400 });
    }

    const groq = new Groq({ apiKey });

    // Groq model selection: prefer configured GROQ_MODEL or fallback to active models
    const selectedModel = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert social media ghostwriter for creators. 
Analyze the user's raw text and convert it into three separate formats.
The tone must be ${tone}.

You MUST respond strictly with a valid JSON object matching this structure:
{
  "twitterThread": ["Tweet 1 text here", "Tweet 2 text here", "Tweet 3 text here"],
  "linkedinPost": "A compelling, well-spaced LinkedIn post with relevant hooks and hashtags.",
  "newsletter": "A catchy email subject line and a structured email newsletter body."
}
Do not include any conversational filler outside the JSON.`,
        },
        {
          role: "user",
          content: rawInput,
        },
      ],
      model: selectedModel,
      response_format: { type: "json_object" },
    });

    const aiResponseRaw = chatCompletion.choices[0]?.message?.content;
    if (!aiResponseRaw) {
      throw new Error("No response received from Groq AI.");
    }

    let formattedOutputs;
    try {
      formattedOutputs = JSON.parse(aiResponseRaw);
    } catch (parseErr) {
      console.error("[Groq Generate API] JSON parse error:", parseErr, "Raw output:", aiResponseRaw);
      return NextResponse.json(
        { error: "Failed to parse AI output into JSON format." },
        { status: 500 }
      );
    }

    // Ensure outputs match schema expectations
    if (!formattedOutputs.twitterThread || !formattedOutputs.linkedinPost || !formattedOutputs.newsletter) {
      return NextResponse.json(
        { error: "AI output is missing required format keys." },
        { status: 500 }
      );
    }

    if (typeof formattedOutputs.twitterThread === "string") {
      formattedOutputs.twitterThread = [formattedOutputs.twitterThread];
    }

    await connectToDatabase();
    const newContent = await Content.create({
      userId: session.user.id,
      rawInput,
      tone,
      outputs: formattedOutputs,
    });

    return NextResponse.json({ content: newContent }, { status: 201 });
  } catch (error) {
    console.error("[Groq Generate API] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content." },
      { status: 500 }
    );
  }
}
