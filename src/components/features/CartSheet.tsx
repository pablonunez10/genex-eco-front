import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/utils'

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-8">
        <svg
          className="w-16 h-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <p className="text-gray-500 text-center">Tu carrito está vacío</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-4 py-6">
      <div className="flex-1 space-y-4 overflow-auto">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="text-sm font-medium leading-tight">{item.name}</h3>
              <p className="text-sm font-semibold text-green-600">
                {formatPrice(item.price)}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-7 w-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-7 w-7 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-auto h-7 w-7 text-red-600 hover:bg-red-50 rounded flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total:</span>
          <span className="text-green-600">{formatPrice(totalPrice)}</span>
        </div>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
          Finalizar Compra
        </button>
      </div>
    </div>
  )
}