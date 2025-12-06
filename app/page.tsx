"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowRight, MessageCircle, Zap, Music, Users, BookOpen, Building2, ExternalLink, Menu, X } from "lucide-react"
import { MagicHeading } from "@/components/magic-text"

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
  { band: "Invincible Star Jazz", role: "Current", url: "https://www.instagram.com/invinciblestarjazz/" },
  { band: "Freighter", role: "Albums and tours" },
  { band: "miRthkon", role: "Albums and tours" },
  { band: "Larry Vuckovich", role: "Performance", url: "https://larryvuckovich.com/audio.htm" },
]

const featuredAlbums = [
  {
    band: "Freighter",
    album: "The Den",
    albumUrl: "https://freighter.bandcamp.com/album/the-den",
    featuredTrack: "Future Duke",
    trackUrl: "https://freighter.bandcamp.com/track/future-duke",
    color: "#1a1a2e",
  },
  {
    band: "miRthkon",
    album: "Vehicle",
    albumUrl: "https://mirthkon.bandcamp.com/album/vehicle",
    featuredTrack: "Honey Key Jamboree",
    trackUrl: "https://mirthkon.bandcamp.com/track/honey-key-jamboree",
    color: "#16213e",
  },
  {
    band: "Snack(s)",
    album: "Snack(s)",
    albumUrl: "https://altrockproductions.bandcamp.com/album/snack-s",
    featuredTrack: "Osedax",
    trackUrl: "https://altrockproductions.bandcamp.com/track/osedax",
    label: "AltrOck Productions",
    color: "#0f3460",
  },
]

const restorationDetails = [
  { label: "Year", value: "1966" },
  { label: "Make", value: "Ludwig Club Date" },
  { label: "Finish", value: "Silver Sparkle" },
  { label: "Restoration", value: "3 months" },
]

const skiingPrinciples = [
  { icon: "compass", title: "Plan Ahead", description: "Read the terrain before you commit to a line." },
  { icon: "shield", title: "Be Brave", description: "The mountain can be intimidating. Go anyway." },
  { icon: "balance", title: "Stay Balanced", description: "Can't always turn left. Can't always turn right." },
  { icon: "flex", title: "Be Flexible", description: "Adapt to trees, terrain, and other skiers." },
]

const drumLanguageSocials = [
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@drumlanguage",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/drumlanguage/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/drumlanguage/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

function useTilt(ref: React.RefObject<HTMLElement | null>) {
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20
      ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    },
    [ref],
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref, handleMouseMove, handleMouseLeave])
}

function useRipple() {
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement("span")
    ripple.className = "ripple"
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }, [])

  return createRipple
}

