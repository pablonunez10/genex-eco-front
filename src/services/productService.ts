import api from './api'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: number
  category_name: string
  stock: number
  is_active: boolean
  brand: string
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export const productService = {
  async getProducts(category?: string): Promise<Product[]> {
    const params = category && category !== 'all' ? { category } : {}
    const response = await api.get<{ results: Product[] }>('/products/', { params })
    return response.data.results || response.data
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}/`)
    return response.data
  },

  async getCategories(): Promise<Category[]> {
    const response = await api.get<{ results: Category[] }>('/categories/')
    return response.data.results || response.data
  },
}
