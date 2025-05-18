"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import type { MenuItem } from "@/types/menu"
import { Check, Coffee, Flame, ShoppingCart } from "lucide-react"
import { useState, memo } from "react"
import { Badge } from "@/components/ui/badge"
import { FoodImage } from "@/components/ui/food-image"

interface MenuItemCardProps {
  item: MenuItem
}

// Memoize the component to prevent unnecessary re-renders
export default memo(function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  // Check if this is masala chai
  const isMasalaChai = item.id === "masala-chai"

  const handleAddToCart = () => {
    setIsAdding(true)

    // Add to cart immediately
    addToCart(item)

    // Show added state
    setTimeout(() => {
      setIsAdding(false)
      setIsAdded(true)

      // Reset added state after animation
      setTimeout(() => {
        setIsAdded(false)
      }, 1000)
    }, 300)
  }

  return (
    <Card className="overflow-hidden flex flex-col border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 h-[400px]">
      <div className="relative aspect-square overflow-hidden h-[180px] w-full">
        <FoodImage
          src={item.image}
          alt={item.name}
          containerClassName="h-full w-full"
          fallbackText={item.name.charAt(0)}
          objectFit="cover"
        />

        {item.vegetarian && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full z-10">
            Veg
          </div>
        )}

        {item.spiceLevel && item.spiceLevel > 0 && (
          <div className="absolute top-2 right-2 bg-background/70 backdrop-blur-sm rounded-full p-1 z-10">
            <div className="flex items-center space-x-0.5">
              {[...Array(item.spiceLevel)].map((_, i) => (
                <Flame key={i} className="h-3 w-3 text-red-500" />
              ))}
            </div>
          </div>
        )}

        {isMasalaChai && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full z-10 flex items-center">
            <Coffee className="h-3 w-3 mr-1" />
            Authentic
          </div>
        )}

        {item.discount && (
          <Badge variant="destructive" className="absolute bottom-2 left-2 z-10">
            {item.discount}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="pt-3 flex-grow flex flex-col h-[160px]">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1 h-7">{item.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-2 h-[60px]">{item.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="font-bold text-lg text-primary">₹{item.price.toFixed(2)}</p>
          {item.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">₹{item.originalPrice.toFixed(2)}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 h-[60px]">
        <Button
          className={`w-full ${isAdded ? "bg-green-600 hover:bg-green-700" : ""}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <span className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
          ) : isAdded ? (
            <span className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Added!
            </span>
          ) : (
            <span className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
})
