"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react"

interface TodoItem {
  id: string
  text: string
  completed: boolean
  category: string
  createdAt: string
}

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [input, setInput] = useState("")
  const [category, setCategory] = useState("general")
  const [filter, setFilter] = useState("all")

  const categories = ["general", "work", "personal", "shopping", "health"]

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  const saveTodos = (newTodos: TodoItem[]) => {
    setTodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  const addTodo = () => {
    if (!input.trim()) return

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: input,
      completed: false,
      category,
      createdAt: new Date().toISOString(),
    }

    saveTodos([newTodo, ...todos])
    setInput("")
  }

  const toggleTodo = (id: string) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    saveTodos(updated)
  }

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter((t) => t.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">To Do List</h1>
        <p className="text-muted">Organize your daily tasks and goals</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <p className="text-sm text-muted mb-1">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted mb-1">Completed</p>
          <p className="text-2xl font-bold text-accent">{stats.completed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted mb-1">Pending</p>
          <p className="text-2xl font-bold text-primary">{stats.pending}</p>
        </Card>
      </div>

      {/* Add Todo Form */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
        <div className="flex gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                category === cat ? "bg-primary text-primary-foreground" : "bg-border text-foreground hover:bg-border/80"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="input flex-1"
          />
          <button onClick={addTodo} className="btn btn-primary">
            <Plus size={20} />
          </button>
        </div>
      </Card>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-border text-foreground hover:bg-border/80"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todos List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted">No todos yet. Add one to get started!</p>
          </Card>
        ) : (
          filteredTodos.map((todo) => (
            <Card key={todo.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0">
                    {todo.completed ? (
                      <CheckCircle2 className="text-accent" size={24} />
                    ) : (
                      <Circle className="text-muted hover:text-primary" size={24} />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`${todo.completed ? "line-through text-muted" : ""}`}>{todo.text}</p>
                    <span className="text-xs text-muted bg-border/50 px-2 py-1 rounded inline-block mt-1">
                      {todo.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 hover:bg-border rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-destructive" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
