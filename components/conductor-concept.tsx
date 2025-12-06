"use client"

import { Quote } from "lucide-react"

export function ConductorConcept() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">The Intelligence Conductor</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Orchestrating AI Like a Symphony
          </h2>
        </div>

        <div className="relative bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-sm">
          <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" />

          <blockquote className="relative z-10">
            <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-6 font-serif italic text-pretty">
              &ldquo;Like Leonard Bernstein, Stravinsky, or Beethoven, conductors usually cannot play at a level of
              mastery on every single instrument for which they write music. They understand principles of each
              instrument—attack, decay, sustain, release, timbre, note range—but they don&apos;t necessarily have to be
              experts on every instrument.&rdquo;
            </p>
            <p className="text-lg sm:text-xl text-foreground leading-relaxed font-serif italic text-pretty">
              &ldquo;This is how I am with AI. I have a solid grasp of its foundational technology, but I am not
              building LLMs myself. I am more of a conductor, using multiple platforms and technologies together to
              create beautiful, instructive, and impactful projects.&rdquo;
            </p>
          </blockquote>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold">
                R
              </div>
              <div>
                <p className="font-medium text-foreground">Reid</p>
                <p className="text-sm text-muted-foreground">Intelligence Conductor • AI Innovator • Musician</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
