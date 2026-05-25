import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { formatCurrency, truncateText } from '../../utils/format'
import StatusBadge from './StatusBadge'

const ProductCard = ({ product }) => {
  const image = product.images?.[0]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-[2rem] border border-sand bg-white shadow-soft"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3.15] overflow-hidden bg-blush sm:aspect-[4/3.4]">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blush to-sand text-center text-sm text-stone-500">
              Upload boutique imagery
            </div>
          )}
          {product.featured ? (
            <div className="absolute left-3 top-3">
              <StatusBadge status="featured">Featured</StatusBadge>
            </div>
          ) : null}
        </div>
        <div className="space-y-2 p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/80">
                {product.category}
              </p>
              <h3 className="mt-1 font-display text-xl leading-tight text-cocoa sm:text-[1.28rem]">
                {product.name}
              </h3>
            </div>
            <FiArrowUpRight className="shrink-0 text-lg text-cocoa transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="text-sm leading-5 text-stone-600">
            {truncateText(product.description, 42)}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-cocoa sm:text-lg">{formatCurrency(product.price)}</p>
            <StatusBadge status={product.stock > 0 ? 'stock' : 'out'}>
              {product.stock > 0 ? 'In stock' : 'Out'}
            </StatusBadge>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default ProductCard
