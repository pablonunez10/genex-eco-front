import api from './api'

export interface OrderItem {
  id: number
  product: number
  product_name: string
  product_image: string
  quantity: number
  price: number
  subtotal: number
}

export interface Order {
  id: number
  user: number
  user_email: string
  status: string
  total_amount: number
  shipping_address: string
  shipping_city: string
  shipping_postal_code: string
  shipping_phone: string
  payment_method: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface CreateOrderData {
  items: {
    product_id: number
    quantity: number
  }[]
  shipping_address: string
  shipping_city: string
  shipping_postal_code: string
  shipping_phone: string
  payment_method?: string
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await api.get<{ results: Order[] }>('/orders/')
    return response.data.results || response.data
  },

  async getOrder(id: number): Promise<Order> {
    const response = await api.get<Order>(`/orders/${id}/`)
    return response.data
  },

  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await api.post<Order>('/orders/', data)
    return response.data
  },
}
