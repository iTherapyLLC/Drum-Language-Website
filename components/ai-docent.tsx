"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, ArrowRight } from "lucide-react"
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
        aria-label="Open Guide"
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
        {/* Header - Updated copy to be less peppy */}
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
                alt="Guide"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold">Guide</h3>
              <p className="text-white/70 text-xs">Ask me anything</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#005EB8]/20">
                <Image
                  src="/images/hero-drum.png"
                  alt="Welcome"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Hey. There's a lot here. Tech stuff, music, the physical practice side. Where do you want to start?
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

        {/* Input - Updated placeholder */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="What do you want to know?"
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#005EB8]/20 focus:border-[#005EB8] transition-all"
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
        </div>
      </div>
    </>
  )
}
