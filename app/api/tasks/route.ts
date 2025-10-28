import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with database in production)
const tasks: Array<{
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  dueDate: string
  createdAt: string
  updatedAt: string
}> = []

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newTask = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || "",
      status: body.status || "todo",
      priority: body.priority || "medium",
      dueDate: body.dueDate || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    tasks.push(newTask)
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 400 })
  }
}
