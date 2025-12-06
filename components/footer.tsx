"use client"

import Link from "next/link"
import { Linkedin, Instagram, Mail, ExternalLink } from "lucide-react"

const footerLinks = {
  galleries: [
    { name: "AI Systems", href: "/gallery/ai" },
    { name: "Music", href: "/gallery/music" },
    { name: "Clinical", href: "/gallery/clinical" },
    { name: "Writing", href: "/gallery/writing" },
  ],
  about: [
    { name: "About", href: "/about" },
    { name: "ICS Methodology", href: "/about#ics" },
  ],
  external: [{ name: "EASI Project", href: "https://easi-speech-analysis.gamma.site", external: true }],
}

const socials = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand - Updated to Reid */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif text-lg font-bold">
                R
              </div>
              <div>
                <p className="font-serif text-lg font-medium text-foreground">Reid</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 text-pretty">
              Intelligence Conductor: Orchestrating creativity, technology, and innovation.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Galleries */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Galleries</h3>
            <ul className="space-y-2">
              {footerLinks.galleries.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-medium text-foreground mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Projects</h3>
            <ul className="space-y-2">
              {footerLinks.external.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Reid. All rights reserved.</p>
          <Link href="/contact" className="text-sm text-primary hover:underline">
            Start a Conversation
          </Link>
        </div>
      </div>
    </footer>
  )
}
