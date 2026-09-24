import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Content from "@/models/Content";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getAuthenticatedSession() {
  return getServerSession(authOptions);
}

export async function GET() {
  const session = await getAuthenticatedSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const content = await Content.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({ content });
  } catch (error) {
    console.error("[Content API] Failed to load content:", error);
    return NextResponse.json({ error: "Unable to load content" }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getAuthenticatedSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const rawInput = typeof body.rawInput === "string" ? body.rawInput.trim() : "";
    const tone = typeof body.tone === "string" ? body.tone.trim() : "Professional";
    const outputs = body.outputs;

    if (!rawInput || !outputs?.twitterThread || !outputs?.linkedinPost || !outputs?.newsletter) {
      return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
    }

    await connectToDatabase();
    const savedContent = await Content.create({
      userId: session.user.id,
      rawInput,
      tone,
      outputs,
    });

    return NextResponse.json({ content: savedContent }, { status: 201 });
  } catch (error) {
    console.error("[Content API] Failed to save content:", error);
    return NextResponse.json({ error: "Unable to save content" }, { status: 500 });
  }
}