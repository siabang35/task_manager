"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, TrendingUp, BarChart3 } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface DashboardStats {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  attendanceRate: number
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    attendanceRate: 0,
  })

  const [chartData] = useState([
    { day: "Mon", tasks: 4, completed: 3 },
    { day: "Tue", tasks: 5, completed: 4 },
    { day: "Wed", tasks: 6, completed: 5 },
    { day: "Thu", tasks: 4, completed: 3 },
    { day: "Fri", tasks: 7, completed: 6 },
    { day: "Sat", tasks: 3, completed: 2 },
    { day: "Sun", tasks: 2, completed: 2 },
  ])

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const attendance = JSON.parse(localStorage.getItem("attendance") || "[]")

    const completed = tasks.filter((t: any) => t.status === "completed").length
    const pending = tasks.filter((t: any) => t.status === "pending").length

    const today = new Date().toISOString().split("T")[0]
    const todayAttendance = attendance.filter((a: any) => a.date === today)
    const attendanceRate = todayAttendance.length > 0 ? 100 : 0

    setStats({
      totalTasks: tasks.length,
      completedTasks: completed,
      pendingTasks: pending,
      attendanceRate,
    })
  }, [])

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: CheckCircle2,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6 animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.color} w-6 h-6`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 animate-slide-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Weekly Task Trends</h2>
            <BarChart3 size={20} className="text-primary" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: `1px solid var(--border)`,
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: "var(--accent)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 animate-slide-in" style={{ animationDelay: "250ms" }}>
          <h2 className="text-xl font-bold mb-4">Completion Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: `1px solid var(--border)`,
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="completed" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 animate-slide-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-border/50 rounded-lg hover:bg-border transition-colors"
              >
                <div>
                  <p className="font-medium">Task {i}</p>
                  <p className="text-sm text-muted">Due today</p>
                </div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">In Progress</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 animate-slide-in" style={{ animationDelay: "350ms" }}>
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted mb-1">Productivity</p>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: "75%" }}></div>
              </div>
              <p className="text-xs text-muted mt-1">75% complete</p>
            </div>
            <div>
              <p className="text-sm text-muted mb-1">Attendance</p>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: "90%" }}></div>
              </div>
              <p className="text-xs text-muted mt-1">90% present</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
