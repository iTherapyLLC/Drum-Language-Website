"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

interface AnimatedProfileProps {
  src: string
  alt: string
}

export function AnimatedProfile({ src, alt }: AnimatedProfileProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for entrance/exit animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (!hasEntered) {
              setHasEntered(true)
            }
          } else {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-50px" },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasEntered])

  // Scroll progress for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progress = 1 - (rect.top + rect.height / 2) / viewportHeight
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePosition({ x, y })
  }

  // Calculate dynamic transforms based on scroll and hover
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -20 : 0
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0
  const scrollRotate = scrollProgress * 360

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0.5, y: 0.5 })
      }}
      onMouseMove={handleMouseMove}
      style={{ perspective: "1000px" }}
    >
      {/* Animated particles on hover */}
      {isHovered && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                background: i % 2 === 0 ? RALLY_BLUE : RED_STITCH,
                left: "50%",
                top: "50%",
                transform: `rotate(${i * 30}deg) translateX(${80 + Math.sin(Date.now() / 500 + i) * 10}px)`,
                opacity: 0.6,
                animation: `orbit-${i % 3} 3s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Outer pulsing ring - scales on hover */}
      <div
        className="absolute -inset-4 sm:-inset-6 rounded-full transition-all duration-700"
        style={{
          background: `conic-gradient(from ${scrollRotate}deg, ${RALLY_BLUE}40, ${RED_STITCH}30, ${RALLY_BLUE}40)`,
          opacity: isVisible ? (isHovered ? 1 : 0.6) : 0,
          transform: `scale(${isVisible ? (isHovered ? 1.15 : 1) : 0.5}) rotate(${isHovered ? 180 : 0}deg)`,
          filter: `blur(${isHovered ? 8 : 4}px)`,
          animation: isHovered ? "pulse-glow 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Secondary ring with opposite rotation */}
      <div
        className="absolute -inset-3 sm:-inset-4 rounded-full transition-all duration-500"
        style={{
          background: `conic-gradient(from ${-scrollRotate}deg, transparent, ${RALLY_BLUE}20, transparent, ${RED_STITCH}20, transparent)`,
          opacity: isVisible ? (isHovered ? 0.8 : 0.4) : 0,
          transform: `scale(${isVisible ? 1 : 0.3}) rotate(${isHovered ? -90 : 0}deg)`,
        }}
      />

      {/* Blue outer border with glow */}
      <div
        className="absolute -inset-2 rounded-full transition-all duration-500"
        style={{
          background: `linear-gradient(${isHovered ? 225 : 135}deg, ${RALLY_BLUE}60 0%, ${RALLY_BLUE}30 50%, ${RALLY_BLUE}60 100%)`,
          boxShadow: isHovered
            ? `0 0 60px ${RALLY_BLUE}60, 0 0 120px ${RALLY_BLUE}30, inset 0 0 30px ${RALLY_BLUE}20`
            : `0 0 30px ${RALLY_BLUE}20`,
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.8})`,
        }}
      />

      {/* White inner border */}
      <div
        className="absolute -inset-1 rounded-full bg-white transition-all duration-500"
        style={{
          boxShadow: isHovered ? `0 0 20px rgba(255,255,255,0.8)` : "none",
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0.9})`,
        }}
      />

      {/* Main profile container with 3D transforms */}
      <div
        className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden transition-all duration-300"
        style={{
          transform: `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${isVisible ? (isHovered ? 1.1 : 1) : 0.5})
            translateZ(${isHovered ? 20 : 0}px)
          `,
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 4px ${RALLY_BLUE}40`
            : "0 10px 30px -10px rgba(0,0,0,0.2)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Image */}
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            transform: `scale(${isHovered ? 1.15 : 1})`,
            filter: isHovered ? "brightness(1.1) contrast(1.05)" : "none",
          }}
        />

        {/* Hover overlay effects */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${RALLY_BLUE}30 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Sheen sweep on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)`,
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.6s ease-out",
          }}
        />

        {/* Prismatic edge effect */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            background: `conic-gradient(from ${mousePosition.x * 360}deg, transparent, rgba(255,100,100,0.2), transparent, rgba(100,100,255,0.2), transparent)`,
            opacity: isHovered ? 0.6 : 0,
          }}
        />
      </div>

      {/* Entrance/exit burst effect */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${RALLY_BLUE}40 0%, transparent 70%)`,
          opacity: hasEntered && isVisible ? 0 : 1,
          transform: `scale(${isVisible ? 3 : 0})`,
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1.15); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes orbit-0 {
          0%, 100% { transform: rotate(0deg) translateX(80px) scale(1); opacity: 0.6; }
          50% { transform: rotate(180deg) translateX(100px) scale(1.5); opacity: 1; }
        }
        @keyframes orbit-1 {
          0%, 100% { transform: rotate(120deg) translateX(90px) scale(1.2); opacity: 0.8; }
          50% { transform: rotate(300deg) translateX(70px) scale(0.8); opacity: 0.4; }
        }
        @keyframes orbit-2 {
          0%, 100% { transform: rotate(240deg) translateX(75px) scale(0.9); opacity: 0.5; }
          50% { transform: rotate(60deg) translateX(95px) scale(1.3); opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}
