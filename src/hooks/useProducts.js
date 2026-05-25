import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'

export const useProducts = ({ search = '', category = 'all', sortBy = 'newest' } = {}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await getProducts({ search, category, sortBy })

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

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [category, search, sortBy])

  return { products, loading, error }
}
