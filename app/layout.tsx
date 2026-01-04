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
  title: "Matthew Guggemos | Systems Conductor",
  description:
    "Communication scientist and licensed speech-language pathologist. Co-founder of iTherapy. Building AI tools that help people connect. Professional drummer with international touring and recording credits. Orchestrating AI, speech science, and rhythm into breakthrough solutions.",
  generator: "v0.app",
  keywords: [
    "AI",
    "Speech Pathology",
    "Communication Science",
    "Music",
    "Drummer",
    "iTherapy",
    "Technology",
    "Drum Language",
    "Systems Conductor",
    "Speech Therapy",
    "Jazz",
    "Machine Learning",
  ],
  authors: [{ name: "Matthew Guggemos" }],
  creator: "Matthew Guggemos",
  publisher: "iTherapy LLC",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drumlanguage.com",
    siteName: "Drum Language",
    title: "Matthew Guggemos | Systems Conductor",
    description:
      "Where AI meets speech science meets rhythm. Communication scientist, technologist, and professional drummer orchestrating breakthrough solutions.",
    images: [
      {
        url: "/og-drum-language.png",
        width: 1200,
        height: 630,
        alt: "Drum Language - A swirling symphony of music, technology, and communication",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthew Guggemos | Systems Conductor",
    description:
      "Communication scientist, technologist, and professional drummer.",
    images: ["/og-drum-language.png"],
    creator: "@drumlanguage",
  },
  metadataBase: new URL("https://drumlanguage.com"),
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
