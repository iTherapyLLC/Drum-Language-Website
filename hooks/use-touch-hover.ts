"use client"

import { useState, useCallback, useRef, useEffect } from "react"

/**
 * Hook that provides hover-like behavior for both mouse and touch devices
 * On touch devices, tapping triggers the "hover" state for a duration
 */
export function useTouchHover(duration = 1500) {
  const [isActive, setIsActive] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTouchDevice = useRef(false)

  const clearActiveTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice.current) {
      setIsActive(true)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice.current) {
      setIsActive(false)
    }
  }, [])

  const handleTouchStart = useCallback(() => {
    isTouchDevice.current = true
    clearActiveTimeout()
    setIsActive(true)
  }, [clearActiveTimeout])

  const handleTouchEnd = useCallback(() => {
    clearActiveTimeout()
    // Keep active state for duration, then fade out
    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
    }, duration)
  }, [duration, clearActiveTimeout])

  // For elements that should toggle on tap (like cards that transform)
  const handleTouchToggle = useCallback(() => {
    isTouchDevice.current = true
    clearActiveTimeout()
    setIsActive((prev) => !prev)
    // Auto-deactivate after duration
    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
    }, duration)
  }, [duration, clearActiveTimeout])

  // Add cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  return {
    isActive,
    setIsActive,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
    toggleHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchToggle,
    },
  }
}
