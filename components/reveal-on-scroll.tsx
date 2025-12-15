"use client"

import type React from "react"
import { useEffect, useRef, useState, Children, isValidElement } from "react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface RevealOnScrollProps {
  children: React.ReactNode
  variant?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "scale"
    | "scale-rotate"
    | "flip-up"
    | "flip-left"
    | "blur"
    | "blur-scale"
    | "slide-blur"
    | "bounce"
    | "swing"
    | "zoom-blur"
    | "typewriter"
    | "glitch"
    | "curtain"
    | "wave"
  direction?: "up" | "down" | "left" | "right" | "scale" // Legacy support
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  threshold?: number
  staggerChildren?: number // Delay between child animations
  as?: keyof JSX.IntrinsicElements
}

export function RevealOnScroll({
  children,
  variant,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
  threshold = 0.15,
  staggerChildren,
  as: Component = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), delay)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsRevealed(false)
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay, once, threshold])

  // Legacy direction mapping for backward compatibility
  const legacyTransforms = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    scale: "scale-90",
  }

  // If staggerChildren is set, wrap each child with its own delay
  if (staggerChildren && isRevealed) {
    const childArray = Children.toArray(children)
    return (
      <Component ref={ref as any} className={className}>
        {childArray.map((child, index) => {
          if (isValidElement(child)) {
            return (
              <div
                key={index}
                className="transform transition-all ease-out opacity-0 translate-y-8"
                style={{
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${index * staggerChildren}ms`,
                  ...(isRevealed && {
                    opacity: 1,
                    transform: "translateY(0)",
                  }),
                }}
              >
                {child}
              </div>
            )
          }
          return child
        })}
      </Component>
    )
  }

  // Variant-based animations
  const getAnimationStyles = () => {
    const baseTransition = {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    }

    // Use variant if specified, otherwise fall back to direction
    const activeVariant = variant || (direction ? `fade-${direction}` : "fade-up")

    const variants: Record<string, { hidden: React.CSSProperties; visible: React.CSSProperties }> = {
      "fade-up": {
        hidden: { opacity: 0, transform: "translateY(40px)" },
        visible: { opacity: 1, transform: "translateY(0)" },
      },
      "fade-down": {
        hidden: { opacity: 0, transform: "translateY(-40px)" },
        visible: { opacity: 1, transform: "translateY(0)" },
      },
      "fade-left": {
        hidden: { opacity: 0, transform: "translateX(40px)" },
        visible: { opacity: 1, transform: "translateX(0)" },
      },
      "fade-right": {
        hidden: { opacity: 0, transform: "translateX(-40px)" },
        visible: { opacity: 1, transform: "translateX(0)" },
      },
      scale: {
        hidden: { opacity: 0, transform: "scale(0.8)" },
        visible: { opacity: 1, transform: "scale(1)" },
      },
      "scale-rotate": {
        hidden: { opacity: 0, transform: "scale(0.6) rotate(-10deg)" },
        visible: { opacity: 1, transform: "scale(1) rotate(0deg)" },
      },
      "flip-up": {
        hidden: { opacity: 0, transform: "perspective(1000px) rotateX(-60deg) translateY(30px)" },
        visible: { opacity: 1, transform: "perspective(1000px) rotateX(0) translateY(0)" },
      },
      "flip-left": {
        hidden: { opacity: 0, transform: "perspective(1000px) rotateY(60deg) translateX(-30px)" },
        visible: { opacity: 1, transform: "perspective(1000px) rotateY(0) translateX(0)" },
      },
      blur: {
        hidden: { opacity: 0, filter: "blur(20px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      },
      "blur-scale": {
        hidden: { opacity: 0, filter: "blur(15px)", transform: "scale(1.1)" },
        visible: { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
      },
      "slide-blur": {
        hidden: { opacity: 0, filter: "blur(10px)", transform: "translateY(30px) scale(0.95)" },
        visible: { opacity: 1, filter: "blur(0px)", transform: "translateY(0) scale(1)" },
      },
      bounce: {
        hidden: { opacity: 0, transform: "translateY(60px) scale(0.9)" },
        visible: { opacity: 1, transform: "translateY(0) scale(1)" },
      },
      swing: {
        hidden: { opacity: 0, transform: "rotate(-12deg) translateY(20px)", transformOrigin: "top center" },
        visible: { opacity: 1, transform: "rotate(0deg) translateY(0)", transformOrigin: "top center" },
      },
      "zoom-blur": {
        hidden: { opacity: 0, filter: "blur(30px)", transform: "scale(0.5)" },
        visible: { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
      },
      typewriter: {
        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        visible: { opacity: 1, clipPath: "inset(0% 0 0% 0)" },
      },
      glitch: {
        hidden: { opacity: 0, transform: "translateX(-5px) skewX(-5deg)", filter: "hue-rotate(90deg)" },
        visible: { opacity: 1, transform: "translateX(0) skewX(0deg)", filter: "hue-rotate(0deg)" },
      },
      curtain: {
        hidden: { opacity: 0, clipPath: "inset(50% 0 50% 0)" },
        visible: { opacity: 1, clipPath: "inset(0% 0 0% 0)" },
      },
      wave: {
        hidden: { opacity: 0, transform: "translateY(30px) scaleY(0.8)", transformOrigin: "bottom" },
        visible: { opacity: 1, transform: "translateY(0) scaleY(1)", transformOrigin: "bottom" },
      },
    }

    const variantStyles = variants[activeVariant] || variants["fade-up"]

    return {
      ...baseTransition,
      ...(isRevealed ? variantStyles.visible : variantStyles.hidden),
    }
  }

  // For legacy direction prop support
  if (!variant && direction) {
    return (
      <div
        ref={ref}
        className={`transform transition-all ease-out ${
          isRevealed ? "translate-y-0 translate-x-0 scale-100 opacity-100" : `${legacyTransforms[direction]} opacity-0`
        } ${className}`}
        style={{ transitionDuration: `${duration}ms` }}
      >
        {children}
      </div>
    )
  }

  if (!isMounted) {
    return (
      <Component ref={ref as any} className={className}>
        {children}
      </Component>
    )
  }

  return (
    <Component ref={ref as any} className={`transition-all ${className}`} style={getAnimationStyles()}>
      {children}
    </Component>
  )
}

export function StaggeredGrid({
  children,
  className = "",
  staggerDelay = 100,
  variant = "fade-up",
  threshold = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  variant?: RevealOnScrollProps["variant"]
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  const childArray = Children.toArray(children)

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => (
        <RevealOnScroll key={index} variant={variant} delay={isVisible ? index * staggerDelay : 0} duration={600}>
          {child}
        </RevealOnScroll>
      ))}
    </div>
  )
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  charDelay = 30,
}: {
  children: string
  className?: string
  delay?: number
  charDelay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <span ref={ref} className={className}>
      {children.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: isVisible ? `${index * charDelay}ms` : "0ms",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
