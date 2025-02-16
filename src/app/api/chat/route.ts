import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// Initialize OpenAI client
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

// Store conversation history with proper typing
const conversationHistory: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content:
      "You are SwapitAI, the helpful assistant for the Swapit platform - a web-based platform for skill sharing and learning. Your primary focus is helping users with soft skill exchanges, scheduling sessions, finding learning partners, and navigating the platform. Be friendly, supportive, and knowledgeable about peer-to-peer learning, skill development, and community engagement.",
  },
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Add user message to history with proper typing
    conversationHistory.push({ role: "user", content: message });

    const response = await client.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
    });

    const assistantResponse = response.choices[0].message.content;

    // Add assistant response to history with proper typing
    if (assistantResponse) {
      conversationHistory.push({
        role: "assistant",
        content: assistantResponse,
      });
    }

    return NextResponse.json({ response: assistantResponse });
  } catch (error) {
    console.error("Error in SwapitAI chat API:", error);
    return NextResponse.json(
      {
        error:
          "Sorry, SwapitAI is currently unavailable. Please try again later.",
      },
      { status: 500 }
    );
  }
}
