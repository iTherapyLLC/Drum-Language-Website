"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface RevealOnScrollProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "scale"
  delay?: number
  className?: string
  once?: boolean
}

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  className = "",
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), delay)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsRevealed(false)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, once])

  const transforms = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    scale: "scale-90",
  }

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isRevealed ? "translate-y-0 translate-x-0 scale-100 opacity-100" : `${transforms[direction]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  )
}
