"use client"

import type React from "react"

import { useState } from "react"
import { Send, Loader2, CheckCircle, AlertCircle, Laptop, Music } from "lucide-react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

type InquiryType = "tech" | "music"

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("tech")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiryType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  const accentColor = inquiryType === "tech" ? RALLY_BLUE : RED_STITCH

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Inquiry Type Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          type="button"
          onClick={() => setInquiryType("tech")}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
            inquiryType === "tech"
              ? "border-[#005EB8] bg-[#005EB8]/5 shadow-lg"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              inquiryType === "tech" ? "bg-[#005EB8] text-white scale-110" : "bg-gray-100 text-gray-500"
            }`}
          >
            <Laptop className="w-6 h-6" />
          </div>
          <span className={`font-semibold ${inquiryType === "tech" ? "text-[#005EB8]" : "text-gray-600"}`}>
            Technology & AI
          </span>
          <span className="text-xs text-muted-foreground text-center">Products, grants, technical collaboration</span>
        </button>

        <button
          type="button"
          onClick={() => setInquiryType("music")}
          className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
            inquiryType === "music"
              ? "border-[#DC2626] bg-[#DC2626]/5 shadow-lg"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              inquiryType === "music" ? "bg-[#DC2626] text-white scale-110" : "bg-gray-100 text-gray-500"
            }`}
          >
            <Music className="w-6 h-6" />
          </div>
          <span className={`font-semibold ${inquiryType === "music" ? "text-[#DC2626]" : "text-gray-600"}`}>
            Music & Consultation
          </span>
          <span className="text-xs text-muted-foreground text-center">Sessions, performances, speaking</span>
        </button>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-300 bg-white"
              style={{ focusRing: accentColor } as React.CSSProperties}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-300 bg-white"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-300 bg-white"
            placeholder={inquiryType === "tech" ? "Grant collaboration inquiry" : "Recording session availability"}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-300 bg-white resize-none"
            placeholder="Tell me about your project or inquiry..."
          />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-green-50 text-green-700 border border-green-200">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Message sent successfully. I will get back to you soon.</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: accentColor }}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Your message will be sent securely. I typically respond within 24-48 hours.
      </p>
    </div>
  )
}
