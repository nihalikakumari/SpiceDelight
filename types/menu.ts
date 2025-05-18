export interface Category {
  id: string
  name: string
  image: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
  vegetarian: boolean
  spiceLevel?: number
  discount?: number
  originalPrice?: number
}
