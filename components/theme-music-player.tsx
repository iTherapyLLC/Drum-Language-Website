"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { useMusic } from "@/lib/music-context"

const RALLY_BLUE = "#005EB8"

export function ThemeMusicPlayer() {
  const { isPlaying, volume, isMuted, toggle, setVolume, toggleMute, hasUserInteracted } = useMusic()
  const [showVolume, setShowVolume] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  // Show music prompt after a short delay if user hasn't interacted
  useEffect(() => {
    if (!hasUserInteracted) {
      const timer = setTimeout(() => setShowPrompt(true), 3000)
      return () => clearTimeout(timer)
    } else {
      setShowPrompt(false)
    }
  }, [hasUserInteracted])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Initial prompt to play music */}
      {showPrompt && !hasUserInteracted && (
        <div
          className="animate-in slide-in-from-bottom-5 fade-in duration-500 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-[280px]"
          style={{ borderLeft: `4px solid ${RALLY_BLUE}` }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${RALLY_BLUE}15` }}
            >
              <Music className="w-5 h-5" style={{ color: RALLY_BLUE }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-1">Experience the exhibit with music</p>
              <p className="text-xs text-muted-foreground mb-3">
                "Harmonized Learning" - Matthew's theme song, written to accompany this portfolio.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toggle()
                    setShowPrompt(false)
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:scale-105"
                  style={{ backgroundColor: RALLY_BLUE }}
                >
                  Play Music
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Player controls */}
      <div className="flex items-center gap-2">
        {/* Main play/pause button */}
        <div className="relative" onMouseEnter={() => setShowVolume(true)}>
          {/* Animated rings when playing */}
          {isPlaying && (
            <>
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  backgroundColor: RALLY_BLUE,
                  animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <div
                className="absolute -inset-2 rounded-full opacity-10"
                style={{
                  backgroundColor: RALLY_BLUE,
                  animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            </>
          )}

          {/* Attention pulse when not yet interacted */}
          {!hasUserInteracted && !showPrompt && (
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                backgroundColor: RALLY_BLUE,
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
          )}

          <button
            onClick={toggle}
            className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group"
            style={{
              backgroundColor: isPlaying ? RALLY_BLUE : "white",
              border: `2px solid ${RALLY_BLUE}`,
            }}
            aria-label={isPlaying ? "Pause theme music" : "Play theme music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" style={{ color: RALLY_BLUE }} />
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {isPlaying ? "Pause" : "Play"} "Harmonized Learning"
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
          </button>
        </div>

        {/* Volume slider - expands on hover */}
        <div
          className="flex items-center gap-2 overflow-hidden transition-all duration-300"
          style={{
            width: showVolume ? "140px" : "0px",
            opacity: showVolume ? 1 : 0,
          }}
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-200">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${RALLY_BLUE} 0%, ${RALLY_BLUE} ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
        </div>

        {/* Track info when playing */}
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 animate-in slide-in-from-left-5 duration-300">
            {/* Animated equalizer bars */}
            <div className="flex items-end gap-0.5 h-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    backgroundColor: RALLY_BLUE,
                    height: "100%",
                    animation: `equalizer 0.5s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-700">Harmonized Learning</span>
          </div>
        )}
      </div>

      {/* CSS for equalizer animation */}
      <style jsx>{`
        @keyframes equalizer {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
