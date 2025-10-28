"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Plus, Calendar } from "lucide-react"

interface DailyReport {
  id: string
  date: string
  title: string
  content: string
  tasksCompleted: number
  notes: string
  createdAt: string
}

export function ReportHarian() {
  const [reports, setReports] = useState<DailyReport[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tasksCompleted: 0,
    notes: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    const savedReports = localStorage.getItem("reports")
    if (savedReports) {
      setReports(JSON.parse(savedReports))
    }
  }, [])

  const saveReports = (newReports: DailyReport[]) => {
    setReports(newReports)
    localStorage.setItem("reports", JSON.stringify(newReports))
  }

  const addReport = () => {
    if (!formData.title.trim()) return

    const newReport: DailyReport = {
      id: Date.now().toString(),
      date: formData.date,
      title: formData.title,
      content: formData.content,
      tasksCompleted: formData.tasksCompleted,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    }

    saveReports([newReport, ...reports])
    setFormData({
      title: "",
      content: "",
      tasksCompleted: 0,
      notes: "",
      date: new Date().toISOString().split("T")[0],
    })
    setShowForm(false)
  }

  const deleteReport = (id: string) => {
    saveReports(reports.filter((r) => r.id !== id))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Report Harian</h1>
          <p className="text-muted">Track your daily progress and accomplishments</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          New Report
        </button>
      </div>

      {/* Add Report Form */}
      {showForm && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Create Daily Report</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input"
              />
              <input
                type="text"
                placeholder="Report title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input"
              />
            </div>
            <textarea
              placeholder="Report content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input min-h-32"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Tasks completed"
                value={formData.tasksCompleted}
                onChange={(e) => setFormData({ ...formData, tasksCompleted: Number.parseInt(e.target.value) || 0 })}
                className="input"
              />
              <input
                type="text"
                placeholder="Additional notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="input"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={addReport} className="btn btn-primary flex-1">
                Create Report
              </button>
              <button onClick={() => setShowForm(false)} className="btn btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted">No reports yet. Create your first daily report!</p>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={18} className="text-primary" />
                    <span className="text-sm text-muted">{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold">{report.title}</h3>
                </div>
                <button
                  onClick={() => deleteReport(report.id)}
                  className="text-destructive hover:bg-border p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-foreground mb-4">{report.content}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted">Tasks Completed</p>
                  <p className="text-2xl font-bold text-accent">{report.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Notes</p>
                  <p className="text-sm">{report.notes || "No additional notes"}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
