"use client"

import { categories } from "@/data/menu-data"
import Link from "next/link"
import { memo } from "react"
import { FoodImage } from "@/components/ui/food-image"

// Memoize the component to prevent unnecessary re-renders
export default memo(function Categories() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Food Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
})

// Memoize the category card component
const CategoryCard = memo(function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/menu?category=${category.id}`} className="group">
      <div className="bg-muted/50 rounded-lg overflow-hidden transition-all duration-200 group-hover:shadow-md border border-border/40 h-full flex flex-col">
        <div className="aspect-square relative">
          <FoodImage src={category.image} alt={category.name} fallbackText={category.name.charAt(0)} />
        </div>
        <div className="p-2 text-center font-medium group-hover:text-primary transition-colors duration-200 flex-grow flex items-center justify-center">
          {category.name}
        </div>
      </div>
    </Link>
  )
})
