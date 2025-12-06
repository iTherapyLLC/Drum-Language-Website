"use client"

import type React from "react"
import Image from "next/image" // Import Image component

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  ExternalLink,
  Zap,
  MessageCircle,
  Users,
  BookOpen,
  Building2,
  ChevronDown,
  Menu,
  X,
  Mountain,
  Target,
  Shield,
  Shuffle,
  Compass,
  Baby,
  Music2,
  Presentation,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagicHeading } from "@/components/magic-text"
import { AIDocent } from "@/components/ai-docent"
import { VideoPreview } from "@/components/video-preview"
import { TiltCard } from "@/components/tilt-card"
import { SheenEffect } from "@/components/sheen-effect"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"
const SOFT_GRAY = "#F8F9FA"

const projects = [
  {
    id: "easi",
    name: "EASI",
    tagline: "5 Hours → 15 Minutes",
    description:
      "The legally compliant AI evaluation platform. Machine learning speech and language analysis. NSF SBIR Phase 2 funded.",
    stat: "90% faster",
    Icon: Zap,
    url: "https://easi-as.com/",
    logoUrl: "/images/ujna3-ilo6ts4w-t-dzlz.webp",
  },
  {
    id: "innervoice",
    name: "InnerVoice",
    tagline: "Your voice matters",
    description:
      "AAC built on usage-based linguistics. Award-winning communication app with Microsoft AI for Accessibility partnership.",
    stat: "50,000+ users",
    Icon: MessageCircle,
    url: "https://www.innervoiceapp.com/",
    logoUrl: "/images/innervoice-logo.png",
  },
  {
    id: "speak-play",
    name: "Speak & Play",
    tagline: "Parent-directed communication support",
    description:
      "AI-powered tools helping parents turn everyday moments into learning opportunities. Features Matt Bot, a 24/7 support chatbot trained on Matthew's clinical expertise. NSF-backed research, patent pending.",
    stat: "NSF Backed",
    Icon: Baby,
    url: "https://www.speakandplay.com/",
    logoUrl: "/images/speak-play-logo.webp",
  },
  {
    id: "vast",
    name: "VAST",
    tagline: "Video-Assisted Speech Technology",
    description:
      "Research-backed video modeling for speech production. Virtual reality combined with bone-conduction technology. NIH funded.",
    stat: "NIH Grant",
    Icon: Users,
    url: "https://www.vastspeech.com/",
    logoUrl: "/images/vast-logo.webp",
  },
  {
    id: "autism-digest",
    name: "Autism Digest",
    tagline: "Community voices amplified",
    description:
      "15+ years of autism community content. A trusted resource for families, educators, and professionals.",
    stat: "15+ years",
    Icon: BookOpen,
    url: "https://www.autismdigest.com/",
    logoUrl: "/images/autism-digest-logo.webp",
  },
  {
    id: "itherapy",
    name: "iTherapy, LLC",
    tagline: "Speech Pathology Corporation",
    description: "The parent company behind EASI, InnerVoice, VAST, and Autism Digest. Co-founded and serving as CTO.",
    stat: "Co-Founder/CTO",
    Icon: Building2,
    url: "https://www.itherapyllc.com/",
    logoUrl: "/images/itherapy-logo.webp",
  },
]

const credentials = [
  {
    label: "National Academies Speaker",
    detail: "AI and Neuroscience Workshop, 2024",
    url: "https://www.nationalacademies.org/event/41444_03-2024_workshop-on-the-bidirectional-relationship-between-ai-and-neuroscience",
  },
  {
    label: "Mensa Foundation Colloquium",
    detail: "Human Intelligence in the Age of AI, 2025",
    url: "https://x.com/MensaFoundation/status/1883862766609416670",
  },
  {
    label: "Mensa Research Journal",
    detail: "Guest Editor, Summer 2025",
    url: "https://www.mensafoundation.org/insights/mensa-research-journal/",
  },
  { label: "American Society for AI", detail: "Board Member" },
  { label: "Mensa Foundation", detail: "Board of Trustees" },
  { label: "Federal Grant Funding", detail: "Millions via NSF, NIH, IES, AFWERX" },
]

