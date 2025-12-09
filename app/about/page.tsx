"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIGuide } from "@/components/ai-guide"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Music, Mic2, BookOpen, ArrowRight } from "lucide-react"

const timeline = [
  {
    period: "Current",
    title: "Intelligence Conductor",
    org: "Creative Technology & AI Innovation",
    description: "Orchestrating AI, music, and clinical expertise into breakthrough solutions",
  },
  {
    period: "Ongoing",
    title: "AI Systems Developer",
    org: "Speech-Language Technology",
    description: "Building innovative tools at the intersection of AI and human communication",
  },
  {
    period: "30+ Years",
    title: "Professional Musician",
    org: "Drumming & Percussion",
    description: "Exploring the Drum Language concept and cross-domain creativity",
  },
]

const skills = [
  { name: "AI Innovation", icon: Brain, level: "Advanced", years: "10+" },
  { name: "Drumming", icon: Music, level: "Professional", years: "30+" },
  { name: "Speech Pathology", icon: Mic2, level: "Expert", years: "15+" },
  { name: "Research & Writing", icon: BookOpen, level: "Published", years: "15+" },
]

export default function AboutPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Navigation onOpenGuide={() => setIsGuideOpen(true)} />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Profile - Updated for Reid */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="w-32 h-32 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-serif text-4xl font-bold mb-6">
                  R
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Reid</h1>
                <p className="text-primary font-medium mb-4">Intelligence Conductor</p>
                <p className="text-muted-foreground mb-6 text-pretty">
                  Orchestrating AI innovation, musical creativity, and clinical expertise to create breakthrough
                  solutions.
                </p>

                {/* Skills */}
                <div className="space-y-3 mb-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <skill.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{skill.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {skill.level} - {skill.years} years
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Bio */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">The Intelligence Conductor</h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p className="text-pretty">
                    My approach to AI and innovation is inspired by great orchestral conductors like Leonard Bernstein,
                    Stravinsky, and Beethoven. They didn&apos;t master every instrument at a virtuoso level, but they
                    understood the principles of each - attack, decay, sustain, release, timbre, note range - well
                    enough to orchestrate them into something greater than the sum of its parts.
                  </p>
                  <p className="text-pretty">
                    The same philosophy applies to working with AI. I&apos;m not building LLMs from scratch or creating
                    hardware infrastructure. Instead, I focus on understanding the foundational technology deeply enough
                    to orchestrate multiple platforms, tools, and disciplines together - creating beautiful,
                    instructive, and impactful projects.
                  </p>
                  <p className="text-pretty">
                    This platform is an interactive exhibit of that approach - a showcase of how diverse expertise in
                    music, clinical practice, AI, and creative technology can converge to create breakthrough solutions.
                  </p>
                </div>
              </section>

              {/* ICS Methodology */}
              <section id="ics">
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">Innovation Capacity Score (ICS)</CardTitle>
                    <CardDescription className="text-base">
                      A mathematical framework for measuring and optimizing breakthrough thinking conditions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-card rounded-xl p-6 mb-6 border border-border text-center">
                      <p className="font-mono text-xl sm:text-2xl text-foreground">
                        ICS = <span className="text-primary">f</span>((V!/(V-C)!) × F × T)
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <span className="font-mono text-lg text-primary font-bold">V</span>
                        <span className="text-muted-foreground"> = Variety (cognitive inputs)</span>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <span className="font-mono text-lg text-primary font-bold">C</span>
                        <span className="text-muted-foreground"> = Connectivity (synthesis)</span>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <span className="font-mono text-lg text-primary font-bold">F</span>
                        <span className="text-muted-foreground"> = Freedom (autonomy)</span>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <span className="font-mono text-lg text-primary font-bold">T</span>
                        <span className="text-muted-foreground"> = Tension (productive challenge)</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground text-pretty">
                      With V=7 and C=5, you get 2,520 base combinations. Multiply by Freedom and Tension for
                      breakthrough capacity. This explains why diverse expertise creates exponential innovation
                      potential - the more domains you can connect, the more novel combinations become possible.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Timeline */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Journey</h2>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        {index < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                      </div>
                      <div className="pb-6">
                        <span className="text-sm text-primary font-medium">{item.period}</span>
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.org}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Explore Galleries CTA */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Explore the Exhibit</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/gallery/ai" className="group">
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-full bg-chart-1/10 flex items-center justify-center mb-3 group-hover:bg-chart-1/20 transition-colors">
                          <Brain className="w-5 h-5 text-chart-1" />
                        </div>
                        <CardTitle className="text-lg">AI Systems Gallery</CardTitle>
                        <CardDescription>EASI, InnerVoice, VAST, and more</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/gallery/music" className="group">
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center mb-3 group-hover:bg-chart-2/20 transition-colors">
                          <Music className="w-5 h-5 text-chart-2" />
                        </div>
                        <CardTitle className="text-lg">Music Gallery</CardTitle>
                        <CardDescription>Drum Language and performances</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/gallery/clinical" className="group">
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center mb-3 group-hover:bg-chart-3/20 transition-colors">
                          <Mic2 className="w-5 h-5 text-chart-3" />
                        </div>
                        <CardTitle className="text-lg">Clinical Gallery</CardTitle>
                        <CardDescription>Speech-Language Pathology</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                  <Link href="/gallery/writing" className="group">
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-full bg-chart-4/10 flex items-center justify-center mb-3 group-hover:bg-chart-4/20 transition-colors">
                          <BookOpen className="w-5 h-5 text-chart-4" />
                        </div>
                        <CardTitle className="text-lg">Writing Gallery</CardTitle>
                        <CardDescription>Publications and research</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </main>
  )
}
