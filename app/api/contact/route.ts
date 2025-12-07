import { type NextRequest, NextResponse } from "next/server"

// Email addresses (server-side only - never exposed to client)
const TECH_EMAIL = "matthew@itherapyllc.com"
const MUSIC_EMAIL = "matthew@drumlanguage.com"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, inquiryType } = body

    // Validate required fields
    if (!name || !email || !subject || !message || !inquiryType) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Determine recipient based on inquiry type
    const toEmail = inquiryType === "tech" ? TECH_EMAIL : MUSIC_EMAIL
    const categoryLabel = inquiryType === "tech" ? "Technology & AI" : "Music & Consultation"

    // Check for Resend API key
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      // Send email using Resend
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [toEmail],
          subject: `[${categoryLabel}] ${subject}`,
          reply_to: email,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: ${inquiryType === "tech" ? "#005EB8" : "#DC2626"};">
                New ${categoryLabel} Inquiry
              </h2>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
              </div>
              <div style="padding: 20px 0;">
                <h3>Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #666; font-size: 12px;">
                This message was sent from your portfolio website contact form.
              </p>
            </div>
          `,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Resend API error:", errorData)
        throw new Error("Failed to send email")
      }

      return NextResponse.json({ success: true, message: "Email sent successfully" })
    } else {
      // Fallback: Log the message (for development/testing without Resend)
      console.log("=== Contact Form Submission ===")
      console.log(`To: ${toEmail}`)
      console.log(`Category: ${categoryLabel}`)
      console.log(`From: ${name} <${email}>`)
      console.log(`Subject: ${subject}`)
      console.log(`Message: ${message}`)
      console.log("==============================")

      // In production without Resend, you could integrate with other services
      // For now, we'll return success to test the form flow
      return NextResponse.json({
        success: true,
        message: "Message received (Resend API key not configured - check server logs)",
      })
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 })
  }
}
