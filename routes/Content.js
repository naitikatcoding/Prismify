/**
 * routes/Content.js
 * 
 * Note: Prismify is a Next.js (App Router) project where API endpoints
 * are served through `app/api/.../route.js`.
 * 
 * The live generation endpoint for this logic is located at:
 * `app/api/content/generate/route.js`
 */

const Groq = require('groq-sdk');
const Content = require('../models/Content');

const groq = new Groq({ apiKey: (process.env.GROQ_API_KEY || '').trim() });

async function generateContent({ rawInput, tone, userId }) {
  const selectedModel = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are an expert social media ghostwriter for creators. 
Analyze the user's raw text and convert it into three separate formats.
The tone must be ${tone}.

You MUST respond strictly with a valid JSON object matching this structure:
{
  "twitterThread": ["Tweet 1 text here", "Tweet 2 text here", "Tweet 3 text here"],
  "linkedinPost": "A compelling, well-spaced LinkedIn post with relevant hooks and hashtags.",
  "newsletter": "A catchy email subject line and a structured email newsletter body."
}
Do not include any conversational filler outside the JSON.`
      },
      {
        role: 'user',
        content: rawInput,
      },
    ],
    model: selectedModel,
    response_format: { type: "json_object" }
  });

  const aiResponseRaw = chatCompletion.choices[0]?.message?.content;
  const formattedOutputs = JSON.parse(aiResponseRaw);

  if (userId) {
    const newContent = new Content({
      userId,
      rawInput,
      tone,
      outputs: formattedOutputs
    });
    await newContent.save();
    return newContent;
  }

  return { rawInput, tone, outputs: formattedOutputs };
}

module.exports = {
  generateContent,
};
