export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface FinancingOption {
  months: number
  interestRate: number
  monthlyPayment: number
}