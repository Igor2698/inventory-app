import type { Product } from '../types/domain'

export const formatDateShort = (date: string) =>
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))

export const formatDateLong = (date: string) =>
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date))

export const formatMoney = (value: number, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value)

export const sumOrderPrices = (products: Product[]) =>
  products.reduce(
    (acc, product) => {
      const usd = product.price.find((p) => p.symbol === 'USD')?.value || 0
      const uah = product.price.find((p) => p.symbol === 'UAH')?.value || 0
      return { usd: acc.usd + usd, uah: acc.uah + uah }
    },
    { usd: 0, uah: 0 },
  )
