import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ProductForm from '../../components/admin/ProductForm'
import { createProduct } from '../../services/productService'

const AddProductPage = () => {
  const navigate = useNavigate()

  const handleCreateProduct = async (values) => {
    await createProduct(values)
    toast.success('Product created successfully.')
    navigate('/admin/products')
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">
          Add product
        </p>
        <h1 className="mt-3 font-display text-4xl text-cocoa">Create a new boutique item</h1>
      </div>
      <ProductForm onSubmit={handleCreateProduct} submitLabel="Create product" />
    </div>
  )
}

export default AddProductPage
