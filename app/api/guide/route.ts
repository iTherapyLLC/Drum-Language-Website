import { getSystemPrompt } from "@/lib/knowledge-base"

export const maxDuration = 30

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json()
    const systemPrompt = getSystemPrompt()

    // Detect navigation intent from the user's message
    const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || ""
    let navigationAction: { type: string; section?: string; projectId?: string } | null = null

    // Check for navigation intents
    if (
      lastUserMessage.includes("show me") ||
      lastUserMessage.includes("take me to") ||
      lastUserMessage.includes("navigate to") ||
      lastUserMessage.includes("go to")
    ) {
      if (lastUserMessage.includes("work") || lastUserMessage.includes("project") || lastUserMessage.includes("ai")) {
        navigationAction = { type: "navigate", section: "work" }
      } else if (lastUserMessage.includes("music") || lastUserMessage.includes("drum")) {
        navigationAction = { type: "navigate", section: "music" }
      } else if (
        lastUserMessage.includes("about") ||
        lastUserMessage.includes("background") ||
        lastUserMessage.includes("bio")
      ) {
        navigationAction = { type: "navigate", section: "about" }
      } else if (lastUserMessage.includes("credential") || lastUserMessage.includes("achievement")) {
        navigationAction = { type: "navigate", section: "credentials" }
      } else if (
        lastUserMessage.includes("top") ||
        lastUserMessage.includes("home") ||
        lastUserMessage.includes("beginning")
      ) {
        navigationAction = { type: "navigate", section: "hero" }
      }
    }

    // Check for specific project focus
    const projectKeywords = {
      easi: ["easi", "speech evaluation", "assessment"],
      innervoice: ["innervoice", "inner voice", "aac", "communication app"],
      chatslp: ["chatslp", "chat slp", "clinical assistant"],
      vast: ["vast", "vr", "virtual reality"],
    }

    for (const [projectId, keywords] of Object.entries(projectKeywords)) {
      if (keywords.some((keyword) => lastUserMessage.includes(keyword))) {
        if (
          lastUserMessage.includes("show") ||
          lastUserMessage.includes("tell me about") ||
          lastUserMessage.includes("what is")
        ) {
          navigationAction = { type: "showProject", projectId }
        }
        break
      }
    }

    // Build conversation history for Gemini format
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GOOGLE_API_KEY!,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] Gemini API error:", errorData)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't generate a response."

    return Response.json({
      content: text,
      navigationAction,
    })
  } catch (error) {
    console.error("[v0] Guide API error:", error)
    return Response.json(
      {
        error: "Failed to generate response",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
      },
      { status: 500 },
    )
  }
}
