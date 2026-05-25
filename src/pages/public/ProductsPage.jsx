import { useMemo, useState } from 'react'
import Container from '../../components/common/Container'
import SectionHeading from '../../components/common/SectionHeading'
import SearchField from '../../components/common/SearchField'
import ProductCard from '../../components/common/ProductCard'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import SampleDataBanner from '../../components/common/SampleDataBanner'
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '../../constants/site'
import { useProducts } from '../../hooks/useProducts'

const ProductsPage = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const { products, loading, error } = useProducts({ search, category, sortBy })

  const categoryOptions = useMemo(() => ['all', ...PRODUCT_CATEGORIES], [])

  return (
    <Container className="py-12">
      <SampleDataBanner />

      <section className="rounded-[2.5rem] border border-sand bg-white p-8 shadow-soft sm:p-10">
        <SectionHeading
          eyebrow="Catalog"
          title="Shop all boutique products"
          description="Browse your entire Firestore-powered collection with filters for categories, search, and pricing."
        />

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <SearchField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product name, category, or description"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="input-field"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All categories' : option}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="input-field"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mt-10">
        {loading ? (
          <Loader label="Loading boutique products..." />
        ) : error ? (
          <EmptyState title="Unable to load products" description={error} />
        ) : products.length ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="text-sm text-stone-600">{products.length} products found</p>
              <p className="text-xs uppercase tracking-[0.25em] text-mocha/75">
                Responsive boutique grid
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="No products match your filters"
            description="Try another category, clear the search, or add more products from the admin panel."
          />
        )}
      </section>
    </Container>
  )
}

export default ProductsPage
