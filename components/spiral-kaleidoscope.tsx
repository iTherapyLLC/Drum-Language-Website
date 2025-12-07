"use client"

import { useEffect, useRef, useState } from "react"

interface SpiralKaleidoscopeProps {
  opacity?: number
  className?: string
}

const SpiralKaleidoscope = ({ opacity = 0.12, className = "" }: SpiralKaleidoscopeProps) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div
        className="grid grid-cols-2 grid-rows-2 w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `rotate(${scrollProgress * 15}deg) scale(${1 + scrollProgress * 0.05})`,
        }}
      >
        {/* Upper left quadrant - horizontal flip */}
        <div className="overflow-hidden" style={{ opacity }}>
          <img
            src="/images/cdvvarhf9x4dckd2bfpng.png"
            alt=""
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
            style={{
              transform: `scaleX(-1) scale(${1 + scrollProgress * 0.1})`,
            }}
          />
        </div>

        {/* Upper right quadrant - original */}
        <div className="overflow-hidden" style={{ opacity }}>
          <img
            src="/images/cdvvarhf9x4dckd2bfpng.png"
            alt=""
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
            style={{
              transform: `scale(${1 + scrollProgress * 0.1})`,
            }}
          />
        </div>

        {/* Lower left quadrant - both flips */}
        <div className="overflow-hidden" style={{ opacity }}>
          <img
            src="/images/cdvvarhf9x4dckd2bfpng.png"
            alt=""
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
            style={{
              transform: `scaleX(-1) scaleY(-1) scale(${1 + scrollProgress * 0.1})`,
            }}
          />
        </div>

        {/* Lower right quadrant - vertical flip */}
        <div className="overflow-hidden" style={{ opacity }}>
          <img
            src="/images/cdvvarhf9x4dckd2bfpng.png"
            alt=""
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
            style={{
              transform: `scaleY(-1) scale(${1 + scrollProgress * 0.1})`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SpiralKaleidoscope
