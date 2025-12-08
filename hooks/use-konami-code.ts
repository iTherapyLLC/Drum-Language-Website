"use client"

import { useEffect, useState, useCallback, useRef } from "react"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
]

interface UseKonamiCodeOptions {
  onActivate?: () => void
  duration?: number
}

export function useKonamiCode({ onActivate, duration = 5000 }: UseKonamiCodeOptions = {}) {
  const [isActivated, setIsActivated] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const activate = useCallback(() => {
    setIsActivated(true)
    onActivate?.()
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setIsActivated(false), duration)
  }, [onActivate, duration])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[indexRef.current]) {
        indexRef.current++
        if (indexRef.current === KONAMI_CODE.length) {
          activate()
          indexRef.current = 0
        }
      } else {
        indexRef.current = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [activate])

  return isActivated
}
