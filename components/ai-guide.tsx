"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, Send, Bot, User, Minimize2, Sparkles, Navigation, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  navigationAction?: {
    type: "navigate" | "showProject"
    section?: string
    projectId?: string
  }
}

interface AIGuideProps {
  isOpen: boolean
  onClose: () => void
  onNavigate?: (section: string, highlight?: boolean) => void
  onShowProject?: (projectId: string) => void
}

export function AIGuide({ isOpen, onClose, onNavigate, onShowProject }: AIGuideProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Welcome to the exhibit. I'm here to guide you through Matthew Guggemos's work across AI, speech science, and music.

Matthew approaches AI like a conductor approaches an orchestra. He doesn't build every instrument, but he understands how they harmonize together.

Where would you like to begin? I can show you the AI systems he's developed, his music career, or the clinical expertise that grounds it all.`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isAnimatingIn, setIsAnimatingIn] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setIsAnimatingIn(true)
      const timer = setTimeout(() => {
        setIsAnimatingIn(false)
        inputRef.current?.focus()
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement("span")
    ripple.className = "ripple"
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/guide", {
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

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        navigationAction: data.navigationAction,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Handle navigation actions
      if (data.navigationAction) {
        if (data.navigationAction.type === "navigate" && data.navigationAction.section && onNavigate) {
          setTimeout(() => {
            onNavigate(data.navigationAction.section, true)
          }, 500)
        } else if (data.navigationAction.type === "showProject" && data.navigationAction.projectId && onShowProject) {
          setTimeout(() => {
            onShowProject(data.navigationAction.projectId)
          }, 500)
        }
      }
    } catch (error) {
      console.error("[v0] AI Guide error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or scroll through the page to explore Matthew's work.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
    setTimeout(() => {
      const form = document.getElementById("docent-form") as HTMLFormElement
      if (form) {
        form.requestSubmit()
      }
    }, 50)
  }

  const quickActions = [
    { label: "Show me the work", prompt: "Show me the AI projects" },
    { label: "Music career", prompt: "Tell me about Matthew's music career" },
    { label: "What is EASI?", prompt: "What is EASI and how does it work?" },
    { label: "The conductor approach", prompt: "Explain the Intelligence Conductor philosophy" },
  ]

  if (!isOpen) return null

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isAnimatingIn ? "opacity-0" : "opacity-100",
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed z-50 bg-white border border-border shadow-2xl transition-all duration-400 ease-out docent-panel",
          isMinimized
            ? "bottom-4 right-4 w-auto h-auto rounded-full"
            : "bottom-4 right-4 w-[400px] sm:w-[450px] h-[650px] max-h-[85vh] rounded-2xl flex flex-col",
          isAnimatingIn && !isMinimized && "translate-y-8 opacity-0 scale-95",
          !isAnimatingIn && !isMinimized && "translate-y-0 opacity-100 scale-100",
        )}
        style={{
          boxShadow: isMinimized
            ? "0 4px 12px rgba(0, 94, 184, 0.15)"
            : "0 25px 50px -12px rgba(0, 94, 184, 0.25), 0 0 0 1px rgba(0, 94, 184, 0.05)",
        }}
      >
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="p-4 flex items-center gap-2 rounded-full transition-all duration-300 
                       hover:scale-110 hover:shadow-lg group animate-pulse-glow"
            style={{ color: RALLY_BLUE }}
          >
            <Bot className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-medium">AI Docent</span>
            <Sparkles
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: RED_STITCH }}
            />
          </button>
        ) : (
          <>
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-border rounded-t-2xl relative overflow-hidden"
              style={{ backgroundColor: `${RALLY_BLUE}08` }}
            >
              <div className="absolute inset-0 animate-shimmer opacity-50" />

              <div className="flex items-center gap-3 relative z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white 
                             transition-all duration-300 hover:scale-110 animate-float"
                  style={{
                    backgroundColor: RALLY_BLUE,
                    animationDuration: "4s",
                  }}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    AI Docent
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    Powered by Gemini
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 
                             hover:scale-110 active:scale-95"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 
                             hover:scale-110 hover:rotate-90 active:scale-95"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 transition-all duration-500",
                    message.role === "user" ? "flex-row-reverse" : "flex-row",
                    "animate-reveal-up",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110",
                      message.role === "user" ? "text-white" : "bg-muted text-foreground",
                    )}
                    style={message.role === "user" ? { backgroundColor: RALLY_BLUE } : undefined}
                  >
                    {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 transition-all duration-300",
                      message.role === "user"
                        ? "text-white rounded-tr-sm hover:scale-[1.02]"
                        : "bg-muted text-foreground rounded-tl-sm hover:bg-muted/80",
                    )}
                    style={message.role === "user" ? { backgroundColor: RALLY_BLUE } : undefined}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>

                    {/* Show navigation indicator when action was taken */}
                    {message.navigationAction && (
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <div className="flex items-center gap-2 text-xs" style={{ color: RALLY_BLUE }}>
                          {message.navigationAction.type === "navigate" ? (
                            <>
                              <Navigation className="w-3 h-3 nav-indicator" />
                              <span>Navigating to {message.navigationAction.section}</span>
                            </>
                          ) : (
                            <>
                              <ChevronRight className="w-3 h-3" />
                              <span>Highlighting {message.navigationAction.projectId?.toUpperCase()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 animate-reveal-up">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-2 h-2 rounded-full thinking-dot" style={{ backgroundColor: RALLY_BLUE }} />
                      <span className="w-2 h-2 rounded-full thinking-dot" style={{ backgroundColor: RALLY_BLUE }} />
                      <span className="w-2 h-2 rounded-full thinking-dot" style={{ backgroundColor: RALLY_BLUE }} />
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickAction(action.prompt)}
                      className="quick-action text-xs px-3 py-1.5 rounded-full border border-border 
                                 hover:border-[#005EB8] hover:bg-[#005EB8]/5 transition-all duration-200"
                      style={{ color: RALLY_BLUE }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form id="docent-form" onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Matthew's work or say 'show me...'"
                  className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm 
                             focus:outline-none focus:ring-2 transition-all duration-300
                             focus:shadow-lg"
                  style={
                    {
                      "--tw-ring-color": `${RALLY_BLUE}50`,
                      "--tw-shadow-color": `${RALLY_BLUE}20`,
                    } as React.CSSProperties
                  }
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  onClick={createRipple}
                  className="ripple-container rounded-xl text-white transition-all duration-300 
                             hover:scale-110 hover:shadow-lg active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: RALLY_BLUE }}
                >
                  <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  )
}
