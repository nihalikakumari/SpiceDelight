"use client"

import type React from "react"

import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useState, memo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { menuItems } from "@/data/menu-data"
import { FoodImage } from "@/components/ui/food-image"

// Memoize the header to prevent unnecessary re-renders
export default memo(function Header() {
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof menuItems>([])
  const [isSearching, setIsSearching] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 1) {
      setIsSearching(true)
      // Simplified search logic for better performance
      const results = menuItems.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5) // Limit to 5 results for better performance
      setSearchResults(results)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }

  const handleSearchItemClick = (id: string) => {
    setSearchQuery("")
    setIsSearching(false)
    setSearchResults([])
    router.push(`/menu?item=${id}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <FoodImage
                src="https://img.freepik.com/premium-vector/express-delivery-logo-design-vector-template_441059-206.jpg"
                alt="Spice Delight Logo"
                containerClassName="h-full w-full"
                objectFit="cover"
                priority
              />
            </div>
            <span className="font-bold text-xl">Spice Delight</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search menu..."
                  className="pl-8 w-[200px] lg:w-[250px]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              {isSearching && (
                <div className="absolute top-full mt-1 w-full bg-background border rounded-md shadow-lg z-50 max-h-[250px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((item) => (
                        <li
                          key={item.id}
                          className="p-2 hover:bg-muted cursor-pointer border-b last:border-0 flex items-center gap-2"
                          onClick={() => handleSearchItemClick(item.id)}
                        >
                          <div className="h-6 w-6 rounded-md overflow-hidden flex-shrink-0">
                            <FoodImage
                              src={item.image}
                              alt={item.name}
                              containerClassName="h-full w-full"
                              fallbackText={item.name.charAt(0)}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.category}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3 text-center text-muted-foreground text-sm">No items found</div>
                  )}
                </div>
              )}
            </div>

            <ThemeToggle />

            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - simplified */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <div className="relative mb-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search menu..." className="pl-8 w-full" value={searchQuery} onChange={handleSearch} />
            </div>

            {isSearching && searchResults.length > 0 && (
              <div className="bg-background border rounded-md shadow-lg z-50 max-h-[200px] overflow-y-auto mb-2">
                <ul>
                  {searchResults.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 hover:bg-muted cursor-pointer border-b last:border-0 flex items-center gap-2"
                      onClick={() => {
                        handleSearchItemClick(item.id)
                        setIsMenuOpen(false)
                      }}
                    >
                      <div className="h-6 w-6 rounded-md overflow-hidden flex-shrink-0">
                        <FoodImage
                          src={item.image}
                          alt={item.name}
                          containerClassName="h-full w-full"
                          fallbackText={item.name.charAt(0)}
                        />
                      </div>
                      <div className="font-medium text-sm">{item.name}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
})
