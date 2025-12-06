"use client"

import { GalleryLayout } from "@/components/gallery-layout"
import { BookOpen, ExternalLink, FileText, Presentation } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const publications = [
  {
    title: "Mensa Research Journal - Summer 2025",
    role: "Guest Editor",
    description:
      "Authored and co-authored four articles on AI and human intelligence in the Summer 2025 issue (Vol. 56 No. 2).",
    type: "Journal",
    year: "2025",
  },
  {
    title: "Exploring the Bidirectional Relationship Between AI and Neuroscience",
    role: "Workshop Participant & Featured Speaker",
    description: "National Academies of Sciences, Engineering, and Medicine proceedings.",
    type: "Proceedings",
    year: "2024",
    link: "https://doi.org/10.17226/27764",
  },
  {
    title: "ASHA Leader Publications",
    role: "Contributor",
    description: "Regular contributions on technology integration in speech-language pathology practice.",
    type: "Professional",
    year: "Ongoing",
  },
  {
    title: "Autism Digest",
    role: "Co-Owner & Co-Publisher",
    description:
      "Comprehensive articles on autism spectrum disorders, technology interventions, and best practices in care.",
    type: "Magazine",
    year: "Ongoing",
    link: "https://autismdigest.com",
  },
]

const presentations = [
  {
    title: "Harmonized Learning: The Fusion of Skill Mastery, Music, and Tech",
    venue: "Mensa Foundation Speaker Series",
    description:
      "Exploring how human agency, improvisation, and cross-domain learning pair with instrumental AI to amplify creativity and problem-solving.",
    type: "Keynote",
    media: "Video & Podcast available",
  },
  {
    title: "AI and Neuroscience Workshop",
    venue: "National Academies of Sciences, Engineering, and Medicine",
    description:
      "Invited speaker at the workshop exploring bidirectional relationships between artificial and human intelligence.",
    type: "Workshop",
    year: "March 2024",
  },
]

const writings = [
  {
    title: "The Intelligence Conductor",
    description:
      "On approaching AI like a symphony conductor—understanding principles without mastering every instrument.",
    status: "Featured Concept",
  },
  {
    title: "Innovation Capacity Score Framework",
    description: "Mathematical approach to measuring and optimizing breakthrough thinking conditions.",
    status: "Methodology Paper",
  },
  {
    title: "Drum Language & Cognition",
    description: "Exploring the parallels between rhythmic patterns and speech-language development.",
    status: "Research Direction",
  },
]

export default function WritingGalleryPage() {
  return (
    <GalleryLayout
      title="Writing & Research"
      subtitle="Gallery"
      description="Publications, presentations, and thought leadership at the intersection of AI, neuroscience, communication, and innovation."
      icon={<BookOpen className="w-8 h-8 text-chart-4" />}
      color="bg-chart-4/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Publications */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Publications</h2>
          <div className="space-y-6">
            {publications.map((pub) => (
              <Card key={pub.title} className="group hover:border-chart-4/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-chart-4/10 text-chart-4 rounded-full text-xs font-medium">
                          {pub.type}
                        </span>
                        <span className="text-sm text-muted-foreground">{pub.year}</span>
                      </div>
                      <CardTitle className="font-serif text-xl">{pub.title}</CardTitle>
                      <p className="text-sm text-primary mt-1">{pub.role}</p>
                      <CardDescription className="text-base mt-2">{pub.description}</CardDescription>
                    </div>
                    {pub.link && (
                      <Button asChild variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                        <a href={pub.link} target="_blank" rel="noopener noreferrer">
                          View
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Presentations */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Presentations & Speaking</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {presentations.map((pres) => (
              <Card key={pres.title}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center mb-4">
                    <Presentation className="w-6 h-6 text-chart-4" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                      {pres.type}
                    </span>
                    {pres.year && <span className="text-xs text-muted-foreground">{pres.year}</span>}
                  </div>
                  <CardTitle className="font-serif text-lg">{pres.title}</CardTitle>
                  <p className="text-sm text-primary">{pres.venue}</p>
                  <CardDescription className="mt-2">{pres.description}</CardDescription>
                </CardHeader>
                {pres.media && (
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{pres.media}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Writing Themes */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Writing Themes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {writings.map((writing) => (
              <Card key={writing.title} className="bg-muted/30">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5 text-chart-4" />
                  </div>
                  <CardTitle className="font-serif text-lg">{writing.title}</CardTitle>
                  <CardDescription>{writing.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-muted-foreground italic">{writing.status}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </GalleryLayout>
  )
}
