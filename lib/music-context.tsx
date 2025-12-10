"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react"

interface MusicContextType {
  isPlaying: boolean
  volume: number
  isMuted: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  hasUserInteracted: boolean
  autoPlayBlocked: boolean
}

const MusicContext = createContext<MusicContextType | null>(null)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.25) // Start at 25% - not too loud
  const [isMuted, setIsMuted] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [autoPlayBlocked, setAutoPlayBlocked] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Harmonized%20Learning-Rt8Gamf4AniWx09IcH4ASmkxrRlTfv.mp3")
    audio.loop = true
    audio.volume = volume
    audio.preload = "auto"
    audioRef.current = audio

    const handleEnded = () => setIsPlaying(false)
    audio.addEventListener("ended", handleEnded)

    const attemptAutoplay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        setHasUserInteracted(true)
        setAutoPlayBlocked(false)
      } catch (err) {
        // Browser blocked autoplay - need user interaction
        setAutoPlayBlocked(true)
        setIsPlaying(false)
      }
    }

    // Small delay to let page settle
    const timer = setTimeout(attemptAutoplay, 500)

    return () => {
      clearTimeout(timer)
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setHasUserInteracted(true)
          setAutoPlayBlocked(false)
        })
        .catch(console.error)
    }
  }, [])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
    if (newVolume > 0) setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        volume,
        isMuted,
        play,
        pause,
        toggle,
        setVolume,
        toggleMute,
        hasUserInteracted,
        autoPlayBlocked,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
