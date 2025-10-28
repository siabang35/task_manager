"use client"

import React from "react"
import { ThemeProvider } from "next-themes" // opsional, kalau kamu ingin dark mode
// import { Toaster } from "react-hot-toast" // contoh tambahan: untuk toast notification
// import Navbar from "@/components/Navbar" // contoh: komponen navigasi global
// import Footer from "@/components/Footer"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* <Navbar /> */}
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
      {/* <Footer /> */}
      {/* <Toaster position="top-right" /> */}
    </ThemeProvider>
  )
}
