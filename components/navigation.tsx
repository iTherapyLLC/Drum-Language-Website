"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleries = [
  { name: "AI Systems", href: "/gallery/ai", description: "EASI, InnerVoice, VAST" },
  { name: "Music", href: "/gallery/music", description: "Performances & Recordings" },
  { name: "Writing", href: "/gallery/writing", description: "Publications & Research" },
  { name: "Clinical", href: "/gallery/clinical", description: "Speech-Language Pathology" },
]

interface NavigationProps {
  onOpenGuide?: () => void
}

export function Navigation({ onOpenGuide }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif text-lg font-bold">
              R
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                Intelligence Conductor
              </p>
              <p className="text-xs text-muted-foreground">Reid</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Exhibit
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                Galleries
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-card border border-border rounded-lg shadow-lg p-2 min-w-[200px]">
                  {galleries.map((gallery) => (
                    <Link
                      key={gallery.href}
                      href={gallery.href}
                      className={cn(
                        "block px-4 py-2 rounded-md hover:bg-muted transition-colors",
                        pathname === gallery.href ? "bg-muted text-primary" : "text-foreground",
                      )}
                    >
                      <span className="font-medium">{gallery.name}</span>
                      <span className="block text-xs text-muted-foreground">{gallery.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/about" ? "text-primary" : "text-muted-foreground",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/contact" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Contact
            </Link>
          </div>

          {/* AI Guide Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={onOpenGuide}
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-primary/30 hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask the Guide</span>
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/"
              className={cn(
                "block px-4 py-2 rounded-md transition-colors",
                pathname === "/" ? "bg-muted text-primary" : "hover:bg-muted",
              )}
              onClick={() => setIsOpen(false)}
            >
              Exhibit
            </Link>
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Galleries</p>
              <div className="space-y-1">
                {galleries.map((gallery) => (
                  <Link
                    key={gallery.href}
                    href={gallery.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm transition-colors",
                      pathname === gallery.href ? "bg-muted text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {gallery.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/about"
              className={cn(
                "block px-4 py-2 rounded-md transition-colors",
                pathname === "/about" ? "bg-muted text-primary" : "hover:bg-muted",
              )}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "block px-4 py-2 rounded-md transition-colors",
                pathname === "/contact" ? "bg-muted text-primary" : "hover:bg-muted",
              )}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Button
              onClick={() => {
                setIsOpen(false)
                onOpenGuide?.()
              }}
              className="w-full mt-4"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask the Guide
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
