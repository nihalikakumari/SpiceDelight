"use client"

import { Button } from "@/components/ui/button"
import type { Category } from "@/types/menu"
import { memo } from "react"
import { FoodImage } from "@/components/ui/food-image"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

// Memoize the component to prevent unnecessary re-renders
export default memo(function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
          className="rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          size="sm"
        >
          All
        </Button>

        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id)}
            className="rounded-full flex items-center shadow-sm hover:shadow-md transition-all duration-300"
            size="sm"
          >
            <div className="w-5 h-5 relative mr-1.5 rounded-full overflow-hidden">
              <FoodImage
                src={category.image}
                alt={category.name}
                containerClassName="h-full w-full"
                fallbackText={category.name.charAt(0)}
              />
            </div>
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
})
