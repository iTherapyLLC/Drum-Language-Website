"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  ExternalLink,
  Zap,
  MessageCircle,
  Users,
  BookOpen,
  Building2,
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
  Play,
  Video,
  Music,
} from "lucide-react"
import { MagicHeading } from "@/components/magic-text"
import { AIDocent } from "@/components/ai-docent"
import { VideoPreview } from "@/components/video-preview"
import { TiltCard } from "@/components/tilt-card"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import SpiralKaleidoscope from "@/components/spiral-kaleidoscope"
import Image from "next/image"
import { SwirledCard } from "@/components/swirled-card"

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
    url: "https://www.nationalacademies.org/event/41467_10-2024_bidirectional-relationship-between-ai-and-neuroscience-a-workshop",
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
    hasVideo: true,
    videoCount: 12,
  },
  {
    band: "Freighter",
    role: "Albums and tours",
    url: "https://freighter.bandcamp.com/",
    imageUrl: "/images/freighter-band.jpg",
    hasVideo: false,
  },
  {
    band: "miRthkon",
    role: "Albums and tours",
    url: "https://mirthkon.bandcamp.com/",
    imageUrl: "/images/mirthkon-band.jpg",
    hasVideo: true,
    videoCount: 8,
  },
  {
    band: "Larry Vuckovich",
    role: "Performance",
    url: "https://larryvuckovich.com/audio.htm",
    imageUrl: "/images/larry-vuckovich-anime.jpg",
    hasVideo: false,
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
    imageUrl: "/images/mirthkon-format.png",
  },
  {
    band: "Snack(s)",
    album: "Snack(s)",
    albumUrl: "https://altrockproductions.bandcamp.com/album/snack-s",
    featuredTrack: "Osedax",
    trackUrl: "https://altrockproductions.bandcamp.com/track/osedax",
    label: "AltrOckProductions",
    color: "#f5e6e8",
    imageUrl: "/images/mirthkon-snacks.png",
  },
]

const featuredVideos = [
  {
    title: "Psychic Reading '94",
    band: "Freighter",
    url: "https://youtu.be/-DapdI7BA-w?si=JlTyNzt2YNCy3H_E",
    platform: "youtube" as const,
    aspectRatio: "landscape" as const,
  },
  {
    title: "Bappsciliophuæga",
    band: "miRthkon",
    url: "https://youtu.be/Vq8hdNcL-zY?si=_cLR2XvJK_G4JtoQ",
    platform: "youtube" as const,
    aspectRatio: "landscape" as const,
  },
  {
    title: "",
    band: "",
    url: "https://www.instagram.com/reel/DIFFIVkzg60/?igsh=NTc4MTIwNjQ2YQ==",
    platform: "instagram" as const,
    aspectRatio: "portrait" as const,
  },
  {
    title: "",
    band: "",
    url: "https://www.instagram.com/reel/DIKcl9tyJTv/?igsh=NTc4MTIwNjQ2YQ==",
    platform: "instagram" as const,
    aspectRatio: "portrait" as const,
  },
  {
    title: "",
    band: "",
    url: "https://www.tiktok.com/t/ZP8UpBKFR/",
    platform: "tiktok" as const,
    aspectRatio: "portrait" as const,
  },
]

const restorationDetails = [
  { label: "Year", value: "1966" },
  { label: "Make", value: "Ludwig Club Date" },
  { label: "Finish", value: "Silver Sparkle" },
  { label: "Restoration", value: "3 months" },
]

