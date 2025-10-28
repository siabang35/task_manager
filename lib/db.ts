import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mrndlxwnilxuqtslqztl.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createBrowserClient(supabaseUrl, supabaseKey)

// Sync queue for offline operations
interface SyncQueueItem {
  id: string
  table: string
  operation: "insert" | "update" | "delete"
  data: any
  timestamp: number
}

const SYNC_QUEUE_KEY = "sync_queue"
const LAST_SYNC_KEY = "last_sync"
const SYNC_INTERVAL = 30000 // 30 seconds

// Get sync queue from localStorage
export const getSyncQueue = (): SyncQueueItem[] => {
  try {
    const queue = localStorage.getItem(SYNC_QUEUE_KEY)
    return queue ? JSON.parse(queue) : []
  } catch {
    return []
  }
}

// Add item to sync queue
export const addToSyncQueue = (table: string, operation: "insert" | "update" | "delete", data: any) => {
  try {
    const queue = getSyncQueue()
    queue.push({
      id: `${Date.now()}-${Math.random()}`,
      table,
      operation,
      data,
      timestamp: Date.now(),
    })
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue))
  } catch (error) {
    console.error("[v0] Error adding to sync queue:", error)
  }
}

// Clear sync queue
export const clearSyncQueue = () => {
  try {
    localStorage.removeItem(SYNC_QUEUE_KEY)
  } catch (error) {
    console.error("[v0] Error clearing sync queue:", error)
  }
}

// Sync data to cloud
export const syncToCloud = async (table: string, data: any, operation: "insert" | "update" | "delete" = "insert") => {
  try {
    if (!supabaseKey) {
      console.log("[v0] Supabase not configured, queuing for later sync")
      addToSyncQueue(table, operation, data)
      return { success: false, queued: true }
    }

    let result
    switch (operation) {
      case "insert":
        result = await supabase.from(table).insert([data]).select()
        break
      case "update":
        result = await supabase.from(table).update(data).eq("id", data.id).select()
        break
      case "delete":
        result = await supabase.from(table).delete().eq("id", data.id)
        break
    }

    if (result.error) {
      console.error("[v0] Sync error:", result.error)
      addToSyncQueue(table, operation, data)
      return { success: false, error: result.error }
    }

    console.log("[v0] Successfully synced to cloud:", table, operation)
    return { success: true, data: result.data }
  } catch (error) {
    console.error("[v0] Sync error:", error)
    addToSyncQueue(table, operation, data)
    return { success: false, error }
  }
}

// Fetch data from cloud
export const syncFromCloud = async (table: string, filters?: Record<string, any>) => {
  try {
    if (!supabaseKey) {
      console.log("[v0] Supabase not configured, using local storage only")
      return null
    }

    let query = supabase.from(table).select("*")

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    const result = await query

    if (result.error) {
      console.error("[v0] Fetch error:", result.error)
      return null
    }

    console.log("[v0] Successfully fetched from cloud:", table)
    return result.data
  } catch (error) {
    console.error("[v0] Fetch error:", error)
    return null
  }
}

// Process sync queue
export const processSyncQueue = async () => {
  try {
    const queue = getSyncQueue()
    if (queue.length === 0) return

    console.log("[v0] Processing sync queue with", queue.length, "items")

    for (const item of queue) {
      const result = await syncToCloud(item.table, item.data, item.operation)
      if (result.success) {
        // Remove from queue if successful
        const updatedQueue = queue.filter((q) => q.id !== item.id)
        localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(updatedQueue))
      }
    }

    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString())
  } catch (error) {
    console.error("[v0] Error processing sync queue:", error)
  }
}

// Start automatic sync
export const startAutoSync = () => {
  if (typeof window === "undefined") return

  // Process queue on interval
  const interval = setInterval(() => {
    processSyncQueue()
  }, SYNC_INTERVAL)

  // Process queue on online event
  window.addEventListener("online", () => {
    console.log("[v0] Back online, syncing data...")
    processSyncQueue()
  })

  return () => clearInterval(interval)
}

// Get last sync time
export const getLastSyncTime = (): Date | null => {
  try {
    const lastSync = localStorage.getItem(LAST_SYNC_KEY)
    return lastSync ? new Date(lastSync) : null
  } catch {
    return null
  }
}

// Check if online
export const isOnline = (): boolean => {
  if (typeof window === "undefined") return false
  return navigator.onLine
}
