"use client"

import Link from "next/link"
import { ArrowRight, Brain, Music, Mic2, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const galleries = [
  {
    title: "AI Systems",
    description: "EASI, InnerVoice, VAST, and the Innovation Capacity Score methodology",
    icon: Brain,
    href: "/gallery/ai",
    highlights: ["$2.2M+ in federal grants", "NSF & NIH funded", "Microsoft AI partnership"],
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    title: "Music & Performance",
    description: "Drum Language: where rhythm meets communication and cognition",
    icon: Music,
    href: "/gallery/music",
    highlights: ["Invincible Star Jazz", "Album recordings", "Larry Vuckovich Trio"],
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    title: "Clinical Practice",
    description: "Evidence-based speech-language pathology with a neurodivergent focus",
    icon: Mic2,
    href: "/gallery/clinical",
    highlights: ["Motor speech expertise", "AAC development", "Autism intervention"],
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    title: "Writing & Research",
    description: "Publications, presentations, and thought leadership",
    icon: BookOpen,
    href: "/gallery/writing",
    highlights: ["Mensa Research Journal", "National Academies", "ASHA Leader"],
    color: "bg-chart-4/10 text-chart-4",
  },
]

export function GalleryPreview() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">The Galleries</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Four Mediums, One Vision
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore the different facets of my work, each informing and enriching the others through cross-domain
            synthesis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {galleries.map((gallery, index) => (
            <Card
              key={gallery.title}
              className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${gallery.color} flex items-center justify-center mb-4`}>
                    <gallery.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="font-serif text-xl">{gallery.title}</CardTitle>
                <CardDescription className="text-base">{gallery.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {gallery.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <Link
                  href={gallery.href}
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:underline"
                >
                  Enter Gallery
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
