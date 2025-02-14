import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { createTransport } from "nodemailer"

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const token = sign({ email }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" })
    const magicLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Magic Link",
      html: `Click <a href="${magicLink}">here</a> to sign in to Earthworkers`,
    })

    return NextResponse.json({ message: "Magic link sent" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send magic link" }, { status: 500 })
  }
}

