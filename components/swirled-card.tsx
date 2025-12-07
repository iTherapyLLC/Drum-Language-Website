"use client"

import type { ReactNode } from "react"

interface SwirledCardProps {
  children: ReactNode
  className?: string
  borderWidth?: number
  hoverIntensity?: "subtle" | "medium" | "strong"
}

export function SwirledCard({
  children,
  className = "",
  borderWidth = 2,
  hoverIntensity = "medium",
}: SwirledCardProps) {
  const opacityMap = {
    subtle: { base: "opacity-[0.08]", hover: "group-hover:opacity-[0.15]" },
    medium: { base: "opacity-[0.12]", hover: "group-hover:opacity-[0.22]" },
    strong: { base: "opacity-[0.18]", hover: "group-hover:opacity-[0.30]" },
  }

  const { base, hover } = opacityMap[hoverIntensity]

  return (
    <div className={`relative group ${className}`}>
      {/* Swirl texture border */}
      <div
        className={`absolute -inset-[${borderWidth}px] rounded-2xl ${base} ${hover} transition-opacity duration-500`}
        style={{
          backgroundImage: "url(/images/harmonized-learning-spiral.png)",
          backgroundSize: "300% 300%",
          backgroundPosition: "center",
          WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
          maskComposite: "exclude",
          padding: `${borderWidth}px`,
          borderRadius: "1rem",
        }}
      />

      {/* Card content */}
      <div className="relative bg-white/98 backdrop-blur-sm rounded-2xl border border-gray-100">{children}</div>
    </div>
  )
}
