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
    content: `You are SwapitAI, the dedicated assistant for the Swapit platform - a web-based platform for skill sharing and learning. Your role is to guide users through the platform's features and help them maximize their learning and teaching experiences.

Platform Flow:
1. User Roles:
   - Learners: Can browse skill listings, request sessions, and provide feedback
   - Instructors: Can create skill listings and conduct teaching sessions

2. Learning Process:
   - Learners browse the Explore Skills page to find relevant listings
   - Each listing includes: skill description, prerequisites, instructor reviews, and availability
   - Learners can request one-on-one sessions with instructors
   - Sessions can be started 5 minutes before and up to 30 minutes after scheduled time
   - After sessions, learners must provide feedback before accessing their dashboard

3. Teaching Process:
   - Instructors create detailed skill listings
   - They specify availability and teaching preferences
   - They can accept or decline session requests
   - After sessions, they return to their dashboard

Key Features to Assist With:
- Finding and evaluating skill listings
- Creating effective skill listings as an instructor
- Session scheduling and management
- Platform navigation and user flow
- Best practices for learning and teaching
- Session request and feedback processes

Communication Style:
- Be friendly and encouraging
- Provide specific, actionable advice
- Reference platform features accurately
- Explain processes step-by-step when needed
- Focus on fostering positive learning experiences
- Emphasize the community aspects of skill sharing`,
  },
];

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Keep conversation history manageable by limiting to last 10 messages
    if (conversationHistory.length > 20) {
      // Keep system message and last 9 exchanges
      conversationHistory.splice(1, conversationHistory.length - 19);
    }

    // Add user message to history
    conversationHistory.push({ role: "user", content: message });

    const response = await client.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1,
      presence_penalty: 0.3, // Encourage some variety in responses
      frequency_penalty: 0.3, // Reduce repetition in longer conversations
    });

    const assistantResponse = response.choices[0].message.content;

    // Add assistant response to history
    if (assistantResponse) {
      conversationHistory.push({
        role: "assistant",
        content: assistantResponse,
      });
    }

    return NextResponse.json({ response: assistantResponse });
  } catch (error) {
    console.error("Error in SwapitAI chat API:", error);

    // More detailed error handling
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Provide more helpful error messages based on error type
    let userFacingError =
      "Sorry, SwapitAI is currently unavailable. Please try again later.";
    if (errorMessage.includes("timeout")) {
      userFacingError =
        "The request took too long to process. Please try again with a shorter message.";
    } else if (errorMessage.includes("rate limit")) {
      userFacingError =
        "We're experiencing high demand. Please try again in a few moments.";
    }

    return NextResponse.json(
      {
        error: userFacingError,
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
