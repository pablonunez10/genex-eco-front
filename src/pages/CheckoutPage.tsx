import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import {
  formatPrice,
  calculateMonthlyPayment,
  // calculateTotalWithInterest,
} from "@/utils";
import { useNavigate } from "@tanstack/react-router";

export function CheckoutPage() {
  const { cart, totalPrice, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [selectedMonths, setSelectedMonths] = useState(3);
  const [isFinanced, setIsFinanced] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-400 mb-4"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-6">
            Agrega productos para continuar con tu compra
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }

  const monthlyPayment = calculateMonthlyPayment(totalPrice, selectedMonths);
  // const totalWithInterest = calculateTotalWithInterest(
  //   totalPrice,
  //   selectedMonths
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate({ to: "/" })}
            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver a la tienda
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Finalizar Compra
        </h1>

        {/* Primera fila: Productos y Resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 lg:items-start">
          {/* Productos del pedido */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex-shrink-0">
                Productos ({cart.length})
              </h2>

              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="text-base font-medium leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold text-green-600">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto h-8 w-8 text-red-600 hover:bg-red-50 rounded flex items-center justify-center"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1 h-full">
            <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex-shrink-0">
                Resumen del Pedido
              </h2>
              <div className="space-y-3 flex-shrink-0">
                {/* Checkbox de método de pago */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
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
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío:</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-green-600">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1"></div>

              {/* Botón de confirmar */}
              <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl flex-shrink-0">
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>

        {/* Segunda fila: Financiamiento centrado */}
        {isFinanced && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Opciones de Financiamiento
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
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
                    onChange={(e) => setSelectedMonths(Number(e.target.value))}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb:bg-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>3 meses</span>
                    <span>24 meses</span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <div className="text-center">
                    <span className="block text-sm text-gray-600 mb-2">
                      Cuota mensual:
                    </span>
                    <span className="block text-3xl font-bold text-green-600">
                      {formatPrice(monthlyPayment)}
                    </span>
                  </div>
                  {/* <div className="text-center">
                    <span className="block text-sm text-gray-600 mb-2">Total a pagar:</span>
                    <span className="block text-3xl font-bold text-gray-900">
                      {formatPrice(totalWithInterest)}
                    </span>
                  </div> */}
                </div>

                <div className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded-lg">
                  <p className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tasa de interés: 3% mensual
                  </p>
                  <p className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sin cargos adicionales ocultos
                  </p>
                  <p className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Aprobación inmediata
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
