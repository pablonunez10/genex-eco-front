import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              ¡Últimas unidades!
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Sin stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <span className="text-xs text-green-600 font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Stock: {product.stock} unidades
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}