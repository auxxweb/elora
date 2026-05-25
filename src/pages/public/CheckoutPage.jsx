import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import { createOrder } from '../../services/orderService'
import { useCartStore } from '../../store/useCartStore'
import { formatCurrency } from '../../utils/format'

const initialForm = {
  customerName: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  notes: '',
}

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, totalAmount, clearCart } = useCartStore((state) => state)
  const [formData, setFormData] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const orderPreview = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
    [items],
  )

  if (!items.length) {
    return (
      <Container className="py-12">
        <EmptyState
          title="Your cart is empty"
          description="Add products before moving to checkout."
          action={
            <Link to="/products" className="btn-primary">
              Shop products
            </Link>
          }
        />
      </Container>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setSubmitting(true)
      const order = await createOrder({
        ...formData,
        items,
        totalAmount,
      })

      clearCart()
      toast.success('Order placed successfully.')
      navigate('/order-success', {
        replace: true,
        state: {
          orderId: order.orderId,
          totalAmount,
        },
      })
    } catch (error) {
      toast.error(error.message || 'Unable to place your order.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="py-12">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="panel-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
            Delivery details
          </p>
          <h1 className="mt-3 font-display text-4xl text-cocoa">Complete your boutique order</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600">
            No payment gateway is used here. Submit the form and the order will be saved to
            Firestore with a pending status for manual confirmation.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="label-text" htmlFor="customerName">
                Customer name
              </label>
              <input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="label-text" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="label-text" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="textarea-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="label-text" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="label-text" htmlFor="pincode">
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="label-text" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea-field"
                placeholder="Optional delivery instructions, color preferences, or support notes"
              />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? 'Placing order...' : 'Place order'}
              </button>
            </div>
          </form>
        </section>

        <aside className="panel-shell h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
            Order summary
          </p>
          <div className="mt-6 space-y-4">
            {orderPreview.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-[1.5rem] border border-sand bg-ivory px-4 py-3"
              >
                <div>
                  <p className="font-medium text-cocoa">{item.name}</p>
                  <p className="text-sm text-stone-600">Qty {item.quantity}</p>
                </div>
                <p className="font-semibold text-cocoa">{formatCurrency(item.total)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-sand bg-white p-5">
            <div className="flex items-center justify-between text-sm text-stone-600">
              <span>Payment method</span>
              <span>COD</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-lg font-semibold text-cocoa">
              <span>Total amount</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  )
}

export default CheckoutPage
