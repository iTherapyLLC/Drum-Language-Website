"use client"

import { GalleryLayout } from "@/components/gallery-layout"
import { Music, Play, Calendar, Mic2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const currentProjects = [
  {
    name: "Invincible Star Jazz",
    description: "Contemporary jazz ensemble pushing the boundaries of improvisation and composition",
    role: "Drummer",
    status: "Active",
  },
  {
    name: "North Bay Jazz Collaborations",
    description: "Session work with Bay Area jazz musicians exploring diverse styles and traditions",
    role: "Session Drummer",
    status: "Active",
  },
]

const pastProjects = [
  {
    name: "Freighter",
    description: "Progressive rock/jazz fusion band with multiple album releases",
    role: "Drummer",
    albums: ["Featured on multiple albums"],
  },
  {
    name: "miRthon",
    description: "Experimental music project blending electronic and acoustic elements",
    role: "Drummer/Percussionist",
    albums: ["Album recordings"],
  },
  {
    name: "Larry Vuckovich Trio",
    description: "Collaboration with acclaimed jazz pianist Larry Vuckovich",
    role: "Drummer",
    albums: ["Live performances"],
  },
]

const drumLanguageConcept = {
  title: "Drum Language",
  description: `Exploring the deep connections between drumming, skill mastery, improvisation, and communication. 
  The Drum Language approach recognizes that rhythmic patterns share fundamental properties with speech and language—
  both involve timing, dynamics, phrasing, and the communication of meaning through organized sound.`,
  principles: [
    "Rhythm as communication medium",
    "Improvisation as real-time problem solving",
    "Skill mastery through deliberate practice",
    "Cross-cultural rhythmic traditions",
    "Motor planning parallels with speech production",
  ],
}

const services = [
  {
    title: "Studio Sessions",
    description: "Professional drum tracks for your recording project",
    details: "Remote or in-person sessions with quick turnaround",
    icon: Mic2,
  },
  {
    title: "Live Performances",
    description: "Jazz, experimental, and cross-genre expertise",
    details: "Available for concerts, festivals, and private events",
    icon: Music,
  },
  {
    title: "Speaking & Workshops",
    description: "Drum Language workshops and presentations",
    details: "Educational sessions on rhythm, cognition, and communication",
    icon: Calendar,
  },
]

export default function MusicGalleryPage() {
  return (
    <GalleryLayout
      title="Music & Performance"
      subtitle="Gallery"
      description="30+ years of drumming across jazz, experimental, and cross-genre projects. Exploring Drum Language: where rhythm meets communication and cognition."
      icon={<Music className="w-8 h-8 text-chart-2" />}
      color="bg-chart-2/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Drum Language Concept */}
        <Card className="mb-16 bg-muted/30 border-chart-2/20">
          <CardHeader>
            <CardTitle className="font-serif text-2xl text-chart-2">{drumLanguageConcept.title}</CardTitle>
            <CardDescription className="text-base">{drumLanguageConcept.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {drumLanguageConcept.principles.map((principle) => (
                <span
                  key={principle}
                  className="px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground border border-border"
                >
                  {principle}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Projects */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Current Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {currentProjects.map((project) => (
              <Card key={project.name} className="group hover:border-chart-2/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-chart-2/10 text-chart-2 rounded-full text-xs font-medium">
                      {project.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{project.role}</span>
                  </div>
                  <CardTitle className="font-serif text-xl">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Projects */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Past Projects & Collaborations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pastProjects.map((project) => (
              <Card key={project.name}>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">{project.name}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{project.role}</p>
                  <p className="text-xs text-muted-foreground italic">{project.albums.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Embed Placeholder */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Listen & Watch</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="aspect-video flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Performance Videos</p>
                <p className="text-sm text-muted-foreground/70">Instagram @drumlanguage</p>
              </div>
            </Card>
            <Card className="aspect-video flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Teaching Demonstrations</p>
                <p className="text-sm text-muted-foreground/70">Whole tones, Irish bodhrans, Tony Williams vibes</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Book Reid</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="group hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{service.details}</p>
                  <Button asChild variant="outline" size="sm" className="bg-transparent">
                    <a href="/contact">Inquire</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </GalleryLayout>
  )
}
