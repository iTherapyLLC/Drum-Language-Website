import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY
  const voiceId = process.env.ELEVENLABS_VOICE_ID

  console.log("[v0] === Speak API Request ===")
  console.log("[v0] API Key present:", !!apiKey, "length:", apiKey?.length || 0)
  console.log("[v0] Voice ID:", voiceId)

  if (!apiKey) {
    console.error("[v0] ELEVENLABS_API_KEY is missing")
    return NextResponse.json({ error: "ELEVENLABS_API_KEY is not configured" }, { status: 500 })
  }

  if (!voiceId) {
    console.error("[v0] ELEVENLABS_VOICE_ID is missing")
    return NextResponse.json({ error: "ELEVENLABS_VOICE_ID is not configured" }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { text } = body

    console.log("[v0] Text to speak:", text?.substring(0, 100) + "...")

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`

    const requestBody = {
      text: text.trim(),
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
      },
    }

    console.log("[v0] Making ElevenLabs request to:", url)
    console.log(
      "[v0] Request body:",
      JSON.stringify({ ...requestBody, text: requestBody.text.substring(0, 50) + "..." }),
    )

    const elevenLabsResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    console.log("[v0] ElevenLabs response status:", elevenLabsResponse.status)
    console.log("[v0] ElevenLabs response statusText:", elevenLabsResponse.statusText)

    if (!elevenLabsResponse.ok) {
      const errorBody = await elevenLabsResponse.text()
      console.error("[v0] ElevenLabs error:", elevenLabsResponse.status, errorBody)

      return NextResponse.json(
        {
          error: "ElevenLabs API error",
          status: elevenLabsResponse.status,
          details: errorBody,
        },
        { status: elevenLabsResponse.status },
      )
    }

    const contentType = elevenLabsResponse.headers.get("content-type")
    console.log("[v0] Response content-type:", contentType)

    if (!contentType?.includes("audio")) {
      const textBody = await elevenLabsResponse.text()
      console.error("[v0] Unexpected response type:", contentType, textBody)
      return NextResponse.json({ error: "Unexpected response from ElevenLabs", details: textBody }, { status: 500 })
    }

    const audioBuffer = await elevenLabsResponse.arrayBuffer()
    console.log("[v0] Audio buffer size:", audioBuffer.byteLength, "bytes")

    if (audioBuffer.byteLength === 0) {
      console.error("[v0] Empty audio buffer")
      return NextResponse.json({ error: "Empty audio response" }, { status: 500 })
    }

    console.log("[v0] Returning audio successfully")

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("[v0] Speak API exception:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
