"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIGuide } from "@/components/ai-guide"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface GalleryLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  color: string
}

export function GalleryLayout({ children, title, subtitle, description, icon, color }: GalleryLayoutProps) {
  const [isGuideOpen, setIsGuideOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Navigation onOpenGuide={() => setIsGuideOpen(true)} />

      {/* Gallery Header */}
      <section className="pt-24 pb-16 px-4 border-b border-border bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exhibit
          </Link>

          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">{subtitle}</p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl text-pretty">{description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <div className="py-16">{children}</div>

      <Footer />
      <AIGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </main>
  )
}
