import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MusicProvider } from "@/lib/music-context"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Matthew Guggemos | Communication Scientist & Technologist",
  description:
    "Communication scientist and licensed speech-language pathologist. Co-founder of iTherapy. Building AI tools that help people connect. Also a drummer with international touring and recording credits.",
  generator: "v0.app",
  keywords: ["AI", "Speech Pathology", "Communication Science", "Music", "Drummer", "iTherapy", "Technology"],
  authors: [{ name: "Matthew Guggemos" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <MusicProvider>{children}</MusicProvider>
        <Analytics />
      </body>
    </html>
  )
}
