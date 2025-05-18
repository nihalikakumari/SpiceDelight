"use client"

import type { CartItem } from "@/types/cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodImage } from "@/components/ui/food-image"
import { Flame } from "lucide-react"

interface OrderSummaryProps {
  cart: CartItem[]
  totalPrice: number
}

export default function OrderSummary({ cart, totalPrice }: OrderSummaryProps) {
  const deliveryFee = 49
  const tax = totalPrice * 0.05 // 5% tax
  const grandTotal = totalPrice + deliveryFee + tax

  return (
    <Card className="animate-scale-in shadow-md border-border/50">
      <CardHeader className="bg-muted/50 rounded-t-lg">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-3">
          {cart.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">* All prices are inclusive of GST</div>
        </div>

        <div className="border-t pt-4">
          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <p className="mb-2">Estimated Delivery Time: 30-45 minutes</p>
            <p>Your food will be prepared with care and delivered fresh to your doorstep.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function OrderItem({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center text-sm p-2 hover:bg-muted/30 rounded-lg transition-colors">
      <div className="h-10 w-10 rounded-md overflow-hidden mr-3 flex-shrink-0 shadow-sm">
        <FoodImage
          src={item.image}
          alt={item.name}
          containerClassName="h-full w-full"
          sizes="40px"
          fallbackText={item.name.charAt(0)}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <span>
            {item.quantity} × {item.name}
          </span>
          <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
        {item.spiceLevel && item.spiceLevel > 0 && (
          <div className="flex mt-1">
            {[...Array(item.spiceLevel)].map((_, i) => (
              <Flame key={i} className="h-3 w-3 text-red-500" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
