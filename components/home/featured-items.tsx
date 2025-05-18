import { menuItems } from "@/data/menu-data"
import MenuItemCard from "@/components/menu/menu-item-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { memo } from "react"

// Get only the featured items - do this outside the component to avoid recalculation
const featuredItems = menuItems.filter((item) => item.featured).slice(0, 4)

// Memoize the component to prevent unnecessary re-renders
export default memo(function FeaturedItems() {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Popular Dishes</h2>
        <Button variant="outline" asChild>
          <Link href="/menu">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <MenuItemCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
})
