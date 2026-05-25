import { Link } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'
import Container from '../../components/common/Container'
import EmptyState from '../../components/common/EmptyState'
import QuantitySelector from '../../components/common/QuantitySelector'
import { useCartStore } from '../../store/useCartStore'
import { formatCurrency } from '../../utils/format'

const CartPage = () => {
  const { items, itemCount, totalAmount, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
    useCartStore((state) => state)

  if (!items.length) {
    return (
      <Container className="py-12">
        <EmptyState
          title="Your cart is empty"
          description="Browse the collection and add products to start a cash-on-delivery order."
          action={
            <Link to="/products" className="btn-primary">
              Continue shopping
            </Link>
          }
        />
      </Container>
    )
  }

  return (
    <Container className="py-12">
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="panel-shell">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
                Shopping cart
              </p>
              <h1 className="mt-3 font-display text-4xl text-cocoa">Your selected pieces</h1>
            </div>
            <button type="button" onClick={clearCart} className="btn-secondary px-4 py-2">
              Clear cart
            </button>
          </div>

          <div className="space-y-5">
            {items.map((item) => (
              <article
                key={item.id}
                className="grid gap-5 rounded-[1.75rem] border border-sand bg-ivory p-4 sm:grid-cols-[120px_1fr]"
              >
                <div className="overflow-hidden rounded-[1.5rem] border border-white">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full min-h-[140px] items-center justify-center bg-blush text-xs text-stone-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/75">
                      {item.category}
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-cocoa">{item.name}</h2>
                    <p className="mt-3 text-sm text-stone-600">{formatCurrency(item.price)} each</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-mocha/70">
                      Stock: {item.stock}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <QuantitySelector
                      quantity={item.quantity}
                      onDecrease={() => decreaseQuantity(item.id)}
                      onIncrease={() => increaseQuantity(item.id)}
                      disabledDecrease={item.quantity === 1}
                      disabledIncrease={item.quantity >= item.stock}
                    />
                    <p className="text-right text-lg font-semibold text-cocoa">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600"
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="panel-shell h-fit">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
            Order summary
          </p>
          <div className="mt-6 space-y-4 rounded-[1.75rem] border border-sand bg-ivory p-5">
            <div className="flex items-center justify-between text-sm text-stone-600">
              <span>Total items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-stone-600">
              <span>Payment</span>
              <span>Cash on delivery</span>
            </div>
            <div className="flex items-center justify-between border-t border-sand pt-4 text-lg font-semibold text-cocoa">
              <span>Total amount</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
          <Link to="/products" className="btn-secondary mt-4 w-full">
            Continue shopping
          </Link>
        </aside>
      </div>
    </Container>
  )
}

export default CartPage
