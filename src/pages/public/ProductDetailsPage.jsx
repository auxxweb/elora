import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Container from '../../components/common/Container'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import ProductCard from '../../components/common/ProductCard'
import QuantitySelector from '../../components/common/QuantitySelector'
import SectionHeading from '../../components/common/SectionHeading'
import StatusBadge from '../../components/common/StatusBadge'
import { useProduct } from '../../hooks/useProduct'
import { useCartStore } from '../../store/useCartStore'
import { formatCurrency } from '../../utils/format'

const ProductDetailsContent = ({ product, relatedProducts }) => {
  const addItem = useCartStore((state) => state.addItem)
  const [activeImage, setActiveImage] = useState(product.images?.[0] ?? '')
  const [desiredQuantity, setDesiredQuantity] = useState(1)
  const gallery = product.images?.length ? product.images : [null]

  const handleAddToCart = () => {
    if (product.stock <= 0) return

    Array.from({ length: desiredQuantity }).forEach(() => addItem(product))
    toast.success('Added to cart.')
  }

  return (
    <Container className="py-12">
      <section className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2.5rem] border border-sand bg-white shadow-soft">
            {activeImage ? (
              <img src={activeImage} alt={product.name} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-blush to-sand text-center text-sm text-stone-500">
                Add product images from Firebase Storage
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            {gallery.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                onClick={() => setActiveImage(image ?? '')}
                className={`overflow-hidden rounded-[1.5rem] border ${
                  activeImage === image ? 'border-cocoa' : 'border-sand'
                } bg-white`}
              >
                {image ? (
                  <img src={image} alt={`${product.name} ${index + 1}`} className="aspect-square w-full object-cover" />
                ) : (
                  <div className="flex aspect-square items-center justify-center text-xs text-stone-400">
                    Placeholder
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-shell space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
              {product.category}
            </p>
            <h1 className="font-display text-5xl text-cocoa">{product.name}</h1>
            <p className="text-3xl font-semibold text-cocoa">{formatCurrency(product.price)}</p>
            <div className="flex flex-wrap gap-3">
              <StatusBadge status={product.stock > 0 ? 'stock' : 'out'}>
                {product.stock > 0 ? 'Ready to order' : 'Out of stock'}
              </StatusBadge>
              {product.featured ? <StatusBadge status="featured">Featured pick</StatusBadge> : null}
            </div>
          </div>

          <p className="text-sm leading-8 text-stone-600">{product.description}</p>

          <div className="flex flex-wrap items-center gap-4 rounded-[1.75rem] border border-sand bg-ivory p-4">
            <QuantitySelector
              quantity={desiredQuantity}
              onDecrease={() => setDesiredQuantity((value) => Math.max(1, value - 1))}
              onIncrease={() => setDesiredQuantity((value) => Math.min(product.stock || 1, value + 1))}
              disabledDecrease={desiredQuantity === 1}
              disabledIncrease={desiredQuantity >= (product.stock || 1)}
            />
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="btn-primary"
            >
              Add to cart
            </button>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-sand bg-white p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/70">Category</p>
              <p className="mt-2 text-sm text-cocoa">{product.category}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/70">Stock</p>
              <p className="mt-2 text-sm text-cocoa">{product.stock} units</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/70">Fulfilment</p>
              <p className="mt-2 text-sm text-cocoa">Cash on delivery</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="You may also like"
          title="Related boutique picks"
          description="Products from the same category surface here automatically for cross-selling."
        />

        {relatedProducts.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No related products yet"
            description="Add more products in this category to enable related-product suggestions."
          />
        )}
      </section>
    </Container>
  )
}

const ProductDetailsPage = () => {
  const { id } = useParams()
  const { product, relatedProducts, loading, error } = useProduct(id)

  if (loading) {
    return (
      <Container className="py-12">
        <Loader label="Loading product details..." />
      </Container>
    )
  }

  if (error || !product) {
    return (
      <Container className="py-12">
        <EmptyState
          title="Product unavailable"
          description={error || 'The requested product does not exist.'}
          action={
            <Link to="/products" className="btn-primary">
              Back to products
            </Link>
          }
        />
      </Container>
    )
  }

  return <ProductDetailsContent key={product.id} product={product} relatedProducts={relatedProducts} />
}

export default ProductDetailsPage
