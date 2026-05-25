import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { PRODUCT_CATEGORIES } from '../../constants/site'
import { uploadProductImages } from '../../services/storageService'

const getInitialState = (product) => ({
  name: product?.name ?? '',
  description: product?.description ?? '',
  price: product?.price ?? '',
  category: product?.category ?? PRODUCT_CATEGORIES[0],
  stock: product?.stock ?? '',
  featured: Boolean(product?.featured),
  images: product?.images ?? [],
})

const ProductForm = ({ initialData, onSubmit, submitLabel = 'Save product' }) => {
  const [formData, setFormData] = useState(getInitialState(initialData))
  const [newFiles, setNewFiles] = useState([])
  const [saving, setSaving] = useState(false)

  const previews = useMemo(
    () =>
      newFiles.map((file) => ({
        name: file.name,
        previewUrl: URL.createObjectURL(file),
      })),
    [newFiles],
  )

  useEffect(
    () => () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.previewUrl))
    },
    [previews],
  )

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleRemoveExistingImage = (imageUrl) => {
    setFormData((current) => ({
      ...current,
      images: current.images.filter((image) => image !== imageUrl),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.images.length && !newFiles.length) {
      toast.error('Upload at least one product image.')
      return
    }

    try {
      setSaving(true)
      let uploadedImages = []

      if (newFiles.length) {
        uploadedImages = await uploadProductImages(newFiles)
      }

      await onSubmit({
        ...formData,
        images: [...formData.images, ...uploadedImages],
      })
    } catch (error) {
      toast.error(error.message || 'Unable to save the product.')
      setSaving(false)
      return
    }

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 rounded-[2rem] border border-sand bg-white p-6 shadow-soft lg:grid-cols-2">
        <div className="space-y-2 lg:col-span-2">
          <label className="label-text" htmlFor="name">
            Product name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="label-text" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="textarea-field"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="label-text" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="label-text" htmlFor="stock">
            Stock quantity
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="label-text" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            list="product-categories"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          />
          <datalist id="product-categories">
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>

        <label className="flex items-center gap-3 rounded-[1.5rem] border border-sand bg-ivory px-4 py-3 text-sm font-medium text-cocoa">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 accent-cocoa"
          />
          Mark as featured product
        </label>

        <div className="space-y-2 lg:col-span-2">
          <label className="label-text" htmlFor="images">
            Product images
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => setNewFiles(Array.from(event.target.files ?? []))}
            className="input-field file:mr-3 file:rounded-full file:border-0 file:bg-cocoa file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-soft">
          <h3 className="font-display text-2xl text-cocoa">Current images</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {formData.images.length ? (
              formData.images.map((image) => (
                <div key={image} className="overflow-hidden rounded-[1.5rem] border border-sand">
                  <img src={image} alt={formData.name} className="h-40 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image)}
                    className="w-full border-t border-sand px-4 py-3 text-sm font-semibold text-rose-600"
                  >
                    Remove image
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-500">No uploaded images yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-soft">
          <h3 className="font-display text-2xl text-cocoa">New uploads preview</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {previews.length ? (
              previews.map((preview) => (
                <div key={preview.previewUrl} className="overflow-hidden rounded-[1.5rem] border border-sand">
                  <img src={preview.previewUrl} alt={preview.name} className="h-40 w-full object-cover" />
                  <div className="border-t border-sand px-4 py-3 text-sm text-stone-600">{preview.name}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-500">Select one or more images to preview them here.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
