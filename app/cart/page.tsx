"use client"

import { useCart } from "@/context/cart-context"
import CartItem from "@/components/cart/cart-item"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { useEffect } from "react"
import { useAnimation } from "@/context/animation-context"

export default function CartPage() {
  const { cart, totalPrice } = useCart()
  const router = useRouter()
  const { initAnimations } = useAnimation()

  useEffect(() => {
    initAnimations()
  }, [initAnimations])

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4 animate-bounce-light" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button onClick={() => router.push("/menu")} className="animate-scale-in">
            Browse Menu
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map((item, index) => (
              <div key={item.id} className="staggered-item" style={{ transitionDelay: `${index * 100}ms` }}>
                <CartItem item={item} />
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-8 animate-on-scroll">
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Delivery Fee</span>
              <span>₹49.00</span>
            </div>

            <div className="flex justify-between text-sm text-muted-foreground mb-6">
              <span>Taxes</span>
              <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>₹{(totalPrice + 49 + totalPrice * 0.05).toFixed(2)}</span>
            </div>

            <Button className="w-full animate-scale-in" size="lg" onClick={() => router.push("/checkout")}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
