"use client"

import { createContext, useContext, useEffect, useCallback, useState, type ReactNode } from "react"

interface AnimationContextType {
  initAnimations: () => void
}

// Create a default context value to avoid the "must be used within a provider" error
const defaultContextValue: AnimationContextType = {
  initAnimations: () => {}, // No-op function as fallback
}

const AnimationContext = createContext<AnimationContextType>(defaultContextValue)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  // Initialize animations function
  const initAnimations = useCallback(() => {
    if (typeof window === "undefined" || !isMounted) return

    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight * 0.9

        if (isVisible) {
          element.classList.add("visible")
        }
      })
    }

    // Run once on load
    animateOnScroll()

    // Add scroll event listener with passive option for better performance
    window.addEventListener("scroll", animateOnScroll, { passive: true })

    // Return cleanup function
    return () => {
      window.removeEventListener("scroll", animateOnScroll)
    }
  }, [isMounted])

  // Set mounted state on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Run animations on mount
  useEffect(() => {
    if (isMounted) {
      const cleanup = initAnimations()
      return cleanup
    }
  }, [isMounted, initAnimations])

  return <AnimationContext.Provider value={{ initAnimations }}>{children}</AnimationContext.Provider>
}

export function useAnimation() {
  return useContext(AnimationContext)
}
