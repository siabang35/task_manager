"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, CheckCircle2, Circle, Edit2, Search } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  createdAt: string
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
  })

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks))
  }

  const addTask = () => {
    if (!formData.title.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      status: "pending",
      priority: formData.priority,
      dueDate: formData.dueDate,
      createdAt: new Date().toISOString(),
    }

    saveTasks([...tasks, newTask])
    setFormData({ title: "", description: "", priority: "medium", dueDate: "" })
    setShowForm(false)
  }

  const updateTaskStatus = (id: string, status: Task["status"]) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, status } : t))
    saveTasks(updated)
  }

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter((t) => t.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/20 text-destructive"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "low":
        return "bg-accent/20 text-accent"
      default:
        return "bg-muted/20 text-muted"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-accent"
      case "in-progress":
        return "text-primary"
      case "pending":
        return "text-muted"
      default:
        return "text-muted"
    }
  }

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Task Manager</h1>
          <p className="text-muted">Manage and track all your tasks</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
          />
        </div>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as any)}
          className="input px-4"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <Card className="p-6 mb-8 animate-slide-in">
          <h2 className="text-xl font-bold mb-4">Create New Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input w-full"
            />
            <textarea
              placeholder="Task description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input w-full min-h-24"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="input"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="input"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={addTask} className="btn btn-primary flex-1">
                Create Task
              </button>
              <button onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted">
              {tasks.length === 0 ? "No tasks yet. Create one to get started!" : "No tasks match your filters."}
            </p>
          </Card>
        ) : (
          filteredTasks.map((task, index) => (
            <Card key={task.id} className="p-6 animate-slide-in" style={{ animationDelay: `${index * 30}ms` }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <button
                    onClick={() => updateTaskStatus(task.id, task.status === "completed" ? "pending" : "completed")}
                    className="mt-1 transition-transform hover:scale-110"
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="text-accent" size={24} />
                    ) : (
                      <Circle className="text-muted hover:text-primary" size={24} />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold transition-all ${
                        task.status === "completed" ? "line-through text-muted" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-muted text-sm mt-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-border rounded-lg transition-colors">
                    <Edit2 size={18} className="text-muted" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 hover:bg-border rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
