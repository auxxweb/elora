import { SAMPLE_ORDERS, SAMPLE_PRODUCTS } from '../constants/sampleData'

const DEMO_ORDERS_KEY = 'elora-designs-demo-orders'

export const getDemoProducts = () => SAMPLE_PRODUCTS.map((product) => ({ ...product }))

export const getDemoOrders = () => {
  if (typeof window === 'undefined') {
    return SAMPLE_ORDERS.map((order) => ({ ...order }))
  }

  const storedOrders = window.localStorage.getItem(DEMO_ORDERS_KEY)
  const parsedOrders = storedOrders ? JSON.parse(storedOrders) : []

  return [...parsedOrders, ...SAMPLE_ORDERS].map((order) => ({ ...order }))
}

export const createDemoOrder = (order) => {
  if (typeof window === 'undefined') {
    return order
  }

  const existingOrders = window.localStorage.getItem(DEMO_ORDERS_KEY)
  const parsedOrders = existingOrders ? JSON.parse(existingOrders) : []
  const nextOrders = [order, ...parsedOrders]

  window.localStorage.setItem(DEMO_ORDERS_KEY, JSON.stringify(nextOrders))
  return order
}

export const updateDemoOrderStatus = (id, status) => {
  if (typeof window === 'undefined') {
    return
  }

  const existingOrders = window.localStorage.getItem(DEMO_ORDERS_KEY)
  const parsedOrders = existingOrders ? JSON.parse(existingOrders) : []
  const nextOrders = parsedOrders.map((order) =>
    order.id === id ? { ...order, orderStatus: status } : order,
  )

  window.localStorage.setItem(DEMO_ORDERS_KEY, JSON.stringify(nextOrders))
}
