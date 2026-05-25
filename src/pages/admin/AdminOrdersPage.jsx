import toast from 'react-hot-toast'
import SearchField from '../../components/common/SearchField'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import StatusBadge from '../../components/common/StatusBadge'
import { ORDER_STATUSES } from '../../constants/site'
import { useOrders } from '../../hooks/useOrders'
import { updateOrderStatus } from '../../services/orderService'
import { formatCurrency, formatDate } from '../../utils/format'
import { useState } from 'react'

const AdminOrdersPage = () => {
  const [search, setSearch] = useState('')
  const { orders, loading, error, refreshOrders } = useOrders(search)

  const handleStatusChange = async (orderId, nextStatus) => {
    try {
      await updateOrderStatus(orderId, nextStatus)
      toast.success('Order status updated.')
      refreshOrders()
    } catch (error) {
      toast.error(error.message || 'Unable to update order.')
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
          Order management
        </p>
        <h1 className="mt-3 font-display text-4xl text-cocoa">Track and update customer orders</h1>
        <div className="mt-6">
          <SearchField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by order ID, customer, city, phone, or status"
          />
        </div>
      </section>

      {loading ? (
        <Loader label="Loading orders..." />
      ) : error ? (
        <EmptyState title="Unable to load orders" description={error} />
      ) : orders.length ? (
        <section className="overflow-hidden rounded-[2rem] border border-sand bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-ivory text-cocoa">
                <tr>
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Items</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-sand bg-white align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-cocoa">{order.orderId}</p>
                      <p className="mt-1 text-xs text-stone-500">{formatDate(order.createdAt)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-cocoa">{order.customerName}</p>
                      <p className="mt-1 text-sm text-stone-600">{order.phone}</p>
                      <p className="mt-1 text-sm text-stone-600">
                        {order.address}, {order.city} {order.pincode}
                      </p>
                      {order.notes ? <p className="mt-2 text-xs text-stone-500">Note: {order.notes}</p> : null}
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={`${order.id}-${item.productId}`} className="rounded-2xl border border-sand bg-ivory px-3 py-2">
                            <p className="font-medium text-cocoa">{item.name}</p>
                            <p className="text-xs text-stone-600">Qty {item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-cocoa">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-3">
                        <StatusBadge status={order.orderStatus}>{order.orderStatus}</StatusBadge>
                        <select
                          value={order.orderStatus}
                          onChange={(event) => handleStatusChange(order.id, event.target.value)}
                          className="input-field min-w-[180px]"
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <EmptyState
          title="No orders available"
          description="Orders placed from the storefront checkout flow will appear here."
        />
      )}
    </div>
  )
}

export default AdminOrdersPage
