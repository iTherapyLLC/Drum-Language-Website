"use client"

import type React from "react"
import { useRef, useCallback, useState } from "react"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"
const FOREGROUND = "#0a0a0a"
const WHITE = "#ffffff"

interface MagicTextProps {
  children: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  baseColor?: "dark" | "light"
}

export function MagicText({ children, as: Component = "span", className = "", baseColor = "dark" }: MagicTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const characters = children.split("")

  const textColor = baseColor === "light" ? WHITE : FOREGROUND

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>(".magic-char")
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left

      spans.forEach((span, index) => {
        const rect = span.getBoundingClientRect()
        const charCenter = rect.left + rect.width / 2 - containerRect.left
        const distance = Math.abs(mouseX - charCenter)
        const maxDistance = 80
        const intensity = Math.max(0, 1 - distance / maxDistance)

        if (intensity > 0) {
          const lift = intensity * -4
          const scale = 1 + intensity * 0.15

          span.style.transform = `translateY(${lift}px) scale(${scale})`
          span.style.color = intensity > 0.5 ? RALLY_BLUE : textColor
          span.style.textShadow =
            intensity > 0.3
              ? `0 0 ${intensity * 20}px ${RALLY_BLUE}40, 0 ${intensity * 4}px ${intensity * 8}px ${RALLY_BLUE}20`
              : ""
          span.style.filter = `brightness(${1 + intensity * 0.2})`

          if (intensity > 0.7) {
            setHoveredIndex(index)
          }
        } else {
          span.style.transform = ""
          span.style.color = textColor
          span.style.textShadow = ""
          span.style.filter = ""
        }
      })
    },
    [textColor],
  )

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return
    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>(".magic-char")
    spans.forEach((span) => {
      span.style.transform = ""
      span.style.color = textColor
      span.style.textShadow = ""
      span.style.filter = ""
    })
    setHoveredIndex(null)
    setIsHovering(false)
  }, [textColor])

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`magic-text-container cursor-default select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block", color: textColor }}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          className="magic-char inline-block transition-all duration-150 ease-out"
          style={{
            whiteSpace: char === " " ? "pre" : "normal",
            color: textColor,
          }}
        >
          {char}
        </span>
      ))}
    </Component>
  )
}

// Enhanced version with more dramatic reading-assist effect
export function MagicHeading({ children, as: Component = "h2", className = "", baseColor = "dark" }: MagicTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [activeRange, setActiveRange] = useState<[number, number]>([-1, -1])
  const characters = children.split("")

  const textColor = baseColor === "light" ? WHITE : FOREGROUND

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>(".magic-heading-char")
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left

      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      spans.forEach((span, index) => {
        const rect = span.getBoundingClientRect()
        const charCenter = rect.left + rect.width / 2 - containerRect.left
        const distance = Math.abs(mouseX - charCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }

        const maxDistance = 120
        const intensity = Math.max(0, 1 - distance / maxDistance)

        if (intensity > 0) {
          const wave = Math.sin(intensity * Math.PI)
          const lift = wave * -6
          const scale = 1 + wave * 0.12
          const rotate = (intensity - 0.5) * 3

          span.style.transform = `translateY(${lift}px) scale(${scale}) rotate(${rotate}deg)`

          if (intensity > 0.8) {
            span.style.color = RED_STITCH
            span.style.textShadow = `0 0 30px ${RED_STITCH}60, 0 4px 12px ${RED_STITCH}30`
          } else if (intensity > 0.4) {
            span.style.color = RALLY_BLUE
            span.style.textShadow = `0 0 20px ${RALLY_BLUE}50, 0 2px 8px ${RALLY_BLUE}25`
          } else {
            span.style.color = textColor
            span.style.textShadow = `0 0 ${intensity * 15}px ${RALLY_BLUE}30`
          }

          span.style.filter = `brightness(${1 + intensity * 0.15})`
        } else {
          span.style.transform = ""
          span.style.color = textColor
          span.style.textShadow = ""
          span.style.filter = ""
        }
      })

      const startIndex = Math.max(0, closestIndex - 3)
      const endIndex = Math.min(characters.length - 1, closestIndex + 3)
      setActiveRange([startIndex, endIndex])
    },
    [characters.length, textColor],
  )

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return
    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>(".magic-heading-char")
    spans.forEach((span) => {
      span.style.transform = ""
      span.style.color = textColor
      span.style.textShadow = ""
      span.style.filter = ""
    })
    setActiveRange([-1, -1])
  }, [textColor])

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`magic-heading-container relative cursor-default select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block", color: textColor }}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          className="magic-heading-char inline-block transition-all duration-100 ease-out origin-bottom"
          style={{
            whiteSpace: char === " " ? "pre" : "normal",
            color: textColor,
          }}
        >
          {char}
        </span>
      ))}
      {/* Subtle underline that follows the cursor */}
      <span
        className="absolute bottom-0 h-0.5 transition-all duration-200 ease-out rounded-full"
        style={{
          left: `${(activeRange[0] / characters.length) * 100}%`,
          width: activeRange[0] >= 0 ? `${((activeRange[1] - activeRange[0] + 1) / characters.length) * 100}%` : "0%",
          backgroundColor: RALLY_BLUE,
          opacity: activeRange[0] >= 0 ? 0.6 : 0,
        }}
      />
    </Component>
  )
}

// Word-level magic for longer text
export function MagicParagraph({
  children,
  className = "",
  baseColor = "dark",
}: { children: string; className?: string; baseColor?: "dark" | "light" }) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const words = children.split(" ")

  const textColor = baseColor === "light" ? WHITE : FOREGROUND

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const wordSpans = containerRef.current.querySelectorAll<HTMLSpanElement>(".magic-word")
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left
      const mouseY = e.clientY - containerRect.top

      wordSpans.forEach((span) => {
        const rect = span.getBoundingClientRect()
        const wordCenterX = rect.left + rect.width / 2 - containerRect.left
        const wordCenterY = rect.top + rect.height / 2 - containerRect.top
        const distanceX = Math.abs(mouseX - wordCenterX)
        const distanceY = Math.abs(mouseY - wordCenterY)
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        const maxDistance = 100
        const intensity = Math.max(0, 1 - distance / maxDistance)

        if (intensity > 0) {
          span.style.color = intensity > 0.5 ? RALLY_BLUE : textColor
          span.style.transform = `scale(${1 + intensity * 0.05})`
          span.style.textShadow = intensity > 0.3 ? `0 0 ${intensity * 10}px ${RALLY_BLUE}25` : ""
        } else {
          span.style.color = textColor
          span.style.transform = ""
          span.style.textShadow = ""
        }
      })
    },
    [textColor],
  )

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return
    const wordSpans = containerRef.current.querySelectorAll<HTMLSpanElement>(".magic-word")
    wordSpans.forEach((span) => {
      span.style.color = textColor
      span.style.transform = ""
      span.style.textShadow = ""
    })
  }, [textColor])

  return (
    <p
      ref={containerRef}
      className={`magic-paragraph cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ color: textColor }}
    >
      {words.map((word, index) => (
        <span key={index}>
          <span className="magic-word inline-block transition-all duration-150 ease-out" style={{ color: textColor }}>
            {word}
          </span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </p>
  )
}
