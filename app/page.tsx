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
  Presentation,
  Play,
  Music,
  Brain,
  Award,
  DollarSign,
  Star,
  MessageSquare,
  Layers,
  Drum,
  Sparkles,
  Github,
  Mail,
  Linkedin,
} from "lucide-react"
import { MagicHeading } from "@/components/magic-text"
import { VideoPreview } from "@/components/video-preview"
import { TiltCard } from "@/components/tilt-card"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import SpiralKaleidoscope from "@/components/spiral-kaleidoscope"
import Image from "next/image"
import { SwirledCard } from "@/components/swirled-card"
import { ContactForm } from "@/components/contact-form"
import { AnimatedProfile } from "@/components/animated-profile"
import { useTouchHover } from "@/hooks/use-touch-hover"
import { AIDocent } from "@/components/ai-docent"
import { ThemeMusicPlayer } from "@/components/theme-music-player"
import { HarmonizedLearningSection } from "@/components/harmonized-learning-section"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"
const SOFT_GRAY = "#F8F9FA"
const STITCH_RED = "#DC2626"
const ICE_BLUE = "#38BDF8"
const SNOW_WHITE = "#F0F9FF"

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
    color: "#0a092f",
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

const drummingPrinciples = [
  {
    title: "Limb Independence",
    description: "Coordinating four limbs while tracking dozens of variables simultaneously",
    icon: Zap,
  },
  {
    title: "Context Awareness",
    description: "In jazz, the ride cymbal leads. In rock, bass and snare punch forward",
    icon: Compass,
  },
  {
    title: "Pattern Systems",
    description: "Patterns that repeat, alternate, or cross bar lines to manage complexity",
    icon: Layers,
  },
  {
    title: "Physical Constraints",
    description: "Speed ceilings and impossible combinations, like phonemes in speech",
    icon: Target,
  },
  {
    title: "Infinite Expression",
    description: "Finite elements combining within constraints to produce endless variation",
    icon: Sparkles,
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
  { label: "Teaching", section: "harmonized-learning" },
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
  onMouseEnter,
  onMouseLeave,
}: {
  project: (typeof projects)[0]
  index: number
  isHighlighted?: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
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
    onMouseLeave()
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

  const cardContent = (
    <SwirledCard className={`${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div
        ref={cardRef}
        onMouseEnter={() => {
          setIsHovered(true)
          onMouseEnter()
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="p-6 rounded-2xl relative overflow-hidden cursor-pointer transition-all duration-300 ease-out"
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

        <div className="flex items-start gap-3 mb-4" style={{ minHeight: "80px" }}>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${RALLY_BLUE}10` }}
          >
            <img
              src={project.logoUrl || "/placeholder.svg"}
              alt={`${project.name} logo`}
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-[#005EB8] truncate">
                {project.name}
              </h3>
              <span
                className="stat-badge px-2 py-0.5 text-xs rounded-full font-medium transition-all duration-300 group-hover:scale-105 shrink-0 whitespace-nowrap"
                style={{
                  backgroundColor: `${RALLY_BLUE}15`,
                  color: RALLY_BLUE,
                }}
              >
                {project.stat}
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 ml-auto"
                style={{ color: RALLY_BLUE }}
              />
            </div>
            <p className="text-base text-foreground/80 line-clamp-2 leading-snug">{project.tagline}</p>
          </div>
        </div>

        {/* Description section - flex grow */}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>
        </div>

        {/* Footer section */}
        <div className="mt-4 pt-4 border-t border-border/50">
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

// /** rest of code here **/
// CHANGE: Complete rewrite of CredentialChip with mind-blowing atomic orbital animation
function CredentialChip({ cred, index }: { cred: (typeof credentials)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mouseAngle, setMouseAngle] = useState(0)
  const chipRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<
    Array<{
      angle: number
      radius: number
      speed: number
      size: number
      opacity: number
      trail: Array<{ x: number; y: number; opacity: number }>
      orbitTilt: number
      orbitRotation: number
      color: string
    }>
  >([])

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

  // Initialize particles for orbital animation
  useEffect(() => {
    const colors = [RALLY_BLUE, RED_STITCH, "#00D4FF", "#FF6B6B", "#4ECDC4", "#FFE66D"]
    const particles: typeof particlesRef.current = []

    // Create multiple orbital shells
    const shells = [
      { count: 6, baseRadius: 45, speedMult: 1.2 },
      { count: 8, baseRadius: 65, speedMult: 0.8 },
      { count: 4, baseRadius: 85, speedMult: 1.5 },
    ]

    shells.forEach((shell, shellIndex) => {
      for (let i = 0; i < shell.count; i++) {
        particles.push({
          angle: (i / shell.count) * Math.PI * 2 + Math.random() * 0.5,
          radius: shell.baseRadius + Math.random() * 10 - 5,
          speed: (0.02 + Math.random() * 0.015) * shell.speedMult * (Math.random() > 0.5 ? 1 : -1),
          size: 2 + Math.random() * 2,
          opacity: 0.6 + Math.random() * 0.4,
          trail: [],
          orbitTilt: (shellIndex * 60 + Math.random() * 30) * (Math.PI / 180),
          orbitRotation: shellIndex * 45 * (Math.PI / 180),
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    })

    particlesRef.current = particles
  }, [])

  // Animate the orbital particles
  useEffect(() => {
    if (!isHovered || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      // Draw quantum probability cloud
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100)
      gradient.addColorStop(0, `${RALLY_BLUE}15`)
      gradient.addColorStop(0.5, `${RALLY_BLUE}08`)
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw energy waves emanating from center
      for (let w = 0; w < 3; w++) {
        const waveRadius = (time * 30 + w * 40) % 120
        const waveOpacity = Math.max(0, 1 - waveRadius / 120) * 0.3
        ctx.beginPath()
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 94, 184, ${waveOpacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Draw orbital paths (faint)
      const orbits = [45, 65, 85]
      orbits.forEach((radius, i) => {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(i * (Math.PI / 6))
        ctx.scale(1, 0.4 + i * 0.1)
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `${RALLY_BLUE}20`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()
      })

      // Update and draw particles with trails
      particlesRef.current.forEach((p) => {
        p.angle += p.speed

        // Calculate 3D position with orbital tilt
        const x3d = Math.cos(p.angle) * p.radius
        const y3d = Math.sin(p.angle) * p.radius * Math.cos(p.orbitTilt)
        const z3d = Math.sin(p.angle) * p.radius * Math.sin(p.orbitTilt)

        // Apply rotation and project to 2D
        const rotatedX = x3d * Math.cos(p.orbitRotation) - z3d * Math.sin(p.orbitRotation)
        const rotatedZ = x3d * Math.sin(p.orbitRotation) + z3d * Math.cos(p.orbitRotation)

        const perspective = 200 / (200 + rotatedZ)
        const screenX = centerX + rotatedX * perspective
        const screenY = centerY + y3d * perspective

        // Add to trail
        p.trail.unshift({ x: screenX, y: screenY, opacity: 1 })
        if (p.trail.length > 12) p.trail.pop()

        // Draw trail with gradient
        if (p.trail.length > 1) {
          for (let t = 0; t < p.trail.length - 1; t++) {
            const trailOpacity = (1 - t / p.trail.length) * p.opacity * 0.6
            ctx.beginPath()
            ctx.moveTo(p.trail[t].x, p.trail[t].y)
            ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y)
            ctx.strokeStyle =
              p.color +
              Math.floor(trailOpacity * 255)
                .toString(16)
                .padStart(2, "0")
            ctx.lineWidth = p.size * perspective * (1 - t / p.trail.length)
            ctx.lineCap = "round"
            ctx.stroke()
          }
        }

        // Draw particle with glow
        const particleSize = p.size * perspective
        const depth = (rotatedZ + p.radius) / (p.radius * 2)
        const finalOpacity = p.opacity * (0.5 + depth * 0.5)

        // Outer glow
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, particleSize * 4)
        glowGradient.addColorStop(
          0,
          p.color +
            Math.floor(finalOpacity * 100)
              .toString(16)
              .padStart(2, "0"),
        )
        glowGradient.addColorStop(1, "transparent")
        ctx.fillStyle = glowGradient
        ctx.fillRect(screenX - particleSize * 4, screenY - particleSize * 4, particleSize * 8, particleSize * 8)

        // Core particle
        ctx.beginPath()
        ctx.arc(screenX, screenY, particleSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(screenX, screenY, particleSize * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      // Draw nucleus glow at center
      const nucleusGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25)
      const pulseIntensity = 0.3 + Math.sin(time * 3) * 0.1
      nucleusGradient.addColorStop(0, `rgba(0, 94, 184, ${pulseIntensity})`)
      nucleusGradient.addColorStop(0.5, `rgba(220, 38, 38, ${pulseIntensity * 0.5})`)
      nucleusGradient.addColorStop(1, "transparent")
      ctx.fillStyle = nucleusGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2)
      ctx.fill()
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  // Magnetic tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chipRef.current) return
    const rect = chipRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 10
    const y = (e.clientY - rect.top - rect.height / 2) / 10
    setMousePosition({ x, y })

    // Calculate angle for particle attraction
    const angle = Math.atan2(e.clientY - rect.top - rect.height / 2, e.clientX - rect.left - rect.width / 2)
    setMouseAngle(angle)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const content = (
    <div
      ref={chipRef}
      className="credential-chip relative text-center p-6 rounded-2xl transition-all duration-500 cursor-pointer overflow-visible group/chip"
      style={{
        animationDelay: `${index * 50}ms`,
        background: isHovered ? `linear-gradient(135deg, ${RALLY_BLUE}08, ${RED_STITCH}05)` : "white",
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.08)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        boxShadow: isHovered
          ? `0 25px 60px rgba(0,94,184,0.25), 0 0 0 2px ${RALLY_BLUE}50, 0 0 80px rgba(0,94,184,0.15)`
          : "0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",
        zIndex: isHovered ? 50 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Atomic orbital canvas - positioned behind content */}
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        className="absolute pointer-events-none transition-opacity duration-500"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: isHovered ? 1 : 0,
          zIndex: 0,
        }}
      />

      {/* Animated border gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${RALLY_BLUE}, ${RED_STITCH}, #00D4FF, ${RALLY_BLUE})`,
          backgroundSize: "300% 100%",
          animation: isHovered ? "shimmer 2s linear infinite" : "none",
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Icon that reveals on hover - THE NUCLEUS */}
      <div
        className="relative z-10 mx-auto mb-3 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: isHovered ? RALLY_BLUE : `${RALLY_BLUE}10`,
          color: isHovered ? "white" : RALLY_BLUE,
          transform: isHovered ? "translateY(0) scale(1.1)" : "translateY(-5px) scale(0.9)",
          opacity: isHovered ? 1 : 0.7,
          boxShadow: isHovered ? `0 0 30px ${RALLY_BLUE}60, 0 0 60px ${RALLY_BLUE}30` : "none",
        }}
      >
        {getIcon()}
        {/* Nucleus pulse rings */}
        {isHovered && (
          <>
            <div
              className="absolute inset-0 rounded-xl animate-ping"
              style={{
                backgroundColor: RALLY_BLUE,
                opacity: 0.3,
                animationDuration: "1.5s",
              }}
            />
            <div
              className="absolute inset-0 rounded-xl animate-ping"
              style={{
                backgroundColor: RALLY_BLUE,
                opacity: 0.2,
                animationDuration: "2s",
                animationDelay: "0.5s",
              }}
            />
          </>
        )}
      </div>

      {/* Label with underline animation */}
      <div className="relative z-10 inline-block mb-2">
        <p
          className="font-semibold text-base transition-all duration-300"
          style={{
            color: isHovered ? RALLY_BLUE : "inherit",
            textShadow: isHovered ? `0 0 20px ${RALLY_BLUE}40` : "none",
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
            boxShadow: isHovered ? `0 0 10px ${RALLY_BLUE}` : "none",
          }}
        />
      </div>

      {/* Detail text */}
      <p
        className="relative z-10 text-sm transition-all duration-300"
        style={{
          color: isHovered ? "#555" : "#888",
        }}
      >
        {cred.detail}
      </p>

      {/* External link indicator that slides up */}
      {cred.url && (
        <div
          className="relative z-10 mt-3 flex items-center justify-center gap-1 text-xs font-medium transition-all duration-500"
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

      {/* CHANGE: Removed the ugly corner accent/fold element that clashed with the atomic orbital design */}
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
          {/* National Academies card - image on top, content below */}
          <RevealOnScroll variant="swing" delay={100} duration={900}>
            <a
              href="https://www.nationalacademies.org/projects/HMD-HSP-23-21/event/41351#sectionEventPublications"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full group perspective-container"
            >
              <div
                className="h-full rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col tilt-card glow-border"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* National Academies Workshop Image */}
                <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden">
                  <img
                    src="/images/national-20academies-20image.jpg"
                    alt="National Academies Workshop - Exploring the Bidirectional Relationship Between AI and Neuroscience"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Header with title and badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-white transition-all duration-300">
                      National Academies Workshop
                    </h3>
                    <span
                      className="px-2 py-1 text-xs rounded-full font-medium shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white"
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

                  {/* Subtitle - white on hover */}
                  <p className="text-lg text-foreground/80 group-hover:text-white transition-colors duration-300 mt-4">
                    AI and Neuroscience
                  </p>

                  {/* Description - white on hover */}
                  <p className="text-sm sm:text-base text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-3 flex-1">
                    Bidirectional Relationship Between AI and Neuroscience. October 2024 workshop exploring how advances
                    in AI and neuroscience inform each other.
                  </p>

                  {/* Footer link - border and text white on hover */}
                  <div className="mt-auto pt-4 border-t border-border/50 group-hover:border-white/30 transition-colors duration-300">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 group-hover:text-white transition-all duration-300"
                      style={{ color: RALLY_BLUE }}
                    >
                      View workshop
                      <ExternalLink size={14} className="transition-all duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </RevealOnScroll>

          <RevealOnScroll variant="swing" delay={200} duration={900}>
            <a
              href="https://www.mensafoundation.org/insights/mensa-research-journal/"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full group perspective-container"
            >
              <div
                className="h-full rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col tilt-card glow-border"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* MRJ Cover Image */}
                <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden">
                  <img
                    src="/images/mrj-summer-2025.jpg"
                    alt="Mensa Research Journal Summer 2025 - Human Intelligence in the Age of AI"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Header with title and badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-white transition-all duration-300">
                      Mensa Research Journal
                    </h3>
                    <span
                      className="px-2 py-1 text-xs rounded-full font-medium shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white"
                      style={{ backgroundColor: `${STITCH_RED}15`, color: STITCH_RED }}
                    >
                      Guest Editor
                    </span>
                    <ArrowRight
                      size={20}
                      className="shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-white transition-all duration-500 ml-auto"
                      style={{ color: STITCH_RED }}
                    />
                  </div>

                  {/* Subtitle - white on hover */}
                  <p className="text-lg text-foreground/80 group-hover:text-white transition-colors duration-300 mt-4">
                    Summer 2025 Edition
                  </p>

                  {/* Description - white on hover */}
                  <p className="text-sm sm:text-base text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mt-3 flex-1">
                    Guest Editor for Summer 2025 edition. Curating research at the intersection of intelligence,
                    technology, and human potential.
                  </p>

                  {/* Footer link - border and text white on hover */}
                  <div className="mt-auto pt-4 border-t border-border/50 group-hover:border-white/30 transition-colors duration-300">
                    <span
                      className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 group-hover:text-white transition-all duration-300"
                      style={{ color: RALLY_BLUE }}
                    >
                      Read Journal
                      <ExternalLink size={14} className="transition-all duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

// FIX: Removed duplicate HarmonizedLearningSection function definition
// The real HarmonizedLearningSection is now imported from components/harmonized-learning-section.tsx

// CHANGE: Remove placeholder HarmonizedLearningSection - using imported component instead

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
          <div className="space-y-6 sm:space-8">
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

                {/* CHANGE: Replace video with drum kit IMAGE - Kintsugi is about RESTORATION, not performance */}
                <div className="relative aspect-[4/3] bg-black">
                  <Image
                    src="/images/aq613fkizyx9pd-zfkf0v.png"
                    alt="1966 Ludwig Club Date drum kit in silver sparkle - restored following kintsugi philosophy"
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 pointer-events-none" />
                </div>

                {/* CHANGE: Kintsugi content now in separate container below image for visibility */}
                <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800">
                  <h4 className="text-white font-semibold text-lg mb-3">Conducting Intelligence Through Kintsugi</h4>
                  <div className="text-gray-200 text-sm leading-relaxed space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600">
                    <p>
                      This 1966 Ludwig kit was in a second-hand shop that didn't recognize its worth. My wife brought it
                      home.
                    </p>
                    <p>
                      The shells had damage from poorly installed bass drum spurs. Over three months, I collaborated
                      with an <span className="text-[#005EB8] font-medium">LLM</span> to plan the restoration: analyzing
                      repair options, engineering solutions for structural issues, sourcing era-appropriate parts. I
                      used <span className="text-[#005EB8] font-medium">OCR</span> to identify hardware markings and
                      find the right combination of vintage authenticity and modern Ludwig professional-grade upgrades.
                      Then my hands did the work: repairing shells, reconditioning bearing edges, fitting new heads,
                      wood hoops, and upgraded tom mounts.
                    </p>
                    <p>
                      The restoration followed <span className="text-amber-400 font-medium">kintsugi</span> logic. I
                      didn't hide the kit's history. I highlighted it. Imperfections remain visible, but the instrument
                      is now more capable than when it left the factory.
                    </p>
                    <p>
                      This kit is configured <span className="text-white font-medium">left-handed</span>. I've played
                      right-handed my whole life, and switching orientation after decades of muscle memory is genuinely
                      difficult. I needed something beautiful enough to inspire me to sit down daily and work on
                      something I'm not good at.
                    </p>
                    <p>
                      This is how I approach any complex problem. Orchestrate available intelligence toward a goal.
                      Build something that pulls you into productive struggle. Whether restoring drums, designing AI
                      pipelines, or developing clinical tools, the process is the same: identify what each component
                      does well, combine them intentionally, and create something that motivates continued effort.
                    </p>
                    <p className="text-gray-300 italic border-l-2 border-amber-400 pl-3">
                      The outcome here is tangible, physical, real. Ancient aesthetic principles guiding modern
                      technology toward a result that neither human nor machine could achieve alone. The same method
                      applies to systems that exist entirely in code.
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

function DrummingSection() {
  return (
    <section
      id="drumming"
      className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden transition-all duration-500"
    >
      <SpiralKaleidoscope opacity={0.08} className="z-0" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <RevealOnScroll variant="wave" duration={800}>
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Drum size={32} style={{ color: RALLY_BLUE }} />
              <h2 className="text-3xl sm:text-4xl font-bold">
                <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold" variant="dark">
                  Problem-Solving in Real Time
                </MagicHeading>
              </h2>
            </div>
            <p className="text-gray-400 text-lg">Drumming: Where Coordination Meets Cognition</p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch text-left">
          {/* Drum Video Card with interactive animations */}
          <RevealOnScroll variant="zoom-blur" delay={100} duration={900}>
            <div className="h-full">
              <DrumVideoCard />
            </div>
          </RevealOnScroll>

          {/* Philosophy and Content - matched height */}
          <RevealOnScroll variant="curtain" delay={150} duration={900}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full group hover:border-[#005EB8]/30 hover:bg-white/[0.07] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,94,184,0.15)]">
              <div className="prose prose-invert prose-lg space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-gray-200 leading-relaxed">
                  Drumming looks like hitting things. It's actually coordinating four limbs while tracking dozens of
                  variables simultaneously.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Are your limbs hitting at the same time? Is the snare obscuring other instruments? Which hand did you
                  start on, and where will your fill land? In jazz, the ride cymbal leads. In rock, bass and snare punch
                  forward. Context changes everything, and you're adjusting constantly.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Drummers develop systems to manage this complexity. Patterns that repeat on the same hand, patterns
                  that alternate, patterns that cross bar lines. Each system introduces new variables, and the
                  calculations multiply as tempo increases and song forms become less predictable.
                </p>
                <blockquote className="border-l-4 border-[#005EB8] pl-4 my-4">
                  <p className="text-gray-200 italic">
                    This parallels language. Both have combinatorial rules and physical constraints. Certain rhythmic
                    phrases have speed ceilings. Certain sound combinations are impossible in speech. Finite elements
                    combining within constraints to produce infinite expression.
                  </p>
                </blockquote>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Skiing, jiu-jitsu, language, drumming. All involve improvisation within rules. Understanding how to
                  systematize improvisation helps build better AI systems, particularly ones that need to hold a
                  conversation.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* CHANGE: Update drumming cards container - use grid instead of flex */}
        <div className="mt-12">
          <div className="hidden xl:flex flex-wrap justify-center items-stretch">
            {drummingPrinciples.map((principle, index) => (
              <RevealOnScroll key={principle.title} variant="slide-up" delay={index * 80}>
                <div
                  className="relative hover:z-20 transition-all duration-300"
                  style={{ marginLeft: index > 0 ? "-20px" : "0" }}
                >
                  <DrummingPrincipleCard principle={principle} index={index} />
                </div>
              </RevealOnScroll>
            ))}
          </div>
          {/* Mobile/Tablet: Simple centered grid without overlap */}
          <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {drummingPrinciples.map((principle, index) => (
              <RevealOnScroll key={principle.title} variant="slide-up" delay={index * 80}>
                <DrummingPrincipleCard principle={principle} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DrummingPrincipleCard({
  principle,
  index,
}: {
  principle: {
    title: string
    description: string
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  const Icon = principle.icon

  const CARD_WIDTH = 200
  const CARD_HEIGHT = 180

  return (
    <div
      className="p-4 flex-grow-0 flex-shrink-0"
      style={{
        width: CARD_WIDTH + 32,
        minWidth: CARD_WIDTH + 32,
        maxWidth: CARD_WIDTH + 32,
        height: CARD_HEIGHT + 32,
        minHeight: CARD_HEIGHT + 32,
        maxHeight: CARD_HEIGHT + 32,
      }}
    >
      <div
        ref={cardRef}
        className="relative group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setMousePosition({ x: 0.5, y: 0.5 })
        }}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -8}deg) rotateY(${(mousePosition.x - 0.5) * 8}deg) scale(1.05)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
          transition: "transform 0.2s ease-out",
          zIndex: isHovered ? 10 : 1,
        }}
      >
        {/* Outer glow - icy blue shimmer - contained within padding */}
        <div
          className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${ICE_BLUE}50, ${RALLY_BLUE}30, transparent 70%)`,
          }}
        />

        {/* Animated border - frost effect */}
        <div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `conic-gradient(from ${mousePosition.x * 360}deg at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${ICE_BLUE}, ${SNOW_WHITE}, ${RALLY_BLUE}, ${ICE_BLUE})`,
          }}
        />

        {/* Card content - fixed width AND height */}
        <div
          className="relative p-5 rounded-2xl border border-sky-100 bg-white transition-all duration-300 group-hover:border-transparent overflow-hidden"
          style={{
            width: CARD_WIDTH,
            minWidth: CARD_WIDTH,
            maxWidth: CARD_WIDTH,
            height: CARD_HEIGHT,
            minHeight: CARD_HEIGHT,
            maxHeight: CARD_HEIGHT,
            boxShadow: isHovered
              ? `0 20px 40px -10px ${ICE_BLUE}30, 0 0 30px ${ICE_BLUE}20`
              : "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* Cursor-following light - snow sparkle effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${ICE_BLUE}25, transparent 50%)`,
            }}
          />

          {/* Snowflake particles on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, white 1px, transparent 1px),
                                radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
                                radial-gradient(circle at 40% 70%, white 1px, transparent 1px),
                                radial-gradient(circle at 70% 80%, white 1px, transparent 1px)`,
              backgroundSize: "100% 100%",
            }}
          />

          {/* Icon with animated background */}
          <div className="relative mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{
                backgroundColor: isHovered ? `${ICE_BLUE}30` : `${RALLY_BLUE}10`,
                boxShadow: isHovered ? `0 0 25px ${ICE_BLUE}50, inset 0 0 15px ${SNOW_WHITE}30` : "none",
              }}
            >
              <Icon size={24} style={{ color: isHovered ? ICE_BLUE : RALLY_BLUE, transition: "color 0.3s" }} />
            </div>
            {/* Icon glow ring */}
            <div
              className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${ICE_BLUE}30, transparent 70%)`,
                animation: isHovered ? "pulse 2s ease-in-out infinite" : "none",
              }}
            />
          </div>

          {/* Title with hover color shift */}
          <h4
            className="font-semibold text-base mb-2 transition-colors duration-300"
            style={{ color: isHovered ? ICE_BLUE : "#0a0a0a" }}
          >
            {principle.title}
          </h4>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{principle.description}</p>
        </div>
      </div>
    </div>
  )
}

// CHANGE: SkiingPrincipleCard component added with aurora borealis effect after SkiingPrincipleCard
function SkiingPrincipleCard({
  principle,
  index,
}: {
  principle: {
    title: string
    description: string
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  const handleTouchStart = () => setIsTouched(true)
  const handleTouchEnd = () => {
    setTimeout(() => setIsTouched(false), 300)
  }

  const Icon = principle.icon
  const isActive = isHovered || isTouched

  // Ice/snow colors for skiing theme

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer flex-shrink-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0.5, y: 0.5 })
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: isActive
          ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg) scale(1.03)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${ICE_BLUE}40, transparent 70%)`,
        }}
      />

      {/* Card content */}
      <div
        className="relative p-4 sm:p-5 rounded-2xl border border-sky-100 bg-white transition-all duration-300 group-hover:border-sky-200 overflow-hidden w-[160px] h-[160px] sm:w-[200px] sm:h-[180px]"
        style={{
          boxShadow: isActive
            ? `0 15px 30px -8px ${ICE_BLUE}25, 0 0 20px ${ICE_BLUE}15`
            : "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Cursor-following light */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${ICE_BLUE}20, transparent 50%)`,
          }}
        />

        {/* Icon */}
        <div className="relative mb-2 sm:mb-3">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: isActive ? `${ICE_BLUE}20` : `${RALLY_BLUE}10`,
            }}
          >
            <Icon size={20} style={{ color: isActive ? ICE_BLUE : RALLY_BLUE, transition: "color 0.3s" }} />
          </div>
        </div>

        {/* Title */}
        <h4
          className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 transition-colors duration-300"
          style={{ color: isActive ? ICE_BLUE : "#0a0a0a" }}
        >
          {principle.title}
        </h4>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">{principle.description}</p>
      </div>
    </div>
  )
}

