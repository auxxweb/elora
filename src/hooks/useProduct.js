import { useEffect, useState } from 'react'
import { getProductById, getRelatedProducts } from '../services/productService'

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError('')
        const nextProduct = await getProductById(productId)

        if (!nextProduct) {
          throw new Error('This product could not be found.')
        }

        const nextRelatedProducts = await getRelatedProducts(nextProduct)

        if (isMounted) {
          setProduct(nextProduct)
          setRelatedProducts(nextRelatedProducts)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load the product.')
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
  }, [productId])

  return { product, relatedProducts, loading, error }
}
