"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface DirectImageProps {
  src: string
  alt: string
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  fallbackText?: string
}

export function DirectImage({ src, alt, className, objectFit = "cover", fallbackText }: DirectImageProps) {
  const [hasError, setHasError] = useState(false)
  const fallback = fallbackText || alt.charAt(0)

  if (hasError) {
    return (
      <div className={cn("flex items-center justify-center bg-muted", className)}>
        <span className="text-2xl font-bold text-muted-foreground">{fallback}</span>
      </div>
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      style={{ objectFit }}
    />
  )
}
