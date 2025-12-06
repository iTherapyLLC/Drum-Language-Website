"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIGuide } from "@/components/ai-guide"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, MessageCircle, Music, Brain, CheckCircle2 } from "lucide-react"

const engagementTypes = [
  {
    id: "consulting",
    title: "Innovation Consulting",
    description: "ICS assessment, cross-domain synthesis workshops, creative strategy",
    icon: Brain,
    examples: ["Innovation capacity assessment", "Creative workshops", "Cross-domain strategy"],
  },
  {
    id: "development",
    title: "AI & Technology",
    description: "AI systems design, conversational tools, creative technology solutions",
    icon: Brain,
    examples: ["Custom AI solutions", "Speech analysis tools", "Creative tech projects"],
  },
  {
    id: "music",
    title: "Music & Performance",
    description: "Studio sessions, live performances, arrangement consultation",
    icon: Music,
    examples: ["Recording sessions", "Live performances", "Drum Language workshops"],
  },
  {
    id: "speaking",
    title: "Speaking & Workshops",
    description: "Intelligence Conductor methodology, AI creativity, innovation talks",
    icon: MessageCircle,
    examples: ["Keynote speaking", "Workshop facilitation", "Panel discussions"],
  },
]

export default function ContactPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen">
      <Navigation onOpenGuide={() => setIsGuideOpen(true)} />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 border-b border-border bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Let&apos;s Connect</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Start a Conversation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Whether you&apos;re interested in innovation consulting, AI development, musical collaboration, or just want
            to chat about the Intelligence Conductor approach - I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Engagement Types */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-4">Ways to Work Together</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Select the type of engagement that interests you most, or reach out with your own ideas.
                </p>
              </div>

              <div className="space-y-3">
                {engagementTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedType === type.id ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <type.icon
                          className={`w-4 h-4 ${selectedType === type.id ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{type.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Direct Contact */}
              <Card className="mt-8">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Prefer Direct Contact?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="mailto:contact@example.com"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>contact@example.com</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <Card className="bg-muted/30">
                  <CardContent className="pt-12 pb-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Message Received!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Thank you for reaching out. I&apos;ll review your message and get back to you soon. In the
                      meantime, feel free to explore the exhibit galleries.
                    </p>
                    <Button asChild className="mt-6 bg-transparent" variant="outline">
                      <a href="/">Explore the Exhibit</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">Send a Message</CardTitle>
                    <CardDescription>
                      Tell me about your project, idea, or how you&apos;d like to collaborate.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder={
                            selectedType
                              ? `Interested in: ${engagementTypes.find((t) => t.id === selectedType)?.title}`
                              : "What's this about?"
                          }
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                          placeholder="Tell me about your project, idea, or what you'd like to discuss..."
                        />
                      </div>

                      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </main>
  )
}
