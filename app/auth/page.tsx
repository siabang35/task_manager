"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <AuthForm mode={mode} onSuccess={handleSuccess} />

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-primary hover:underline font-medium mt-2"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  )
}
