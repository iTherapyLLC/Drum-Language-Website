"use client"

import { useEffect, useState, useCallback } from "react"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
]

export function useKonamiCode(onActivate: () => void, duration = 5000) {
  const [isActivated, setIsActivated] = useState(false)
  
  useEffect(() => {
    let index = 0
    let timeoutId: NodeJS.Timeout | null = null

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KONAMI_CODE[index]) {
        index++
        if (index === KONAMI_CODE.length) {
          setIsActivated(true)
          onActivate()
          index = 0
          
          if (timeoutId) clearTimeout(timeoutId)
          timeoutId = setTimeout(() => setIsActivated(false), duration)
        }
      } else {
        index = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [onActivate, duration])

  return isActivated
}
