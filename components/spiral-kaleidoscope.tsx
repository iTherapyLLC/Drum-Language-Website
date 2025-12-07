"use client"

import { useEffect, useState } from "react"

interface SpiralKaleidoscopeProps {
  opacity?: number
  className?: string
  variant?: "light" | "dark"
}

export const SpiralKaleidoscope = ({ opacity = 0.12, className = "", variant = "light" }: SpiralKaleidoscopeProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrolled / maxScroll, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // The pattern radiates from center maintaining perfect radial symmetry
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Center-anchored symmetrical pattern */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity,
        }}
      >
        {/* Main centered pattern - scales slightly on scroll for subtle parallax */}
        <div
          className="relative transition-transform duration-1000 ease-out"
          style={{
            width: "200%",
            height: "200%",
            transform: `rotate(${scrollProgress * 10}deg) scale(${1 + scrollProgress * 0.03})`,
          }}
        >
          <img
            src="/images/cdvvarhf9x4dckd2bfpng.png"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
            style={{
              filter: variant === "dark" ? "invert(1)" : "none",
            }}
          />
        </div>
      </div>

      {/* Subtle radial gradient to soften edges and enhance center focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "light"
              ? "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0.8) 100%)"
              : "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </div>
  )
}

export default SpiralKaleidoscope
