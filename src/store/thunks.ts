import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteOrderById, fetchOrders, fetchProducts } from '../services/api'
import type { Order, Product, RemoveOrderResponse } from '../types/domain'

export const bootstrapApp = createAsyncThunk<{ orders: Order[]; products: Product[] }>(
  'app/bootstrap',
  async () => {
  const [orders, products] = await Promise.all([
    fetchOrders(),
    fetchProducts(),
  ])
  return { orders, products }
})

export const removeOrder = createAsyncThunk(
  'orders/remove',
  async (orderId: number | string): Promise<RemoveOrderResponse> => {
    const result = await deleteOrderById(orderId)
    return result
  },
)
