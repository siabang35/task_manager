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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const task = tasks.find((t) => t.id === params.id)
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }
  return NextResponse.json(task)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const taskIndex = tasks.findIndex((t) => t.id === params.id)
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }
    return NextResponse.json(tasks[taskIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const taskIndex = tasks.findIndex((t) => t.id === params.id)
  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }
  const deletedTask = tasks.splice(taskIndex, 1)
  return NextResponse.json(deletedTask[0])
}