const skiingPrinciples = [
  { icon: Compass, description: "Read the terrain before you commit to a line.", title: "Plan Ahead" },
  { icon: Shield, description: "The mountain can be intimidating. Go anyway.", title: "Be Brave" },
  { icon: Target, description: "Can't always turn left. Can't always turn right.", title: "Stay Balanced" },
  { icon: Shuffle, description: "Adapt to trees, terrain, and other skiers.", title: "Be Flexible" },
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
  isHighlighted = false,
}: {
  project: (typeof projects)[0]
  index: number
  isHighlighted?: boolean
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
    <SwirledCard className={`${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          p-6 sm:p-8 rounded-2xl relative overflow-hidden
          cursor-pointer transition-all duration-300 ease-out
          ${isHighlighted ? "ring-4 ring-primary shadow-xl" : ""}
        `}
        style={{
          transitionDelay: `${index * 100}ms`,
          transformStyle: "preserve-3d",
          height: "280px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Radial glow following cursor */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${RALLY_BLUE}15, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 60%)`,
            backgroundSize: "200% 100%",
            animation: isHovered ? "sheen 1.5s ease-in-out" : "none",
          }}
        />

        {/* Header section - fixed height */}
        <div className="h-[72px] flex flex-col justify-start">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
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
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-[#005EB8] truncate">
                  {project.name}
                </h3>
                <span
                  className="stat-badge px-2 py-1 text-xs rounded-full font-medium transition-all duration-300 group-hover:scale-105 shrink-0"
                  style={{
                    backgroundColor: `${RALLY_BLUE}15`,
                    color: RALLY_BLUE,
                  }}
                >
                  {project.stat}
                </span>
                <ArrowRight
                  size={20}
                  className="shrink-0 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 ml-auto"
                  style={{ color: RALLY_BLUE }}
                />
              </div>
              <p className="text-lg text-foreground/80 truncate">{project.tagline}</p>
            </div>
          </div>
        </div>

        {/* Description section - fixed height */}
        <div className="flex-1 mt-4 h-[72px] overflow-hidden">
          <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">{project.description}</p>
        </div>

        {/* Footer section - pushed to bottom */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <span
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
            style={{ color: RALLY_BLUE }}
          >
            Visit site
            <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </SwirledCard>
  )

  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
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
      className="rounded-2xl overflow-hidden group relative transition-all duration-300 cursor-pointer border-0 outline-none"
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "none",
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
      <div className="relative aspect-[4/3] overflow-hidden bg-black border-0 rounded-2xl">
        <Image
          src={item.imageUrl || "/placeholder.svg?height=200&width=200&query=music band"}
          alt={item.band}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 30%, transparent 100%)`,
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
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block border-0 outline-none">
      {content}
    </a>
  ) : (
    content
  )
}

function FeaturedAlbumCard({ album, index }: { album: (typeof featuredAlbums)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
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
    <RevealOnScroll direction="up" delay={index * 100}>
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ease-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow effect */}
        <div
          className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
          style={{
            background: `linear-gradient(135deg, ${album.color}80, ${RALLY_BLUE}40)`,
          }}
        />

        {/* Album art background */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={album.imageUrl || "/placeholder.svg?height=300&width=300&query=album cover"}
            alt={album.album}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Color overlay */}
          <div
            className="absolute inset-0 mix-blend-multiply transition-opacity duration-300"
            style={{ backgroundColor: album.color, opacity: isHovered ? 0.3 : 0.5 }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${album.color} 0%, ${album.color}80 30%, transparent 100%)`,
            }}
          />

          {/* Sheen effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)`,
              transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
              transition: "transform 0.8s ease-out",
            }}
          />
        </div>

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
            className="inline-flex items-center gap-2 mt-2 group/track"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/track:scale-110"
              style={{ backgroundColor: RALLY_BLUE }}
            >
              <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
            </div>
            <span className="text-white/80 text-sm group-hover/track:text-white transition-colors">
              {album.featuredTrack}
            </span>
          </a>
        </div>

        {/* "Listen on Bandcamp" hint */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          Listen on Bandcamp
        </div>
      </div>
    </RevealOnScroll>
  )
}

