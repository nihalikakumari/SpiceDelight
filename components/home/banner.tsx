"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FoodImage } from "@/components/ui/food-image"

export default function Banner() {
  return (
    <div className="relative overflow-hidden rounded-xl mb-8 h-[250px] md:h-[350px] shadow-md">
      {/* Use the provided image */}
      <div className="absolute inset-0">
        <FoodImage
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-online-banner-design-template-094845c8a2186953cecf08cfb8a8280e_screen.jpg?ts=1674531464"
          alt="Banner"
          containerClassName="h-full w-full"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10 h-full flex items-center">
        <div className="max-w-xl text-white">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 drop-shadow-md">
            Authentic Indian Cuisine Delivered To Your Door
          </h1>
          <p className="text-base md:text-lg mb-6 opacity-90 drop-shadow-sm">
            Enjoy 30% off on your first order with code: SPICE30
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-md">
            <Link href="/menu">Order Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
