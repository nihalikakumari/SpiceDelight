"use client"

import { useState, memo, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FoodImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  fallbackText?: string
  objectFit?: "cover" | "contain" | "fill"
}

// Memoize the component to prevent unnecessary re-renders
export const FoodImage = memo(function FoodImage({
  src,
  alt,
  className,
  containerClassName,
  fill = true,
  width,
  height,
  sizes,
  priority = false,
  fallbackText,
  objectFit = "cover",
}: FoodImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)
  const fallback = fallbackText || alt.charAt(0)

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setImgSrc(src)
  }, [src])

  // Generate a simple colored background based on text
  const getColorFromText = (text: string) => {
    const colors = ["#f87171", "#fb923c", "#fbbf24", "#a3e635", "#34d399", "#22d3ee", "#818cf8", "#c084fc"]
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  // Use a simple colored div with text as fallback
  if (hasError || !imgSrc) {
    const bgColor = getColorFromText(fallback)
    return (
      <div
        className={cn("relative overflow-hidden rounded-md flex items-center justify-center", containerClassName)}
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-white font-bold text-xl">{fallback}</span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted rounded-md", containerClassName)}>
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        className={cn(
          `w-full h-full transition-all duration-300 ease-in-out`,
          className,
          isLoading ? "opacity-0" : "opacity-100",
          objectFit === "cover" ? "object-cover" : objectFit === "contain" ? "object-contain" : "",
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          console.error(`Failed to load image: ${imgSrc}`)
        }}
        loading={priority ? "eager" : "lazy"}
        width={width}
        height={height}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
})
