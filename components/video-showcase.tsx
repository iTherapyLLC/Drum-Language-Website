"use client"

import type React from "react"

import { useState, useRef } from "react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

interface FeaturedVideo {
  id: string
  title: string
  description: string
  platform: "youtube" | "tiktok" | "instagram"
  embedUrl: string
  linkUrl: string
  vibe: "wild" | "melodic" | "rhythmic"
  accent: string
}

const featuredVideos: FeaturedVideo[] = [
  {
    id: "mirthkon-live",
    title: "miRthkon Live",
    description: "Controlled chaos. Experimental prog at its finest.",
    platform: "youtube",
    embedUrl: "https://www.youtube.com/embed/Vq8hdNcL-zY",
    linkUrl: "https://youtu.be/Vq8hdNcL-zY?si=Vmmp7qCUkOfvy3qh",
    vibe: "wild",
    accent: "#ff3366",
  },
  {
    id: "harmonized-learning",
    title: "Harmonized Learning",
    description: "Theme song for the Harmonized Learning presentation.",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/embed/v2/7412345678901234567",
    linkUrl: "https://www.tiktok.com/t/ZP8UpBKFR/",
    vibe: "melodic",
    accent: RALLY_BLUE,
  },
  {
    id: "balkan-groove",
    title: "Balkan",
    description: "Odd meters meet pocket. Speed bag meets drums.",
    platform: "instagram",
    embedUrl: "https://www.instagram.com/reel/DIKcl9tyJTv/embed",
    linkUrl: "https://www.instagram.com/reel/DIKcl9tyJTv/?igsh=NTc4MTIwNjQ2YQ==",
    vibe: "rhythmic",
    accent: "#833AB4",
  },
]

// Animated noise pattern for wild vibe
function NoisePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

// Platform icons
function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

// Individual video card with platform-specific styling
function VideoCard({ video, index }: { video: FeaturedVideo; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateY(${x * 8}deg) 
      rotateX(${-y * 8}deg) 
      scale(1.02)
      translateZ(20px)
    `
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale(1) translateZ(0)"
    }
  }

  // Vibe-specific background patterns
  const getVibeStyles = () => {
    switch (video.vibe) {
      case "wild":
        return {
          gradient: `linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a0a 100%)`,
          borderGradient: `linear-gradient(135deg, ${video.accent}, #ff9933, ${video.accent})`,
          glowColor: video.accent,
        }
      case "melodic":
        return {
          gradient: `linear-gradient(135deg, #0a0a0f 0%, #0a1a2e 50%, #0a0a0f 100%)`,
          borderGradient: `linear-gradient(135deg, ${video.accent}, #00d4ff, ${video.accent})`,
          glowColor: video.accent,
        }
      case "rhythmic":
        return {
          gradient: `linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)`,
          borderGradient: `linear-gradient(135deg, ${video.accent}, #fd1d1d, #fcb045, ${video.accent})`,
          glowColor: video.accent,
        }
    }
  }

  const vibeStyles = getVibeStyles()

  return (
    <div
      ref={cardRef}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        animationDelay: `${index * 150}ms`,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: vibeStyles.borderGradient,
          backgroundSize: "200% 200%",
          animation: isHovered ? "gradient-shift 2s ease infinite" : "none",
          filter: `blur(8px)`,
          transform: "scale(1.02)",
        }}
      />

      {/* Main card container */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: vibeStyles.gradient,
          boxShadow: isHovered ? `0 20px 60px -15px ${vibeStyles.glowColor}40` : "0 10px 30px -10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Noise overlay for wild vibe */}
        {video.vibe === "wild" && <NoisePattern />}

        {/* Platform badge */}
        <div className="absolute top-4 left-4 z-20">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 group-hover:scale-105"
            style={{
              background: `${video.accent}20`,
              border: `1px solid ${video.accent}40`,
            }}
          >
            <span style={{ color: video.accent }}>
              <PlatformIcon platform={video.platform} />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-white/80">{video.platform}</span>
          </div>
        </div>

        {/* Vibe indicator */}
        <div className="absolute top-4 right-4 z-20">
          <div
            className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
            style={{
              background: isHovered ? video.accent : "rgba(255,255,255,0.1)",
              color: isHovered ? "white" : "rgba(255,255,255,0.6)",
            }}
          >
            {video.vibe}
          </div>
        </div>

        {/* Video embed area */}
        <div className="relative aspect-video">
          {isPlaying ? (
            <iframe
              src={`${video.embedUrl}?autoplay=1`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Placeholder with animated elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated waveform for wild vibe */}
                {video.vibe === "wild" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 mx-0.5 bg-white rounded-full"
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          animation: `waveform-dance ${0.3 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.02}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Concentric circles for melodic vibe */}
                {video.vibe === "melodic" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[1, 2, 3, 4].map((ring) => (
                      <div
                        key={ring}
                        className="absolute rounded-full border opacity-10 group-hover:opacity-30 transition-opacity"
                        style={{
                          width: `${ring * 25}%`,
                          height: `${ring * 25}%`,
                          borderColor: video.accent,
                          animation: `pulse-ring ${2 + ring * 0.5}s ease-in-out infinite`,
                          animationDelay: `${ring * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Rotating geometric for rhythmic vibe */}
                {video.vibe === "rhythmic" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-30 transition-opacity">
                    <div
                      className="w-32 h-32 border-2 border-white/30"
                      style={{
                        animation: "spin-slow 8s linear infinite",
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    />
                    <div
                      className="absolute w-24 h-24 border border-white/20"
                      style={{
                        animation: "spin-slow 6s linear infinite reverse",
                        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                      }}
                    />
                  </div>
                )}

                {/* Play button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${video.accent}, ${video.accent}dd)`,
                    boxShadow: isHovered
                      ? `0 0 40px ${video.accent}60, 0 0 80px ${video.accent}30`
                      : `0 10px 30px ${video.accent}40`,
                  }}
                >
                  {/* Pulse rings */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      border: `2px solid ${video.accent}`,
                      animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      border: `2px solid ${video.accent}`,
                      animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s",
                    }}
                  />

                  {/* Play icon */}
                  <svg
                    className="w-8 h-8 text-white ml-1 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Scanlines effect for wild vibe */}
              {video.vibe === "wild" && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                  }}
                />
              )}
            </>
          )}
        </div>

        {/* Content area */}
        <div className="relative p-6">
          {/* Title with hover effect */}
          <a href={video.linkUrl} target="_blank" rel="noopener noreferrer" className="block group/title">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3 transition-colors duration-300 group-hover/title:text-white">
              <span
                className="relative"
                style={{
                  textShadow: isHovered ? `0 0 20px ${video.accent}60` : "none",
                }}
              >
                {video.title}
              </span>
              <svg
                className="w-5 h-5 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300"
                style={{ color: video.accent }}
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
          </a>

          <p className="text-white/60 text-sm leading-relaxed">{video.description}</p>

          {/* Animated accent line */}
          <div className="mt-4 h-0.5 rounded-full overflow-hidden bg-white/10">
            <div
              className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out rounded-full"
              style={{ background: vibeStyles.borderGradient }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function VideoShowcase() {
  return (
    <div className="mt-16">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6"
          style={{
            background: `linear-gradient(135deg, ${RALLY_BLUE}, ${RED_STITCH})`,
            boxShadow: `0 4px 20px ${RALLY_BLUE}40`,
          }}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </span>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Featured Performances</h3>
          <p className="text-sm text-muted-foreground">Live drums, original music, and rhythmic experiments</p>
        </div>
      </div>

      {/* Video grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {featuredVideos.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i} />
        ))}
      </div>
    </div>
  )
}
