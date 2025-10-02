import api from './api'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  first_name: string
  last_name: string
  phone: string
  password: string
}

export interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  phone: string
}

export const authService = {
  async login(data: LoginData): Promise<User> {
    const response = await api.post<User>('/users/login/', data)
    return response.data
  },

  async register(data: RegisterData): Promise<User> {
    const response = await api.post<User>('/users/', data)
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/users/me/')
    return response.data
  },
}