// CHANGE: SkiPhilosophyCard component with aurora borealis effect
function SkiPhilosophyCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const mousePos = useRef({ x: 0.5, y: 0.5 })
  const animationRef = useRef<number>()

  const isActive = isHovered || isTouched

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      ctx.scale(2, 2)
    }
    resize()
    window.addEventListener("resize", resize)

    // Aurora ribbons
    const ribbons: Array<{
      y: number
      amplitude: number
      frequency: number
      speed: number
      color: string
      opacity: number
      phase: number
    }> = []

    const colors = [
      "rgba(0, 94, 184, 0.6)", // Rally Blue
      "rgba(34, 197, 94, 0.5)", // Green
      "rgba(139, 92, 246, 0.4)", // Purple
      "rgba(6, 182, 212, 0.5)", // Cyan
      "rgba(236, 72, 153, 0.3)", // Pink
    ]

    for (let i = 0; i < 8; i++) {
      ribbons.push({
        y: 0.2 + i * 0.08,
        amplitude: 20 + Math.random() * 40,
        frequency: 0.005 + Math.random() * 0.01,
        speed: 0.3 + Math.random() * 0.5,
        color: colors[i % colors.length],
        opacity: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Snow particles
    const snowflakes: Array<{
      x: number
      y: number
      size: number
      speed: number
      drift: number
      opacity: number
    }> = []

    for (let i = 0; i < 60; i++) {
      snowflakes.push({
        x: Math.random(),
        y: Math.random(),
        size: 1 + Math.random() * 2,
        speed: 0.2 + Math.random() * 0.3,
        drift: Math.random() * 0.5 - 0.25,
        opacity: 0.3 + Math.random() * 0.5,
      })
    }

    // Stars
    const stars: Array<{ x: number; y: number; size: number; twinkle: number }> = []
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.6,
        size: 0.5 + Math.random() * 1.5,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    let time = 0

    const animate = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      // Dark sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, h)
      skyGradient.addColorStop(0, "rgba(15, 23, 42, 0.95)")
      skyGradient.addColorStop(0.5, "rgba(30, 41, 59, 0.9)")
      skyGradient.addColorStop(1, "rgba(51, 65, 85, 0.85)")
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, w, h)

      // Stars
      stars.forEach((star) => {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 2 + star.twinkle)
        ctx.beginPath()
        ctx.arc(star.x * w, star.y * h, star.size * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + twinkle * 0.5})`
        ctx.fill()
      })

      // Aurora ribbons - respond to mouse
      const mx = mousePos.current.x
      const my = mousePos.current.y

      ribbons.forEach((ribbon, i) => {
        ctx.beginPath()

        const baseY = ribbon.y * h + (my - 0.5) * 50

        for (let x = 0; x <= w; x += 3) {
          const normalizedX = x / w
          const distFromMouse = Math.abs(normalizedX - mx)
          const mouseInfluence = Math.max(0, 1 - distFromMouse * 2) * (isActive ? 1 : 0.3)

          const wave1 = Math.sin(x * ribbon.frequency + time * ribbon.speed + ribbon.phase) * ribbon.amplitude
          const wave2 = Math.sin(x * ribbon.frequency * 1.5 + time * ribbon.speed * 0.7) * ribbon.amplitude * 0.5
          const mouseWave = Math.sin(x * 0.02 + time) * 30 * mouseInfluence

          const y = baseY + wave1 + wave2 + mouseWave

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        // Create ribbon thickness
        for (let x = w; x >= 0; x -= 3) {
          const normalizedX = x / w
          const distFromMouse = Math.abs(normalizedX - mx)
          const mouseInfluence = Math.max(0, 1 - distFromMouse * 2) * (isActive ? 1 : 0.3)

          const wave1 = Math.sin(x * ribbon.frequency + time * ribbon.speed + ribbon.phase) * ribbon.amplitude
          const wave2 = Math.sin(x * ribbon.frequency * 1.5 + time * ribbon.speed * 0.7) * ribbon.amplitude * 0.5
          const mouseWave = Math.sin(x * 0.02 + time) * 30 * mouseInfluence

          const ribbonHeight = 30 + mouseInfluence * 40
          const y = baseY + wave1 + wave2 + mouseWave + ribbonHeight

          ctx.lineTo(x, y)
        }

        ctx.closePath()

        // Gradient fill for ribbon
        const gradient = ctx.createLinearGradient(0, baseY - 50, 0, baseY + 80)
        gradient.addColorStop(0, "transparent")
        gradient.addColorStop(0.3, ribbon.color)
        gradient.addColorStop(0.7, ribbon.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.globalAlpha = ribbon.opacity * (isActive ? 1.2 : 0.7)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Cursor glow
      if (isActive) {
        const glowGradient = ctx.createRadialGradient(mx * w, my * h, 0, mx * w, my * h, 150)
        glowGradient.addColorStop(0, "rgba(0, 94, 184, 0.4)")
        glowGradient.addColorStop(0.5, "rgba(34, 197, 94, 0.2)")
        glowGradient.addColorStop(1, "transparent")
        ctx.fillStyle = glowGradient
        ctx.fillRect(0, 0, w, h)
      }

      // Snow
      snowflakes.forEach((flake) => {
        flake.y += flake.speed * 0.003
        flake.x += flake.drift * 0.001 + Math.sin(time + flake.x * 10) * 0.001

        if (flake.y > 1) {
          flake.y = 0
          flake.x = Math.random()
        }
        if (flake.x > 1) flake.x = 0
        if (flake.x < 0) flake.x = 1

        ctx.beginPath()
        ctx.arc(flake.x * w, flake.y * h, flake.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()
      })

      // Mountain silhouette at bottom
      ctx.beginPath()
      ctx.moveTo(0, h)
      ctx.lineTo(0, h * 0.85)
      ctx.lineTo(w * 0.15, h * 0.7)
      ctx.lineTo(w * 0.25, h * 0.8)
      ctx.lineTo(w * 0.4, h * 0.65)
      ctx.lineTo(w * 0.5, h * 0.75)
      ctx.lineTo(w * 0.65, h * 0.6)
      ctx.lineTo(w * 0.8, h * 0.72)
      ctx.lineTo(w * 0.9, h * 0.68)
      ctx.lineTo(w, h * 0.8)
      ctx.lineTo(w, h)
      ctx.closePath()

      const mountainGradient = ctx.createLinearGradient(0, h * 0.6, 0, h)
      mountainGradient.addColorStop(0, "rgba(30, 41, 59, 0.9)")
      mountainGradient.addColorStop(1, "rgba(15, 23, 42, 1)")
      ctx.fillStyle = mountainGradient
      ctx.fill()

      time += 0.016
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    const touch = e.touches[0]
    if (rect && touch) {
      mousePos.current = {
        x: (touch.clientX - rect.left) / rect.width,
        y: (touch.clientY - rect.top) / rect.height,
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden h-full min-h-[600px] sm:min-h-[500px] md:min-h-[400px] cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
      onTouchMove={handleTouchMove}
    >
      {/* Aurora canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ imageRendering: "auto" }} />

      {/* Content overlay - Responsive padding and text sizes */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 md:p-6 border border-white/20">
          <div className="prose prose-sm sm:prose-base md:prose-lg space-y-3 sm:space-y-4 md:space-y-5">
            <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg drop-shadow-lg">
              Skiing exposes you to decisions with real consequences at whatever level of challenge you're willing to
              accept. At speed, you make split-second choices. Turn the wrong way and you end up in terrain you have to
              deal with immediately.
            </p>
            <p className="text-white/90 leading-relaxed text-sm sm:text-base md:text-lg drop-shadow-lg">
              The mountain teaches balanced thinking. Too far left risks trees. Too far right risks rocks. Straight down
              the center builds dangerous speed. The optimal path requires constant calibration between competing risks,
              and the bravery to commit once you've chosen.
            </p>
            <blockquote className="border-l-4 border-[#005EB8] pl-3 sm:pl-4 italic text-white/80 text-xs sm:text-sm md:text-base drop-shadow-lg">
              This applies beyond the mountain. In drumming, if you take a chance on an abstract polyrhythm that crosses
              the bar line, you have to resolve it. In AI system design, if you chain together services in an
              unconventional pipeline, you have to make the output coherent. Skiing makes this principle physically
              tangible: commit to a decision, adapt when new information appears, find your way back to balance.
            </blockquote>
          </div>
        </div>
      </div>

      {/* Interaction hint - Updated for mobile touch */}
      <div
        className={`absolute bottom-4 right-4 text-white/60 text-xs sm:text-sm transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}
      >
        <span className="hidden sm:inline">Move cursor to interact</span>
        <span className="sm:hidden">Tap and drag to interact</span>
      </div>
    </div>
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

        {/* Video Preview - now centered as standalone element */}
        <div className="max-w-md mx-auto mb-12">
          <RevealOnScroll variant="zoom-blur" delay={100} duration={900}>
            <div className="relative rounded-2xl overflow-hidden">
              <VideoPreview
                url="https://www.instagram.com/reel/C5J_i05SgrN/"
                title="Powder Day"
                platform="instagram"
                aspectRatio="portrait"
                className="w-full"
              />
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-16">
          {/* Mobile: Horizontal scrollable row with scroll hint */}
          <div className="sm:hidden relative">
            <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
              <div className="flex gap-3 w-max">
                {skiingPrinciples.map((principle, index) => (
                  <RevealOnScroll key={principle.title} variant="slide-up" delay={index * 80}>
                    <SkiingPrincipleCard principle={principle} index={index} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
            {/* Scroll indicator */}
            <div className="flex justify-center mt-2 gap-1">
              <span className="text-xs text-muted-foreground">Swipe to see more</span>
              <svg
                className="w-4 h-4 text-muted-foreground animate-bounce-x"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Desktop: 3-2 grid layout */}
          <div className="hidden sm:block">
            {/* First row: 3 cards */}
            <div className="flex justify-center items-stretch gap-4 mb-4">
              {skiingPrinciples.slice(0, 3).map((principle, index) => (
                <RevealOnScroll key={principle.title} variant="slide-up" delay={index * 80}>
                  <SkiingPrincipleCard principle={principle} index={index} />
                </RevealOnScroll>
              ))}
            </div>
            {/* Second row: 2 cards centered */}
            <div className="flex justify-center items-stretch gap-4">
              {skiingPrinciples.slice(3, 5).map((principle, index) => (
                <RevealOnScroll key={principle.title} variant="slide-up" delay={(index + 3) * 80}>
                  <SkiingPrincipleCard principle={principle} index={index + 3} />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Aurora philosophy card - responsive height */}
          <RevealOnScroll variant="fade-in" delay={1000} duration={1200}>
            <div className="mt-8 min-h-[600px] sm:min-h-[500px] md:h-[400px] max-w-4xl mx-auto">
              <SkiPhilosophyCard />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

function BJJSection() {
  const domains = [
    {
      domain: "Language",
      icon: MessageSquare,
      color: RALLY_BLUE,
      content: "Vocabulary",
      form: "Grammar",
      use: "Conversation",
    },
    {
      domain: "Jazz",
      icon: Music,
      color: "#10B981",
      content: "Scales & Voicings",
      form: "Song Structure",
      use: "Improvisation",
    },
    {
      domain: "BJJ",
      icon: Shield,
      color: RED_STITCH,
      content: "Techniques",
      form: "Sequences",
      use: "Live Rolling",
    },
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
              <MagicHeading as="span" className="text-4xl sm:text-5xl font-bold text-white" variant="dark">
                The Language of Movement
              </MagicHeading>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Main content grid - image with scrollable text card overlay */}
        <RevealOnScroll variant="curtain" delay={100} duration={900}>
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left: Image with overlay card */}
            <div className="group relative">
              <div className="kaleidoscope-frame rounded-2xl overflow-hidden aspect-[4/3] transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src="/images/bjj-promotion-anime.jpg"
                    alt="Matthew receiving blue belt - anime style illustration"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />
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

            {/* Right: Scrollable text card */}
            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-[#005EB8]/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,94,184,0.15)]">
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, rgba(0,94,184,0.15) 0%, transparent 60%)`,
                }}
              />

              {/* Scrollable content */}
              <div className="relative p-6 max-h-[400px] lg:max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <h3 className="text-white font-semibold text-xl mb-4 sticky top-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent pb-4 -mt-2 pt-2 -mx-6 px-6">
                  Brazilian Jiu-Jitsu: The Language of Movement
                </h3>
                <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                  <p>
                    Learning Brazilian Jiu-Jitsu follows the same framework as learning language. The Bloom-Lahey model
                    describes language through content, form, and use. BJJ works the same way.
                  </p>
                  <p>
                    <span className="text-white font-medium">Content</span> is the vocabulary: hip escapes, guard
                    passes, kimuras, leg locks. Individual moves you drill until they become automatic.
                  </p>
                  <p>
                    <span className="text-white font-medium">Form</span> is grammar: how these techniques chain
                    together. A failed sweep becomes a submission attempt. A blocked pass opens a different angle.
                    Natural sequences emerge from understanding how positions connect.
                  </p>
                  <p>
                    <span className="text-white font-medium">Use</span> is conversation: reading your partner,
                    responding in real time, adapting to what they give you. This is where improvisation lives.
                  </p>
                  <p className="border-l-2 border-[#005EB8] pl-4 italic text-gray-400">
                    Improvisation is one of the most overlooked aspects of communication. It's the ability to create
                    within constraints. Jazz musicians don't play whatever they want. They work within chord changes,
                    song forms, rhythmic structures. The constraints enable creativity rather than limiting it.
                  </p>
                  <p>
                    BJJ operates the same way. You can't just do anything. There are rules, positions, physics. But
                    within those constraints, the combinations become infinite.{" "}
                    <span className="text-white font-medium">Finite moves, infinite responses.</span>
                  </p>
                  <p>
                    The training also teaches something harder to articulate: how to respond rather than react. When
                    someone larger and stronger has pinned you, panic wants to take over. The amygdala fires, triggering
                    fear and reactivity. But training builds pathways that let the prefrontal cortex maintain regulatory
                    control even under stress.
                  </p>
                  <p className="text-white">
                    You don't eliminate the stress response. You develop the capacity to think alongside it.
                  </p>
                  <p className="border-l-2 border-[#DC2626] pl-4 italic text-gray-400">
                    This is dissonance resolution in physical form. The uncomfortable position doesn't disappear. You
                    learn to work within it until you find your way back to balance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              <MagicHeading as="span" className="text-3xl sm:text-4xl md:text-5xl font-bold">
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

// Define DrumVideoCard component
function DrumVideoCard() {
  const videoRef = useRef<HTMLDivElement>(null)
  const { isActive: isHovered, setIsActive: setIsHovered } = useTouchHover(2000)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!videoRef.current) return
    const rect = videoRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setGlowPosition({ x: x * 100, y: y * 100 })
  }

  const googleDriveFileId = "1vUar0ekOgc_sHHRnnIym3woAIt9tKTrm"
  const embedUrl = `https://drive.google.com/file/d/${googleDriveFileId}/preview`
  const directUrl = `https://drive.google.com/file/d/${googleDriveFileId}/view?usp=sharing`

  return (
    <div
      ref={videoRef}
      className="relative rounded-2xl overflow-hidden group transition-all duration-300 ease-out shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}80, ${RED_STITCH}40)`,
        }}
      />

      {/* Video container */}
      <div className="relative aspect-video overflow-hidden bg-[#1a1a2e]">
        {/* Google Drive embedded video - always visible */}
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0 z-10"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title="Matthew Guggemos drum performance - Mahavishnu-ish Swing"
          loading="lazy"
        />

        {/* Platform badge */}
        <div
          className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white/90 backdrop-blur-sm z-20 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${RALLY_BLUE}cc, ${RED_STITCH}cc)` }}
        >
          30+ Years Behind the Kit
        </div>

        {/* Fallback link - positioned at bottom */}
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 backdrop-blur-sm z-20 hover:bg-white/20 transition-colors flex items-center gap-1.5"
          style={{ background: `rgba(0,0,0,0.5)` }}
        >
          <ExternalLink className="w-3 h-3" />
          Open in Google Drive
        </a>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10">
        <p className="text-white font-semibold text-sm sm:text-base">Mahavishnu-ish Swing</p>
        <p className="text-white/70 text-xs sm:text-sm">Real-time problem solving in music</p>
      </div>
    </div>
  )
}

// Placeholder for HarmonizedLearningSection, assuming it's imported elsewhere
// REMOVED: Placeholder HarmonizedLearningSection function definition
// const HarmonizedLearningSection = () => (
//   <section id="harmonized-learning" className="py-20 px-6 bg-gray-50 relative overflow-hidden">
//     <SpiralKaleidoscope opacity={0.05} className="z-0" />
//     <div className="relative z-10 max-w-5xl mx-auto text-center">
//       <RevealOnScroll variant="wave" duration={800}>
//         <div className="mb-12">
//           <div className="flex items-center justify-center gap-3 mb-3">
//             <Presentation size={32} style={{ color: RALLY_BLUE }} />
//             <h2 className="text-3xl sm:text-4xl font-bold">
//               <MagicHeading as="span" className="text-3xl sm:text-4xl font-bold">
//                 Harmonized Learning
//               </MagicHeading>
//             </h2>
//           </div>
//           <p className="text-muted-foreground text-lg">
//             A comprehensive framework for integrating diverse learning styles and modalities.
//           </p>
//         </div>
//       </RevealOnScroll>
//       <div className="prose prose-lg max-w-3xl mx-auto text-left text-muted-foreground">
//         <p>
//           Harmonized Learning is a pedagogical framework designed to create adaptive and engaging educational
//           experiences. It synthesizes insights from cognitive science, educational psychology, and user experience
//           design to cater to a wide spectrum of learners.
//         </p>
//         <ul className="list-disc pl-6">
//           <li>
//             **Multimodal Content Delivery:** Information is presented through various formats including text, video,
//             interactive simulations, audio lectures, and hands-on exercises.
//           </li>
//           <li>
//             **Personalized Learning Paths:** Learners can progress at their own pace, with adaptive algorithms
//             suggesting next steps based on performance and stated preferences.
//           </li>
//           <li>
//             **Active Learning Strategies:** Emphasis is placed on application and practice, encouraging learners
//             to actively engage with the material rather than passively consuming it.
//           </li>
//           <li>
//             **Feedback and Assessment:** Continuous feedback loops and diverse assessment methods ensure learners
//             understand their progress and identify areas for improvement.
//           </li>
//         </ul>
//         <p>
//           This approach is particularly effective for complex subjects that benefit from conceptual understanding,
//           practical application, and varied reinforcement.
//         </p>
//       </div>
//     </div>
//   </section>
// )

function CredentialsSection() {
  return (
    <section id="credentials" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <SpiralKaleidoscope opacity={0.05} className="z-0" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealOnScroll variant="wave" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              <MagicHeading as="span" className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Credentials & Recognition
              </MagicHeading>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground italic px-4">
              A glimpse into impactful contributions and distinguished roles.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, index) => (
            <RevealOnScroll key={cred.label} variant="slide-up" delay={index * 80} duration={600}>
              <CredentialChip cred={cred} index={index} />
            </RevealOnScroll>
          ))}
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

          <div className="mb-4 sm:mb-6">
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
            <span className="font-semibold text-foreground">{"Systems Conductor."}</span> Orchestrating AI, speech
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
                <MagicHeading as="span" className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  My Projects
                </MagicHeading>
              </h2>
              <p
                className="text-lg sm:text-xl text-muted-foreground italic px-4"
                style={{ textShadow: "0 1px 8px rgba(255,255,255,0.8)" }}
              >
                "Great conductors may not master every instrument, but they deeply understand each one's role."
              </p>
            </div>
          </RevealOnScroll>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <RevealOnScroll key={project.id} variant="slide-up" delay={index * 100} duration={600}>
                <ProjectCard
                  project={project}
                  index={index}
                  isHighlighted={highlightedProject === project.id}
                  onMouseEnter={() => setHighlightedProject(project.id)}
                  onMouseLeave={() => setHighlightedProject(null)}
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section
        id="music"
        className="py-16 sm:py-24 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        <SpiralKaleidoscope opacity={0.08} variant="dark" className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealOnScroll variant="flip-up" duration={800}>
            <div className="text-center mb-10 sm:mb-16">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                style={{ textShadow: "0 2px 15px rgba(0,0,0,0.7)" }}
              >
                Music
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 italic px-4">Exploring rhythm, harmony, and sound.</p>
            </div>
          </RevealOnScroll>

          {/* CHANGE: Only render first 3 bands in grid, not all 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {music.slice(0, 3).map((item, index) => (
              <RevealOnScroll key={item.band + index} variant="slide-up" delay={index * 100} duration={600}>
                <MusicCard item={item} index={index} />
              </RevealOnScroll>
            ))}
          </div>
          {/* CHANGE: Add centered Larry Vuckovich card separately */}
          <div className="flex justify-center mt-6">
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <RevealOnScroll variant="slide-up" delay={300} duration={600}>
                <MusicCard item={music[3]} index={3} />
              </RevealOnScroll>
            </div>
          </div>

          {/* Featured Albums */}
          <div className="mt-16 sm:mt-24">
            <RevealOnScroll variant="flip-up" duration={800}>
              <div className="text-center mb-10 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Featured Albums</h3>
                <p className="text-lg sm:text-xl text-gray-400 italic px-4">A selection of releases.</p>
              </div>
            </RevealOnScroll>
            {/* CHANGE: Restore simple grid layout for album cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAlbums.slice(0, 3).map((album, index) => (
                <RevealOnScroll key={album.album} variant="slide-up" delay={index * 100} duration={600}>
                  <FeaturedAlbumCard album={album} index={index} />
                </RevealOnScroll>
              ))}
            </div>
            {/* CHANGE: Add centered Snack(s) card separately */}
            <div className="flex justify-center mt-6">
              <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <RevealOnScroll variant="slide-up" delay={300} duration={600}>
                  <FeaturedAlbumCard album={featuredAlbums[3]} index={3} />
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Section */}
      <SpeakingSection />

      {/* Harmonized Learning Section */}
      <HarmonizedLearningSection />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Drumming Section */}
      <DrummingSection />

      {/* Skiing Section */}
      <SkiingSection />

      {/* BJJ Section */}
      <BJJSection />

      {/* Credentials Section */}
      <CredentialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold overflow-hidden"
                style={{ backgroundColor: RALLY_BLUE }}
              >
                <img
                  src="/images/drum-reflection-logo.png"
                  alt="Matthew Guggemos"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold">Matthew Guggemos</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/in/matthewguggemos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/matthewguggemos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a href="mailto:matt@itherapyllc.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Matthew Guggemos. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Docent */}
      <AIDocent onNavigate={handleNavigate} />

      {/* Theme Music Player */}
      <ThemeMusicPlayer />
    </div>
  )
}
