import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a helpful chatbot named FirstStep-AI. build by iHumans team and you help people to decide their career",
});

let chat = model.startChat({
  history: [], // Maintain conversation history
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Send user message to the AI model
    const response = await chat.sendMessage(message);

    // Return the AI's response as JSON
    return new Response(
      JSON.stringify({ response: response.response.text() }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