const music = [
  {
    band: "Invincible Star Jazz",
    role: "Current ensemble",
    url: "https://www.instagram.com/invinciblestarjazz/",
    videoUrl: "https://youtu.be/EkljPwVq7FA?si=_gSPTvt_7KpCbjqn",
    imageUrl: "/images/invincible-star-jazz-anime.jpg",
  },
  {
    band: "Freighter",
    role: "Albums and tours",
    url: "https://freighter.bandcamp.com/",
    imageUrl: "/images/freighter-anime.jpg",
  },
  {
    band: "miRthkon",
    role: "Albums and tours",
    url: "https://mirthkon.bandcamp.com/",
    imageUrl: "/images/mirthkon-anime.jpg",
  },
  {
    band: "Larry Vuckovich",
    role: "Performance",
    url: "https://larryvuckovich.com/audio.htm",
    imageUrl: "/images/larry-vuckovich-anime.jpg",
  },
]

const featuredAlbums = [
  {
    band: "Freighter",
    album: "The Den",
    albumUrl: "https://freighter.bandcamp.com/album/the-den",
    featuredTrack: "Future Duke",
    trackUrl: "https://freighter.bandcamp.com/track/future-duke",
    color: "#1a1a2e",
    imageUrl: "/images/freighter-the-den.png",
  },
  {
    band: "miRthkon",
    album: "Vehicle",
    albumUrl: "https://mirthkon.bandcamp.com/album/vehicle",
    featuredTrack: "Honey Key Jamboree",
    trackUrl: "https://mirthkon.bandcamp.com/track/honey-key-jamboree",
    color: "#16213e",
    imageUrl: "/images/mirthkon-vehicle.png",
  },
  {
    band: "miRthkon",
    album: "Format (Original Motion Picture Soundtrack)",
    albumUrl: "https://mirthkon.bandcamp.com/album/format-original-motion-picture-soundtrack",
    featuredTrack: "Automaton",
    trackUrl: "https://mirthkon.bandcamp.com/track/automaton-2",
    color: "#0a192f",
    imageUrl: "/images/mirthkon-format-anime.jpg",
  },
  {
    band: "Snack(s)",
    album: "Snack(s)",
    albumUrl: "https://altrockproductions.bandcamp.com/album/snack-s",
    featuredTrack: "Osedax",
    trackUrl: "https://altrockproductions.bandcamp.com/track/osedax",
    label: "AltrOckProductions",
    color: "#0f3460",
    imageUrl: "/experimental-jazz-rock-album-cover-artistic.jpg",
  },
  {
    band: "Freighter",
    album: "Freighter",
    albumUrl: "https://freighter.bandcamp.com/album/freighter",
    featuredTrack: "The Gauntlet",
    trackUrl: "https://freighter.bandcamp.com/track/the-gauntlet",
    color: "#1a1a1a",
    imageUrl: "/heavy-rock-self-titled-album-dark-powerful.jpg",
  },
]

const restorationDetails = [
  { label: "Year", value: "1966" },
  { label: "Make", value: "Ludwig Club Date" },
  { label: "Finish", value: "Silver Sparkle" },
  { label: "Restoration", value: "3 months" },
]

const skiingPrinciples = [
  { icon: Compass, title: "Plan Ahead", description: "Read the terrain before you commit to a line." },
  { icon: Shield, title: "Be Brave", description: "The mountain can be intimidating. Go anyway." },
  { icon: Target, title: "Stay Balanced", description: "Can't always turn left. Can't always turn right." },
  { icon: Shuffle, title: "Be Flexible", description: "Adapt to trees, terrain, and other skiers." },
]

const instagramVideos = [
  {
    url: "https://www.instagram.com/reel/C5J_i05SgrN/",
    title: "Powder Day",
    category: "skiing",
  },
]

