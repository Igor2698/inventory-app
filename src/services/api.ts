import axios from 'axios'
import type { AuthResponse, Order, Product, RemoveOrderResponse } from '../types/domain'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const getAuthToken = () => authToken

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export const login = async (username: string, password: string) => {
  const { data } = await api.post<AuthResponse>('/auth/login', { username, password })
  return data
}

export const fetchOrders = async () => {
  const { data } = await api.get<Order[]>('/orders')
  return data
}

export const fetchProducts = async () => {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export const deleteOrderById = async (orderId: number | string) => {
  const { data } = await api.delete<RemoveOrderResponse>(`/orders/${orderId}`)
  return data
}
