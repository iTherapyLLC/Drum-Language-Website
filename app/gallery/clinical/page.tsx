"use client"

import { GalleryLayout } from "@/components/gallery-layout"
import { Mic2, Heart, Brain, Users, BookOpen, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const specializations = [
  {
    title: "Motor Speech Disorders",
    description:
      "Expertise in childhood apraxia of speech (CAS), dysarthria, and motor planning difficulties. Developer of the EASI diagnostic system.",
    icon: Brain,
  },
  {
    title: "AAC Development",
    description:
      "Creating and implementing augmentative and alternative communication solutions, including the InnerVoice platform.",
    icon: Mic2,
  },
  {
    title: "Autism Intervention",
    description:
      "Evidence-based approaches for neurodivergent individuals, with focus on multi-sensory and technology-enhanced methods.",
    icon: Heart,
  },
  {
    title: "Neurodivergent Communication",
    description: "Specialized strategies that honor different communication styles while building functional skills.",
    icon: Users,
  },
]

const credentials = [
  {
    title: "M.S. Speech Pathology & Audiology",
    institution: "California State University, East Bay",
  },
  {
    title: "Certificate of Clinical Competence (CCC-SLP)",
    institution: "American Speech-Language-Hearing Association",
  },
  {
    title: "B.A. Liberal Studies",
    institution: "Golden Gate University",
    emphasis: "English, History, Philosophy",
  },
]

const approach = {
  title: "Evidence-Based Practice Meets Innovation",
  description: `My clinical approach integrates traditional speech-language pathology with cutting-edge 
  technology and insights from music cognition. I believe in meeting clients where they are, using 
  multi-sensory methods that engage multiple learning pathways simultaneously.`,
  principles: [
    "Multi-sensory learning integration",
    "Technology-enhanced intervention",
    "Natural context assessment",
    "Neurodiversity-affirming practice",
    "Family-centered collaboration",
    "Data-driven progress monitoring",
  ],
}

export default function ClinicalGalleryPage() {
  return (
    <GalleryLayout
      title="Clinical Practice"
      subtitle="Gallery"
      description="Evidence-based speech-language pathology with expertise in motor speech disorders, AAC development, and neurodivergent communication strategies."
      icon={<Mic2 className="w-8 h-8 text-chart-3" />}
      color="bg-chart-3/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Credentials */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Credentials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((cred) => (
              <Card key={cred.title}>
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center mb-4">
                    <Award className="w-5 h-5 text-chart-3" />
                  </div>
                  <CardTitle className="font-serif text-lg">{cred.title}</CardTitle>
                  <CardDescription>{cred.institution}</CardDescription>
                  {cred.emphasis && <p className="text-xs text-muted-foreground mt-2">Emphasis: {cred.emphasis}</p>}
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Areas of Expertise</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {specializations.map((spec) => (
              <Card key={spec.title} className="group hover:border-chart-3/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center mb-4">
                    <spec.icon className="w-6 h-6 text-chart-3" />
                  </div>
                  <CardTitle className="font-serif text-xl">{spec.title}</CardTitle>
                  <CardDescription className="text-base">{spec.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Approach */}
        <Card className="mb-16 bg-muted/30">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">{approach.title}</CardTitle>
            <CardDescription className="text-base">{approach.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {approach.principles.map((principle) => (
                <div key={principle} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-2 h-2 rounded-full bg-chart-3" />
                  <span className="text-sm text-foreground">{principle}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Autism Digest */}
        <Card className="bg-gradient-to-br from-muted/50 to-muted/20 border-chart-3/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-chart-3" />
              <span className="px-3 py-1 bg-chart-3/10 text-chart-3 rounded-full text-xs font-medium">
                Co-Owner & Co-Publisher
              </span>
            </div>
            <CardTitle className="font-serif text-2xl">Autism Digest</CardTitle>
            <CardDescription className="text-base">
              Leading publication providing comprehensive and inspirational articles by experts with positive attitudes
              about people with autism, Asperger&apos;s, and neurodiverse conditions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="bg-transparent">
                <a href="https://autismdigest.com" target="_blank" rel="noopener noreferrer">
                  Visit Autism Digest
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/gallery/writing">View Publications</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </GalleryLayout>
  )
}
