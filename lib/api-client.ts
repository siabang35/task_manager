import { syncFromCloud, addToSyncQueue, isOnline } from "./db"

const API_BASE = "/api"

// Helper to handle offline operations
const handleOfflineOperation = async (
  operation: () => Promise<any>,
  table: string,
  syncOperation: "insert" | "update" | "delete",
  data: any,
) => {
  try {
    if (isOnline()) {
      return await operation()
    } else {
      console.log("[v0] Offline mode: queuing operation")
      addToSyncQueue(table, syncOperation, data)
      return { success: true, offline: true, data }
    }
  } catch (error) {
    console.error("[v0] Operation error:", error)
    addToSyncQueue(table, syncOperation, data)
    throw error
  }
}

export const apiClient = {
  // Tasks with sync support
  getTasks: async () => {
    try {
      const res = await fetch(`${API_BASE}/tasks`)
      if (!res.ok) throw new Error("Failed to fetch tasks")
      return res.json()
    } catch (error) {
      console.log("[v0] Fetching tasks from cloud storage")
      return await syncFromCloud("tasks")
    }
  },

  getTask: async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`)
      if (!res.ok) throw new Error("Failed to fetch task")
      return res.json()
    } catch (error) {
      console.log("[v0] Fetching task from cloud storage")
      return await syncFromCloud("tasks", { id })
    }
  },

  createTask: async (data: any) => {
    return handleOfflineOperation(
      () =>
        fetch(`${API_BASE}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
      "tasks",
      "insert",
      data,
    )
  },

  updateTask: async (id: string, data: any) => {
    return handleOfflineOperation(
      () =>
        fetch(`${API_BASE}/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id }),
        }).then((res) => res.json()),
      "tasks",
      "update",
      { ...data, id },
    )
  },

  deleteTask: async (id: string) => {
    return handleOfflineOperation(
      () =>
        fetch(`${API_BASE}/tasks/${id}`, {
          method: "DELETE",
        }).then((res) => res.json()),
      "tasks",
      "delete",
      { id },
    )
  },

  // Reports with sync support
  getReports: async () => {
    try {
      const res = await fetch(`${API_BASE}/reports`)
      if (!res.ok) throw new Error("Failed to fetch reports")
      return res.json()
    } catch (error) {
      console.log("[v0] Fetching reports from cloud storage")
      return await syncFromCloud("reports")
    }
  },

  createReport: async (data: any) => {
    return handleOfflineOperation(
      () =>
        fetch(`${API_BASE}/reports`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
      "reports",
      "insert",
      data,
    )
  },

  // Attendance with sync support
  getAttendance: async () => {
    try {
      const res = await fetch(`${API_BASE}/attendance`)
      if (!res.ok) throw new Error("Failed to fetch attendance")
      return res.json()
    } catch (error) {
      console.log("[v0] Fetching attendance from cloud storage")
      return await syncFromCloud("attendance")
    }
  },

  recordAttendance: async (data: any) => {
    return handleOfflineOperation(
      () =>
        fetch(`${API_BASE}/attendance`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((res) => res.json()),
      "attendance",
      "insert",
      data,
    )
  },
}
