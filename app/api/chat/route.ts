import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE } from "@/lib/knowledge";

const SYSTEM_PROMPT = `You are Keerthi S's AI assistant, embedded on his portfolio site. Visitors are typically recruiters, hiring managers, and engineers evaluating Keerthi for senior ML infrastructure roles. Be helpful, accurate, and concise.

You have access to Keerthi's full resume and detailed READMEs for 5 open-source projects. Below is the complete knowledge base — answer ONLY based on this content. If asked about something not in the knowledge base, say so honestly rather than making things up.

When relevant, mention which specific role, project, or experience your answer draws from (e.g., "From his work at Best Buy…" or "AgentForge specifically does this by…").

Keep responses concise — 2-4 short paragraphs unless the question genuinely needs more depth. Avoid generic praise. Be technically specific. If a question is vague, ask one clarifying question rather than guess.

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

If the user asks something off-topic (not about Keerthi or his work), politely redirect: "I'm focused on questions about Keerthi's work and experience. Is there something specific about his ML infrastructure background you'd like to know?"

Never invent metrics, companies, or experience that aren't in the knowledge base above.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        "The AI assistant isn't configured yet — please reach out to Keerthi directly via the links above! (Owner: set ANTHROPIC_API_KEY in your Vercel env vars.)",
        { status: 200 }
      );
    }

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const cleanMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));

    const stream = await client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      temperature: 0.4,
      system: SYSTEM_PROMPT,
      messages: cleanMessages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (e) {
    console.error("Chat API error:", e);
    return new Response(
      "Something went wrong on my end. Try a different question, or reach out via the contact links!",
      { status: 200 }
    );
  }
}
