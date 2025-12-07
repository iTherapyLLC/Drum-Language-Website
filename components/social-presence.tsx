"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

const socialPlatforms = [
  {
    platform: "Instagram",
    handle: "@drumlanguage",
    url: "https://www.instagram.com/drumlanguage/",
    description: "Drum videos, speed bag sessions, skill development",
    stats: { posts: "200+", followers: "5K+", videos: "150+" },
    color: "#E1306C",
    gradient: "from-purple-500 via-pink-500 to-orange-400",
    previewImages: ["/drummer-playing-kit-action-shot.jpg", "/speed-bag-boxing-training-rhythm.jpg", "/drum-practice-session-studio.jpg"],
  },
  {
    platform: "TikTok",
    handle: "@drumlanguage",
    url: "https://www.tiktok.com/@drumlanguage",
    description: "Short-form drumming and practice clips",
    stats: { videos: "50+", likes: "10K+", views: "100K+" },
    color: "#000000",
    gradient: "from-gray-900 via-gray-800 to-gray-900",
    previewImages: ["/tiktok-style-drum-video-viral.jpg", "/quick-drum-lick-tutorial.jpg", "/rhythm-demonstration-close-up.jpg"],
  },
  {
    platform: "LinkedIn",
    handle: "Matthew Guggemos",
    url: "https://www.linkedin.com/in/matthew-guggemos/",
    description: "Professional updates, AI and speech technology",
    stats: { connections: "500+", articles: "20+", endorsements: "50+" },
    color: "#0A66C2",
    gradient: "from-blue-600 to-blue-800",
  },
  {
    platform: "Facebook",
    handle: "Drum Language",
    url: "https://www.facebook.com/drumlanguage",
    description: "Community discussions and event updates",
    stats: { followers: "2K+", posts: "300+" },
    color: "#1877F2",
    gradient: "from-blue-500 to-blue-700",
  },
]

export function SocialPresence() {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {socialPlatforms.map((social, index) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02]"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
          onMouseEnter={() => setHoveredPlatform(social.platform)}
          onMouseLeave={() => setHoveredPlatform(null)}
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)`,
                backgroundSize: "200% 100%",
                animation: hoveredPlatform === social.platform ? "shimmer 1.5s ease-in-out" : "none",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{social.platform}</span>
              </div>
              <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            {/* Handle */}
            <p className="text-white/80 font-medium mb-2">{social.handle}</p>
            <p className="text-white/60 text-sm mb-4">{social.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-4">
              {Object.entries(social.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium"
                >
                  {value} {key}
                </div>
              ))}
            </div>

            {/* Preview images grid */}
            {social.previewImages && (
              <div className="flex gap-2 mt-4">
                {social.previewImages.map((img, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg overflow-hidden opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold">+47</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-500 group-hover:w-full"
            style={{ width: hoveredPlatform === social.platform ? "100%" : "0%" }}
          />
        </a>
      ))}
    </div>
  )
}
