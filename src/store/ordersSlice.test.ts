import { describe, expect, it } from 'vitest'
import ordersReducer, { clearSelectedOrder, setDeleteCandidate, setSelectedOrder } from './ordersSlice'

describe('ordersSlice reducers', () => {
  it('sets selected order id', () => {
    const state = ordersReducer(undefined, setSelectedOrder(2))
    expect(state.selectedOrderId).toBe(2)
  })

  it('clears selected order id', () => {
    const withSelected = ordersReducer(undefined, setSelectedOrder(2))
    const cleared = ordersReducer(withSelected, clearSelectedOrder())
    expect(cleared.selectedOrderId).toBeNull()
  })

  it('sets delete candidate id', () => {
    const state = ordersReducer(undefined, setDeleteCandidate(3))
    expect(state.deleteCandidateId).toBe(3)
  })
})
