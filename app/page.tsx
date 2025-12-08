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
  Brain,
  Award,
  DollarSign,
  Star,
  MessageSquare,
  Sparkles,
  Lightbulb,
} from "lucide-react"
import { MagicHeading } from "@/components/magic-text"
import { AIDocent } from "@/components/ai-docent"
import { VideoPreview } from "@/components/video-preview"
import { TiltCard } from "@/components/tilt-card"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import SpiralKaleidoscope from "@/components/spiral-kaleidoscope"
import Image from "next/image"
import { SwirledCard } from "@/components/swirled-card"
import { ContactForm } from "@/components/contact-form"
import { AnimatedProfile } from "@/components/animated-profile"
import { HarmonizedLearningSection } from "@/components/harmonized-learning-section"
import { useTouchHover } from "@/hooks/use-touch-hover"

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
    title: "Mahavishnu-ish Swing",
    band: "Inspired by Mahavishnu Orchestra, Coltrane Quartet, Elvin Jones, Jack DeJohnette",
    url: "https://drive.google.com/file/d/1vUar0ekOgc_sHHRnnIym3woAIt9tKTrm/view?usp=sharing",
    platform: "googledrive" as const,
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
  {
    icon: Compass,
    description: "Read terrain before committing to a line.",
    title: "Plan Ahead",
  },
  {
    icon: Shield,
    description: "Acknowledge fear, then commit anyway.",
    title: "Be Brave",
  },
  {
    icon: Target,
    description: "Calibrate constantly between competing risks.",
    title: "Stay Balanced",
  },
  {
    icon: Shuffle,
    description: "New information demands immediate course correction.",
    title: "Adapt Quickly",
  },
  {
    icon: Zap,
    description: "Hesitation creates more danger than a committed wrong choice.",
    title: "Commit Fully",
  },
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
  { label: "BJJ", section: "bjj" },
  { label: "Credentials", section: "credentials" },
  { label: "Contact", section: "contact" },
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
  const { isActive: isHovered, setIsActive: setIsHovered } = useTouchHover(2000)

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return
    setIsHovered(true)
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width
    const y = (touch.clientY - rect.top) / rect.height
    setGlowPosition({ x: x * 100, y: y * 100 })
    // Apply a subtle tilt on touch
    cardRef.current.style.transform = `perspective(1000px) rotateX(-3deg) rotateY(3deg) scale(1.02)`
  }

  const handleTouchEnd = () => {
    if (!cardRef.current) return
    // Reset after a delay so user sees the animation
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
      }
      setIsHovered(false)
    }, 300)
  }

  const cardContent = (
    <SwirledCard className={`${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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

        {/* Footer section */}
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
  const { isActive: isHovered, setIsActive: setIsHovered } = useTouchHover(2000)
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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return
    setIsHovered(true)
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width
    const y = (touch.clientY - rect.top) / rect.height
    setGlowPosition({ x: x * 100, y: y * 100 })
    cardRef.current.style.transform = `perspective(1000px) rotateX(-3deg) rotateY(3deg) scale(1.02)`
  }

  const handleTouchEnd = () => {
    if (!cardRef.current) return
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
      }
      setIsHovered(false)
    }, 300)
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
  const { isActive: isHovered, setIsActive: setIsHovered } = useTouchHover(2000)
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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return
    setIsHovered(true)
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width
    const y = (touch.clientY - rect.top) / rect.height
    setGlowPosition({ x: x * 100, y: y * 100 })
    cardRef.current.style.transform = `perspective(1000px) rotateX(-2deg) rotateY(2deg) scale(1.02)`
  }

  const handleTouchEnd = () => {
    if (!cardRef.current) return
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
      }
      setIsHovered(false)
    }, 300)
  }

  return (
    <RevealOnScroll direction="up" delay={index * 100}>
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ease-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const chipRef = useRef<HTMLDivElement>(null)

  // Icons for each credential type
  const getIcon = () => {
    if (cred.label.includes("National Academies")) return <Presentation size={20} />
    if (cred.label.includes("Colloquium")) return <Users size={20} />
    if (cred.label.includes("Journal")) return <BookOpen size={20} />
    if (cred.label.includes("Society")) return <Brain size={20} />
    if (cred.label.includes("Foundation")) return <Award size={20} />
    if (cred.label.includes("Grant")) return <DollarSign size={20} />
    return <Star size={20} />
  }

  // Magnetic tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chipRef.current) return
    const rect = chipRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 10
    const y = (e.clientY - rect.top - rect.height / 2) / 10
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const content = (
    <div
      ref={chipRef}
      className="credential-chip relative text-center p-6 rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden group/chip"
      style={{
        animationDelay: `${index * 50}ms`,
        background: isHovered ? `linear-gradient(135deg, ${RALLY_BLUE}15, ${RED_STITCH}10)` : "white",
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.05)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        boxShadow: isHovered
          ? `0 20px 40px rgba(0,94,184,0.2), 0 0 0 2px ${RALLY_BLUE}40, inset 0 0 30px rgba(0,94,184,0.05)`
          : "0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${RALLY_BLUE}, ${RED_STITCH}, ${RALLY_BLUE})`,
          backgroundSize: "200% 100%",
          animation: isHovered ? "shimmer 2s linear infinite" : "none",
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Floating particles effect */}
      {isHovered && (
        <>
          <div
            className="absolute top-2 left-4 w-1 h-1 rounded-full animate-ping"
            style={{ backgroundColor: RALLY_BLUE, animationDuration: "1s" }}
          />
          <div
            className="absolute bottom-4 right-6 w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: RED_STITCH, animationDuration: "1.5s", animationDelay: "0.3s" }}
          />
          <div
            className="absolute top-1/2 right-3 w-1 h-1 rounded-full animate-ping"
            style={{ backgroundColor: RALLY_BLUE, animationDuration: "1.2s", animationDelay: "0.6s" }}
          />
        </>
      )}

      {/* Icon that reveals on hover */}
      <div
        className="mx-auto mb-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: isHovered ? RALLY_BLUE : `${RALLY_BLUE}10`,
          color: isHovered ? "white" : RALLY_BLUE,
          transform: isHovered ? "translateY(0) scale(1)" : "translateY(-5px) scale(0.9)",
          opacity: isHovered ? 1 : 0.7,
        }}
      >
        {getIcon()}
      </div>

      {/* Label with underline animation */}
      <div className="relative inline-block mb-2">
        <p
          className="font-semibold text-base transition-all duration-300"
          style={{
            color: isHovered ? RALLY_BLUE : "inherit",
          }}
        >
          {cred.label}
        </p>
        <div
          className="absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-500"
          style={{
            backgroundColor: RALLY_BLUE,
            width: isHovered ? "100%" : "0%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Detail text */}
      <p
        className="text-sm transition-all duration-300"
        style={{
          color: isHovered ? "#555" : "#888",
        }}
      >
        {cred.detail}
      </p>

      {/* External link indicator that slides up */}
      {cred.url && (
        <div
          className="mt-3 flex items-center justify-center gap-1 text-xs font-medium transition-all duration-500"
          style={{
            color: RALLY_BLUE,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <span>Learn more</span>
          <ExternalLink size={12} />
        </div>
      )}

      {/* Corner accent */}
      <div
        className="absolute -top-1 -right-1 w-8 h-8 transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${isHovered ? RALLY_BLUE : "transparent"} 50%)`,
          opacity: isHovered ? 1 : 0,
          borderRadius: "0 16px 0 0",
        }}
      />
    </div>
  )

  return cred.url ? (
    <a href={cred.url} target="_blank" rel="noopener noreferrer" className="block">
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
        <RevealOnScroll variant="flip-up" duration={800}>
          <MagicHeading as="h2" className="text-4xl font-bold mb-12" variant="light">
            Speaking & Writing
          </MagicHeading>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <RevealOnScroll variant="swing" delay={100} duration={900}>
            <a
              href="https://www.nationalacademies.org/projects/HMD-HSP-23-21/event/41351#sectionEventPublications"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full group perspective-container"
            >
              <div
                className="h-full p-6 sm:p-8 rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col tilt-card glow-border group-hover:bg-[#005EB8] group-hover:border-transparent"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>

                {/* Header section */}
                <div className="relative z-10 flex flex-col justify-start">
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
                    </div>
                  </div>
                </div>

                {/* Subtitle - increased spacing with mt-6 */}
                <p className="text-lg text-foreground/80 group-hover:text-white/90 transition-colors duration-300 mt-6 relative z-10">
                  AI and Neuroscience
                </p>

                {/* Description section - increased spacing with mt-4 */}
                <div className="relative z-10 flex-1 mt-4 overflow-hidden">
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

                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </a>
          </RevealOnScroll>

          <RevealOnScroll variant="swing" delay={200} duration={900}>
            <div className="h-full group perspective-container">
              <div
                className="h-full rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col sm:flex-row tilt-card glow-border group-hover:bg-[#DC2626] group-hover:border-transparent"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>

                {/* MRJ Cover Image */}
                <div className="relative sm:w-[180px] h-[200px] sm:h-auto shrink-0 overflow-hidden">
                  <img
                    src="/images/mrj-summer-2025.jpg"
                    alt="Mensa Research Journal Summer 2025 - Human Intelligence in the Age of AI"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient fade on right edge */}
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent group-hover:from-[#DC2626] transition-all duration-500" />
                </div>

                {/* Content section */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col">
                  {/* Header section */}
                  <div className="relative z-10 flex flex-col justify-start">
                    <div className="flex items-start gap-4">
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
                      </div>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-lg text-foreground/80 group-hover:text-white/90 transition-colors duration-300 mt-4 relative z-10">
                    Summer 2025 Edition
                  </p>

                  {/* Description section */}
                  <div className="relative z-10 flex-1 mt-3 overflow-hidden">
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                      Guest Editor for Summer 2025 edition. Curating research at the intersection of intelligence,
                      technology, and human potential.
                    </p>
                  </div>

                  {/* Footer section */}
                  <div className="relative z-10 mt-auto pt-4 border-t border-border/50 group-hover:border-white/30 transition-colors duration-300">
                    <a
                      href="https://www.mensafoundation.org/insights/mensa-research-journal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium group-hover:text-white transition-all duration-300"
                      style={{ color: RED_STITCH }}
                    >
                      Read Journal
                      <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
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
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <RevealOnScroll variant="blur-scale" duration={900}>
          <div className="mb-8 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-balance">
              <MagicHeading as="span" className="text-2xl sm:text-3xl md:text-4xl font-bold">
                The Conductor Approach
              </MagicHeading>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start text-left">
          <div className="space-y-6 sm:space-y-8">
            <RevealOnScroll variant="curtain" delay={200} duration={1000}>
              <div className="relative">
                <div
                  className="absolute -left-3 sm:-left-4 top-0 bottom-0 w-1 rounded-full"
                  style={{ backgroundColor: RALLY_BLUE }}
                />
                <blockquote className="pl-4 sm:pl-6 text-lg sm:text-xl md:text-2xl text-foreground/90 italic leading-relaxed">
                  "Great conductors may not master every instrument, but they deeply understand each one's role in the
                  collective whole."
                </blockquote>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="fade-up" delay={400}>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                An Intelligence Conductor treats AI technologies as individual instruments: LLMs for language, computer
                vision for perception, speech recognition for audio, symbolic AI for logic. The skill lies in knowing
                how they combine through APIs and pipelines to solve novel problems.
              </p>
            </RevealOnScroll>

            <RevealOnScroll variant="stagger-fade" delay={600}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    label: "Individual Units",
                    desc: "OCR, LLMs, wav2vec, generative models, each with unique capabilities.",
                    icon: "M4 6h16M4 12h16M4 18h7",
                  },
                  {
                    label: "Collective Systems",
                    desc: "Pipelines and APIs connecting units into input-process-output flows.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  },
                  {
                    label: "Novel Solutions",
                    desc: "Combining technologies in unexpected ways to solve real problems.",
                    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                  },
                  {
                    label: "Domain Expertise",
                    desc: "Communication sciences, education, and music as application areas.",
                    icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
                  },
                ].map((item) => (
                  <TiltCard key={item.label} intensity={8}>
                    <div className="p-3 sm:p-4 rounded-xl border border-border bg-white transition-all duration-300 hover:border-[#005EB8]/30 hover:shadow-lg group">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors duration-300 shrink-0"
                          style={{ backgroundColor: `${RALLY_BLUE}15` }}
                        >
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            style={{ color: RALLY_BLUE }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.label}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll variant="flip-left" delay={300} duration={1000}>
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

                {/* CHANGE: Updated title and content to "Conducting Intelligence Through Kintsugi" */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent max-h-[70%] overflow-y-auto">
                  <h4 className="text-white font-semibold text-lg mb-3">Conducting Intelligence Through Kintsugi</h4>
                  <div className="text-gray-200 text-sm leading-relaxed space-y-3">
                    <p>
                      This 1966 Ludwig kit was in a second-hand shop that didn't recognize its worth. My wife brought it
                      home.
                    </p>
                    <p>
                      The shells had damage from poorly installed spurs. I used OCR to analyze hardware markings, an LLM
                      to plan which modern Ludwig parts would retain authenticity, and my own hands to do the repairs.
                      Technology and manual labor combined to make something beautiful.
                    </p>
                    <p>
                      Now it's configured as a left-handed jazz kit that I practice on daily. Even as a lefty who's
                      played right-handed for 30 years, switching orientation remains a challenge. Orchestrating AI
                      helped me build an instrument that keeps me motivated to work on something difficult, and
                      difficulty is where growth happens.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </RevealOnScroll>
        </div>

        <RevealOnScroll variant="fade-up" delay={800}>
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100">
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              The future belongs to those who think in systems. Agentive coding tools now let us connect AWS pipelines,
              chain API calls, and orchestrate AI services - all without building every component from scratch. The
              question isn't "can you code it?" but "do you understand how it fits together?"
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function SkiingSection() {
  return (
    <section id="skiing" className="py-20 px-6 bg-white relative overflow-hidden transition-all duration-500">
      <SpiralKaleidoscope opacity={0.05} className="z-0" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <RevealOnScroll variant="wave" duration={800}>
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Mountain size={32} style={{ color: RALLY_BLUE }} />
              <h2 className="text-3xl sm:text-4xl font-bold">
                <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
                  What Skiing Teaches About Decision-Making
                </MagicHeading>
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start text-left">
          {/* Video Preview */}
          <RevealOnScroll variant="zoom-blur" delay={100} duration={900}>
            <div className="relative rounded-2xl overflow-hidden">
              <VideoPreview
                url="https://www.instagram.com/reel/C5J_i05SgrN/"
                title="Powder Day"
                platform="instagram"
                aspectRatio="portrait"
                className="max-w-sm mx-auto lg:mx-0"
              />
            </div>
          </RevealOnScroll>

          {/* Philosophy and Principles */}
          <div className="space-y-8">
            <div className="prose prose-lg space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                Skiing exposes you to decisions with real consequences at whatever level of challenge you're willing to
                accept. At speed, you make split-second choices. Turn the wrong way and you end up in terrain you have
                to deal with immediately.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                The mountain teaches balanced thinking. Too far left risks trees. Too far right risks rocks. Straight
                down the center builds dangerous speed. The optimal path requires constant calibration between competing
                risks, and the bravery to commit once you've chosen.
              </p>
              <p className="text-foreground/90 leading-relaxed text-sm text-muted-foreground italic">
                This applies beyond the mountain. In drumming, if you take a chance on an abstract polyrhythm that
                crosses the bar line, you have to resolve it. In AI system design, if you chain together services in an
                unconventional pipeline, you have to make the output coherent. Skiing makes this principle physically
                tangible: commit to a decision, adapt when new information appears, find your way back to balance.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              {/* Top row - first 3 cards */}
              <div className="flex flex-wrap justify-center gap-3">
                {skiingPrinciples.slice(0, 3).map((principle) => (
                  <TiltCard key={principle.title} intensity={8}>
                    <div className="p-3 rounded-xl border border-border bg-white h-full w-[160px] lg:w-[180px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${RALLY_BLUE}10` }}
                        >
                          <principle.icon size={16} style={{ color: RALLY_BLUE }} />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">{principle.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{principle.description}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
              {/* Bottom row - last 2 cards centered */}
              <div className="flex flex-wrap justify-center gap-3">
                {skiingPrinciples.slice(3).map((principle) => (
                  <TiltCard key={principle.title} intensity={8}>
                    <div className="p-3 rounded-xl border border-border bg-white h-full w-[160px] lg:w-[180px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${RALLY_BLUE}10` }}
                        >
                          <principle.icon size={16} style={{ color: RALLY_BLUE }} />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">{principle.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{principle.description}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BJJSection() {
  const domains = [
    {
      domain: "Language",
      content: "Words & meanings",
      form: "Grammar & syntax",
      use: "Conversation",
      icon: MessageSquare,
      color: RALLY_BLUE,
    },
    {
      domain: "Jazz",
      content: "Scales & chords",
      form: "Song structures",
      use: "Improvisation",
      icon: Music,
      color: RED_STITCH,
    },
    {
      domain: "BJJ",
      content: "Techniques",
      form: "Combinations",
      use: "Rolling",
      icon: Shield,
      color: "#10B981",
    },
  ]

  // Updated prompt hierarchy
  const promptHierarchy = [
    { level: "Full Physical", desc: "Hand-over-hand guidance through the entire technique" },
    { level: "Partial Physical", desc: "Light touch to initiate or shape part of the movement" },
    { level: "Visual / Modeling", desc: "Demonstrating the movement without words" },
    { level: "Direct Verbal", desc: "Explicit verbal instruction" },
    { level: "Indirect Verbal", desc: "Questions that guide discovery" },
    { level: "Gestural", desc: "Pointing or indicating direction" },
    { level: "Independent", desc: "Performing the skill without any prompts" },
  ]

  return (
    <section id="bjj" className="py-24 px-6 bg-black text-white relative overflow-hidden transition-all duration-500">
      <SpiralKaleidoscope opacity={0.15} variant="dark" className="z-0" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <RevealOnScroll variant="blur-scale" duration={900}>
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Shield size={16} style={{ color: RALLY_BLUE }} />
              <span className="text-sm text-gray-400 tracking-wide uppercase">A Decade on the Mat</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <MagicHeading as="span" className="text-4xl sm:text-5xl font-bold text-white">
                The Language of Movement
              </MagicHeading>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ten years. When distance made weekly training impossible, I shifted to what was sustainable. Skill
              development is more about maintaining connection through some form of consistency than maintaining high
              frequency, especially when circumstances change.
            </p>
          </div>
        </RevealOnScroll>

        {/* Hero photos - Replace two photos with single centered anime image */}
        <RevealOnScroll variant="curtain" delay={100} duration={900}>
          <div className="flex justify-center mb-16">
            <div className="group relative max-w-lg cursor-pointer">
              <div className="kaleidoscope-frame rounded-2xl overflow-hidden aspect-[4/3] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src="/images/bjj-promotion-anime.jpg"
                    alt="Matthew receiving blue belt - anime style illustration"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-t from-[#005EB8]/20 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <p className="text-white text-xl font-semibold mb-1">Crosley Gracie Jiu-Jitsu</p>
                    <p className="text-gray-400 text-sm transition-colors duration-500 group-hover:text-gray-300">
                      Ten years of study under Ryan Murphy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Journey stats */}
        <RevealOnScroll variant="curtain" delay={150} duration={900}>
          <div className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto">
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-3xl font-bold" style={{ color: RALLY_BLUE }}>
                10
              </p>
              <p className="text-gray-500 text-sm mt-1">Years Training</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-3xl font-bold" style={{ color: RALLY_BLUE }}>
                5+
              </p>
              <p className="text-gray-500 text-sm mt-1">Years Commuting</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-3xl font-bold" style={{ color: RALLY_BLUE }}>
                90%
              </p>
              <p className="text-gray-500 text-sm mt-1">Quit Rate</p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Philosophy content - two columns */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: The philosophy */}
          <RevealOnScroll variant="slide-up" delay={200} duration={900}>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">The Language of Movement</h3>
              <p className="text-gray-300 leading-relaxed">
                BJJ is physical problem-solving against a resisting opponent. Someone is trying to control you, submit
                you, take away your options. You are doing the same to them. The learning happens in that exchange. Your
                development comes through confronting what scares you, repeatedly, with increasing competence.
              </p>
              <blockquote
                className="text-xl font-serif italic text-gray-400 border-l-4 pl-6 py-2"
                style={{ borderColor: RALLY_BLUE }}
              >
                "Learning Brazilian Jiu-Jitsu follows the same framework as learning language."
              </blockquote>
              <p className="text-gray-300 leading-relaxed">
                The Bloom-Lahey model describes language through content, form, and use. BJJ works identically. Content
                is vocabulary: hip escapes, guard passes, kimuras. Form is grammar: how techniques chain together. Use
                is conversation: reading your partner, responding in real time.
              </p>
            </div>
          </RevealOnScroll>

          {/* Right: Prompt hierarchy - the SLP connection */}
          <RevealOnScroll variant="slide-up" delay={300} duration={900}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${RALLY_BLUE}20` }}
                >
                  <Lightbulb size={20} style={{ color: RALLY_BLUE }} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">The Prompt Hierarchy</h4>
                  <p className="text-gray-500 text-sm">Where speech therapy meets martial arts</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Working with Ryan, we discuss pedagogy and teaching theory. The prompt hierarchy is essential to BJJ
                education at Crosley's gym, the same hierarchy used in speech-language pathology.
              </p>
              <div className="space-y-3">
                {promptHierarchy.map((p, i) => (
                  <div key={p.level} className="flex items-start gap-3 group">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5 transition-colors"
                      style={{
                        background: `${RALLY_BLUE}${20 + i * 10}`,
                        color: i > 2 ? RALLY_BLUE : "white",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{p.level}</p>
                      <p className="text-gray-500 text-xs">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bloom-Lahey Framework Cards */}
        <RevealOnScroll variant="wave" delay={400} duration={900}>
          <div>
            <h3 className="text-xl font-semibold text-center mb-8 text-white">
              The Bloom-Lahey Framework Across Domains
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {domains.map((d) => (
                <div
                  key={d.domain}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <d.icon size={24} style={{ color: d.color }} />
                    <h4 className="font-semibold text-white">{d.domain}</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Content</span>
                      <span className="text-gray-300">{d.content}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Form</span>
                      <span className="text-gray-300">{d.form}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Use</span>
                      <span className="text-gray-300">{d.use}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Key insight - the improvisation principle */}
        <RevealOnScroll variant="flip-up" delay={500} duration={900}>
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-[#005EB8]/10 to-[#10B981]/10 rounded-2xl p-8 border border-white/10 max-w-3xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles size={20} style={{ color: RED_STITCH }} />
                <span className="text-sm text-gray-500 uppercase tracking-wider">The Improvisation Principle</span>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Jazz musicians work within chord changes, song forms, rhythmic structures. The constraints enable
                creativity. BJJ operates identically. Training builds neural pathways that let the prefrontal cortex
                maintain control under stress. You don't eliminate the stress response. You develop capacity to{" "}
                <span className="text-white font-medium">think alongside it</span>.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 bg-white relative overflow-hidden transition-all duration-500">
      <SpiralKaleidoscope opacity={0.04} className="z-0" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <RevealOnScroll variant="blur-scale" duration={800}>
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
                Get in Touch
              </MagicHeading>
            </h2>
            <p className="text-muted-foreground text-lg">Send a message directly through the form below</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="slide-up" delay={100} duration={600}>
          <ContactForm />
        </RevealOnScroll>
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
                    animation: "sheenSweep 0.8s forwards",
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

          <div className="mb-6 sm:mb-8">
            <AnimatedProfile src="/images/mensa-headshot.jpeg" alt="Matthew Guggemos" />
          </div>

          <div className="mb-4 sm:mb-6">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-foreground"
              style={{ textShadow: "0 2px 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7)" }}
            >
              <span className="block">
                <MagicHeading as="span" variant="light">
                  Matthew
                </MagicHeading>
              </span>
              <span className="block mt-1 sm:mt-2">
                <MagicHeading as="span" variant="light">
                  Guggemos
                </MagicHeading>
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
          <RevealOnScroll variant="flip-up" duration={800}>
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
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <RevealOnScroll key={project.id} variant="scale-rotate" delay={index * 80} duration={700}>
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
                    <div className="relative z-10 flex-1 mt-5 sm:mt-6 h-[72px] overflow-hidden">
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
          <RevealOnScroll variant="glitch" duration={600}>
            <div className="mb-10 sm:mb-16">
              <MagicHeading as="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" baseColor="light">
                Music
              </MagicHeading>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="blur" delay={100} duration={800}>
            <div className="mb-10 sm:mb-16">
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-6 flex items-center gap-2">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626]" />
                Featured Performances
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {featuredVideos
                  .filter((v) => v.platform === "youtube")
                  .map((video, index) => (
                    <RevealOnScroll key={video.url} variant="flip-left" delay={index * 150} duration={800}>
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

              {/* Portrait videos with bounce animation */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                {featuredVideos
                  .filter((v) => v.platform !== "youtube")
                  .map((video, index) => (
                    <RevealOnScroll key={video.url} variant="bounce" delay={index * 100} duration={700}>
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

          {/* Bands Grid */}
          <div className="mb-10 sm:mb-16">
            <RevealOnScroll variant="slide-blur" duration={700}>
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 mb-4 sm:mb-6 flex items-center gap-2">
                <Music className="w-4 h-4 sm:w-5 sm:h-5 text-[#005EB8]" />
                Bands & Collaborations
              </h3>
            </RevealOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {music.map((item, index) => (
                <RevealOnScroll key={item.band} variant="swing" delay={index * 100} duration={800}>
                  <MusicCard item={item} index={index} />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Albums Grid */}
          <div>
            <RevealOnScroll variant="curtain" duration={700}>
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

      <HarmonizedLearningSection />

      <PhilosophySection />

      <SkiingSection />

      <BJJSection />

      {/* Credentials Section */}
      <section id="credentials" className="py-20 px-6 bg-gray-50 relative overflow-hidden transition-all duration-500">
        <SpiralKaleidoscope opacity={0.04} className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll variant="blur-scale" duration={800}>
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
                  Credentials
                </MagicHeading>
              </h2>
              <p className="text-muted-foreground text-lg">Recognition and contributions</p>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((cred, index) => (
              <RevealOnScroll key={cred.label} variant="scale-rotate" delay={index * 60} duration={600}>
                <CredentialChip cred={cred} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Added */}
      <ContactSection />

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
              href="https://www.linkedin.com/in/matthew-guggemos-slp-researcher-drummer/"
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
