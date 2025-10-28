import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Decode token (in production, verify JWT)
    const decoded = Buffer.from(token, "base64").toString("utf-8")
    const [userId] = decoded.split(":")

    // In production, fetch user from database
    return NextResponse.json({
      id: userId,
      email: "user@example.com",
      name: "User Name",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
