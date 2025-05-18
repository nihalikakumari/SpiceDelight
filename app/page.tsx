import Banner from "@/components/home/banner"
import Categories from "@/components/home/categories"
import FeaturedItems from "@/components/home/featured-items"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Banner />
      <Categories />
      <FeaturedItems />
    </div>
  )
}