function CredentialChip({ cred, index }: { cred: (typeof credentials)[0]; index: number }) {
  const content = (
    <div
      className={`credential-chip text-center p-4 rounded-xl transition-all duration-300 ${cred.url ? "hover:scale-105" : "cursor-default"}`}
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
    <section id="speaking" className="py-20 bg-background relative overflow-hidden z-10">
      <SpiralKaleidoscope opacity={0.06} className="z-0" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-foreground">Speaking & Writing</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevealOnScroll direction="up" delay={0}>
            <a
              href="https://www.nationalacademies.org/event/41467_10-2024_bidirectional-relationship-between-ai-and-neuroscience-a-workshop"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full group perspective-container"
            >
              <div
                className="p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 h-[280px] flex flex-col tilt-card glow-border"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#005EB8]/5 to-transparent animate-shimmer" />
                </div>

                {/* Header section */}
                <div className="relative z-10 h-[72px] flex flex-col justify-start">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:bg-white/20 icon-morph"
                      style={{ backgroundColor: `${RALLY_BLUE}10` }}
                    >
                      <Presentation
                        size={28}
                        style={{ color: RALLY_BLUE }}
                        className="transition-all duration-500 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-white transition-all duration-300 truncate text-reveal">
                          National Academies Workshop
                        </h3>
                        <span
                          className="px-2 py-1 text-xs rounded-full font-medium shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white animate-pulse-glow"
                          style={{ backgroundColor: `${RALLY_BLUE}15`, color: RALLY_BLUE }}
                        >
                          Invited Speaker
                        </span>
                        <ArrowRight
                          size={20}
                          className="shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-white transition-all duration-500 ml-auto"
                          style={{ color: RALLY_BLUE }}
                        />
                      </div>
                      <p className="text-lg text-foreground/80 truncate group-hover:text-white/90 transition-colors duration-300">
                        AI and Neuroscience
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description section */}
                <div className="relative z-10 flex-1 mt-4 h-[72px] overflow-hidden">
                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                    Bidirectional Relationship Between AI and Neuroscience. October 2024 workshop exploring how advances
                    in AI and neuroscience inform each other.
                  </p>
                </div>

                {/* Footer section */}
                <div className="relative z-10 mt-auto pt-4 border-t border-border/50 group-hover:border-white/30 transition-colors duration-300">
                  <span
                    className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-4 group-hover:text-white transition-all duration-300 underline-slide"
                    style={{ color: RALLY_BLUE }}
                  >
                    View workshop
                    <ExternalLink
                      size={14}
                      className="transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125"
                    />
                  </span>
                </div>

                {/* Sheen sweep effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </a>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <div className="block h-full group perspective-container">
              <div
                className="p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 h-[280px] flex flex-col tilt-card glow-border"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#DC2626]/5 to-transparent animate-shimmer" />
                </div>

                {/* Header section */}
                <div className="relative z-10 h-[72px] flex flex-col justify-start">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:bg-white/20 icon-morph"
                      style={{ backgroundColor: `${RED_STITCH}10` }}
                    >
                      <BookOpen
                        size={28}
                        style={{ color: RED_STITCH }}
                        className="transition-all duration-500 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-white transition-all duration-300 truncate text-reveal">
                          Mensa Research Journal
                        </h3>
                        <span
                          className="px-2 py-1 text-xs rounded-full font-medium shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white animate-pulse-glow"
                          style={{ backgroundColor: `${RED_STITCH}15`, color: RED_STITCH }}
                        >
                          Guest Editor
                        </span>
                        <ArrowRight
                          size={20}
                          className="shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-white transition-all duration-500 ml-auto"
                          style={{ color: RED_STITCH }}
                        />
                      </div>
                      <p className="text-lg text-foreground/80 truncate group-hover:text-white/90 transition-colors duration-300">
                        Summer 2025 Edition
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description section */}
                <div className="relative z-10 flex-1 mt-4 h-[72px] overflow-hidden">
                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                    Guest Editor for Summer 2025 edition. Curating research at the intersection of intelligence,
                    technology, and human potential.
                  </p>
                </div>

                {/* Footer section */}
                <div className="relative z-10 mt-auto pt-4 border-t border-border/50 group-hover:border-white/30 transition-colors duration-300">
                  
                </div>

                {/* Sheen sweep effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden transition-all duration-500"
    >
      <SpiralKaleidoscope opacity={0.05} className="z-0" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
              Philosophy
            </MagicHeading>
          </h2>
          <p className="text-muted-foreground text-lg">The art of restoration and renewal</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
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
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 text-white"
                      style={{
                        backgroundColor: i === 3 ? `${RED_STITCH}40` : "rgba(255,255,255,0.15)",
                        border: `1px solid ${i === 3 ? RED_STITCH : "rgba(255,255,255,0.3)"}`,
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
              ].map((item) => (
                <TiltCard key={item.label} intensity={8}>
                  <div className="p-4 rounded-xl border border-border bg-white transition-all duration-300">
                    <h4 className="font-semibold mb-1 text-foreground">{item.label}</h4>
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
    <section id="skiing" className="py-20 px-6 bg-white relative overflow-hidden transition-all duration-500">
      <SpiralKaleidoscope opacity={0.05} className="z-0" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Mountain size={32} style={{ color: RALLY_BLUE }} />
            <h2 className="text-3xl sm:text-4xl font-bold">
              <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
                Mountain Mind
              </MagicHeading>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">What skiing teaches about problem solving</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start text-left">
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
              {skiingPrinciples.map((principle) => (
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
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 group relative overflow-hidden rounded-full pr-2 sm:pr-3"
            onClick={(e) => {
              e.preventDefault()
              handleDrumClick()
              handleNavigate("")
            }}
          >
            <div
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg overflow-hidden border-2 group-hover:border-white transition-colors"
              style={{ backgroundColor: RALLY_BLUE, borderColor: RALLY_BLUE }}
            >
              <img
                src="/images/drum-reflection-logo.png"
                alt="Matthew Guggemos"
                className="w-full h-full object-cover"
              />
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
            <span className="font-semibold text-foreground hidden xs:block text-sm sm:text-base">Matthew Guggemos</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
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
            aria-label="Toggle menu"
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

      {/* Hero - Redesigned with mandala spiral as core visual identity */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-8"
      >
        <SpiralKaleidoscope opacity={0.12} className="z-0" />

        {/* Simple gradient to soften edges to white */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, transparent 30%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.8) 100%)
            `,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Brand tagline pill - smaller text on mobile */}
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border mb-6 sm:mb-8"
            style={{ borderColor: `${RALLY_BLUE}30`, backgroundColor: "rgba(255,255,255,0.95)" }}
          >
            <span className="text-xs sm:text-sm font-medium text-center" style={{ color: RALLY_BLUE }}>
              Communication Scientist / AI Innovator / Musician
            </span>
          </div>

          <div className="relative mb-6 sm:mb-8">
            {/* Outer blue ring */}
            <div
              className="absolute -inset-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${RALLY_BLUE}40 0%, ${RALLY_BLUE}20 50%, ${RALLY_BLUE}40 100%)`,
                boxShadow: `0 0 30px ${RALLY_BLUE}20`,
              }}
            />
            {/* White inner border */}
            <div className="absolute -inset-1 rounded-full bg-white" />
            {/* Profile photo - Smaller on mobile */}
            <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden">
              <img src="/images/mensa-headshot.jpeg" alt="Matthew Guggemos" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-foreground"
              style={{ textShadow: "0 2px 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7)" }}
            >
              <span className="block">
                <MagicHeading as="span">Matthew</MagicHeading>
              </span>
              <span className="block mt-1 sm:mt-2">
                <MagicHeading as="span">Guggemos</MagicHeading>
              </span>
            </h1>
          </div>

          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
            style={{ textShadow: "0 1px 10px rgba(255,255,255,0.8)" }}
          >
            <span className="font-semibold text-foreground">Intelligence Conductor.</span> Orchestrating AI, speech
            science, and rhythm into breakthrough solutions.
          </p>

          {/* Stats row - Better mobile layout with smaller gaps */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-8 mb-8 sm:mb-10 px-2">
            {[
              { value: "20+", label: "Years Clinical" },
              { value: "30+", label: "Years Drumming" },
              { value: "5", label: "AI Products" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm transition-transform duration-300 hover:scale-105"
              >
                <span className="text-xl sm:text-2xl font-bold" style={{ color: RALLY_BLUE }}>
                  {stat.value}
                </span>
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Stack vertically on mobile, smaller padding */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-4 w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl group magnetic-btn ripple-container animate-pulse-glow text-sm sm:text-base"
              style={{ backgroundColor: RALLY_BLUE }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget
                btn.style.transform = "scale(1.05) translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget
                btn.style.transform = "scale(1) translateY(0)"
              }}
            >
              Explore My Work
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-125" />
            </a>
            <a
              href="#philosophy"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/90 backdrop-blur-sm border-2 font-semibold transition-all duration-500 hover:bg-white hover:shadow-2xl hover:scale-105 scale-shadow text-sm sm:text-base"
              style={{ borderColor: RALLY_BLUE, color: RALLY_BLUE }}
            >
              The Conductor Approach
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <SpiralKaleidoscope opacity={0.08} className="z-0" />

        {/* Gradient fade from white at top */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 20%, transparent 40%, transparent 60%, rgba(255,255,255,0.5) 80%, rgba(255,255,255,0.9) 100%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4"
              style={{ textShadow: "0 2px 15px rgba(255,255,255,0.9)" }}
            >
              My Projects
            </h2>
            <p
              className="text-lg sm:text-xl text-muted-foreground italic px-4"
              style={{ textShadow: "0 1px 10px rgba(255,255,255,0.8)" }}
            >
              Each product has its own dedicated site. Click to explore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <RevealOnScroll key={project.id} direction="up" delay={index * 100}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group perspective-container"
                >
                  <div
                    className="p-5 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 h-[260px] sm:h-[280px] flex flex-col tilt-card glow-border"
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#005EB8]/5 to-transparent animate-shimmer" />
                    </div>

                    {/* Header section */}
                    <div className="relative z-10 h-[72px] flex flex-col justify-start">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:bg-white/20 icon-morph"
                          style={{ backgroundColor: `${RALLY_BLUE}10` }}
                        >
                          {project.logoUrl ? (
                            <img
                              src={project.logoUrl || "/placeholder.svg"}
                              alt={`${project.name} logo`}
                              className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                              style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
                            />
                          ) : (
                            <project.Icon
                              size={24}
                              color={RALLY_BLUE}
                              className="transition-transform duration-500 group-hover:scale-125 sm:w-7 sm:h-7"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-white transition-all duration-300 truncate text-reveal">
                              {project.name}
                            </h3>
                            <span
                              className="px-2 py-0.5 sm:py-1 text-xs rounded-full font-medium shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white animate-pulse-glow"
                              style={{ backgroundColor: `${RALLY_BLUE}15`, color: RALLY_BLUE }}
                            >
                              {project.stat}
                            </span>
                            <ArrowRight
                              size={18}
                              className="shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-white transition-all duration-500 ml-auto hidden sm:block"
                              style={{ color: RALLY_BLUE }}
                            />
                          </div>
                          <p className="text-sm sm:text-lg text-foreground/80 truncate group-hover:text-white/90 transition-colors duration-300">
                            {project.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description section */}
                    <div className="relative z-10 flex-1 mt-3 sm:mt-4 h-[72px] overflow-hidden">
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer section */}
                    <div className="relative z-10 mt-auto pt-3 sm:pt-4 border-t border-border/50 group-hover:border-white/30 transition-colors duration-300">
                      <span
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium group-hover:gap-4 group-hover:text-white transition-all duration-300 underline-slide"
                        style={{ color: RALLY_BLUE }}
                      >
                        Visit site
                        <ExternalLink
                          size={12}
                          className="transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125 sm:w-3.5 sm:h-3.5"
                        />
                      </span>
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section - Better mobile padding and spacing */}
      <section id="music" className="py-16 sm:py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
        <SpiralKaleidoscope opacity={0.08} variant="dark" className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <RevealOnScroll direction="up">
            <div className="mb-10 sm:mb-16">
              <MagicHeading as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" baseColor="light">
                Music
              </MagicHeading>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={100}>
            <div className="mb-10 sm:mb-16">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-6 flex items-center gap-2">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626]" />
                Featured Performances
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {featuredVideos
                  .filter((v) => v.platform === "youtube")
                  .map((video, index) => (
                    <RevealOnScroll key={video.url} direction="up" delay={index * 100}>
                      <div className="relative">
                        <VideoPreview
                          url={video.url}
                          title={video.title}
                          platform={video.platform}
                          aspectRatio={video.aspectRatio}
                        />
                        {video.band && (
                          <p className="mt-2 text-xs sm:text-sm text-white/60 text-center">{video.band}</p>
                        )}
                      </div>
                    </RevealOnScroll>
                  ))}
              </div>

              {/* CHANGE: Using flex with flex-wrap to properly center the last item when alone */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                {featuredVideos
                  .filter((v) => v.platform !== "youtube")
                  .map((video, index) => (
                    <RevealOnScroll key={video.url} direction="up" delay={index * 100}>
                      <div className="w-[calc(50%-6px)] sm:w-[calc(33.333%-16px)]">
                        <VideoPreview
                          url={video.url}
                          title={video.title}
                          platform={video.platform}
                          aspectRatio={video.aspectRatio}
                        />
                      </div>
                    </RevealOnScroll>
                  ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Bands Grid - 2 columns on mobile */}
          <div className="mb-10 sm:mb-16">
            <RevealOnScroll direction="up">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-6 flex items-center gap-2">
                <Music className="w-4 h-4 sm:w-5 sm:h-5 text-[#005EB8]" />
                Bands & Collaborations
              </h3>
            </RevealOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {music.map((item, index) => (
                <MusicCard key={item.band} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Albums Grid - 2 columns on mobile */}
          <div>
            <RevealOnScroll direction="up">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-6 flex items-center gap-2">
                <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626]" />
                Featured Albums
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs">
                  {featuredAlbums.length} releases
                </span>
              </h3>
            </RevealOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {featuredAlbums.map((album, index) => (
                <FeaturedAlbumCard key={album.album} album={album} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SpeakingSection />

      <PhilosophySection />

      <SkiingSection />

      {/* Credentials Section */}
      <section id="credentials" className="py-20 px-6 bg-gray-50 relative overflow-hidden transition-all duration-500">
        <SpiralKaleidoscope opacity={0.04} className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto">
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
      <footer className="py-12 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <SpiralKaleidoscope opacity={0.06} variant="dark" className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
      <AIDocent />
    </div>
  )
}
