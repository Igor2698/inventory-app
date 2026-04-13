import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    activeSessions: 1,
  },
  reducers: {
    setActiveSessions: (state, action: PayloadAction<number>) => {
      state.activeSessions = action.payload
    },
  },
})

export const { setActiveSessions } = sessionSlice.actions
export default sessionSlice.reducer
