import { type NextRequest, NextResponse } from "next/server"

// In-memory user storage (replace with database in production)
const users: Array<{
  id: string
  email: string
  password: string
  name: string
  createdAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name required" }, { status: 400 })
    }

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, hash the password!
      name,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Create session token
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString("base64")

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        token,
      },
      { status: 201 },
    )

    // Set secure cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 })
  }
}
