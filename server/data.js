const products = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2019-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 2,
    serialNumber: 5678,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 2',
    type: 'Monitors',
    specification: 'Specification 2',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2019-06-29 12:09:33',
    },
    price: [
      { value: 150, symbol: 'USD', isDefault: 0 },
      { value: 3900, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 3,
    serialNumber: 9012,
    isNew: 0,
    photo: 'pathToFile.jpg',
    title: 'Product 3',
    type: 'Printers',
    specification: 'Specification 3',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2018-06-29 12:09:33',
    },
    price: [
      { value: 200, symbol: 'USD', isDefault: 0 },
      { value: 5200, symbol: 'UAH', isDefault: 1 },
    ],
    order: 2,
    date: '2017-06-29 12:09:33',
  },
]

const orders = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() {
      return products.filter((product) => product.order === this.id)
    },
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() {
      return products.filter((product) => product.order === this.id)
    },
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    get products() {
      return products.filter((product) => product.order === this.id)
    },
  },
]

export { orders, products }
