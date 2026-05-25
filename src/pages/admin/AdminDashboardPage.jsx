import { useEffect, useMemo, useState } from 'react'
import DashboardCard from '../../components/admin/DashboardCard'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import StatusBadge from '../../components/common/StatusBadge'
import { getOrders } from '../../services/orderService'
import { getProducts } from '../../services/productService'
import { formatCurrency, formatDate } from '../../utils/format'

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadDashboardData = async () => {
      try {
        setLoading(true)
        setError('')
        const [productsResult, ordersResult] = await Promise.all([getProducts(), getOrders()])

        if (isMounted) {
          setProducts(productsResult)
          setOrders(ordersResult)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load dashboard data.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = useMemo(() => {
    const pendingOrders = orders.filter((order) => order.orderStatus === 'pending').length
    const totalRevenue = orders
      .filter((order) => order.orderStatus !== 'cancelled')
      .reduce((total, order) => total + order.totalAmount, 0)

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders,
      totalRevenue,
    }
  }, [orders, products])

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders])
  const lowStockProducts = useMemo(() => products.filter((product) => product.stock <= 5), [products])

  if (loading) {
    return <Loader label="Loading admin dashboard..." />
  }

  if (error) {
    return <EmptyState title="Unable to load admin data" description={error} />
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Total products" value={stats.totalProducts} helper="Live catalog count" />
        <DashboardCard label="Total orders" value={stats.totalOrders} helper="Orders saved in Firestore" />
        <DashboardCard label="Pending orders" value={stats.pendingOrders} helper="Awaiting manual confirmation" />
        <DashboardCard
          label="Revenue summary"
          value={formatCurrency(stats.totalRevenue)}
          helper="Excludes cancelled orders"
        />
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-shell">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
                Recent orders
              </p>
              <h2 className="mt-3 font-display text-3xl text-cocoa">Latest customer activity</h2>
            </div>
          </div>

          {recentOrders.length ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-sand">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-ivory text-cocoa">
                    <tr>
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-t border-sand bg-white">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-cocoa">{order.orderId}</p>
                          <p className="text-xs text-stone-500">{formatDate(order.createdAt)}</p>
                        </td>
                        <td className="px-4 py-4 text-stone-600">{order.customerName}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={order.orderStatus}>{order.orderStatus}</StatusBadge>
                        </td>
                        <td className="px-4 py-4 font-semibold text-cocoa">
                          {formatCurrency(order.totalAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <EmptyState
              title="No orders yet"
              description="Orders placed from the storefront will appear here automatically."
            />
          )}
        </div>

        <div className="panel-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">Inventory watch</p>
          <h2 className="mt-3 font-display text-3xl text-cocoa">Low stock products</h2>

          {lowStockProducts.length ? (
            <div className="mt-6 space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-[1.5rem] border border-sand bg-ivory px-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-cocoa">{product.name}</p>
                    <p className="mt-1 text-sm text-stone-600">{product.category}</p>
                  </div>
                  <StatusBadge status={product.stock > 0 ? 'stock' : 'out'}>
                    {product.stock} left
                  </StatusBadge>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm leading-7 text-stone-600">
              No urgent stock alerts. Products with five or fewer units remaining will appear here.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboardPage
