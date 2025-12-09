"use client"

import type React from "react"

import { useRef, useState, type ReactNode, type CSSProperties } from "react"

const RALLY_BLUE = "#005EB8"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  intensity?: number
  style?: CSSProperties
}

export function TiltCard({ children, className = "", glowColor = RALLY_BLUE, intensity = 15, style }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isTouchDevice) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    // Calculate tilt
    const rotateX = (y - 0.5) * -intensity
    const rotateY = (x - 0.5) * intensity

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`

    // Update glow position
    setGlowPosition({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    setIsHovered(false)
  }

  // Touch support for mobile - simpler effect without complex 3D
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current) return
    setIsTouchDevice(true)
    setIsHovered(true)

    const rect = cardRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = (touch.clientX - rect.left) / rect.width
    const y = (touch.clientY - rect.top) / rect.height

    // Simpler effect for touch - just glow and slight scale
    cardRef.current.style.transform = "scale(1.02)"
    setGlowPosition({ x: x * 100, y: y * 100 })
  }

  const handleTouchEnd = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "scale(1)"
    setTimeout(() => setIsHovered(false), 300)
  }

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-300 ease-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {/* Radial glow that follows cursor */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 -z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}30 0%, transparent 50%)`,
        }}
      />

      {/* Outer glow */}
      <div
        className="absolute -inset-1 rounded-[inherit] pointer-events-none transition-opacity duration-500 blur-xl -z-20"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}40 0%, transparent 70%)`,
        }}
      />

      {children}
    </div>
  )
}
