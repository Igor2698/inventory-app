import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { bootstrapApp, removeOrder } from './thunks'
import type { Product } from '../types/domain'

type ProductsState = {
  items: Product[]
  filterType: string
  filterSpecification: string
}

const initialState: ProductsState = {
  items: [],
  filterType: 'All',
  filterSpecification: 'All',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload
    },
    setFilterSpecification: (state, action: PayloadAction<string>) => {
      state.filterSpecification = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapApp.fulfilled, (state, action) => {
        state.items = action.payload.products
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => (item.order ?? item.orderId) !== action.payload.id)
      })
  },
})

export const { setFilterType, setFilterSpecification } = productsSlice.actions
export default productsSlice.reducer
