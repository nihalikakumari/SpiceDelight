import ClientOnly from "@/components/client-only"
import MenuContent from "@/components/menu/menu-content"

export default function MenuPage() {
  return (
    <ClientOnly>
      <MenuContent />
    </ClientOnly>
  )
}
