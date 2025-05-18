import type { MenuItem } from "./menu"

export interface CartItem extends MenuItem {
  quantity: number
}
