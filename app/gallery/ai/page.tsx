"use client"

import { GalleryLayout } from "@/components/gallery-layout"
import { Brain, ExternalLink, Award, Users, DollarSign, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  {
    id: "easi",
    name: "EASI",
    fullName: "Evaluative Artificial Speech Intelligence",
    description:
      "Machine learning-based speech and language evaluation system that reduces misdiagnosis of Childhood Apraxia of Speech (CAS).",
    role: "CTO",
    funding: "NSF SBIR Phase 1 & 2",
    impact: "90% accuracy improvement",
    features: [
      "Natural context assessment",
      "Reduces 5-hour evaluations to 15-30 minutes",
      "AI-powered pattern recognition",
      "Evidence-based diagnostic support",
    ],
    link: "https://easi-speech-analysis.gamma.site",
  },
  {
    id: "innervoice",
    name: "InnerVoice",
    fullName: "InnerVoice Communication Platform",
    description:
      "Award-winning AAC app that integrates LLM technology with real-time avatars to aid learning and communication.",
    role: "Co-Founder & CTO",
    funding: "Microsoft AI for Accessibility",
    impact: "Globally adopted solution",
    features: [
      "Real-time avatar generation",
      "LLM-powered conversations",
      "Gamified engagement",
      "Mobile-first design",
    ],
    link: "#",
  },
  {
    id: "vast",
    name: "VAST",
    fullName: "Video-Assisted Speech Technology",
    description:
      "VR-based speech therapy system using bone conduction technology designed for children with autism to enhance motor planning and functional speech.",
    role: "Co-Principal Investigator",
    funding: "NIH Grant",
    impact: "Novel intervention method",
    features: ["Virtual reality environment", "Bone conduction audio", "Motor speech focus", "Autism-specific design"],
    link: "#",
  },
]

const methodology = {
  name: "Cognitive Freedom Protocol",
  description:
    "Mathematical framework for measuring and protecting human innovation capacity in the AI age. Features the Innovation Capacity Score (ICS).",
  components: [
    "Real-time innovation scoring (0-10,000 scale)",
    "AI-powered assessment of text, audio, and video",
    "Protection against AI's 'agreeable bias'",
    "Quantifiable breakthrough metrics",
  ],
}

export default function AIGalleryPage() {
  return (
    <GalleryLayout
      title="AI Systems & Innovation"
      subtitle="Gallery"
      description="Exploring the intersection of artificial intelligence, speech-language pathology, and human communication. From diagnostic tools to therapeutic platforms."
      icon={<Brain className="w-8 h-8 text-chart-1" />}
      color="bg-chart-1/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-5 sm:pt-6">
              <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-foreground">$2.2M+</p>
              <p className="text-sm text-muted-foreground">Federal Grants</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-5 sm:pt-6">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-foreground">10+</p>
              <p className="text-sm text-muted-foreground">Successful SBIRs</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-5 sm:pt-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-foreground">NSF + NIH</p>
              <p className="text-sm text-muted-foreground">Grant Partners</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-5 sm:pt-6">
              <Lightbulb className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-serif text-2xl font-bold text-foreground">Microsoft</p>
              <p className="text-sm text-muted-foreground">AI Partnership</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Featured Projects</h2>
          <div className="space-y-8">
            {projects.map((project) => (
              <Card key={project.id} id={project.id} className="overflow-hidden">
                <div className="grid lg:grid-cols-3">
                  <div className="lg:col-span-2 p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {project.role}
                      </span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                        {project.funding}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.fullName}</p>
                    <p className="text-foreground mb-6">{project.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-2 mb-6">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {project.link !== "#" && (
                      <Button asChild variant="outline" size="sm" className="bg-transparent">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <div className="bg-muted/50 p-5 sm:p-6 lg:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border">
                    <p className="text-sm text-muted-foreground mb-2">Impact</p>
                    <p className="font-serif text-3xl font-bold text-primary">{project.impact}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">{methodology.name}</CardTitle>
            <CardDescription className="text-base">{methodology.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {methodology.components.map((component) => (
                <div key={component} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{component}</span>
                </div>
              ))}
            </div>
            <Button asChild>
              <Link href="/about#ics">Learn More About ICS</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </GalleryLayout>
  )
}
