import { collection, doc, getDocs, addDoc, updateDoc } from 'firebase/firestore'
import { db, firebaseSetupMessage, hasFirebaseEnv } from '../firebase/config'
import { generateOrderId } from '../utils/order'
import { createDemoOrder, getDemoOrders, updateDemoOrderStatus } from './demoDataService'

const ORDERS_COLLECTION = 'orders'

const ensureDb = () => {
  if (!hasFirebaseEnv || !db) {
    throw new Error(firebaseSetupMessage)
  }
}

const normaliseOrder = (order) => ({
  id: order.id,
  orderId: order.orderId ?? '',
  customerName: order.customerName ?? '',
  phone: order.phone ?? '',
  address: order.address ?? '',
  city: order.city ?? '',
  pincode: order.pincode ?? '',
  notes: order.notes ?? '',
  items: Array.isArray(order.items) ? order.items : [],
  totalAmount: Number(order.totalAmount ?? 0),
  orderStatus: order.orderStatus ?? 'pending',
  createdAt: order.createdAt ?? '',
})

export const getOrders = async ({ search = '' } = {}) => {
  let orders = []

  if (!db) {
    orders = getDemoOrders().map((order) => normaliseOrder(order))
  } else {
    const snapshot = await getDocs(collection(db, ORDERS_COLLECTION))
    orders = snapshot.docs.map((item) => normaliseOrder({ id: item.id, ...item.data() }))
  }

  if (!orders.length) {
    orders = getDemoOrders().map((order) => normaliseOrder(order))
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase()
    orders = orders.filter((order) =>
      [
        order.orderId,
        order.customerName,
        order.phone,
        order.orderStatus,
        order.city,
      ].some((field) => field.toLowerCase().includes(query)),
    )
  }

  return orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
}

export const createOrder = async (payload) => {
  const order = {
    orderId: generateOrderId(),
    customerName: payload.customerName.trim(),
    phone: payload.phone.trim(),
    address: payload.address.trim(),
    city: payload.city.trim(),
    pincode: payload.pincode.trim(),
    notes: payload.notes.trim(),
    items: payload.items.map((item) => ({
      productId: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: item.quantity,
      image: item.image ?? '',
    })),
    totalAmount: Number(payload.totalAmount),
    orderStatus: 'pending',
    createdAt: new Date().toISOString(),
  }

  if (!db) {
    return createDemoOrder({
      id: `demo-order-${Date.now()}`,
      ...order,
    })
  }

  ensureDb()

  const reference = await addDoc(collection(db, ORDERS_COLLECTION), order)

  return {
    id: reference.id,
    ...order,
  }
}

export const updateOrderStatus = async (id, status) => {
  if (!db) {
    updateDemoOrderStatus(id, status)
    return
  }

  ensureDb()
  await updateDoc(doc(db, ORDERS_COLLECTION, id), { orderStatus: status })
}
