"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface AttendanceRecord {
  id: string
  date: string
  status: "present" | "absent" | "late" | "leave"
  notes: string
  createdAt: string
}

export function Absensi() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedStatus, setSelectedStatus] = useState<"present" | "absent" | "late" | "leave">("present")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const savedRecords = localStorage.getItem("attendance")
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords))
    }
  }, [])

  const saveRecords = (newRecords: AttendanceRecord[]) => {
    setRecords(newRecords)
    localStorage.setItem("attendance", JSON.stringify(newRecords))
  }

  const addAttendance = () => {
    const existingRecord = records.find((r) => r.date === selectedDate)

    if (existingRecord) {
      const updated = records.map((r) => (r.date === selectedDate ? { ...r, status: selectedStatus, notes } : r))
      saveRecords(updated)
    } else {
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        date: selectedDate,
        status: selectedStatus,
        notes,
        createdAt: new Date().toISOString(),
      }
      saveRecords([newRecord, ...records])
    }
    setNotes("")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="text-accent" size={20} />
      case "absent":
        return <AlertCircle className="text-destructive" size={20} />
      case "late":
        return <Clock className="text-yellow-500" size={20} />
      case "leave":
        return <Calendar className="text-primary" size={20} />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-accent/20 text-accent"
      case "absent":
        return "bg-destructive/20 text-destructive"
      case "late":
        return "bg-yellow-500/20 text-yellow-500"
      case "leave":
        return "bg-primary/20 text-primary"
      default:
        return "bg-muted/20 text-muted"
    }
  }

  const stats = {
    present: records.filter((r) => r.status === "present").length,
    absent: records.filter((r) => r.status === "absent").length,
    late: records.filter((r) => r.status === "late").length,
    leave: records.filter((r) => r.status === "leave").length,
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Absensi</h1>
        <p className="text-muted">Track attendance and manage leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <p className="text-sm text-muted mb-1">Present</p>
          <p className="text-2xl font-bold text-accent">{stats.present}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted mb-1">Absent</p>
          <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted mb-1">Late</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.late}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted mb-1">Leave</p>
          <p className="text-2xl font-bold text-primary">{stats.leave}</p>
        </Card>
      </div>

      {/* Add Attendance Form */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Record Attendance</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input"
            />
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value as any)} className="input">
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="leave">Leave</option>
            </select>
          </div>
          <textarea
            placeholder="Additional notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input min-h-20"
          />
          <button onClick={addAttendance} className="btn btn-primary w-full">
            Record Attendance
          </button>
        </div>
      </Card>

      {/* Attendance Records */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold mb-4">Attendance History</h2>
        {records.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted">No attendance records yet.</p>
          </Card>
        ) : (
          records.map((record) => (
            <Card key={record.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted">{record.notes || "No notes"}</p>
                  </div>
                </div>
                <span className={`text-sm px-3 py-1 rounded ${getStatusColor(record.status)}`}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
