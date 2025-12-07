import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    console.log("[v0] Speak API called with text length:", text?.length)

    if (!text) {
      console.log("[v0] Error: No text provided")
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const apiKey = process.env.ELEVENLABS_API_KEY
    const voiceId = process.env.ELEVENLABS_VOICE_ID

    console.log("[v0] ELEVENLABS_API_KEY exists:", !!apiKey)
    console.log("[v0] ELEVENLABS_API_KEY length:", apiKey?.length)
    console.log("[v0] ELEVENLABS_VOICE_ID exists:", !!voiceId)
    console.log("[v0] ELEVENLABS_VOICE_ID value:", voiceId)

    if (!apiKey || !voiceId) {
      console.error("[v0] Missing ElevenLabs credentials - apiKey:", !!apiKey, "voiceId:", !!voiceId)
      return NextResponse.json(
        {
          error: "ElevenLabs credentials not configured",
          details: {
            hasApiKey: !!apiKey,
            hasVoiceId: !!voiceId,
          },
        },
        { status: 500 },
      )
    }

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`
    console.log("[v0] Making request to ElevenLabs URL:", url)

    const requestBody = {
      text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }
    console.log("[v0] Request body:", JSON.stringify(requestBody, null, 2))

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    console.log("[v0] ElevenLabs response status:", response.status)
    console.log("[v0] ElevenLabs response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] ElevenLabs error response:", response.status, errorText)
      return NextResponse.json(
        {
          error: "Failed to generate speech",
          status: response.status,
          details: errorText,
        },
        { status: response.status },
      )
    }

    const audioBuffer = await response.arrayBuffer()
    console.log("[v0] Audio buffer received, size:", audioBuffer.byteLength, "bytes")

    if (audioBuffer.byteLength === 0) {
      console.error("[v0] Empty audio buffer received")
      return NextResponse.json({ error: "Empty audio response" }, { status: 500 })
    }

    console.log("[v0] Returning audio response")
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error("[v0] Speech API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
