import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import ProductForm from '../../components/admin/ProductForm'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'
import { getProductById, updateProduct } from '../../services/productService'

const EditProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await getProductById(id)

        if (!result) {
          throw new Error('Product not found.')
        }

        if (isMounted) {
          setProduct(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load product.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleUpdateProduct = async (values) => {
    await updateProduct(id, values)
    toast.success('Product updated successfully.')
    navigate('/admin/products')
  }

  if (loading) {
    return <Loader label="Loading product editor..." />
  }

  if (error || !product) {
    return (
      <EmptyState
        title="Unable to load product"
        description={error || 'This product could not be found.'}
        action={
          <Link to="/admin/products" className="btn-primary">
            Back to products
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
          Edit product
        </p>
        <h1 className="mt-3 font-display text-4xl text-cocoa">Update boutique catalog item</h1>
      </div>
      <ProductForm
        key={product.id}
        initialData={product}
        onSubmit={handleUpdateProduct}
        submitLabel="Save changes"
      />
    </div>
  )
}

export default EditProductPage
