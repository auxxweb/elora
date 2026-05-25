import { Link, useLocation, Navigate } from 'react-router-dom'
import Container from '../../components/common/Container'
import { formatCurrency } from '../../utils/format'

const OrderSuccessPage = () => {
  const { state } = useLocation()

  if (!state?.orderId) {
    return <Navigate to="/" replace />
  }

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-sand bg-white p-10 text-center shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/80">Order placed</p>
        <h1 className="mt-4 font-display text-5xl text-cocoa">Thank you for shopping with us.</h1>
        <p className="mt-4 text-base leading-8 text-stone-600">
          Your boutique order has been saved successfully in Firestore. The admin can now review
          and update its status from the dashboard.
        </p>

        <div className="mt-8 grid gap-4 rounded-[2rem] border border-sand bg-ivory p-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/70">Order ID</p>
            <p className="mt-3 text-xl font-semibold text-cocoa">{state.orderId}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/70">Amount</p>
            <p className="mt-3 text-xl font-semibold text-cocoa">
              {formatCurrency(state.totalAmount)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/products" className="btn-primary">
            Continue shopping
          </Link>
          <Link to="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default OrderSuccessPage
