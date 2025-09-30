export interface FinancingRate {
  months: number
  rate: number
}

export const FINANCING_OPTIONS: FinancingRate[] = [
  { months: 3, rate: 0.05 },
  { months: 6, rate: 0.08 },
  { months: 12, rate: 0.12 },
  { months: 18, rate: 0.15 },
  { months: 24, rate: 0.18 },
]

export function calculateMonthlyPayment(
  price: number,
  months: number
): number {
  const option = FINANCING_OPTIONS.find((opt) => opt.months === months)
  if (!option) return 0

  const totalWithInterest = price * (1 + option.rate)
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