"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Play, ExternalLink } from "lucide-react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

interface VideoPreviewProps {
  url: string
  title?: string
  platform?: "instagram" | "youtube" | "tiktok" | "googledrive" | "generic"
  aspectRatio?: "portrait" | "landscape" | "square"
  className?: string
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&/?]+)/)
  return match ? match[1] : null
}

// Extract Instagram reel ID from URL
function getInstagramReelId(url: string): string | null {
  const match = url.match(/instagram\.com\/reel\/([^/?]+)/)
  return match ? match[1] : null
}

function getGoogleDriveId(url: string): string | null {
  const match = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/)
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
  const [isClicked, setIsClicked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const aspectClasses = {
    portrait: "aspect-[9/16]",
    landscape: "aspect-video",
    square: "aspect-square",
  }

  const youtubeId = platform === "youtube" ? getYouTubeId(url) : null
  const youtubeThumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null
  const instagramReelId = platform === "instagram" ? getInstagramReelId(url) : null
  const googleDriveId = platform === "googledrive" ? getGoogleDriveId(url) : null

  // 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isPlaying) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -10
    const rotateY = (x - 0.5) * 10
    containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    containerRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    setIsHovered(false)
  }

  const handleYouTubePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsPlaying(true)
  }

  const handleGoogleDrivePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsPlaying(true)
  }

  const handleExternalOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsClicked(true)
    // Brief animation before opening
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer")
      setIsClicked(false)
    }, 200)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 group transition-all duration-500 ease-out ${aspectClasses[aspectRatio]} ${className} ${isClicked ? "scale-95 opacity-80" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}60, ${RED_STITCH}40)`,
        }}
      />

      {platform === "youtube" && youtubeId ? (
        isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={title || "YouTube video"}
          />
        ) : (
          <>
            {/* YouTube thumbnail */}
            <img
              src={youtubeThumbnail || "/placeholder.svg"}
              alt={title || "Video thumbnail"}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Play button */}
            <button
              onClick={handleYouTubePlay}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
            >
              <div
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: RALLY_BLUE,
                  boxShadow: isHovered ? `0 0 40px ${RALLY_BLUE}80` : `0 4px 20px rgba(0,0,0,0.4)`,
                }}
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="white" />
              </div>
              {title && (
                <p className="mt-3 sm:mt-4 text-white font-medium text-center px-3 sm:px-4 drop-shadow-lg text-sm sm:text-base">
                  {title}
                </p>
              )}
            </button>

            {/* Platform badge */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-white/90 backdrop-blur-sm bg-red-600/80">
              YouTube
            </div>
          </>
        )
      ) : platform === "instagram" ? (
        <>
          {instagramReelId ? (
            <iframe
              src={`https://www.instagram.com/reel/${instagramReelId}/embed/`}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              title={title || "Instagram Reel"}
            />
          ) : (
            <>
              {/* Fallback gradient for non-reel Instagram URLs */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]" />

              {/* Shimmer animation */}
              <div className="absolute inset-0 opacity-30 overflow-hidden">
                <div
                  className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                />
              </div>
            </>
          )}

          {/* Play button overlay - only show if no embed or for click-through */}
          {!instagramReelId && (
            <button
              onClick={handleExternalOpen}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
            >
              <div
                className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 bg-white/20 backdrop-blur-sm ${isClicked ? "scale-90" : "group-hover:scale-110"}`}
                style={{
                  boxShadow: isHovered ? "0 0 40px rgba(255,255,255,0.4)" : "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="white" />
              </div>
              {title && (
                <p className="mt-3 sm:mt-4 text-white font-medium text-center px-3 sm:px-4 drop-shadow-lg text-sm sm:text-base">
                  {title}
                </p>
              )}
              <p className="mt-1 sm:mt-2 text-white/80 text-[10px] sm:text-xs flex items-center gap-1">
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Opens in Instagram
              </p>
            </button>
          )}

          {/* Platform badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-white/90 backdrop-blur-sm bg-gradient-to-r from-[#833AB4] to-[#FD1D52] z-20">
            Instagram
          </div>
        </>
      ) : platform === "tiktok" ? (
        <>
          {/* TikTok animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#010101] via-[#161823] to-[#010101]" />

          {/* Animated bars */}
          <div className="absolute inset-0 flex items-end justify-center gap-0.5 sm:gap-1 p-4 sm:p-8 opacity-30">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 sm:w-2 bg-gradient-to-t from-[#69C9D0] to-[#EE1D52] rounded-full animate-pulse"
                style={{
                  height: `${Math.sin(i * 0.5) * 30 + 40}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <button
            onClick={handleExternalOpen}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
          >
            <div
              className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isClicked ? "scale-90" : "group-hover:scale-110"}`}
              style={{
                background: "linear-gradient(135deg, #69C9D0, #EE1D52)",
                boxShadow: isHovered ? "0 0 40px rgba(238, 29, 82, 0.5)" : "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="white" />
            </div>
            {title && (
              <p className="mt-3 sm:mt-4 text-white font-medium text-center px-3 sm:px-4 opacity-90 text-sm sm:text-base">
                {title}
              </p>
            )}
            <p className="mt-1 sm:mt-2 text-white/70 text-[10px] sm:text-xs flex items-center gap-1">
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Opens in TikTok
            </p>
          </button>

          {/* Platform badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-white/90 backdrop-blur-sm bg-black/70">
            TikTok
          </div>
        </>
      ) : platform === "googledrive" && googleDriveId ? (
        <>
          {isPlaying ? (
            <iframe
              src={`https://drive.google.com/file/d/${googleDriveId}/preview`}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={title || "Google Drive video"}
            />
          ) : (
            <>
              {/* Jazz-inspired gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />

              {/* Musical waveform animation */}
              <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 sm:w-1.5 rounded-full animate-pulse"
                    style={{
                      height: `${Math.sin(i * 0.3) * 25 + 35}%`,
                      background: `linear-gradient(to top, ${RALLY_BLUE}, ${RED_STITCH})`,
                      animationDelay: `${i * 0.08}s`,
                      animationDuration: "1.2s",
                    }}
                  />
                ))}
              </div>

              {/* Play button */}
              <button
                onClick={handleGoogleDrivePlay}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
              >
                <div
                  className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isClicked ? "scale-90" : "group-hover:scale-110"}`}
                  style={{
                    background: `linear-gradient(135deg, ${RALLY_BLUE}, ${RED_STITCH})`,
                    boxShadow: isHovered ? `0 0 40px ${RALLY_BLUE}80` : "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="white" />
                </div>
                {title && (
                  <p className="mt-3 sm:mt-4 text-white font-medium text-center px-3 sm:px-4 drop-shadow-lg text-sm sm:text-base">
                    {title}
                  </p>
                )}
              </button>

              {/* Platform badge */}
              <div
                className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-white/90 backdrop-blur-sm"
                style={{ background: `linear-gradient(135deg, ${RALLY_BLUE}cc, ${RED_STITCH}cc)` }}
              >
                Video
              </div>
            </>
          )}
        </>
      ) : (
        // Generic fallback
        <button
          onClick={handleExternalOpen}
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="absolute inset-0 flex items-end justify-center gap-1 p-8 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-white rounded-full"
                style={{ height: `${Math.sin(i * 0.5) * 30 + 40}%` }}
              />
            ))}
          </div>
          <div
            className="z-10 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: RALLY_BLUE }}
          >
            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="white" />
          </div>
          {title && (
            <p className="z-10 mt-3 sm:mt-4 text-white font-medium text-center px-3 sm:px-4 opacity-80 text-sm sm:text-base">
              {title}
            </p>
          )}
        </button>
      )}

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-10 h-10 sm:w-16 sm:h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${RALLY_BLUE}30 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-10 h-10 sm:w-16 sm:h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(-45deg, ${RED_STITCH}30 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}
