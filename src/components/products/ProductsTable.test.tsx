import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductsTable from './ProductsTable'

const labels = {
  title: 'Title',
  type: 'Type',
  warranty: 'Warranty',
  price: 'Price',
  order: 'Order',
}

describe('ProductsTable', () => {
  it('renders headers and row data', () => {
    render(
      <ProductsTable
        labels={labels}
        orders={[{ id: 1, title: 'Order 1', date: '2017-06-29 12:09:33' }]}
        products={[
          {
            id: 1,
            title: 'Product 1',
            type: 'Monitors',
            serialNumber: 1234,
            guarantee: { start: '2017-06-29 12:09:33', end: '2019-06-29 12:09:33' },
            price: [
              { symbol: 'USD', value: 100 },
              { symbol: 'UAH', value: 2600 },
            ],
            order: 1,
          },
        ]}
      />,
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Order')).toBeInTheDocument()
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Monitors')).toBeInTheDocument()
    expect(screen.getByText('Order 1')).toBeInTheDocument()
  })
})
