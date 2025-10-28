"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const { data, error, isLoading } = useSWR("/api/auth/me", async (url) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error("Not authenticated")
    return res.json()
  })

  useEffect(() => {
    setAuthState({
      user: data || null,
      loading: isLoading,
      error: error?.message || null,
    })
  }, [data, isLoading, error])

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error("Login failed")

      const result = await res.json()
      setAuthState({ user: result.user, loading: false, error: null })
      return result
    } catch (err) {
      const error = err instanceof Error ? err.message : "Login failed"
      setAuthState({ user: null, loading: false, error })
      throw err
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })

      if (!res.ok) throw new Error("Signup failed")

      const result = await res.json()
      setAuthState({ user: result.user, loading: false, error: null })
      return result
    } catch (err) {
      const error = err instanceof Error ? err.message : "Signup failed"
      setAuthState({ user: null, loading: false, error })
      throw err
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setAuthState({ user: null, loading: false, error: null })
    } catch (err) {
      const error = err instanceof Error ? err.message : "Logout failed"
      setAuthState({ user: null, loading: false, error })
    }
  }

  return {
    ...authState,
    login,
    signup,
    logout,
  }
}
