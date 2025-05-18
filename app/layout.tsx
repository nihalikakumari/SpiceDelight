import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { CartProvider } from "@/context/cart-context"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimationProvider } from "@/context/animation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spice Delight - Indian Food Delivery",
  description: "Order authentic Indian cuisine delivered to your doorstep",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <CartProvider>
            <AnimationProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </AnimationProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
