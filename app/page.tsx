"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { TaskManager } from "@/components/task-manager"
import { ReportHarian } from "@/components/report-harian"
import { Absensi } from "@/components/absensi"
import { TodoList } from "@/components/todo-list"
import { SyncStatus } from "@/components/sync-status"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "tasks":
        return <TaskManager />
      case "report":
        return <ReportHarian />
      case "absensi":
        return <Absensi />
      case "todo":
        return <TodoList />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border bg-card p-3">
          <SyncStatus />
        </div>
        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>
    </div>
  )
}
