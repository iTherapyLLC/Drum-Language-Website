"use client"

import type React from "react"

import { useEffect, useState, useCallback, useRef } from "react"
import { useKonamiCode } from "@/hooks/use-konami-code"

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
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number }[]>([])
  const clickCountRef = useRef(0)

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

  // Use shared Konami code hook
  const konamiActivated = useKonamiCode({
    onActivate: () => createParticleBurst(window.innerWidth / 2, window.innerHeight / 2, 30)
  })

  // Mouse move handler for sheen effect
  useEffect(() => {
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

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Triple-click easter egg with fixed memory leak
  useEffect(() => {
    let clickTimer: NodeJS.Timeout | null = null

    const handleClick = (e: MouseEvent) => {
      clickCountRef.current += 1

      if (clickTimer) clearTimeout(clickTimer)
      
      clickTimer = setTimeout(() => {
        if (clickCountRef.current === 3) {
          createParticleBurst(e.clientX, e.clientY, 12)
        }
        clickCountRef.current = 0
      }, 300)
    }

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
      if (clickTimer) clearTimeout(clickTimer)
    }
  }, [createParticleBurst])

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
