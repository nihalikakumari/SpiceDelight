import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-on-scroll">
            <h3 className="font-bold text-lg mb-4">Spice Delight</h3>
            <p className="text-muted-foreground">Authentic Indian cuisine delivered to your doorstep.</p>
          </div>

          <div className="animate-on-scroll">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-on-scroll">
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Spice Street</p>
              <p>Mumbai, MH 400001</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@spicedelight.com</p>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground animate-on-scroll">
          <p>&copy; {new Date().getFullYear()} Spice Delight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
