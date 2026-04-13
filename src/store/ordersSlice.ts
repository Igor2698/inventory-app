import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { bootstrapApp, removeOrder } from './thunks'
import type { Order } from '../types/domain'

type OrdersState = {
  items: Order[]
  selectedOrderId: number | string | null
  deleteCandidateId: number | string | null
}

const initialState: OrdersState = {
  items: [],
  selectedOrderId: null,
  deleteCandidateId: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<number | string | null>) => {
      state.selectedOrderId = action.payload
    },
    clearSelectedOrder: (state) => {
      state.selectedOrderId = null
    },
    setDeleteCandidate: (state, action: PayloadAction<number | string | null>) => {
      state.deleteCandidateId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapApp.fulfilled, (state, action) => {
        state.items = action.payload.orders
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        const deletedId = action.payload.id
        state.items = state.items.filter((order) => order.id !== deletedId)
        if (state.selectedOrderId === deletedId) state.selectedOrderId = null
        state.deleteCandidateId = null
      })
  },
})

export const { setSelectedOrder, clearSelectedOrder, setDeleteCandidate } = ordersSlice.actions
export default ordersSlice.reducer
