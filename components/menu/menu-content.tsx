"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { categories, menuItems } from "@/data/menu-data"
import MenuItemCard from "@/components/menu/menu-item-card"
import CategoryFilter from "@/components/menu/category-filter"
import { useSearchParams } from "next/navigation"
import { useAnimation } from "@/context/animation-context"
import { AlertCircle } from "lucide-react"

export default function MenuContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const itemParam = searchParams.get("item")

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { initAnimations } = useAnimation()

  // Memoize filtered items to prevent recalculation on every render
  const filteredItems = useMemo(() => {
    return selectedCategory ? menuItems.filter((item) => item.category === selectedCategory) : menuItems
  }, [selectedCategory])

  // Memoize the category selection handler
  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId)
  }, [])

  useEffect(() => {
    try {
      if (categoryParam) {
        setSelectedCategory(categoryParam)
      }

      // Reduce timeout to improve perceived performance
      const timer = setTimeout(() => {
        setIsLoading(false)

        // Scroll to the specific item if provided in URL
        if (itemParam) {
          const element = document.getElementById(`item-${itemParam}`)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" })
            element.classList.add("highlight-item")
            setTimeout(() => {
              element.classList.remove("highlight-item")
            }, 1000)
          }
        }

        // Initialize animations
        initAnimations()
      }, 100)

      return () => clearTimeout(timer)
    } catch (err) {
      console.error("Error in menu page:", err)
      setError("Something went wrong loading the menu. Please try again.")
      setIsLoading(false)
    }
  }, [categoryParam, itemParam, initAnimations])

  if (isLoading) {
    // Show a simpler loading state
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mb-2" />
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredItems.map((item) => (
            <div key={item.id} id={`item-${item.id}`} className="menu-item">
              <MenuItemCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}
    </div>
  )
}
