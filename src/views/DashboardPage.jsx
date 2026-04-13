'use client'

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts'
import { useI18n } from '../i18n/I18nProvider'

const DashboardPage = () => {
  const { t } = useI18n()
  const products = useSelector((state) => state.products.items)
  const orders = useSelector((state) => state.orders.items)

  const productsByType = useMemo(() => {
    const grouped = products.reduce((acc, product) => {
      acc[product.type] = (acc[product.type] || 0) + 1
      return acc
    }, {})

    return Object.entries(grouped).map(([type, count]) => ({ type, count }))
  }, [products])

  const orderValueData = useMemo(
    () =>
      orders.map((order) => {
        const orderProducts = products.filter(
          (product) => (product.order ?? product.orderId) === order.id,
        )
        const usdSum = orderProducts.reduce((acc, product) => {
          const usd = product.price.find((item) => item.symbol === 'USD')?.value || 0
          return acc + usd
        }, 0)

        return {
          name: order.title,
          value: usdSum,
        }
      }),
    [orders, products],
  )

  return (
    <section className="dashboard-page">
      <div className="dashboard-page__grid">
        <article className="dashboard-page__card">
          <h3>{t('productsByType')}</h3>
          <div className="dashboard-page__chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6c8b2f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="dashboard-page__card">
          <h3>{t('orderValueUsd')}</h3>
          <div className="dashboard-page__chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderValueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3f7bd9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
