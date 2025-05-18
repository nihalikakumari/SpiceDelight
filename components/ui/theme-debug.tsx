"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, systemTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border p-4 rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2">Theme Debug</h3>
      <div className="space-y-1 text-sm">
        <p>
          Current theme: <span className="font-mono">{theme}</span>
        </p>
        <p>
          System theme: <span className="font-mono">{systemTheme}</span>
        </p>
        <p>
          HTML class:{" "}
          <span className="font-mono">{document.documentElement.classList.contains("dark") ? "dark" : "light"}</span>
        </p>
      </div>
      <div className="mt-3 space-x-2">
        <button
          onClick={() => setTheme("light")}
          className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded"
        >
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme("system")}
          className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded"
        >
          System
        </button>
      </div>
    </div>
  )
}
