import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for attendance
const attendance: Array<{
  id: string
  date: string
  status: "present" | "absent" | "late"
  notes: string
  createdAt: string
}> = []

export async function GET() {
  return NextResponse.json(attendance)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newAttendance = {
      id: Date.now().toString(),
      date: body.date || new Date().toISOString().split("T")[0],
      status: body.status || "present",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    }
    attendance.push(newAttendance)
    return NextResponse.json(newAttendance, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to record attendance" }, { status: 400 })
  }
}