const navItems = [
  { label: "Projects", section: "projects" },
  { label: "Music", section: "music" },
  { label: "Speaking", section: "speaking" },
  { label: "Philosophy", section: "philosophy" },
  { label: "Skiing", section: "skiing" },
  { label: "Credentials", section: "credentials" },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * -10
    const rotateY = (x - 0.5) * 10

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    setGlowPosition({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    setIsHovered(false)
  }

  const cardContent = (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group p-6 sm:p-8 rounded-2xl border-2 border-border bg-white relative overflow-hidden
        cursor-pointer transition-all duration-300 ease-out
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Radial glow following cursor */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${RALLY_BLUE}15 0%, transparent 50%)`,
        }}
      />

      {/* Outer glow */}
      <div
        className="absolute -inset-2 rounded-3xl pointer-events-none transition-opacity duration-500 blur-xl -z-10"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${RALLY_BLUE}30 0%, transparent 60%)`,
        }}
      />

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `0 0 0 2px ${RALLY_BLUE}40, 0 20px 40px -10px ${RALLY_BLUE}20`,
        }}
      />

      <div className="flex items-start gap-4 sm:gap-6 relative z-10">
        <div
          className="project-icon w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative transition-all duration-300"
          style={{ backgroundColor: `${RALLY_BLUE}10` }}
        >
          {project.logoUrl ? (
            <img
              src={project.logoUrl || "/placeholder.svg"}
              alt={`${project.name} logo`}
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
              }}
            />
          ) : (
            <project.Icon
              size={28}
              color={RALLY_BLUE}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          )}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"
            style={{ backgroundColor: RALLY_BLUE }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-[#005EB8]">
              {project.name}
            </h3>
            <span
              className="stat-badge px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 group-hover:scale-105"
              style={{
                backgroundColor: `${RALLY_BLUE}15`,
                color: RALLY_BLUE,
              }}
            >
              {project.stat}
            </span>
          </div>
          <p className="text-lg mb-2 text-foreground/80">{project.tagline}</p>
          <p className="text-sm sm:text-base mb-3 text-muted-foreground">{project.description}</p>
          {project.url && (
            <span
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
              style={{ color: RALLY_BLUE }}
            >
              Visit site
              <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </div>

        <ArrowRight
          size={20}
          className="shrink-0 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
          style={{ color: RALLY_BLUE }}
        />
      </div>
    </div>
  )

  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
      {cardContent}
    </a>
  ) : (
    cardContent
  )
}

function MusicCard({ item, index }: { item: (typeof music)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * -10
    const rotateY = (x - 0.5) * 10

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    setGlowPosition({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    setIsHovered(false)
  }

  const content = (
    <div
      ref={cardRef}
      className="rounded-2xl overflow-hidden group relative transition-all duration-300 cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-2 rounded-3xl pointer-events-none transition-opacity duration-500 blur-xl -z-10"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${RALLY_BLUE}40 0%, transparent 60%)`,
        }}
      />

      {/* Image with overlay */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.imageUrl || "/placeholder.svg?height=200&width=200&query=music band"}
          alt={item.band}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)`,
          }}
        />
        {/* Sheen effect on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
            backgroundSize: "200% 200%",
            animation: isHovered ? "sheen-sweep 1.5s ease-in-out" : "none",
          }}
        />

        {/* Video indicator if has video */}
        {item.videoUrl && (
          <div className="absolute top-3 right-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${RED_STITCH}cc` }}
            >
              <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="font-bold text-white text-lg mb-1 group-hover:text-[#DC2626] transition-colors duration-300">
            {item.band}
          </h4>
          <p className="text-white/70 text-sm flex items-center gap-2">
            {item.role}
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>
      </div>
    </div>
  )

  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  )
}

function FeaturedAlbumCard({ album, index }: { album: (typeof featuredAlbums)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * -8
    const rotateY = (x - 0.5) * 8

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    setGlowPosition({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-2 rounded-3xl pointer-events-none transition-opacity duration-500 blur-xl -z-10"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${RALLY_BLUE}40 0%, ${RED_STITCH}20 50%, transparent 80%)`,
        }}
      />

      {/* Album art background */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={album.imageUrl || "/placeholder.svg?height=300&width=300&query=album cover"}
          alt={album.album}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Color overlay for brand consistency */}
        <div
          className="absolute inset-0 mix-blend-overlay transition-opacity duration-300"
          style={{ backgroundColor: album.color, opacity: 0.7 }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${album.color} 0%, ${album.color}99 30%, transparent 100%)`,
          }}
        />
        {/* Sheen effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
            backgroundSize: "200% 200%",
            animation: isHovered ? "sheen-sweep 1.5s ease-in-out" : "none",
          }}
        />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{album.label || album.band}</p>
          <a href={album.albumUrl} target="_blank" rel="noopener noreferrer" className="group/album inline-block">
            <h3 className="text-xl font-bold text-white mb-1 group-hover/album:text-[#DC2626] transition-colors duration-300">
              {album.album}
            </h3>
          </a>

          <a
            href={album.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-3 group/track"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/track:scale-110"
              style={{ backgroundColor: RALLY_BLUE }}
            >
              <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/90 text-sm font-medium truncate group-hover/track:text-[#DC2626] transition-colors">
                {album.featuredTrack}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

function CredentialChip({ cred, index }: { cred: (typeof credentials)[0]; index: number }) {
  const content = (
    <div
      className={`credential-chip text-center p-4 rounded-xl transition-all duration-300 ${cred.url ? "cursor-pointer hover:scale-105" : "cursor-default"}`}
      style={{
        animationDelay: `${index * 50}ms`,
        backgroundColor: SOFT_GRAY,
      }}
    >
      <p className="font-medium text-sm text-foreground mb-1">{cred.label}</p>
      <p className="text-xs text-muted-foreground">{cred.detail}</p>
      {cred.url && (
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={12} style={{ color: RALLY_BLUE }} />
        </div>
      )}
    </div>
  )

  return cred.url ? (
    <a href={cred.url} target="_blank" rel="noopener noreferrer" className="group block">
      {content}
    </a>
  ) : (
    content
  )
}

function SpeakingSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section id="speaking" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
              Speaking & Presentations
            </MagicHeading>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ideas that connect domains and spark new thinking
          </p>
        </div>

        {/* Harmonized Learning Feature Card */}
        <TiltCard className="mb-12" intensity={5}>
          <div
            className="relative rounded-3xl overflow-hidden border-2 transition-all duration-500"
            style={{
              borderColor: isExpanded ? RALLY_BLUE : `${RALLY_BLUE}30`,
              boxShadow: isExpanded
                ? `0 25px 50px -12px ${RALLY_BLUE}30, 0 0 0 1px ${RALLY_BLUE}20`
                : `0 10px 40px -10px rgba(0,0,0,0.1)`,
            }}
          >
            {/* Header */}
            <div
              className="p-6 sm:p-8 bg-gradient-to-r cursor-pointer group"
              style={{
                background: `linear-gradient(135deg, ${RALLY_BLUE}08 0%, white 50%, ${RED_STITCH}05 100%)`,
              }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon/Visual */}
                <div
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${RALLY_BLUE} 0%, ${RALLY_BLUE}dd 100%)`,
                  }}
                >
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bottom-2 rounded-full bg-white"
                        style={{
                          left: `${15 + i * 15}%`,
                          width: "8%",
                          height: `${20 + Math.sin(i * 0.8) * 30 + 20}%`,
                        }}
                      />
                    ))}
                  </div>
                  <Music2 size={40} className="text-white relative z-10" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Harmonized Learning</h3>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${RALLY_BLUE}15`, color: RALLY_BLUE }}
                    >
                      Mensa Foundation Speaker Series
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground mb-3">
                    The Fusion of Skill Mastery, Music, and Technology
                  </p>
                  <p className="text-foreground/80 leading-relaxed max-w-3xl">
                    A seminal exploration of how human intelligence thrives in the age of AI. Structured as a musical
                    composition with five movements, this presentation examines multi-potentiality, combinatorial
                    creativity, and how cross-domain expertise creates breakthrough solutions.
                  </p>

                  {/* Key concepts preview */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Multi-potentiality", "Instrumentive AI", "Cross-domain Synthesis", "Moravec's Paradox"].map(
                      (concept) => (
                        <span
                          key={concept}
                          className="px-3 py-1 rounded-full text-xs border transition-colors duration-300"
                          style={{
                            borderColor: `${RALLY_BLUE}30`,
                            color: RALLY_BLUE,
                          }}
                        >
                          {concept}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Expand/Collapse */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {isExpanded ? "Collapse" : "Explore Presentation"}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: RALLY_BLUE,
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content with Iframe */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: isExpanded ? "80vh" : "0",
                opacity: isExpanded ? 1 : 0,
              }}
            >
              <div className="p-4 sm:p-6 border-t" style={{ borderColor: `${RALLY_BLUE}20` }}>
                {/* Instruction text */}
                <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: `${RALLY_BLUE}08` }}>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Sparkles size={16} style={{ color: RALLY_BLUE }} />
                    <span>
                      Navigate through the presentation below. Ask the{" "}
                      <strong style={{ color: RALLY_BLUE }}>Docent</strong> (bottom right) questions about any concepts
                      or how they connect to other work on this site.
                    </span>
                  </p>
                </div>

                {/* Gamma Embed */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: `0 20px 60px -15px ${RALLY_BLUE}20, inset 0 0 0 1px ${RALLY_BLUE}10`,
                  }}
                >
                  <iframe
                    src="https://gamma.app/embed/2incbkemd9j0ps2"
                    style={{
                      width: "100%",
                      height: "70vh",
                      minHeight: "500px",
                      border: "none",
                    }}
                    allow="fullscreen"
                    title="Harmonized Learning Presentation"
                  />
                </div>

                {/* Quick reference concepts */}
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Movement 1",
                      desc: "Human advantages in continuous learning and the daily training loop",
                    },
                    {
                      title: "Movement 2",
                      desc: "Global perspectives on intelligence beyond traditional IQ metrics",
                    },
                    {
                      title: "Movement 3",
                      desc: "Bloom-Lahey model and skill acquisition frameworks",
                    },
                    {
                      title: "Movement 4",
                      desc: "Multi-potentiality and combinatorial creativity through jazz",
                    },
                    {
                      title: "Movement 5",
                      desc: "Instrumentive AI amplifying human potential, not replacing it",
                    },
                    {
                      title: "Finale",
                      desc: "Harmonizing human potential in the age of AI",
                    },
                  ].map((movement, i) => (
                    <TiltCard key={movement.title} intensity={8}>
                      <div
                        className="p-4 rounded-xl border transition-all duration-300 hover:shadow-lg bg-white"
                        style={{ borderColor: `${RALLY_BLUE}20` }}
                      >
                        <h4 className="font-semibold text-sm mb-1" style={{ color: RALLY_BLUE }}>
                          {movement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{movement.desc}</p>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* National Academies Talk */}
        <div className="grid lg:grid-cols-2 gap-8">
          <TiltCard intensity={8}>
            <a
              href="https://www.nationalacademies.org/event/40444_03-2024_workshop-on-the-bidirectional-relationship-between-ai-and-neuroscience"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl border bg-white transition-all duration-300 hover:shadow-xl group"
              style={{ borderColor: `${RALLY_BLUE}20` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${RALLY_BLUE}10` }}
                >
                  <Presentation size={28} style={{ color: RALLY_BLUE }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-[#005EB8] transition-colors">
                      National Academies Workshop
                    </h3>
                    <ExternalLink size={16} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Exploring the Bidirectional Relationship Between AI and Neuroscience
                  </p>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${RALLY_BLUE}10`, color: RALLY_BLUE }}
                  >
                    2024 Speaker
                  </span>
                </div>
              </div>
            </a>
          </TiltCard>

          <TiltCard intensity={8}>
            <div
              className="p-6 rounded-2xl border bg-white transition-all duration-300"
              style={{ borderColor: `${RALLY_BLUE}20` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${RED_STITCH}10` }}
                >
                  <BookOpen size={28} style={{ color: RED_STITCH }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Mensa Research Journal</h3>
                  <p className="text-muted-foreground mb-3">
                    Guest Editor for Summer 2025 issue exploring AI and human intelligence
                  </p>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${RED_STITCH}10`, color: RED_STITCH }}
                  >
                    Coming Summer 2025
                  </span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section id="philosophy" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
              Philosophy
            </MagicHeading>
          </h2>
          <p className="text-muted-foreground text-lg">The art of restoration and renewal</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <TiltCard className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800">
              <div
                className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"
                style={{
                  background: `linear-gradient(135deg, ${RALLY_BLUE}30 0%, transparent 50%)`,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"
                style={{
                  background: `linear-gradient(-45deg, ${RED_STITCH}30 0%, transparent 50%)`,
                }}
              />

              <div className="relative overflow-hidden">
                <img
                  src="/images/ludwig-restored.png"
                  alt="1966 Ludwig Club Date drum kit in silver sparkle, restored by Matthew Guggemos"
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 60%)`,
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s ease-in-out infinite",
                  }}
                />

                <div
                  className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                <div className="flex flex-wrap gap-4 mb-3">
                  {restorationDetails.map((detail, i) => (
                    <div
                      key={detail.label}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: i === 3 ? `${RED_STITCH}20` : `${RALLY_BLUE}20`,
                        color: i === 3 ? RED_STITCH : RALLY_BLUE,
                        border: `1px solid ${i === 3 ? RED_STITCH : RALLY_BLUE}40`,
                      }}
                    >
                      {detail.label}: {detail.value}
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm">
                  Found at a secondhand shop in Napa, restored over three months with shell repairs and hardware
                  upgrades.
                </p>
              </div>
            </div>
          </TiltCard>

          <div className="space-y-8">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: RALLY_BLUE }}
              />
              <blockquote className="pl-6 text-xl sm:text-2xl text-foreground/90 italic leading-relaxed">
                "The approach to AI development mirrors conducting an orchestra - understanding how all instruments
                harmonize rather than building each one."
              </blockquote>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Attack", desc: "The initial strike sets everything in motion" },
                { label: "Sustain", desc: "Holding the note requires consistent energy" },
                { label: "Decay", desc: "Knowing when to let go is part of the art" },
                { label: "Release", desc: "The silence between notes defines the music" },
              ].map((item, i) => (
                <TiltCard key={item.label} intensity={8}>
                  <div className="p-4 rounded-xl border border-border bg-white transition-all duration-300">
                    <h4 className="font-semibold mb-1" style={{ color: RALLY_BLUE }}>
                      {item.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Cross-domain expertise creates breakthrough solutions. The machine handles structure, humans bring
              judgment. Repetition builds neural pathways. Whether restoring vintage drums, developing speech
              technology, or mastering physical skills - the principles remain the same.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkiingSection() {
  return (
    <section id="skiing" className="py-20 px-6 bg-white transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Mountain size={32} style={{ color: RALLY_BLUE }} />
            <h2 className="text-3xl sm:text-4xl font-bold">
              <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
                Mountain Mind
              </MagicHeading>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">What skiing teaches about problem solving</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Video Preview */}
          <div className="space-y-6">
            <VideoPreview
              url="https://www.instagram.com/reel/C5J_i05SgrN/"
              title="Powder Day"
              platform="instagram"
              aspectRatio="portrait"
              className="max-w-sm mx-auto lg:mx-0"
            />
            <p className="text-sm text-muted-foreground text-center lg:text-left">
              A lifetime of skiing teaches you to read terrain, commit to your line, and adapt in real-time.
            </p>
          </div>

          {/* Philosophy and Principles */}
          <div className="space-y-8">
            <div className="prose prose-lg">
              <p className="text-foreground/90 leading-relaxed">
                Skiing is something you can eternally enjoy and iterate on. You have to plan ahead. You have to be brave
                because the mountain can be intimidating. You have to be balanced. You can't always turn to the left.
                You can't always turn to the right. You can't always just go in the middle.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                You have to be flexible and you have to be smart. You have to always consider your relationship to the
                mountain, other skiers, trees, objects on your path. There's so many things about skiing that influence
                how I see the world.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {skiingPrinciples.map((principle, i) => (
                <TiltCard key={principle.title} intensity={8}>
                  <div className="p-4 rounded-xl border border-border bg-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${RALLY_BLUE}10` }}
                      >
                        <principle.icon size={20} style={{ color: RALLY_BLUE }} />
                      </div>
                      <h4 className="font-semibold text-foreground">{principle.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [highlightedProject, setHighlightedProject] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("")
  const [drumBeatActive, setDrumBeatActive] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      element.classList.add("section-highlight")
      setTimeout(() => element.classList.remove("section-highlight"), 2000)
      setActiveSection(sectionId)
    }
  }

  const handleDrumClick = () => {
    setDrumBeatActive(true)
    setTimeout(() => setDrumBeatActive(false), 800)
  }

  return (
    <div className="min-h-screen bg-background pearl-surface">
      <SheenEffect />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault()
              handleDrumClick()
              handleNavigate("")
            }}
          >
            <div
              className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 group-hover:scale-110 card-sheen ${drumBeatActive ? "drum-beat-active" : ""}`}
              style={{ backgroundColor: RALLY_BLUE }}
            >
              MG
              {/* Sheen sweep effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                    transform: "translateX(-100%)",
                    animation: "sheenSweep 0.8s ease forwards",
                  }}
                />
              </div>
            </div>
            <span className="font-semibold text-foreground hidden sm:block">Matthew Guggemos</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.section)}
                className="nav-hover text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2 magnetic-zone"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-border card-sheen"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavigate(item.section)
                    setMobileMenuOpen(false)
                  }}
                  className="text-left px-4 py-3 rounded-xl text-foreground/70 hover:bg-gray-50 hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero - Redesigned for symmetry and visual polish */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      >
        {/* Animated gradient background with pearlescent effect */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, ${RALLY_BLUE}15 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 70% 100%, ${RED_STITCH}08 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 20% 80%, ${RALLY_BLUE}05 0%, transparent 40%)
            `,
          }}
        />

        {/* Floating ambient orbs */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float opacity-20"
            style={{ backgroundColor: `${RALLY_BLUE}30` }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-float opacity-15"
            style={{ backgroundColor: `${RED_STITCH}20`, animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full blur-3xl animate-float opacity-10"
            style={{ backgroundColor: `${RALLY_BLUE}25`, animationDelay: "4s" }}
          />
        </div>

        {/* Centered symmetric content */}
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Brand tagline pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 card-sheen"
            style={{ borderColor: `${RALLY_BLUE}30`, backgroundColor: "rgba(255,255,255,0.8)" }}
          >
            <span className="text-sm font-medium" style={{ color: RALLY_BLUE }}>
              Communication Scientist / AI Innovator / Musician
            </span>
          </div>

          {/* Name with metallic sheen effect - Stacked vertically for symmetry */}
          <div className="mb-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground">
              <span className="block">
                <MagicHeading as="span">Matthew</MagicHeading>
              </span>
              <span className="block mt-2">
                <MagicHeading as="span">Guggemos</MagicHeading>
              </span>
            </h1>
          </div>

          {/* Tagline with subtle animation */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            <span className="font-semibold text-foreground">Intelligence Conductor.</span> Orchestrating AI, speech
            science, and rhythm into breakthrough solutions.
          </p>

          {/* Stats row with sheen cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { value: "20+", label: "Years Clinical" },
              { value: "30+", label: "Years Drumming" },
              { value: "5", label: "AI Products" },
            ].map((stat, i) => (
              <div
                key={i}
                className="px-6 py-3 rounded-2xl border bg-white/80 backdrop-blur-sm card-sheen magnetic-zone"
                style={{ borderColor: `${RALLY_BLUE}20` }}
              >
                <span className="text-2xl font-bold" style={{ color: RALLY_BLUE }}>
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground ml-2">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Added more spacing from scroll indicator */}
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            <Button
              size="lg"
              className="hero-btn-primary rounded-full px-8 gap-2 text-base"
              style={{ backgroundColor: RALLY_BLUE }}
              onClick={() => handleNavigate("projects")}
            >
              Explore My Work <ArrowRight size={18} className="arrow-animate" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hero-btn-secondary rounded-full px-8 gap-2 text-base bg-transparent"
              onClick={() => handleNavigate("philosophy")}
            >
              The Conductor Approach
            </Button>
          </div>

          {/* Drum brand image - Centered below CTAs as a visual anchor */}
          <div
            className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 cursor-pointer group"
            onClick={() => handleNavigate("music")}
            data-secret="Click me 3x for a surprise!"
          >
            {/* Pulsing rings */}
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: RALLY_BLUE, animationDuration: "3s" }}
            />
            <div
              className="absolute -inset-2 rounded-full animate-pulse opacity-30"
              style={{ border: `2px solid ${RALLY_BLUE}`, animationDuration: "2s" }}
            />

            {/* Main image with sheen */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500 card-sheen">
              <img
                src="/images/hero-drum.png"
                alt="Seeing the world through the lens of drums"
                className="w-full h-full object-cover"
              />
              {/* Overlay sheen on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
                }}
              />
            </div>

            {/* Caption */}
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap italic opacity-0 group-hover:opacity-100 transition-opacity">
              Through the lens of drums
            </p>
          </div>
        </div>

        {/* Scroll indicator - Positioned with more space */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle scroll-indicator">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <ChevronDown size={20} className="text-muted-foreground" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
                My Projects
              </MagicHeading>
            </h2>
            <p className="text-muted-foreground text-lg">Each product has its own dedicated site. Click to explore.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section
        id="music"
        className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-500"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold" baseColor="light">
                Music
              </MagicHeading>
            </h2>
          </div>

          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6 text-white/80">Featured Performance</h3>
            <div className="max-w-3xl mx-auto">
              <VideoPreview
                url="https://youtu.be/EkljPwVq7FA?si=_gSPTvt_7KpCbjqn"
                title="Invincible Star Jazz"
                platform="youtube"
                aspectRatio="landscape"
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-6 text-white/80">Bands & Collaborations</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {music.map((item, index) => (
              <MusicCard key={item.band} item={item} index={index} />
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-6 text-white/80">Featured Albums</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredAlbums.map((album, index) => (
              <FeaturedAlbumCard key={album.album} album={album} index={index} />
            ))}
          </div>
        </div>
      </section>

      <SpeakingSection />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Skiing Section */}
      <SkiingSection />

      {/* Credentials Section */}
      <section id="credentials" className="py-20 px-6 bg-gray-50 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
                Credentials
              </MagicHeading>
            </h2>
            <p className="text-muted-foreground text-lg">Recognition and contributions</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((cred, index) => (
              <CredentialChip key={cred.label} cred={cred} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0a0a0a] text-white">
        <div className="h-1 w-full mb-8" style={{ backgroundColor: RED_STITCH }} />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: RALLY_BLUE }}
            >
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-semibold">Matthew Guggemos</span>
          </div>

          <div className="flex gap-6 text-sm text-white/60">
            <a
              href="https://www.itherapyllc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link hover:text-white transition-colors"
            >
              iTherapy LLC
            </a>
            <a
              href="https://www.linkedin.com/in/matthewguggemos/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>

          <p className="text-sm text-white/40">CCC-ASHA / M.S. Speech Pathology</p>
        </div>
      </footer>

      {/* AI Docent */}
      <AIDocent onNavigate={handleNavigate} onHighlightProject={setHighlightedProject} />
    </div>
  )
}
