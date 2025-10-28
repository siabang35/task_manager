"use client"

import { LayoutDashboard, CheckSquare, FileText, Users, ListTodo, Moon, Sun, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

export function Sidebar({ currentPage, onPageChange, isDarkMode, onThemeToggle }: SidebarProps) {
  const { logout } = useAuth()
  const router = useRouter()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Task Manager", icon: CheckSquare },
    { id: "report", label: "Report Harian", icon: FileText },
    { id: "absensi", label: "Absensi", icon: Users },
    { id: "todo", label: "To Do List", icon: ListTodo },
  ]

  const handleLogout = async () => {
    await logout()
    router.push("/auth")
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">TaskPro</h1>
        <p className="text-sm text-muted mt-1">Manage everything</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-border"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <button
          onClick={onThemeToggle}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-border transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-border transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
