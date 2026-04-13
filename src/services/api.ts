import axios from 'axios'
import type { Order, Product, RemoveOrderResponse } from '../types/domain'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

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