function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 0.3) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleMouseLeave = () => {
      el.style.transform = "translate(0px, 0px)"
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref, strength])
}

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
  useTilt(cardRef)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const isEasi = project.id === "easi"
  const needsWhiteText = !isEasi && (isHighlighted || isHovered)

  const getBackgroundColor = () => {
    if (isEasi) {
      return isHovered ? "#f5f5f5" : "white" // Light grey on hover for EASI
    }
    return needsWhiteText ? RED_STITCH : undefined
  }

  const cardContent = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group p-6 sm:p-8 rounded-2xl border-2 bg-white relative overflow-hidden
        cursor-pointer transition-all duration-500 ease-out
        hover:border-transparent hover:shadow-2xl
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${isHighlighted ? "ring-4 ring-offset-2 scale-[1.02] shadow-2xl" : "border-border"}
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
        transformStyle: "preserve-3d",
        ringColor: isHighlighted ? RALLY_BLUE : undefined,
        backgroundColor: getBackgroundColor(),
      }}
    >
      {isHighlighted && !isEasi && (
        <div className="absolute inset-0 animate-pulse opacity-20 -z-10" style={{ backgroundColor: RED_STITCH }} />
      )}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-0 transition-opacity duration-500 -z-10"
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}08 0%, ${RED_STITCH}05 100%)`,
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-20"
        style={{
          background: `linear-gradient(45deg, ${RALLY_BLUE}, ${RED_STITCH}, ${RALLY_BLUE})`,
          backgroundSize: "300% 300%",
          animation: "border-trace 3s ease infinite",
          padding: "2px",
        }}
      />

      <div className="flex items-start gap-4 sm:gap-6">
        <div
          className="project-icon w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative transition-colors duration-300"
          style={{ backgroundColor: needsWhiteText ? "rgba(255,255,255,0.2)" : `${RALLY_BLUE}10` }}
        >
          {project.logoUrl ? (
            <img
              src={project.logoUrl || "/placeholder.svg"}
              alt={`${project.name} logo`}
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              style={{
                filter: needsWhiteText
                  ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3)) brightness(1.1)"
                  : "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
              }}
            />
          ) : (
            <project.Icon
              size={28}
              color={needsWhiteText ? "#ffffff" : RALLY_BLUE}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          )}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-lg"
            style={{ backgroundColor: needsWhiteText ? "#ffffff" : RALLY_BLUE }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3
              className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                needsWhiteText ? "text-white" : "text-foreground"
              }`}
            >
              {project.name}
            </h3>
            <span
              className="stat-badge px-2 py-1 text-xs rounded-full font-medium transition-colors duration-300"
              style={{
                backgroundColor: needsWhiteText ? "rgba(255,255,255,0.2)" : `${RALLY_BLUE}15`,
                color: needsWhiteText ? "#ffffff" : RALLY_BLUE,
              }}
            >
              {project.stat}
            </span>
          </div>
          <p
            className={`text-lg mb-2 transition-colors duration-300 ${needsWhiteText ? "text-white/90" : "text-foreground/80"}`}
          >
            {project.tagline}
          </p>
          <p
            className={`text-sm sm:text-base mb-3 transition-colors duration-300 ${needsWhiteText ? "text-white/80" : "text-muted-foreground"}`}
          >
            {project.description}
          </p>

          {project.url && (
            <div
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                needsWhiteText ? "text-white" : "text-[#005EB8]"
              }`}
            >
              <span>Visit site</span>
              <ExternalLink
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          )}
        </div>

        <div
          className={`transition-all duration-300 hidden sm:block overflow-hidden ${
            needsWhiteText ? "text-white" : "text-border"
          }`}
        >
          <ArrowRight size={24} className="arrow-animate" />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-8 right-8 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: "#ffffff" }}
      />
    </div>
  )

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    )
  }

  return cardContent
}

function MusicCard({ item, index }: { item: (typeof music)[0]; index: number }) {
  const content = (
    <div
      className={`music-card p-6 rounded-2xl bg-white border border-border group transition-all duration-300 ${item.url ? "hover:border-[#005EB8] hover:shadow-lg cursor-pointer" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="icon-morph w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
        style={{ backgroundColor: `${RALLY_BLUE}10` }}
      >
        <Music size={24} color={RALLY_BLUE} className="transition-all duration-300 group-hover:rotate-12" />
      </div>
      <h3 className="font-semibold text-lg mb-1 group-hover:text-[#005EB8] transition-colors flex items-center gap-2">
        {item.band}
        {item.url && (
          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </h3>
      <p className="text-muted-foreground text-sm">{item.role}</p>
    </div>
  )

  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

function FeaturedAlbumCard({ album, index }: { album: (typeof featuredAlbums)[0]; index: number }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] p-1"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}, ${RED_STITCH}, ${RALLY_BLUE})`,
          backgroundSize: "200% 200%",
          animation: "gradient-shift 3s ease infinite",
        }}
      />

      <div className="relative bg-[#0a0a0a] rounded-xl p-6 h-full">
        <div
          className="absolute top-4 right-4 w-16 h-16 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
          style={{ transition: "transform 2s ease-out, opacity 0.5s ease" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="18" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="50" cy="50" r="8" fill="white" />
            <circle cx="50" cy="50" r="3" fill="#0a0a0a" />
          </svg>
        </div>

        <div className="mb-4">
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: RALLY_BLUE }}>
            {album.band}
          </span>
          {album.label && <span className="text-xs text-white/40 ml-2">via {album.label}</span>}
        </div>

        <a href={album.albumUrl} target="_blank" rel="noopener noreferrer" className="block group/album">
          <h3 className="text-xl font-bold text-white mb-1 group-hover/album:text-[#005EB8] transition-colors duration-300 flex items-center gap-2">
            {album.album}
            <svg
              className="w-4 h-4 opacity-0 -translate-x-2 group-hover/album:opacity-100 group-hover/album:translate-x-0 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </h3>
          <p className="text-white/50 text-sm">Full Album on Bandcamp</p>
        </a>

        <div className="my-4 h-px bg-white/10 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{ backgroundColor: RED_STITCH }}
          />
        </div>

        <a
          href={album.trackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group/track"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover/track:scale-110 group-hover/track:shadow-lg relative overflow-hidden"
            style={{ backgroundColor: RALLY_BLUE }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover/track:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${RALLY_BLUE}, ${RED_STITCH})`,
              }}
            />
            <svg className="w-4 h-4 text-white relative z-10 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Featured Track</p>
            <p className="text-white font-medium group-hover/track:text-[#DC2626] transition-colors duration-300 flex items-center gap-2">
              {album.featuredTrack}
              <span className="inline-block w-0 group-hover/track:w-4 overflow-hidden transition-all duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </p>
          </div>
        </a>

        <div className="absolute bottom-4 left-6 right-20 h-8 flex items-end gap-0.5 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-white rounded-full transition-all duration-300"
              style={{
                height: `${Math.sin(i * 0.5) * 50 + 50}%`,
                transitionDelay: `${i * 20}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function CredentialChip({ cred, index }: { cred: (typeof credentials)[0]; index: number }) {
  return (
    <div
      className="credential-chip px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-[#005EB8] hover:text-white"
      style={{
        backgroundColor: index % 2 === 0 ? `${RALLY_BLUE}10` : `${RED_STITCH}10`,
        color: index % 2 === 0 ? RALLY_BLUE : RED_STITCH,
      }}
    >
      {cred.label}
    </div>
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
          <div className="group relative">
            <div
              className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"
              style={{
                background: `linear-gradient(135deg, ${RALLY_BLUE}40, transparent 50%, ${RED_STITCH}40)`,
              }}
            />

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
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: RALLY_BLUE }}
              />
              <h3 className="text-2xl font-bold mb-4 text-foreground">The Gold in the Cracks</h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                There is something profound about taking an old instrument and restoring it into something beautiful and
                unique. It connects to the Japanese practice of{" "}
                <span className="font-semibold text-foreground">kintsugi</span> - filling cracks in pottery with gold so
                that old faults become focal points of beauty.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a drummer, knowing how to restore and repair instruments is a deep part of the practice. Every dent
                tells a story. Every repair is an opportunity for improvement. The goal is not to hide the history, but
                to honor it while creating something that plays and sounds better than ever.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="philosophy-card p-5 rounded-xl border border-border bg-white group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${RALLY_BLUE}10` }}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke={RALLY_BLUE}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1 group-hover:text-[#005EB8] transition-colors">Patience</h4>
                <p className="text-sm text-muted-foreground">Three months of careful work. No shortcuts.</p>
              </div>

              <div className="philosophy-card p-5 rounded-xl border border-border bg-white group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${RED_STITCH}10` }}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke={RED_STITCH}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1 group-hover:text-[#DC2626] transition-colors">Care</h4>
                <p className="text-sm text-muted-foreground">Every lug, every hoop, every detail matters.</p>
              </div>

              <div className="philosophy-card p-5 rounded-xl border border-border bg-white group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${RALLY_BLUE}` }}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke={RALLY_BLUE}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1 group-hover:text-[#005EB8] transition-colors">Innovation</h4>
                <p className="text-sm text-muted-foreground">Combining old techniques with new ideas.</p>
              </div>

              <div className="philosophy-card p-5 rounded-xl border border-border bg-white group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${RED_STITCH}` }}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke={RED_STITCH}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1 group-hover:text-[#DC2626] transition-colors">Community</h4>
                <p className="text-sm text-muted-foreground">Connecting with others to share knowledge and skills.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <a
            href="#"
            className="font-bold text-lg transition-colors duration-300 hover:opacity-70"
            style={{ color: isScrolled ? "#0a0a0a" : "#0a0a0a" }}
          >
            Matthew Guggemos
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-all duration-300 relative group"
                style={{ color: isScrolled ? "#0a0a0a" : "#0a0a0a" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: RED_STITCH }}
                />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 bg-white">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-sm font-medium transition-colors duration-300 hover:text-[#005EB8]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Music", href: "#music" },
  { label: "Albums", href: "#albums" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Credentials", href: "#credentials" },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="bg-white">
      <Header />

      <div className="pt-24">
        <section id="projects" className="max-w-6xl mx-auto px-6 sm:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">My Projects</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isHighlighted={false} />
            ))}
          </div>
        </section>

        <section id="music" className="max-w-6xl mx-auto px-6 sm:px-8 mt-24">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">Music</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {music.map((item, index) => (
              <MusicCard key={item.band} item={item} index={index} />
            ))}
          </div>
        </section>

        <section id="albums" className="max-w-6xl mx-auto px-6 sm:px-8 mt-24">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">Featured Albums</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {featuredAlbums.map((album, index) => (
              <FeaturedAlbumCard key={album.album} album={album} index={index} />
            ))}
          </div>
        </section>

        <section id="credentials" className="max-w-6xl mx-auto px-6 sm:px-8 mt-24 pb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">Credentials</h1>
          <div className="flex flex-wrap gap-3">
            {credentials.map((cred, index) => (
              <CredentialChip key={cred.label} cred={cred} index={index} />
            ))}
          </div>
        </section>

        <PhilosophySection />
      </div>
    </div>
  )
}
