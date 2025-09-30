// Tasa de interés mensual fija del 3%
const MONTHLY_INTEREST_RATE = 0.03

export interface FinancingRate {
  months: number
  rate: number
}

// Ya no necesitamos tasas diferentes por mes, pero mantenemos para compatibilidad
export const FINANCING_OPTIONS: FinancingRate[] = [
  { months: 3, rate: MONTHLY_INTEREST_RATE },
  { months: 6, rate: MONTHLY_INTEREST_RATE },
  { months: 9, rate: MONTHLY_INTEREST_RATE },
  { months: 12, rate: MONTHLY_INTEREST_RATE },
  { months: 15, rate: MONTHLY_INTEREST_RATE },
  { months: 18, rate: MONTHLY_INTEREST_RATE },
  { months: 21, rate: MONTHLY_INTEREST_RATE },
  { months: 24, rate: MONTHLY_INTEREST_RATE },
]

export function calculateMonthlyPayment(
  price: number,
  months: number
): number {
  // Fórmula: (precio * 3% * meses) + precio) / meses
  const totalInterest = price * MONTHLY_INTEREST_RATE * months
  const totalWithInterest = price + totalInterest
  return totalWithInterest / months
}

export function calculateTotalWithInterest(
  price: number,
  months: number
): number {
  const monthlyPayment = calculateMonthlyPayment(price, months)
  return monthlyPayment * months
}

export function calculateInterestAmount(
  price: number,
  months: number
): number {
  const total = calculateTotalWithInterest(price, months)
  return total - price
}