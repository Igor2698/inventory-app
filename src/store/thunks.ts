import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteOrderById, fetchOrders, fetchProducts, getAuthToken, login, setAuthToken } from '../services/api'
import type { Order, Product, RemoveOrderResponse } from '../types/domain'

const ensureAuth = async () => {
  if (getAuthToken()) return
  const auth = await login('admin', 'admin123')
  setAuthToken(auth.token)
  if (typeof window !== 'undefined') {
    localStorage.setItem('inventory.authToken', auth.token)
  }
}

export const bootstrapApp = createAsyncThunk<{ orders: Order[]; products: Product[] }>(
  'app/bootstrap',
  async () => {
    await ensureAuth()
    const [orders, products] = await Promise.all([
      fetchOrders(),
      fetchProducts(),
    ])
    return { orders, products }
  },
)

export const removeOrder = createAsyncThunk(
  'orders/remove',
  async (orderId: number | string): Promise<RemoveOrderResponse> => {
    const result = await deleteOrderById(orderId)
    return result
  },
)
