'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSelectedOrder,
  setDeleteCandidate,
  setSelectedOrder,
} from '../store/ordersSlice'
import { removeOrder } from '../store/thunks'
import {
  formatDateLong,
  formatDateShort,
  formatMoney,
  sumOrderPrices,
} from '../utils/formatters'
import { useI18n } from '../i18n/I18nProvider'

const DeleteOrderModal = dynamic(
  () => import('../components/DeleteOrderModal'),
  {
    loading: () => null,
  },
)

const OrdersPage = () => {
  const dispatch = useDispatch()
  const { t } = useI18n()
  const orders = useSelector((state) => state.orders.items)
  const products = useSelector((state) => state.products.items)
  const searchQuery = useSelector((state) => state.ui.searchQuery)
  const selectedOrderId = useSelector((state) => state.orders.selectedOrderId)
  const deleteCandidateId = useSelector(
    (state) => state.orders.deleteCandidateId,
  )

  const selectedOrder = useMemo(
    () => orders.find((item) => item.id === selectedOrderId) || null,
    [orders, selectedOrderId],
  )

  const deleteCandidate = useMemo(
    () => orders.find((item) => item.id === deleteCandidateId) || null,
    [orders, deleteCandidateId],
  )
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleOrders = useMemo(() => {
    if (!normalizedQuery) return orders
    return orders.filter((order) => {
      const orderProducts = products.filter(
        (product) => (product.order ?? product.orderId) === order.id,
      )
      return (
        order.title.toLowerCase().includes(normalizedQuery) ||
        orderProducts.some((product) =>
          `${product.title} ${product.serialNumber}`.toLowerCase().includes(normalizedQuery),
        )
      )
    })
  }, [orders, products, normalizedQuery])

  return (
    <section className="orders-page">
      <div
        className={`orders-page__list ${selectedOrder ? "orders-page__list--narrow" : ""}`}
      >
        <h2>{t('orders')} / {visibleOrders.length}</h2>
        {visibleOrders.map((order) => {
          const orderProducts = products.filter(
            (p) => (p.order ?? p.orderId) === order.id,
          )
          const prices = sumOrderPrices(orderProducts)
          return (
            <article
              key={order.id}
              className="order-card animate__animated animate__fadeInUp"
              onClick={() => dispatch(setSelectedOrder(order.id))}
            >
              <div className="order-card__title">{order.title}</div>
              <div className="order-card__meta">
                <span>{orderProducts.length} {t('productsCount')}</span>
                <span>{formatDateShort(order.date)}</span>
                <span>{formatDateLong(order.date)}</span>
                <span>{formatMoney(prices.usd, 'USD')}</span>
                <span>{formatMoney(prices.uah, 'UAH')}</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={(event) => {
                  event.stopPropagation()
                  dispatch(setDeleteCandidate(order.id))
                }}
              >
                {t('delete')}
              </button>
            </article>
          )
        })}
      </div>

      {selectedOrder && (
        <div className="orders-page__details animate__animated animate__fadeInRight">
          <div className="orders-page__details-header">
            <h3>{selectedOrder.title}</h3>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => dispatch(clearSelectedOrder())}
            >
              {t('close')}
            </button>
          </div>
          <ul className="list-group">
            {products
              .filter((product) => (product.order ?? product.orderId) === selectedOrder.id)
              .map((product) => (
                <li key={product.id} className="list-group-item">
                  <strong>{product.title}</strong>
                  <div>SN: {product.serialNumber}</div>
                </li>
              ))}
          </ul>
        </div>
      )}

      <DeleteOrderModal
        order={deleteCandidate}
        onClose={() => dispatch(setDeleteCandidate(null))}
        onConfirm={() =>
          deleteCandidate && dispatch(removeOrder(deleteCandidate.id))
        }
      />
    </section>
  )
}

export default OrdersPage
