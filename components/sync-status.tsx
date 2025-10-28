"use client"

import { useSync } from "@/hooks/use-sync"
import { Cloud, CloudOff, Loader2 } from "lucide-react"

export function SyncStatus() {
  const { isOnline, isSyncing, queueLength, lastSyncTime, manualSync } = useSync()

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
      {isOnline ? <Cloud className="w-4 h-4 text-green-500" /> : <CloudOff className="w-4 h-4 text-yellow-500" />}

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">
          {isOnline ? "Online" : "Offline"}
          {queueLength > 0 && ` • ${queueLength} pending`}
        </p>
        {lastSyncTime && (
          <p className="text-xs text-muted-foreground">Last sync: {lastSyncTime.toLocaleTimeString()}</p>
        )}
      </div>

      {queueLength > 0 && (
        <button
          onClick={manualSync}
          disabled={isSyncing}
          className="p-1 hover:bg-background rounded transition-colors disabled:opacity-50"
          title="Sync now"
        >
          {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
        </button>
      )}
    </div>
  )
}
