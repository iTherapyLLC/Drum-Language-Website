"use client"

import { ArrowRight, Music, Brain, Mic2, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const mediums = [
  { icon: Brain, label: "AI Systems", href: "/gallery/ai", color: "text-chart-1" },
  { icon: Music, label: "Music", href: "/gallery/music", color: "text-chart-2" },
  { icon: Mic2, label: "Clinical", href: "/gallery/clinical", color: "text-chart-3" },
  { icon: BookOpen, label: "Writing", href: "/gallery/writing", color: "text-chart-4" },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 animate-fade-in">
          An Interactive Exhibit
        </p>

        {/* Main Headline */}
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Where Diverse Expertise Creates <span className="text-primary">Breakthrough Solutions</span>
        </h1>

        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in text-pretty"
          style={{ animationDelay: "200ms" }}
        >
          Like a conductor who doesn&apos;t master every instrument but understands how they harmonize together, I
          orchestrate clinical expertise, musical thinking, and AI innovation to create impactful solutions.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/about">
              Explore My Approach
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 bg-transparent">
            <Link href="/contact">Start a Conversation</Link>
          </Button>
        </div>

        {/* Medium Icons */}
        <div
          className="flex items-center justify-center gap-8 sm:gap-12 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          {mediums.map((medium) => (
            <Link
              key={medium.label}
              href={medium.href}
              className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card border border-border flex items-center justify-center group-hover:border-primary group-hover:shadow-lg transition-all">
                <medium.icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${medium.color} group-hover:scale-110 transition-transform`}
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {medium.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
