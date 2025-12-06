"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Play, ExternalLink } from "lucide-react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

interface VideoPreviewProps {
  url: string
  title?: string
  platform?: "instagram" | "youtube" | "generic"
  aspectRatio?: "portrait" | "landscape" | "square"
  className?: string
}

// Extract Instagram post ID from URL
function getInstagramId(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel)\/([^/?]+)/)
  return match ? match[1] : null
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&/?]+)/)
  return match ? match[1] : null
}

export function VideoPreview({
  url,
  title,
  platform = "generic",
  aspectRatio = "portrait",
  className = "",
}: VideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showEmbed, setShowEmbed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const aspectClasses = {
    portrait: "aspect-[9/16]",
    landscape: "aspect-video",
    square: "aspect-square",
  }

  const instagramId = platform === "instagram" ? getInstagramId(url) : null
  const youtubeId = platform === "youtube" ? getYouTubeId(url) : null

  const youtubeThumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -15
    const rotateY = (x - 0.5) * 15
    containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    containerRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    setIsHovered(false)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 group cursor-pointer transition-all duration-500 ease-out ${aspectClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowEmbed(true)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}60, ${RED_STITCH}40)`,
        }}
      />

      {/* Platform-specific thumbnail or embed */}
      {showEmbed ? (
        <div className="absolute inset-0">
          {instagramId && (
            <iframe
              src={`https://www.instagram.com/p/${instagramId}/embed`}
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              allow="encrypted-media"
            />
          )}
          {youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <>
          {youtubeThumbnail && (
            <img
              src={youtubeThumbnail || "/placeholder.svg"}
              alt={title || "Video thumbnail"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Stylized placeholder - only show waveform if no thumbnail */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Animated waveform background - hide when we have thumbnail */}
            {!youtubeThumbnail && (
              <div className="absolute inset-0 flex items-end justify-center gap-1 p-8 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 bg-white rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.sin(i * 0.5 + (isHovered ? 2 : 0)) * 30 + 40}%`,
                      animationDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Play button */}
            <div
              className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
              style={{
                backgroundColor: RALLY_BLUE,
                boxShadow: isHovered ? `0 0 40px ${RALLY_BLUE}80` : "none",
              }}
            >
              <Play className="w-8 h-8 text-white ml-1" fill="white" />

              {/* Ripple effect */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  border: `2px solid ${RALLY_BLUE}`,
                  animation: isHovered ? "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" : "none",
                }}
              />
            </div>

            {/* Title */}
            {title && (
              <p className="relative z-10 mt-4 text-white font-medium text-center px-4 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                {title}
              </p>
            )}

            {/* Platform badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white/90 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              {platform === "instagram" ? "Instagram Reel" : platform === "youtube" ? "YouTube" : "Video"}
            </div>

            {/* External link hint */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Gradient overlay - stronger when we have thumbnail */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: youtubeThumbnail
                ? "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)"
                : "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)",
              opacity: isHovered ? 0.4 : 0.6,
            }}
          />
        </>
      )}

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}30 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(-45deg, ${RED_STITCH}30 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}
