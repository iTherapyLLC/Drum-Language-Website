"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

interface Particle {
  id: number
  x: number
  y: number
  tx: number
  ty: number
  color: string
}

export function SheenEffect() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [konamiActivated, setKonamiActivated] = useState(false)
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number }[]>([])

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  // Mouse move handler for sheen effect
  useEffect(() => {
    let rafId: number | null = null
    let touchPending = false
    let touchEndTimeout: NodeJS.Timeout | null = null

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePos({ x, y })
      setIsActive(true)

      // Update CSS variables for global sheen
      document.documentElement.style.setProperty("--mouse-x", `${x}%`)
      document.documentElement.style.setProperty("--mouse-y", `${y}%`)

      // Cursor trail effect (subtle)
      setCursorTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }]
        if (newTrail.length > 5) newTrail.shift()
        return newTrail
      })
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    // Touch handler for mobile devices - throttled with requestAnimationFrame
    const handleTouchMove = (e: TouchEvent) => {
      if (touchPending) return
      touchPending = true

      rafId = requestAnimationFrame(() => {
        const touch = e.touches[0]
        const x = (touch.clientX / window.innerWidth) * 100
        const y = (touch.clientY / window.innerHeight) * 100
        setMousePos({ x, y })
        setIsActive(true)

        // Update CSS variables for global sheen
        document.documentElement.style.setProperty("--mouse-x", `${x}%`)
        document.documentElement.style.setProperty("--mouse-y", `${y}%`)
        touchPending = false
      })
    }

    const handleTouchEnd = () => {
      // Clear any existing timeout
      if (touchEndTimeout) {
        clearTimeout(touchEndTimeout)
      }
      // Keep sheen active briefly after touch ends
      touchEndTimeout = setTimeout(() => setIsActive(false), 500)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      if (touchEndTimeout !== null) {
        clearTimeout(touchEndTimeout)
      }
    }
  }, [])

  // Konami code detector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1
        setKonamiIndex(nextIndex)

        if (nextIndex === konamiCode.length) {
          setKonamiActivated(true)
          setKonamiIndex(0)
          // Create celebration particles
          createParticleBurst(window.innerWidth / 2, window.innerHeight / 2, 30)
          setTimeout(() => setKonamiActivated(false), 5000)
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiIndex])

  // Triple-click easter egg
  useEffect(() => {
    let clickTimer: NodeJS.Timeout

    const handleClick = (e: MouseEvent) => {
      setClickCount((prev) => prev + 1)

      clearTimeout(clickTimer)
      clickTimer = setTimeout(() => {
        if (clickCount >= 2) {
          // Triple click detected!
          createParticleBurst(e.clientX, e.clientY, 12)
        }
        setClickCount(0)
      }, 300)
    }

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
      clearTimeout(clickTimer)
    }
  }, [clickCount])

  const createParticleBurst = useCallback((x: number, y: number, count: number) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      const velocity = 50 + Math.random() * 100
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity,
        color: Math.random() > 0.5 ? RALLY_BLUE : RED_STITCH,
      })
    }
    setParticles((prev) => [...prev, ...newParticles])

    // Clean up particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
    }, 1000)
  }, [])

  return (
    <>
      {/* Global sheen overlay */}
      <div
        className={`sheen-layer ${isActive ? "active" : ""}`}
        style={{
          background: `radial-gradient(
            600px circle at ${mousePos.x}% ${mousePos.y}%,
            rgba(255, 255, 255, 0.08),
            transparent 40%
          )`,
        }}
      />

      {/* Cursor trail dots */}
      {cursorTrail.map((pos, i) => (
        <div
          key={i}
          className="cursor-trail"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: ((i + 1) / cursorTrail.length) * 0.3,
            transform: `translate(-50%, -50%) scale(${(i + 1) / cursorTrail.length})`,
          }}
        />
      ))}

      {/* Particle effects */}
      <div className="particle-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={
              {
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                "--tx": `${particle.tx}px`,
                "--ty": `${particle.ty}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Konami code activated overlay */}
      {konamiActivated && (
        <div className="fixed inset-0 pointer-events-none z-[10001] flex items-center justify-center">
          <div
            className="text-4xl font-bold animate-bounce"
            style={{
              background: `linear-gradient(90deg, ${RALLY_BLUE}, ${RED_STITCH})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Drummer Mode Activated!
          </div>
        </div>
      )}
    </>
  )
}
