"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface PlaceholderImageProps {
  text: string
  className?: string
  width?: number
  height?: number
  bgColor?: string
  textColor?: string
}

export function PlaceholderImage({
  text,
  className,
  width = 300,
  height = 300,
  bgColor,
  textColor,
}: PlaceholderImageProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate a consistent color based on the text
  const getColorFromText = (text: string) => {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = Math.abs(hash % 360)
    return `hsl(${hue}, 70%, ${isDark ? "60%" : "45%"})`
  }

  const bg = bgColor || getColorFromText(text)
  const textCol = textColor || (isDark ? "#ffffff" : "#ffffff")

  // Create a data URL for the SVG
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bg}" />
      <text 
        x="50%" 
        y="50%" 
        fontFamily="Arial, sans-serif" 
        fontSize="24" 
        fontWeight="bold"
        fill="${textCol}" 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        ${text}
      </text>
    </svg>
  `

  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: `url("${dataUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    />
  )
}
