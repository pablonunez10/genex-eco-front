import { useState } from 'react'
import {
  formatPrice,
  calculateMonthlyPayment,
  calculateTotalWithInterest,
  calculateInterestAmount,
  FINANCING_OPTIONS,
} from '@/utils'

interface FinancingCalculatorProps {
  price: number
}

export function FinancingCalculator({ price }: FinancingCalculatorProps) {
  const [months, setMonths] = useState(12)

  const monthlyPayment = calculateMonthlyPayment(price, months)
  const totalAmount = calculateTotalWithInterest(price, months)
  const interestAmount = calculateInterestAmount(price, months)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Calculadora de Financiamiento
      </h3>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              Cantidad de cuotas
            </label>
            <span className="text-2xl font-bold text-green-600">{months}</span>
          </div>

          <input
            type="range"
            min="3"
            max="24"
            step="3"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />

          <div className="flex justify-between text-xs text-gray-500">
            <span>3 meses</span>
            <span>24 meses</span>
          </div>
        </div>

        <div className="space-y-3 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Precio contado:</span>
            <span className="font-medium">{formatPrice(price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Interés:</span>
            <span className="font-medium text-orange-600">
              {formatPrice(interestAmount)}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-3">
            <span className="text-sm font-semibold text-gray-700">
              Total a pagar:
            </span>
            <span className="font-semibold">{formatPrice(totalAmount)}</span>
          </div>
        </div>

        <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6 text-center">
          <p className="text-sm text-gray-600">Cuota mensual</p>
          <p className="mt-2 text-4xl font-bold text-green-600">
            {formatPrice(monthlyPayment)}
          </p>
          <p className="mt-2 text-xs text-gray-600">
            {months} cuotas de {formatPrice(monthlyPayment)}
          </p>
        </div>

        <div className="space-y-2 text-xs text-gray-500">
          <p>• Tasas de interés según plazo seleccionado</p>
          <p>• Sin gastos administrativos adicionales</p>
          <p>• Aprobación sujeta a evaluación crediticia</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {FINANCING_OPTIONS.map((option) => (
            <button
              key={option.months}
              onClick={() => setMonths(option.months)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition duration-200 ${
                months === option.months
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.months} meses
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}