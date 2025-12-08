"use client"

import { useEffect, useState } from "react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

export function InteractiveSurprises() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  // Note: Konami code detection has been moved to sheen-effect.tsx to avoid duplicate event listeners

  // Triple-click particle burst
  useEffect(() => {
    let clickCount = 0
    let clickTimer: ReturnType<typeof setTimeout>

    const handleClick = (e: MouseEvent) => {
      clickCount++
      clearTimeout(clickTimer)

      if (clickCount === 3) {
        // Create particle burst
        const newParticles = Array.from({ length: 12 }).map((_, i) => ({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          color: i % 2 === 0 ? RALLY_BLUE : RED_STITCH,
        }))
        setParticles((prev) => [...prev, ...newParticles])
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
        }, 1000)
        clickCount = 0
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0
        }, 400)
      }
    }

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
      clearTimeout(clickTimer)
    }
  }, [])

  return (
    <>
      {/* Particle container */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {particles.map((particle, index) => {
          const angle = (index / 12) * Math.PI * 2
          const distance = 100 + Math.random() * 50
          return (
            <div
              key={particle.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                transform: "translate(-50%, -50%)",
                animation: "particle-fly 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                ["--tx" as string]: `${Math.cos(angle) * distance}px`,
                ["--ty" as string]: `${Math.sin(angle) * distance}px`,
              }}
            />
          )
        })}
      </div>
    </>
  )
}
