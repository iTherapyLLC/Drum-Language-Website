"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, ArrowRight, Volume2, VolumeX, Loader2, Mic, MicOff } from "lucide-react"
import Image from "next/image"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

const quickActions = [
  {
    label: "What's EASI?",
    section: "projects",
    query: "What is EASI?",
  },
  { label: "The music stuff", section: "music", query: "Tell me about the drumming" },
  {
    label: "Credentials",
    section: "credentials",
    query: "What are the credentials?",
  },
  { label: "How it connects", section: "speaking", query: "How does the drumming connect to the AI work?" },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface DocentProps {
  onNavigate?: (sectionId: string) => void
  onHighlightProject?: (projectId: string) => void
}

export function AIDocent({ onNavigate, onHighlightProject }: DocentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null)
  const [isLoadingVoice, setIsLoadingVoice] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognitionAPI) {
        setSpeechSupported(true)
        const recognition = new SpeechRecognitionAPI()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = "en-US"

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("")
          setInputValue(transcript)

          // If this is a final result, stop listening
          if (event.results[0].isFinal) {
            setIsListening(false)
          }
        }

        recognition.onerror = (event: any) => {
          console.error("[v0] Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setInputValue("")
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error("[v0] Failed to start speech recognition:", error)
      }
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false)
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setShowPulse(true)
        setTimeout(() => setShowPulse(false), 3000)
      }, 15000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const speakMessage = async (message: Message) => {
    alert(`[DEBUG] speakMessage called for message: ${message.id}`)
    console.log("[v0] === speakMessage called ===")
    console.log("[v0] Message ID:", message.id)
    console.log("[v0] Message content length:", message.content.length)

    if (speakingMessageId === message.id) {
      console.log("[v0] Stopping current playback")
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current = null
      }
      setSpeakingMessageId(null)
      return
    }

    // Stop any existing playback
    if (audioRef.current) {
      console.log("[v0] Stopping previous audio")
      audioRef.current.pause()
      audioRef.current.src = ""
      audioRef.current = null
    }

    setIsLoadingVoice(true)
    setSpeakingMessageId(message.id)

    try {
      console.log("[v0] Sending request to /api/speak")
      alert(`[DEBUG] About to call /api/speak with text: "${message.content.substring(0, 50)}..."`)

      const response = await fetch("/api/speak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message.content }),
      })

      alert(`[DEBUG] Response received: status=${response.status}, ok=${response.ok}`)
      console.log("[v0] Response status:", response.status)
      console.log("[v0] Response ok:", response.ok)

      const contentType = response.headers.get("content-type")
      console.log("[v0] Response content-type:", contentType)

      if (!response.ok) {
        let errorDetails = "Unknown error"
        if (contentType?.includes("application/json")) {
          const errorData = await response.json()
          errorDetails = JSON.stringify(errorData)
        } else {
          errorDetails = await response.text()
        }
        console.error("[v0] API error:", errorDetails)
        alert(`[DEBUG] API Error: ${errorDetails}`)
        throw new Error(`API error: ${errorDetails}`)
      }

      if (!contentType?.includes("audio")) {
        const textBody = await response.text()
        console.error("[v0] Did not receive audio, got:", contentType, textBody)
        alert(`[DEBUG] Not audio response: ${contentType} - ${textBody}`)
        throw new Error("Did not receive audio response")
      }

      const audioBlob = await response.blob()
      console.log("[v0] Audio blob size:", audioBlob.size, "type:", audioBlob.type)
      alert(`[DEBUG] Audio blob received: size=${audioBlob.size}, type=${audioBlob.type}`)

      if (audioBlob.size === 0) {
        throw new Error("Empty audio blob")
      }

      const audioUrl = URL.createObjectURL(new Blob([audioBlob], { type: "audio/mpeg" }))
      console.log("[v0] Created audio URL")

      const audio = new Audio()
      audioRef.current = audio

      audio.onloadedmetadata = () => {
        console.log("[v0] Audio metadata loaded, duration:", audio.duration)
      }

      audio.oncanplaythrough = () => {
        console.log("[v0] Audio can play through")
      }

      audio.onplay = () => {
        console.log("[v0] Audio started playing")
      }

      audio.onended = () => {
        console.log("[v0] Audio playback ended")
        setSpeakingMessageId(null)
        URL.revokeObjectURL(audioUrl)
      }

      audio.onerror = (e) => {
        console.error("[v0] Audio error event:", e)
        console.error("[v0] Audio error code:", audio.error?.code)
        console.error("[v0] Audio error message:", audio.error?.message)
        alert(`[DEBUG] Audio error: code=${audio.error?.code}, message=${audio.error?.message}`)
        setSpeakingMessageId(null)
        URL.revokeObjectURL(audioUrl)
      }

      // Set source and play
      audio.src = audioUrl
      console.log("[v0] Audio src set, attempting to play")

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("[v0] Playback started successfully")
            alert("[DEBUG] Audio playback started!")
          })
          .catch((playError) => {
            console.error("[v0] Play failed:", playError)
            alert(`[DEBUG] Play failed: ${playError.message}`)
            setSpeakingMessageId(null)
            URL.revokeObjectURL(audioUrl)
          })
      }
    } catch (error) {
      console.error("[v0] speakMessage error:", error)
      alert(`[DEBUG] Caught error: ${error instanceof Error ? error.message : String(error)}`)
      setSpeakingMessageId(null)
    } finally {
      setIsLoadingVoice(false)
    }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/docent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          assistantContent += chunk

          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMessage.id ? { ...m, content: assistantContent } : m)),
          )
        }
      }

      if (autoSpeak && assistantContent) {
        speakMessage({ ...assistantMessage, content: assistantContent })
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Something went wrong. Try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return
    sendMessage(inputValue)
    setInputValue("")
  }

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    sendMessage(action.query)
    if (onNavigate && action.section) {
      setTimeout(() => onNavigate(action.section), 500)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full
          flex items-center justify-center
          shadow-2xl transition-all duration-500 ease-out
          hover:scale-110 hover:shadow-[0_0_40px_rgba(0,94,184,0.4)]
          ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}
        `}
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}, ${RALLY_BLUE}dd)`,
        }}
        aria-label="Open Drum Language Docent"
      >
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${showPulse ? "opacity-100" : "opacity-0"}`}
          style={{
            background: `radial-gradient(circle, transparent 60%, ${RALLY_BLUE}40 100%)`,
            animation: showPulse ? "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" : "none",
          }}
        />
        <div
          className={`absolute inset-[-8px] rounded-full transition-opacity duration-500 ${showPulse ? "opacity-100" : "opacity-0"}`}
          style={{
            border: `2px solid ${RALLY_BLUE}40`,
            animation: showPulse ? "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s" : "none",
          }}
        />

        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
          <Image src="/images/hero-drum.png" alt="Ask" width={48} height={48} className="w-full h-full object-cover" />
        </div>

        <span
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-bounce"
          style={{ backgroundColor: RED_STITCH }}
        >
          ?
        </span>
      </button>

      {/* Chat Panel */}
      <div
        className={`
          fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]
          rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-500 ease-out origin-bottom-right
          ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}
        `}
        style={{
          background: "white",
          border: `1px solid ${RALLY_BLUE}20`,
          maxHeight: "min(600px, calc(100vh - 100px))",
        }}
      >
        {/* Header */}
        <div
          className="p-4 flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${RALLY_BLUE}, ${RALLY_BLUE}ee)`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
              <Image
                src="/images/hero-drum.png"
                alt="Drum Language Docent"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Drum Language Docent</h3>
              <p className="text-white/70 text-xs">Your exhibit guide</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                autoSpeak ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
              }`}
              title={autoSpeak ? "Auto-speak on" : "Auto-speak off"}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-white/70" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#005EB8]/20">
                <Image
                  src="/images/hero-drum.png"
                  alt="Drum Language Docent"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Welcome to the exhibit. I'm the Drum Language Docent. There's a lot here: tech, music, the physical
                practice side. Where do you want to start?
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action)}
                    className="quick-action text-left p-3 rounded-xl text-xs font-medium bg-white border border-border hover:border-[#005EB8] transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      {action.label}
                      <ArrowRight className="w-3 h-3 opacity-50" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    message.role === "user"
                      ? "bg-[#005EB8] text-white rounded-br-md"
                      : "bg-white border border-border rounded-bl-md shadow-sm"
                  }`}
                >
                  {message.content}
                  {message.role === "assistant" && message.content && (
                    <button
                      onClick={() => speakMessage(message)}
                      disabled={isLoadingVoice && speakingMessageId !== message.id}
                      className={`mt-2 flex items-center gap-1.5 text-xs transition-colors ${
                        speakingMessageId === message.id
                          ? "text-[#005EB8]"
                          : "text-muted-foreground hover:text-[#005EB8]"
                      }`}
                    >
                      {isLoadingVoice && speakingMessageId === message.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : speakingMessageId === message.id ? (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span className="flex gap-0.5">
                            <span className="w-1 h-3 bg-[#005EB8] rounded-full animate-pulse" />
                            <span
                              className="w-1 h-3 bg-[#005EB8] rounded-full animate-pulse"
                              style={{ animationDelay: "0.2s" }}
                            />
                            <span
                              className="w-1 h-3 bg-[#005EB8] rounded-full animate-pulse"
                              style={{ animationDelay: "0.4s" }}
                            />
                          </span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="thinking-dot w-2 h-2 rounded-full bg-[#005EB8]" />
                  <span className="thinking-dot w-2 h-2 rounded-full bg-[#005EB8]" />
                  <span className="thinking-dot w-2 h-2 rounded-full bg-[#005EB8]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            {speechSupported && (
              <button
                onClick={toggleListening}
                disabled={isLoading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isListening ? "bg-red-500 animate-pulse" : "bg-gray-100 hover:bg-gray-200"
                }`}
                title={isListening ? "Stop listening" : "Speak your message"}
              >
                {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-gray-600" />}
              </button>
            )}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? "Listening..." : "What do you want to know?"}
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#005EB8]/20 focus:border-[#005EB8] transition-all ${
                isListening ? "border-red-300 bg-red-50" : "border-border bg-gray-50"
              }`}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              style={{ backgroundColor: RALLY_BLUE }}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          {isListening && (
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-red-500">
              <span className="flex gap-1">
                <span
                  className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </span>
              <span>Listening... speak now</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
