import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice'
import productsReducer from './productsSlice'
import sessionReducer from './sessionSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
    session: sessionReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
