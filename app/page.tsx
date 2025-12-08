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
  Mountain,
  Target,
  Shield,
  Shuffle,
  Compass,
  Baby,
  Presentation,
  Play,
  Brain,
  Award,
  DollarSign,
  Star,
} from "lucide-react"
import { MagicHeading } from "@/components/magic-text"
import { VideoPreview } from "@/components/video-preview"
import { TiltCard } from "@/components/tilt-card"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import SpiralKaleidoscope from "@/components/spiral-kaleidoscope"
import Image from "next/image"
import { SwirledCard } from "@/components/swirled-card"
import { useTouchHover } from "@/hooks/use-touch-hover"
import { AnimatedProfile } from "@/components/animated-profile"

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
  { label: "Home", section: "hero" },
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

function AlbumCard({ album, index }: { album: (typeof featuredAlbums)[0]; index: number }) {
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
          <MagicHeading as="h2" className="text-4xl font-bold mb-12 text-center" variant="light">
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
                className="h-full rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col tilt-card glow-border group-hover:bg-[#005EB8] group-hover:border-transparent"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>

                <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
                  <img
                    src="/images/national-academies-workshop.jpg"
                    alt="National Academies Workshop - Exploring the Bidirectional Relationship Between AI and Neuroscience"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient fade on bottom edge */}
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent group-hover:from-[#005EB8] transition-all duration-500" />
                </div>

                {/* Content section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Header section */}
                  <div className="relative z-10 flex flex-col justify-start">
                    <div className="flex items-start gap-4">
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

                  {/* Subtitle */}
                  <p className="text-lg text-foreground/80 group-hover:text-white/90 transition-colors duration-300 mt-4 relative z-10">
                    AI and Neuroscience
                  </p>

                  {/* Description section */}
                  <div className="relative z-10 flex-1 mt-4 overflow-hidden">
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                      Bidirectional Relationship Between AI and Neuroscience. October 2024 workshop exploring how
                      advances in AI and neuroscience inform each other.
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
                className="h-full rounded-2xl relative overflow-hidden bg-white border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[280px] flex flex-col tilt-card glow-border group-hover:bg-[#DC2626] group-hover:border-transparent"
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>

                <div className="relative w-full aspect-[16/9] shrink-0 overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100">
                  <img
                    src="/images/mrj-summer-2025.jpg"
                    alt="Mensa Research Journal Summer 2025 - Human Intelligence in the Age of AI"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient fade on bottom edge */}
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent group-hover:from-[#DC2626] transition-all duration-500" />
                </div>

                {/* Content section */}
                <div className="flex-1 p-6 flex flex-col">
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

                {/* Shimmer sweep effect */}
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
  const bloomLaheyFramework = [
    {
      title: "Content",
      description: "Concepts like timing, leverage, control: what gets communicated through movement.",
      icon: Brain,
    },
    {
      title: "Form",
      description: "Structural elements: guard, mount, submissions. The building blocks of grappling.",
      icon: Building2,
    },
    {
      title: "Use",
      description: "Adapting techniques to context: training intensity, body type, opponent style.",
      icon: Users,
    },
  ]

  const promptingHierarchy = [
    { level: 1, name: "Full physical", description: "Complete hands-on guidance" },
    { level: 2, name: "Partial physical", description: "Light touch to initiate movement" },
    { level: 3, name: "Model", description: "Demonstrate the technique" },
    { level: 4, name: "Gesture", description: "Point or motion toward the solution" },
    { level: 5, name: "Indirect verbal", description: '"What comes next?"' },
    { level: 6, name: "Direct verbal", description: '"Frame your hip here"' },
    { level: 7, name: "Independent", description: "Learner executes without support" },
  ]

  return (
    <section id="bjj" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <SpiralKaleidoscope opacity={0.08} baseHue={210} className="mix-blend-screen" />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <RevealOnScroll variant="flip-up" duration={800}>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Jiu-Jitsu as Language</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The Bloom-Lahey framework describes language through Content, Form, and Use. Ten years of training has
              revealed BJJ operates the same way.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="fade" delay={200} duration={700}>
          <div className="relative mb-12 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="aspect-[4/3] relative">
              <Image
                src="/images/bjj-promotion.png"
                alt="Blue belt promotion at Crosley Gracie Jiu-Jitsu"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-1">Crosley Gracie Jiu-Jitsu</h3>
                <p className="text-gray-300 text-sm">Ten years of study under Ryan Murphy.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="flip-up" delay={300} duration={700}>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {bloomLaheyFramework.map((item, index) => (
              <div
                key={index}
                className="flex-1 min-w-[200px] max-w-[280px] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#005EB8]/50 hover:scale-105 transition-all duration-300"
              >
                <item.icon className="w-8 h-8 text-[#005EB8] mb-3" />
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="flip-up" delay={400} duration={700}>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-[calc(50%-1rem)] min-w-[300px] max-w-[500px]">
              <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">The Prompting Hierarchy</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Speech-language pathology uses a prompting hierarchy to guide learners toward independence. The
                  framework applies directly to teaching jiu-jitsu techniques and, increasingly, to how I interact with
                  AI systems.
                </p>
                <div className="space-y-3">
                  {promptingHierarchy.map((item) => (
                    <div key={item.level} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#005EB8]/20 text-[#005EB8] flex items-center justify-center text-sm font-medium">
                        {item.level}
                      </span>
                      <div>
                        <span className="text-white font-medium">{item.name}</span>
                        <span className="text-gray-500 mx-2">—</span>
                        <span className="text-gray-400">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[calc(50%-1rem)] min-w-[300px] max-w-[500px]">
              <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Stress Inoculation</h3>
                <p className="text-gray-400 leading-relaxed">
                  Jazz musicians work within chord changes, song forms, rhythmic structures. The constraints enable
                  creativity. BJJ operates identically. Training builds neural pathways that let the prefrontal cortex
                  maintain control under stress. You don't eliminate the stress response. You develop capacity to{" "}
                  <span className="text-white font-medium">think alongside it</span>.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = [
        "hero",
        "projects",
        "music",
        "speaking",
        "philosophy",
        "skiing",
        "bjj",
        "credentials",
        "contact",
      ]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Profile photo as logo */}
            <button onClick={() => scrollToSection("hero")} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#005EB8]/20">
                <img src="/images/profile-photo.png" alt="Matthew Guggemos" className="w-full h-full object-cover" />
              </div>
            </button>

            {/* Nav items */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className={`text-sm font-medium transition-colors hover:text-[#005EB8] ${
                    activeSection === item.section ? "text-[#005EB8]" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Kaleidoscope */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Centered Kaleidoscope Mandala */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] opacity-[0.12]">
            <SpiralKaleidoscope opacity={1} className="w-full h-full" />
          </div>
        </div>

        {/* Gradient fade to white at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 pt-20">
          {/* Animated Profile Photo at Mandala Focal Point */}
          <div className="flex justify-center mb-8">
            <AnimatedProfile src="/images/profile-photo.png" alt="Matthew Guggemos" />
          </div>

          {/* Name with Magic Text */}
          <MagicHeading as="h1" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Matthew Guggemos
          </MagicHeading>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-foreground/70 mb-6 max-w-2xl mx-auto">
            Communication Scientist. AI Innovator. Professional Drummer.
          </p>

          {/* Credential highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-3 py-1 text-sm bg-[#005EB8]/10 text-[#005EB8] rounded-full">
              National Academies Speaker
            </span>
            <span className="px-3 py-1 text-sm bg-[#005EB8]/10 text-[#005EB8] rounded-full">
              M.S. Speech Pathology, CCC-ASHA
            </span>
            <span className="px-3 py-1 text-sm bg-[#005EB8]/10 text-[#005EB8] rounded-full">
              Co-Founder/CTO iTherapy
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce mt-12">
            <ArrowRight className="w-6 h-6 rotate-90 text-foreground/40 mx-auto" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background relative overflow-hidden">
        <SpiralKaleidoscope opacity={0.04} className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              <MagicHeading as="span">Products & Projects</MagicHeading>
            </h2>
            <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
              AI-powered tools transforming speech therapy, communication, and education.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
        <SpiralKaleidoscope opacity={0.06} baseHue={210} className="mix-blend-screen" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
              <MagicHeading as="span" variant="dark">
                Music
              </MagicHeading>
            </h2>
            <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
              30+ years of professional drumming. International touring and recording.
            </p>
          </RevealOnScroll>

          {/* Bands */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {music.map((item, index) => (
              <MusicCard key={item.band} item={item} index={index} />
            ))}
          </div>

          {/* Featured Albums */}
          <RevealOnScroll>
            <h3 className="text-xl font-semibold text-white/90 mb-6 text-center">Featured Albums</h3>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featuredAlbums.map((album, index) => (
              <AlbumCard key={`${album.band}-${album.album}`} album={album} index={index} />
            ))}
          </div>

          {/* Featured Videos */}
          <RevealOnScroll>
            <h3 className="text-xl font-semibold text-white/90 mb-6 text-center">Featured Videos</h3>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredVideos.map((video, index) => (
              <VideoPreview key={index} {...video} />
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Section */}
      <SpeakingSection />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Skiing Section */}
      <SkiingSection />

      {/* BJJ Section */}
      <BJJSection />

      {/* Credentials Section */}
      <section id="credentials" className="py-20 bg-background relative overflow-hidden">
        <SpiralKaleidoscope opacity={0.04} className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              <MagicHeading as="span">Credentials & Recognition</MagicHeading>
            </h2>
            <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
              Building credibility through research, leadership, and federal funding.
            </p>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred, index) => (
              <RevealOnScroll key={cred.label} delay={index * 100}>
                <CredentialChip cred={cred} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#f8f9fa] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <MagicHeading as="span">Start a Conversation</MagicHeading>
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Interested in collaboration, consulting, or just want to connect? Reach out and let's explore how we can
              work together.
            </p>
          </RevealOnScroll>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:matt@itherapyllc.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#005EB8] text-white rounded-lg font-medium hover:bg-[#004a93] transition-colors"
            >
              <ExternalLink size={18} />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/matthewguggemos/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#005EB8] text-[#005EB8] rounded-lg font-medium hover:bg-[#005EB8]/10 transition-colors"
            >
              <ExternalLink size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                <img src="/images/profile-photo.png" alt="Matthew Guggemos" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold">Matthew Guggemos</p>
                <p className="text-sm text-white/60">Intelligence Conductor</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://www.itherapyllc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                iTherapy LLC
              </a>
              <a
                href="https://www.linkedin.com/in/matthewguggemos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/drumlanguage/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
            </div>

            <p className="text-white/50 text-sm">© 2025 Matthew Guggemos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
