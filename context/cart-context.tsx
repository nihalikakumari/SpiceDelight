"use client"

import type { CartItem } from "@/types/cart"
import type { MenuItem } from "@/types/menu"
import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
  recentlyAddedItemId: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [recentlyAddedItemId, setRecentlyAddedItemId] = useState<string | null>(null)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes, but debounced
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [cart])

  // Clear recently added item ID after a delay
  useEffect(() => {
    if (recentlyAddedItemId) {
      const timer = setTimeout(() => {
        setRecentlyAddedItemId(null)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [recentlyAddedItemId])

  // Memoize handlers to prevent unnecessary re-renders
  const addToCart = useCallback((item: MenuItem) => {
    setRecentlyAddedItemId(item.id)

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        // Item already exists, update quantity
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        // Item doesn't exist, add it
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }, [])

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId)
        return
      }

      setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  // Memoize total price calculation
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      recentlyAddedItemId,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, recentlyAddedItemId],
  )

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
