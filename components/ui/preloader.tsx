"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface PreloaderProps {
  imagePaths: string[]
  children: React.ReactNode
}

export function Preloader({ imagePaths, children }: PreloaderProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const { theme, systemTheme } = useTheme()

  const currentTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    let loadedCount = 0
    const totalImages = imagePaths.length

    // If there are no images or we're in development mode, skip preloading
    if (totalImages === 0 || process.env.NODE_ENV === "development") {
      setImagesLoaded(true)
      return
    }

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          loadedCount++
          setProgress(Math.floor((loadedCount / totalImages) * 100))
          resolve()
        }
        img.onerror = () => {
          loadedCount++
          setProgress(Math.floor((loadedCount / totalImages) * 100))
          resolve() // Resolve anyway to continue loading other images
        }
      })
    }

    const preloadAllImages = async () => {
      try {
        const promises = imagePaths.map((path) => preloadImage(path))
        await Promise.all(promises)
      } catch (error) {
        console.error("Error preloading images:", error)
      } finally {
        setImagesLoaded(true)
      }
    }

    // Start preloading after a short delay to allow the UI to render
    const timer = setTimeout(() => {
      preloadAllImages()
    }, 100)

    return () => clearTimeout(timer)
  }, [imagePaths])

  if (!imagesLoaded) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center bg-background z-50`}>
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
        <div className="text-lg font-medium mb-2">Loading Images</div>
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{progress}%</div>
      </div>
    )
  }

  return <>{children}</>
}
