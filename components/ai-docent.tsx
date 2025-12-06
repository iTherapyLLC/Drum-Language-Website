"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { X, Send, ArrowRight } from "lucide-react"
import Image from "next/image"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

const quickActions = [
  {
    label: "Tell me about EASI",
    section: "projects",
    query: "What is EASI and how does it help with speech evaluation?",
  },
  { label: "See drumming work", section: "music", query: "Show me Matthew's drumming and music projects" },
  {
    label: "View credentials",
    section: "credentials",
    query: "What are Matthew's credentials and speaking engagements?",
  },
  { label: "Skiing philosophy", section: "skiing", query: "What does skiing teach about problem solving?" },
]

interface DocentProps {
  onNavigate?: (sectionId: string) => void
  onHighlightProject?: (projectId: string) => void
}

export function AIDocent({ onNavigate, onHighlightProject }: DocentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/docent" }),
  })

  const isLoading = status === "in_progress"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false)
      inputRef.current?.focus()
    }
  }, [isOpen])

  // Pulse animation periodically to draw attention
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setShowPulse(true)
        setTimeout(() => setShowPulse(false), 3000)
      }, 15000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    sendMessage({ text: action.query })
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
        aria-label="Open AI Guide"
      >
        {/* Animated rings */}
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
          <Image
            src="/images/hero-drum.png"
            alt="Ask the Guide"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Notification dot */}
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
                alt="Exhibit Guide"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold">Exhibit Guide</h3>
              <p className="text-white/70 text-xs">Ask me anything about Matthew's work</p>
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
                Welcome to Matthew's interactive portfolio. I can guide you through his work in AI, music, and speech
                pathology.
              </p>

              {/* Quick Actions */}
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
                  {message.parts.map((part, i) => {
                    if (part.type === "text") {
                      return <span key={i}>{part.text}</span>
                    }
                    return null
                  })}
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
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Matthew's work..."
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
