import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products.data";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, calculateMonthlyPayment } from "@/utils";
// import { FinancingCalculator } from "@/components/features";

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [isFinanced, setIsFinanced] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState(3);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            El producto que buscas no existe o fue eliminado.
          </p>
          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const monthlyPayment = isFinanced
      ? calculateMonthlyPayment(product.price, selectedMonths)
      : undefined;

    addToCart(
      product,
      isFinanced,
      isFinanced ? selectedMonths : undefined,
      monthlyPayment
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Inicio
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {product.category}
                </span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.stock < 5 && product.stock > 0 && (
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  ¡Solo quedan {product.stock} unidades!
                </span>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mb-6 justify-center">
                <p className="text-5xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="flex items-center gap-2 text-gray-700 mb-4">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">
                    Stock disponible: {product.stock} unidades
                  </span>
                </div>

                {/* Checkbox de método de pago */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFinanced}
                      onChange={(e) => setIsFinanced(e.target.checked)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Pago financiado
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-2 ml-8">
                    {isFinanced
                      ? "Pagarás en cuotas mensuales"
                      : "Pagarás el total al contado"}
                  </p>

                  {/* Selector de cuotas */}
                  {isFinanced && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cantidad de cuotas:{" "}
                        <span className="text-green-600 font-bold">
                          {selectedMonths} meses
                        </span>
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="24"
                        step="3"
                        value={selectedMonths}
                        onChange={(e) =>
                          setSelectedMonths(Number(e.target.value))
                        }
                        className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>3 meses</span>
                        <span>24 meses</span>
                      </div>
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <span className="block text-xs text-gray-600 mb-1">
                          Cuota mensual:
                        </span>
                        <span className="block text-2xl font-bold text-green-600">
                          {formatPrice(
                            calculateMonthlyPayment(
                              product.price,
                              selectedMonths
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
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
                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
              </button>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <p className="text-xs text-gray-600">Envío gratis</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <p className="text-xs text-gray-600">Garantía 1 año</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <p className="text-xs text-gray-600">Pago seguro</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descripción del producto
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Financing Calculator */}
        {/* <div className="max-w-2xl mx-auto">
          <FinancingCalculator price={product.price} />
        </div> */}
      </div>
    </div>
  );
}
