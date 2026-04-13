import { describe, expect, it } from 'vitest'
import { sumOrderPrices } from './formatters'

describe('sumOrderPrices', () => {
  it('sums USD and UAH values across products', () => {
    const result = sumOrderPrices([
      {
        id: 1,
        title: 'Product A',
        type: 'Monitors',
        price: [
          { symbol: 'USD', value: 100 },
          { symbol: 'UAH', value: 4000 },
        ],
      },
      {
        id: 2,
        title: 'Product B',
        type: 'Printers',
        price: [
          { symbol: 'USD', value: 50 },
          { symbol: 'UAH', value: 2000 },
        ],
      },
    ])

    expect(result).toEqual({ usd: 150, uah: 6000 })
  })

  it('returns zeros for empty products list', () => {
    const result = sumOrderPrices([])
    expect(result).toEqual({ usd: 0, uah: 0 })
  })
})
