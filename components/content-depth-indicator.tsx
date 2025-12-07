"use client"

import { Video, Music, FileText, Award, Mic } from "lucide-react"

const RALLY_BLUE = "#005EB8"

interface ContentDepthProps {
  counts: {
    videos?: number
    albums?: number
    presentations?: number
    grants?: number
    performances?: number
  }
}

export function ContentDepthIndicator({ counts }: ContentDepthProps) {
  const items = [
    { icon: Video, label: "Videos", count: counts.videos, color: "#E1306C" },
    { icon: Music, label: "Albums", count: counts.albums, color: RALLY_BLUE },
    { icon: FileText, label: "Presentations", count: counts.presentations, color: "#10B981" },
    { icon: Award, label: "Grants", count: counts.grants, color: "#F59E0B" },
    { icon: Mic, label: "Performances", count: counts.performances, color: "#8B5CF6" },
  ].filter((item) => item.count)

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-transparent transition-all duration-300 cursor-default"
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <item.icon className="w-4 h-4" style={{ color: item.color }} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold" style={{ color: item.color }}>
              {item.count}+
            </span>
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
