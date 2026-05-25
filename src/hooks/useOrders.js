import { useCallback, useEffect, useState } from 'react'
import { getOrders } from '../services/orderService'

export const useOrders = (search = '') => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const result = await getOrders({ search })
      setOrders(result)
    } catch (err) {
      setError(err.message || 'Unable to load orders.')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    let isMounted = true

    const loadOrders = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await getOrders({ search })

        if (isMounted) {
          setOrders(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load orders.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      isMounted = false
    }
  }, [search])

  return { orders, loading, error, refreshOrders }
}
