import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import SearchField from '../../components/common/SearchField'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import StatusBadge from '../../components/common/StatusBadge'
import { deleteProduct, getProducts } from '../../services/productService'
import { formatCurrency, formatDate } from '../../utils/format'

const AdminProductsPage = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const result = await getProducts()
      setProducts(result)
    } catch (err) {
      setError(err.message || 'Unable to load products.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const initialiseProducts = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await getProducts()

        if (isMounted) {
          setProducts(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load products.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initialiseProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return products

    return products.filter((product) =>
      [product.name, product.category, product.description].some((field) =>
        field.toLowerCase().includes(query),
      ),
    )
  }, [products, search])

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product from Firestore?')) return

    try {
      await deleteProduct(productId)
      toast.success('Product deleted.')
      loadProducts()
    } catch (error) {
      toast.error(error.message || 'Unable to delete product.')
    }
  }

  if (loading) {
    return <Loader label="Loading products..." />
  }

  if (error) {
    return <EmptyState title="Unable to load products" description={error} />
  }

  return (
    <div className="space-y-6">
      <section className="panel-shell">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
              Product management
            </p>
            <h1 className="mt-3 font-display text-4xl text-cocoa">Manage boutique catalog</h1>
          </div>
          <Link to="/admin/add-product" className="btn-primary">
            Add new product
          </Link>
        </div>

        <SearchField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products by name, category, or description"
        />
      </section>

      {filteredProducts.length ? (
        <section className="overflow-hidden rounded-[2rem] border border-sand bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-ivory text-cocoa">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-sand bg-white">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-2xl border border-sand bg-ivory">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-semibold text-cocoa">{product.name}</p>
                          {product.featured ? (
                            <StatusBadge status="featured" className="mt-2">
                              Featured
                            </StatusBadge>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-stone-600">{product.category}</td>
                    <td className="px-5 py-4 font-semibold text-cocoa">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={product.stock > 0 ? 'stock' : 'out'}>
                        {product.stock} units
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-4 text-stone-600">{formatDate(product.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-3">
                        <Link to={`/admin/edit-product/${product.id}`} className="btn-secondary px-4 py-2">
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="btn-secondary px-4 py-2 text-rose-600"
                        >
                          Delete
                        </button>
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
          title="No products available"
          description="Create the first product to populate the boutique storefront."
          action={
            <Link to="/admin/add-product" className="btn-primary">
              Create product
            </Link>
          }
        />
      )}
    </div>
  )
}

export default AdminProductsPage
