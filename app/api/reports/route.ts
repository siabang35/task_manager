import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for reports
const reports: Array<{
  id: string
  date: string
  title: string
  content: string
  status: "draft" | "published"
  createdAt: string
  updatedAt: string
}> = []

export async function GET() {
  return NextResponse.json(reports)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newReport = {
      id: Date.now().toString(),
      date: body.date || new Date().toISOString().split("T")[0],
      title: body.title,
      content: body.content || "",
      status: body.status || "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    reports.push(newReport)
    return NextResponse.json(newReport, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create report" }, { status: 400 })
  }
}
