import { Link, useSearch } from "@tanstack/react-router";
import { useCart } from "@/contexts/CartContext";
import { CartSheet } from "@/components/features/CartSheet";

// Definir las categorías disponibles
const CATEGORIES = [
  { id: "all", name: "Todos", path: "/" },
  { id: "phones", name: "Teléfonos", path: "/?category=phones" },
  { id: "security", name: "Seguridad", path: "/?category=security" },
  { id: "electronics", name: "Electrónica", path: "/?category=electronics" },
];

export function Header() {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const searchParams = useSearch({ strict: false }) as { category?: string };
  const currentCategory = searchParams?.category || "all";

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo a la izquierda */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
              <span className="text-xl font-bold text-green-600 whitespace-nowrap">
                Genex Tech
              </span>
            </Link>

            {/* Tabs en el centro */}
            <nav className="flex items-center gap-1 flex-1 mx-8 overflow-x-auto">
              {CATEGORIES.map((category) => {
                const isActive = currentCategory === category.id;
                return (
                  <Link
                    key={category.id}
                    to={category.path}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </nav>

            {/* Carrito a la derecha */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors duration-200 flex-shrink-0"
            >
              <svg
                className="w-6 h-6"
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
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar - Abre desde la derecha */}
      {isCartOpen && (
        <div className="fixed top-4 bottom-4 right-0 w-[300px] bg-white shadow-xl z-50 animate-slide-in-right border-l border-gray-200 rounded-l-lg">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Carrito</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4">
              <CartSheet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
