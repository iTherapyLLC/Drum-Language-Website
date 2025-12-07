"use client"

import { useState, useRef, useEffect } from "react"
import { Maximize2, Minimize2, Music, Brain, Sparkles, MessageCircle, ChevronRight, Play } from "lucide-react"
import { RevealOnScroll } from "./reveal-on-scroll"
import { MagicHeading } from "./magic-text"
import { SpiralKaleidoscope } from "./spiral-kaleidoscope"

const RALLY_BLUE = "#005EB8"
const RED_STITCH = "#DC2626"

export function HarmonizedLearningSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHoveringEmbed, setIsHoveringEmbed] = useState(false)
  const [activeMovement, setActiveMovement] = useState<number | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isExpanded])

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isExpanded])

  const movements = [
    { num: "I", title: "Human Intelligence in the Age of AI" },
    { num: "II", title: "Perspectives on Intelligence" },
    { num: "III", title: "Bloom-Lahey Model & Skill Acquisition" },
    { num: "IV", title: "Multi-potentiality & Combinatorial Creativity" },
    { num: "V", title: "Instrumentive AI & Human Potential" },
  ]

  return (
    <>
      {/* Expanded overlay - covers summary text but leaves room for docent */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
            aria-label="Close expanded view"
          >
            <Minimize2 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </button>

          <div className="absolute inset-4 right-24 sm:right-28 bottom-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${RALLY_BLUE}30` }}
              >
                <Music className="w-4 h-4" style={{ color: RALLY_BLUE }} />
              </div>
              <h3 className="text-white font-semibold">Harmonized Learning</h3>
              <span className="text-white/40 text-sm hidden sm:inline">Press ESC or click X to close</span>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-white/20 bg-black shadow-2xl">
              <iframe
                src="https://gamma.app/embed/2incbkemd9j0ps2"
                style={{ border: "none" }}
                className="w-full h-full"
                allow="fullscreen"
                title="Harmonized Learning - Mensa Foundation Presentation"
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-white/40 text-xs">Navigate with arrow keys or click through slides</p>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <MessageCircle className="w-4 h-4" />
                <span>Ask the docent about any concept</span>
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="text-white/30 text-xs text-center hidden sm:block" style={{ writingMode: "vertical-rl" }}>
              Docent
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      )}

      <section id="harmonized-learning" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a] relative overflow-hidden">
        <SpiralKaleidoscope opacity={0.12} className="z-0 invert" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 Q35 20 30 30 Q25 40 30 50' stroke='white' fill='none' strokeWidth='1'/%3E%3Ccircle cx='30' cy='50' r='4' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <RevealOnScroll variant="blur-scale" duration={800}>
            <div className="mb-10 sm:mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 hover:bg-white/15 transition-colors duration-300 cursor-default">
                <Music className="w-4 h-4" style={{ color: RALLY_BLUE }} />
                <span className="text-white/80 text-sm font-medium">Mensa Foundation Presentation</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-white">
                <MagicHeading as="span" className="text-2xl sm:text-4xl font-bold text-white">
                  Harmonized Learning
                </MagicHeading>
              </h2>
              <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                A symphony of ideas exploring human potential in the age of AI
              </p>
            </div>
          </RevealOnScroll>

          {/* Gamma Embed - Full width */}
          <RevealOnScroll variant="blur-scale" delay={100} duration={800}>
            <div
              className="relative rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[#005EB8]/10 mb-10"
              onMouseEnter={() => setIsHoveringEmbed(true)}
              onMouseLeave={() => setIsHoveringEmbed(false)}
            >
              {/* Clean header bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: isHoveringEmbed ? `${RALLY_BLUE}30` : `${RALLY_BLUE}20` }}
                  >
                    <Music
                      className="w-4 h-4 transition-transform duration-300"
                      style={{ color: RALLY_BLUE, transform: isHoveringEmbed ? "scale(1.1)" : "scale(1)" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/80 text-sm font-medium">Concerto: Harmonized Learning</span>
                    <span className="text-white/40 text-xs hidden sm:inline">Interactive presentation</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 group flex items-center gap-2 border border-transparent hover:border-white/10"
                  aria-label="Expand presentation"
                >
                  <span className="text-white/50 text-xs hidden sm:inline group-hover:text-white/70 transition-colors">
                    Expand
                  </span>
                  <Maximize2 className="w-4 h-4 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                </button>
              </div>

              {/* Gamma iframe - wider aspect ratio for horizontal layout */}
              <div className="relative aspect-[16/9] group/iframe">
                <iframe
                  ref={iframeRef}
                  src="https://gamma.app/embed/2incbkemd9j0ps2"
                  style={{ border: "none" }}
                  className="absolute inset-0 w-full h-full"
                  allow="fullscreen"
                  title="Harmonized Learning - Mensa Foundation Presentation"
                />
                {/* Play hint overlay on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none transition-opacity duration-500"
                  style={{ opacity: isHoveringEmbed ? 0 : 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Footer with keyboard hints */}
              <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-white/50 font-mono">←</kbd>
                    <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-white/50 font-mono">→</kbd>
                  </div>
                  <span className="text-white/40 text-xs">to navigate</span>
                </div>
                <p className="text-white/40 text-xs hidden sm:block">Structure mirrors a musical composition</p>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Central Question card */}
            <RevealOnScroll variant="slide-up" delay={200} duration={600}>
              <div className="group h-full bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 hover:shadow-lg hover:shadow-[#005EB8]/5 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${RALLY_BLUE}20` }}
                  >
                    <Brain className="w-5 h-5 transition-colors duration-300" style={{ color: RALLY_BLUE }} />
                  </div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-white transition-colors">
                    The Central Question
                  </h3>
                </div>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base italic group-hover:text-white/80 transition-colors duration-300">
                  "What if our greatest intellectual asset in the age of AI is our unique ability to connect different
                  ideas, sparking creativity and innovation on our own terms?"
                </p>
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </RevealOnScroll>

            {/* Five Movements - horizontal list */}
            <RevealOnScroll variant="slide-up" delay={300} duration={600}>
              <div className="group h-full bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 hover:shadow-lg hover:shadow-[#DC2626]/5">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Sparkles
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                    style={{ color: RED_STITCH }}
                  />
                  Five Movements
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {movements.map((movement, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 p-1.5 -mx-1.5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                      onMouseEnter={() => setActiveMovement(index)}
                      onMouseLeave={() => setActiveMovement(null)}
                    >
                      <span
                        className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono transition-all duration-300 shrink-0"
                        style={{
                          backgroundColor: activeMovement === index ? `${RALLY_BLUE}30` : "transparent",
                          color: activeMovement === index ? RALLY_BLUE : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {movement.num}
                      </span>
                      <span
                        className="flex-1 text-xs transition-colors duration-300 leading-tight"
                        style={{
                          color: activeMovement === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {movement.title}
                      </span>
                      <ChevronRight
                        className="w-3 h-3 transition-all duration-300 shrink-0"
                        style={{
                          opacity: activeMovement === index ? 1 : 0,
                          transform: activeMovement === index ? "translateX(0)" : "translateX(-4px)",
                          color: RALLY_BLUE,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            {/* Ask the Docent */}
            <RevealOnScroll variant="slide-up" delay={400} duration={600}>
              <div
                className="group h-full bg-gradient-to-br from-[#005EB8]/10 to-[#DC2626]/5 rounded-2xl p-5 sm:p-6 border border-white/10 cursor-pointer hover:border-[#005EB8]/30 hover:from-[#005EB8]/20 hover:to-[#DC2626]/10 transition-all duration-500 hover:shadow-xl hover:shadow-[#005EB8]/10 hover:-translate-y-1"
                onClick={() => {
                  const chatButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement
                  if (chatButton) chatButton.click()
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <MessageCircle
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: RALLY_BLUE }}
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                      style={{ backgroundColor: `${RALLY_BLUE}30` }}
                    />
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-white transition-colors">Ask the Docent</h3>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="w-4 h-4" style={{ color: RALLY_BLUE }} />
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  Questions about Moravec's Paradox, instrumentive AI, or how jazz improvisation connects to human
                  cognition? The AI docent knows this material deeply.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>Click to start a conversation</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Key insight - full width below */}
          <RevealOnScroll variant="slide-up" delay={500} duration={600}>
            <div
              className="group mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-white/5 to-transparent border-l-2 transition-all duration-500 hover:from-white/10 hover:bg-white/[0.02]"
              style={{ borderColor: RED_STITCH }}
            >
              <p className="text-white/80 text-sm sm:text-base leading-relaxed group-hover:text-white/90 transition-colors duration-300 max-w-4xl">
                This presentation explores how humans maintain cognitive advantages through continuous low-cost
                learning, improvisational skills, and the ability to integrate diverse perspectives. The structure
                itself demonstrates the concept: organized like a musical score with themes, variations, and movements
                that build toward a unified understanding.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
