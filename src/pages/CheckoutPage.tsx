import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, calculateMonthlyPayment } from "@/utils";
import { useNavigate } from "@tanstack/react-router";

export function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, updateFinancing } = useCart();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItemExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleFinancingToggle = (
    itemId: string,
    currentIsFinanced: boolean,
    price: number
  ) => {
    if (!currentIsFinanced) {
      // Cambiar a financiado con 12 meses por defecto
      const monthlyPayment = calculateMonthlyPayment(price, 12);
      updateFinancing(itemId, true, 12, monthlyPayment);
      toggleItemExpanded(itemId);
    } else {
      // Cambiar a contado
      updateFinancing(itemId, false, undefined, undefined);
      const newExpanded = new Set(expandedItems);
      newExpanded.delete(itemId);
      setExpandedItems(newExpanded);
    }
  };

  const handleMonthsChange = (
    itemId: string,
    months: number,
    price: number
  ) => {
    const monthlyPayment = calculateMonthlyPayment(price, months);
    updateFinancing(itemId, true, months, monthlyPayment);
  };

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

                      {/* Checkbox para cambiar método de pago */}
                      <div className="p-2 bg-gray-50 rounded">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.isFinanced}
                            onChange={() =>
                              handleFinancingToggle(
                                item.id,
                                item.isFinanced,
                                item.price
                              )
                            }
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className="text-xs font-medium text-gray-700">
                            Financiado
                          </span>
                        </label>

                        {/* Mostrar información actual */}
                        {item.isFinanced && item.monthlyPayment ? (
                          <div className="mt-2 text-xs text-blue-700">
                            {item.selectedMonths} cuotas de{" "}
                            {formatPrice(item.monthlyPayment)}
                          </div>
                        ) : (
                          <div className="mt-1 text-xs text-gray-500">
                            Al contado
                          </div>
                        )}
                      </div>

                      {/* Selector de cuotas expandible */}
                      {item.isFinanced && expandedItems.has(item.id) && (
                        <div className="p-3 bg-blue-50 rounded space-y-2">
                          <label className="block text-xs font-medium text-gray-700">
                            Cuotas:{" "}
                            <span className="text-green-600 font-bold">
                              {item.selectedMonths || 12}
                            </span>
                          </label>
                          <input
                            type="range"
                            min="3"
                            max="24"
                            step="3"
                            value={item.selectedMonths || 12}
                            onChange={(e) =>
                              handleMonthsChange(
                                item.id,
                                Number(e.target.value),
                                item.price
                              )
                            }
                            className="w-full h-1 bg-green-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>3 meses</span>
                            <span>24 meses</span>
                          </div>
                        </div>
                      )}

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
                {/* Lista de productos */}
                <div className="space-y-2 pb-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start text-sm"
                    >
                      <div className="flex-1 pr-2">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {item.isFinanced ? (
                          <div className="text-blue-700">
                            <p className="font-semibold">
                              {item.selectedMonths} cuotas
                            </p>
                            <p className="text-xs">
                              {formatPrice(item.monthlyPayment || 0)} c/u
                            </p>
                          </div>
                        ) : (
                          <p className="font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Solo mostrar total si hay productos al contado */}
                {cart.some((item) => !item.isFinanced) && (
                  <>
                    <div className="border-t pt-3 flex justify-between text-gray-600">
                      <span>Envío:</span>
                      <span className="text-green-600 font-medium">Gratis</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                      <span>Total al Contado:</span>
                      <span className="text-green-600">
                        {formatPrice(
                          cart
                            .filter((item) => !item.isFinanced)
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )
                        )}
                      </span>
                    </div>
                  </>
                )}
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
      </div>
    </div>
  );
}
