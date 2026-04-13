import { formatDateLong, formatDateShort, formatMoney } from '../../utils/formatters'

const ProductsTable = ({ products, orders, labels }) => (
  <div className="products-page__table-wrap">
    <table className="table table-hover products-page__table">
      <thead>
        <tr>
          <th>{labels.title}</th>
          <th>{labels.type}</th>
          <th>{labels.warranty}</th>
          <th>{labels.price}</th>
          <th>{labels.order}</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const usd = product.price.find((item) => item.symbol === 'USD')?.value || 0
          const uah = product.price.find((item) => item.symbol === 'UAH')?.value || 0
          const productOrderId = product.order ?? product.orderId
          const guaranteeStart = product.guarantee?.start ?? product.guaranteeStart
          const guaranteeEnd = product.guarantee?.end ?? product.guaranteeEnd
          const serialNumber = product.serialNumber ?? product.serial ?? '-'
          const orderName = orders.find((order) => order.id === productOrderId)?.title || '-'

          return (
            <tr key={product.id} className="animate__animated animate__fadeIn">
              <td>
                <div>{product.title}</div>
                <small>SN: {serialNumber}</small>
              </td>
              <td>{product.type}</td>
              <td>
                <div>{guaranteeStart ? formatDateShort(guaranteeStart) : '-'}</div>
                <small>{guaranteeEnd ? formatDateLong(guaranteeEnd) : '-'}</small>
              </td>
              <td>
                <div>{formatMoney(usd, 'USD')}</div>
                <small>{formatMoney(uah, 'UAH')}</small>
              </td>
              <td>{orderName}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default ProductsTable
