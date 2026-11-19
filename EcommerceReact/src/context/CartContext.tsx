
import { createContext, useState, useContext } from 'react'
import type { ReactNode } from 'react'
import type { Product, CartItem } from '../types/Product'

interface CartContextType {
  cartItems: CartItem[]
  cartTotal: number
  handleAddToCart: (product: Product) => void
  updateQuantity: (productId: number, change: number) => void
  removeFromCart: (productId: number) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: CartProviderProps) {

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function handleAddToCart(product: Product): void {
    setCartItems(previousItems => {
      const existingItem = previousItems.find(
        item => item.id === product.id
      )

      if (existingItem) {
        return previousItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...previousItems, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(productId: number, change: number): void {
    setCartItems(previousItems =>
      previousItems
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  function removeFromCart(productId: number): void {
    setCartItems(previousItems =>
      previousItems.filter(item => item.id !== productId)
    )
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        handleAddToCart,
        updateQuantity,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
  export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context

}
