"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { MagicHeading } from "@/components/magic-text"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { TiltCard } from "@/components/tilt-card"
import SpiralKaleidoscope from "@/components/spiral-kaleidoscope"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

export function DrummingSection() {
  return (
    <section id="drumming" className="relative py-32 bg-black text-white overflow-hidden">
      {/* Ambient background - subtle abstract pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <SpiralKaleidoscope opacity={0.5} variant="dark" />
      </div>

      {/* Main content container */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Hero intro */}
        <RevealOnScroll variant="fade-up" delay={0}>
          <div className="text-center mb-24">
            <MagicHeading as="h2" className="text-5xl font-bold mb-6" variant="dark">
              Drumming
            </MagicHeading>
            <p className="text-xl text-gray-400">Problem-Solving in Real Time</p>
            <p className="text-2xl text-white mt-8 font-light leading-relaxed">
              Drumming looks like hitting things.
              <br />
              It's actually solving dozens of problems simultaneously.
            </p>
          </div>
        </RevealOnScroll>

        {/* 1. The Basic Problem - Four limbs coordination */}
        <RevealOnScroll variant="fade-up" delay={200}>
          <div className="mb-24">
            <h3 className="text-3xl font-bold mb-6 text-center">The Basic Problem</h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Four limbs. Each with its own job. Sometimes synced. Sometimes independent. Always coordinating.
            </p>
            <LimbCoordination />
          </div>
        </RevealOnScroll>

        {/* 2. Systems for Creating Sound - Chaffee Groups */}
        <RevealOnScroll variant="fade-up" delay={300}>
          <div className="mb-24">
            <h3 className="text-3xl font-bold mb-6 text-center">Systems for Creating Sound</h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Gary Chaffee's sticking systems organize how hands move. Three groups. Infinite combinations.
            </p>
            <ChaffeeGroups />
          </div>
        </RevealOnScroll>

        {/* 3. Context Changes Everything */}
        <RevealOnScroll variant="fade-up" delay={400}>
          <div className="mb-24">
            <h3 className="text-3xl font-bold mb-6 text-center">Context Changes Everything</h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Same kit. Different music. The mix shifts completely.
            </p>
            <ContextKits />
          </div>
        </RevealOnScroll>

        {/* 4. The Fill Problem */}
        <RevealOnScroll variant="fade-up" delay={500}>
          <div className="mb-24">
            <h3 className="text-3xl font-bold mb-6 text-center">The Fill Problem</h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Where does the downbeat land? Math meets muscle memory.
            </p>
            <FillTimeline />
          </div>
        </RevealOnScroll>

        {/* 5. What This Has to Do With Language */}
        <RevealOnScroll variant="fade-up" delay={600}>
          <div className="mb-24">
            <h3 className="text-3xl font-bold mb-6 text-center">What This Has to Do With Language</h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Combinatorial constraints exist in both systems. Patterns that work. Patterns that don't.
            </p>
            <LanguageParallel />
          </div>
        </RevealOnScroll>

        {/* 6. The Improvisation Thread */}
        <RevealOnScroll variant="fade-up" delay={700}>
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6 text-center">The Improvisation Thread</h3>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Skiing. Jiu-Jitsu. Language. Drumming. All converge on the same principle.
            </p>
            <ImprovisationOrbit />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// Component 1: Limb Coordination Visualization
function LimbCoordination() {
  const [animationState, setAnimationState] = useState<"sync" | "async" | "resync">("sync")
  const limbs = ["Left Hand", "Right Hand", "Left Foot", "Right Foot"]

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => {
        if (prev === "sync") return "async"
        if (prev === "async") return "resync"
        return "sync"
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getDelay = (index: number) => {
    if (animationState === "sync") return 0
    if (animationState === "async") return index * 0.15
    return 0
  }

  return (
    <div className="flex justify-center gap-8 my-12 flex-wrap">
      {limbs.map((limb, i) => (
        <div key={limb} className="text-center">
          <div
            className="w-16 h-16 rounded-full bg-[#005EB8] mb-3 mx-auto"
            style={{
              animation: "pulse 1.5s ease-in-out infinite",
              animationDelay: `${getDelay(i)}s`,
            }}
          />
          <p className="text-sm text-gray-400">{limb}</p>
        </div>
      ))}
    </div>
  )
}

// Component 2: Chaffee Groups
function ChaffeeGroups() {
  const groups = [
    {
      name: "Group A",
      description: "Three notes + doubles",
      strokes: ["L", "R", "L", "L", "R"],
      colors: [RALLY_BLUE, RED_STITCH, RALLY_BLUE, RALLY_BLUE, RED_STITCH],
    },
    {
      name: "Group B",
      description: "Four note patterns",
      strokes: ["R", "L", "R", "L"],
      colors: [RED_STITCH, RALLY_BLUE, RED_STITCH, RALLY_BLUE],
    },
    {
      name: "Group C",
      description: "Five note systems",
      strokes: ["R", "L", "R", "L", "R"],
      colors: [RED_STITCH, RALLY_BLUE, RED_STITCH, RALLY_BLUE, RED_STITCH],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
      {groups.map((group, idx) => (
        <TiltCard key={group.name} intensity={8}>
          <div className="text-center p-8 border border-gray-800 rounded-2xl hover:border-[#005EB8] transition-colors duration-500 bg-gray-900/50 backdrop-blur-sm">
            <h4 className="text-lg font-bold mb-4">{group.name}</h4>
            <p className="text-gray-400 text-sm mb-6">{group.description}</p>
            <div className="flex justify-center gap-2">
              {group.strokes.map((stroke, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold"
                  style={{
                    backgroundColor: group.colors[i],
                    animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {stroke}
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  )
}

// Component 3: Context Kits (Jazz vs Rock)
function ContextKits() {
  const [activeKit, setActiveKit] = useState<"jazz" | "rock" | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setActiveKit("jazz")}
        onMouseLeave={() => setActiveKit(null)}
      >
        <h4 className="text-center mb-4 text-lg font-semibold">Jazz</h4>
        <div className="relative h-64 rounded-2xl border border-gray-800 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
          {/* Ride cymbal - brightest in jazz */}
          <div
            className="absolute top-4 right-8 w-20 h-20 rounded-full blur-sm transition-all duration-500"
            style={{
              backgroundColor: "#fbbf24",
              opacity: activeKit === "jazz" ? 0.9 : 0.6,
            }}
          />
          {/* Snare - medium */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full transition-all duration-500"
            style={{
              backgroundColor: "#ffffff",
              opacity: activeKit === "jazz" ? 0.5 : 0.3,
            }}
          />
          {/* Bass - quiet */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full transition-all duration-500"
            style={{
              backgroundColor: "#ffffff",
              opacity: activeKit === "jazz" ? 0.2 : 0.15,
            }}
          />
          <div className="absolute bottom-4 left-4 text-xs text-gray-500">
            {activeKit === "jazz" && "Ride-focused"}
          </div>
        </div>
      </div>

      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setActiveKit("rock")}
        onMouseLeave={() => setActiveKit(null)}
      >
        <h4 className="text-center mb-4 text-lg font-semibold">Rock</h4>
        <div className="relative h-64 rounded-2xl border border-gray-800 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
          {/* Ride - quiet in rock */}
          <div
            className="absolute top-4 right-8 w-20 h-20 rounded-full blur-sm transition-all duration-500"
            style={{
              backgroundColor: "#fbbf24",
              opacity: activeKit === "rock" ? 0.2 : 0.6,
            }}
          />
          {/* Snare - loud */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full transition-all duration-500"
            style={{
              backgroundColor: "#ffffff",
              opacity: activeKit === "rock" ? 0.9 : 0.3,
            }}
          />
          {/* Bass - loud */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full transition-all duration-500"
            style={{
              backgroundColor: "#ffffff",
              opacity: activeKit === "rock" ? 0.8 : 0.15,
            }}
          />
          <div className="absolute bottom-4 left-4 text-xs text-gray-500">
            {activeKit === "rock" && "Snare & bass-focused"}
          </div>
        </div>
      </div>
    </div>
  )
}

// Component 4: Fill Timeline
function FillTimeline() {
  const notes = Array.from({ length: 16 }, (_, i) => ({
    hand: i % 2 === 0 ? "L" : "R",
    beat: i + 1,
  }))

  return (
    <div className="my-16">
      <div className="flex justify-center gap-1 flex-wrap">
        {notes.map((note, i) => (
          <div
            key={i}
            className={`w-8 h-12 sm:w-10 sm:h-14 rounded flex items-center justify-center text-xs font-mono font-bold
              ${note.hand === "L" ? "bg-[#005EB8]" : "bg-gray-700"}
            `}
            style={{
              animationDelay: `${i * 0.05}s`,
              animation: "fadeInUp 0.3s ease-out forwards",
              opacity: 0,
            }}
          >
            {note.hand}
          </div>
        ))}
      </div>
      <p className="text-center text-gray-400 mt-6 text-sm">
        16th notes starting on left hand. Where does the downbeat land?
      </p>
    </div>
  )
}

// Component 5: Language Parallel
function LanguageParallel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 items-center">
      <TiltCard intensity={6}>
        <div className="text-center p-8 border-r border-gray-800 bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <p className="font-mono text-2xl tracking-wider mb-4">R L R R L L</p>
          <p className="text-gray-400 mb-2">Paradiddle</p>
          <p className="text-sm text-gray-600">Physical speed limits</p>
        </div>
      </TiltCard>
      <TiltCard intensity={6}>
        <div className="text-center p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <p className="font-mono text-2xl tracking-wider mb-4">/str/ + vowel</p>
          <p className="text-gray-400 mb-2">Phonotactics</p>
          <p className="text-sm text-gray-600">Combinatorial constraints</p>
        </div>
      </TiltCard>
    </div>
  )
}

// Component 6: Improvisation Orbit
function ImprovisationOrbit() {
  const [isVisible, setIsVisible] = useState(false)
  const items = ["Skiing", "Jiu-Jitsu", "Language", "Drumming"]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-96 my-24">
      {/* Center node */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#005EB8] flex items-center justify-center text-center text-sm font-bold transition-all duration-1000 ${
          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        Improvisation
      </div>

      {/* Orbiting elements */}
      {items.map((item, i) => {
        const angle = (i * Math.PI) / 2
        const radius = 35
        return (
          <div key={item}>
            {/* Connecting line */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                opacity: isVisible ? 0.3 : 0,
                transition: "opacity 1s ease-out",
                transitionDelay: `${i * 0.2}s`,
              }}
            >
              <line
                x1="50%"
                y1="50%"
                x2={`${50 + radius * Math.cos(angle)}%`}
                y2={`${50 + radius * Math.sin(angle)}%`}
                stroke={RALLY_BLUE}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Orbiting node */}
            <div
              className={`absolute w-20 h-20 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-xs font-medium transition-all duration-1000 hover:bg-gray-700 hover:border-[#005EB8] cursor-pointer`}
              style={{
                top: `${50 + radius * Math.sin(angle)}%`,
                left: `${50 + radius * Math.cos(angle)}%`,
                transform: isVisible ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)",
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              {item}
            </div>
          </div>
        )
      })}
    </div>
  )
}
