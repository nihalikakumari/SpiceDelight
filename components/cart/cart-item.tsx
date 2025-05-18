"use client"

import { useCart } from "@/context/cart-context"
import type { CartItem as CartItemType } from "@/types/cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, Flame } from "lucide-react"
import { useState, useEffect } from "react"
import { FoodImage } from "@/components/ui/food-image"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, recentlyAddedItemId } = useCart()
  const [isRemoving, setIsRemoving] = useState(false)
  const isRecentlyAdded = recentlyAddedItemId === item.id

  // Apply animation when item is recently added
  useEffect(() => {
    if (isRecentlyAdded) {
      const element = document.getElementById(`cart-item-${item.id}`)
      if (element) {
        element.classList.add("animate-pop")
        const timer = setTimeout(() => {
          element.classList.remove("animate-pop")
        }, 300)
        return () => clearTimeout(timer)
      }
    }
  }, [isRecentlyAdded, item.id])

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      removeFromCart(item.id)
    }, 300)
  }

  return (
    <div
      id={`cart-item-${item.id}`}
      className={`flex items-center gap-4 py-4 border-b transition-all duration-300 ${
        isRemoving ? "opacity-0 transform -translate-x-10" : "opacity-100"
      } animate-fade-in ${isRecentlyAdded ? "bg-primary/5" : ""} rounded-lg hover:bg-muted/50`}
    >
      <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
        <FoodImage
          src={item.image}
          alt={item.name}
          containerClassName="h-full w-full"
          sizes="80px"
          fallbackText={item.name.charAt(0)}
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-muted-foreground text-sm">₹{item.price.toFixed(2)}</p>
        {item.spiceLevel && item.spiceLevel > 0 && (
          <div className="flex mt-1">
            {[...Array(item.spiceLevel)].map((_, i) => (
              <Flame key={i} className="h-3 w-3 text-red-500" />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 transition-transform hover:scale-110 rounded-full"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 transition-transform hover:scale-110 rounded-full"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right min-w-[80px] font-medium text-primary">₹{(item.price * item.quantity).toFixed(2)}</div>

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive transition-colors rounded-full"
        onClick={handleRemove}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
