"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import OrderSummary from "@/components/checkout/order-summary"
import { Check, CreditCard, Wallet, Banknote } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAnimation } from "@/context/animation-context"

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "upi",
    name: "UPI Payment",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: <Banknote className="h-5 w-5" />,
  },
]

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const { initAnimations } = useAnimation()

  useEffect(() => {
    initAnimations()
  }, [initAnimations])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderPlaced(true)

      setTimeout(() => {
        clearCart()
        router.push("/")
      }, 3000)
    }, 2000)
  }

  if (cart.length === 0 && !orderPlaced) {
    router.push("/menu")
    return null
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="mx-auto max-w-md">
          <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center animate-scale-in">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-6">Thank you for your order. You will be redirected shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-on-scroll">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea id="address" required />
            </div>

            <div className="pt-4 border-t mt-4">
              <h3 className="text-lg font-medium mb-3">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center space-x-2 border rounded-lg p-3 transition-colors hover:bg-muted"
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center cursor-pointer flex-1">
                      <span className="mr-2">{method.icon}</span>
                      {method.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="name@upi" />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full animate-scale-in" size="lg" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>

        <div className="animate-on-scroll">
          <OrderSummary cart={cart} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  )
}
