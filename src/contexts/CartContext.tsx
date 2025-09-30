import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product, CartItem } from '@/types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, isFinanced?: boolean, selectedMonths?: number, monthlyPayment?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateFinancing: (productId: string, isFinanced: boolean, selectedMonths?: number, monthlyPayment?: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product, isFinanced = false, selectedMonths?: number, monthlyPayment?: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id &&
        item.isFinanced === isFinanced &&
        item.selectedMonths === selectedMonths
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.isFinanced === isFinanced &&
          item.selectedMonths === selectedMonths
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevCart, {
        ...product,
        quantity: 1,
        isFinanced,
        selectedMonths,
        monthlyPayment
      }]
    })

    // Abrir el carrito automáticamente al agregar un producto
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const updateFinancing = (productId: string, isFinanced: boolean, selectedMonths?: number, monthlyPayment?: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, isFinanced, selectedMonths, monthlyPayment }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateFinancing,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}