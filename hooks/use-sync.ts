"use client"

import { useEffect, useState } from "react"
import { startAutoSync, processSyncQueue, getSyncQueue, isOnline, getLastSyncTime } from "@/lib/db"

interface SyncStatus {
  isOnline: boolean
  isSyncing: boolean
  queueLength: number
  lastSyncTime: Date | null
}

export function useSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    isSyncing: false,
    queueLength: 0,
    lastSyncTime: null,
  })

  useEffect(() => {
    // Start auto sync
    const stopAutoSync = startAutoSync()

    // Update sync status
    const updateStatus = () => {
      setSyncStatus({
        isOnline: isOnline(),
        isSyncing: false,
        queueLength: getSyncQueue().length,
        lastSyncTime: getLastSyncTime(),
      })
    }

    // Initial update
    updateStatus()

    // Update on online/offline
    window.addEventListener("online", updateStatus)
    window.addEventListener("offline", updateStatus)

    // Update periodically
    const interval = setInterval(updateStatus, 5000)

    return () => {
      if (typeof stopAutoSync === "function") {
        stopAutoSync()
      }
      window.removeEventListener("online", updateStatus)
      window.removeEventListener("offline", updateStatus)
      clearInterval(interval)
    }
  }, [])

  const manualSync = async () => {
    setSyncStatus((prev) => ({ ...prev, isSyncing: true }))
    try {
      await processSyncQueue()
      setSyncStatus((prev) => ({
        ...prev,
        isSyncing: false,
        queueLength: getSyncQueue().length,
        lastSyncTime: getLastSyncTime(),
      }))
    } catch (error) {
      console.error("[v0] Manual sync error:", error)
      setSyncStatus((prev) => ({ ...prev, isSyncing: false }))
    }
  }

  return {
    ...syncStatus,
    manualSync,
  }
}
