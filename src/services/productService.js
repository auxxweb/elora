import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db, firebaseSetupMessage, hasFirebaseEnv } from '../firebase/config'
import { getDemoProducts } from './demoDataService'

const PRODUCTS_COLLECTION = 'products'

const ensureDb = () => {
  if (!hasFirebaseEnv || !db) {
    throw new Error(firebaseSetupMessage)
  }
}

const normaliseProduct = (product) => ({
  id: product.id,
  name: product.name ?? '',
  description: product.description ?? '',
  price: Number(product.price ?? 0),
  category: product.category ?? '',
  stock: Number(product.stock ?? 0),
  featured: Boolean(product.featured),
  images: Array.isArray(product.images) ? product.images.filter(Boolean) : [],
  createdAt: product.createdAt ?? '',
  updatedAt: product.updatedAt ?? '',
})

const sortProducts = (products, sortBy) => {
  const nextProducts = [...products]

  switch (sortBy) {
    case 'price-asc':
      return nextProducts.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return nextProducts.sort((a, b) => b.price - a.price)
    case 'newest':
    default:
      return nextProducts.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      )
  }
}

const sanitizeProductPayload = (payload, isEditing = false) => ({
  name: payload.name.trim(),
  description: payload.description.trim(),
  price: Number(payload.price),
  category: payload.category.trim(),
  stock: Number(payload.stock),
  featured: Boolean(payload.featured),
  images: Array.isArray(payload.images) ? payload.images.filter(Boolean) : [],
  ...(isEditing ? { updatedAt: new Date().toISOString() } : { createdAt: new Date().toISOString() }),
})

export const getProducts = async ({ search = '', category = 'all', sortBy = 'newest' } = {}) => {
  const dataSource = !db
    ? getDemoProducts().map((product) => normaliseProduct(product))
    : (
        await getDocs(collection(db, PRODUCTS_COLLECTION))
      ).docs.map((item) => normaliseProduct({ id: item.id, ...item.data() }))

  let products = dataSource.length
    ? dataSource
    : getDemoProducts().map((product) => normaliseProduct(product))

  if (category !== 'all') {
    products = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    )
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase()
    products = products.filter((product) =>
      [product.name, product.description, product.category].some((field) =>
        field.toLowerCase().includes(query),
      ),
    )
  }

  return sortProducts(products, sortBy)
}

export const getFeaturedProducts = async (limit = 4) => {
  const products = await getProducts({ sortBy: 'newest' })
  return products.filter((product) => product.featured).slice(0, limit)
}

export const getNewArrivals = async (limit = 8) => {
  const products = await getProducts({ sortBy: 'newest' })
  return products.slice(0, limit)
}

export const getProductById = async (id) => {
  if (!id) return null

  if (!db) {
    return getDemoProducts()
      .map((product) => normaliseProduct(product))
      .find((product) => product.id === id)
  }

  const snapshot = await getDoc(doc(db, PRODUCTS_COLLECTION, id))
  if (!snapshot.exists()) {
    return getDemoProducts()
      .map((product) => normaliseProduct(product))
      .find((product) => product.id === id) ?? null
  }

  return normaliseProduct({ id: snapshot.id, ...snapshot.data() })
}

export const getRelatedProducts = async (product, limit = 4) => {
  if (!product) return []

  const products = await getProducts({ category: product.category, sortBy: 'newest' })
  return products.filter((item) => item.id !== product.id).slice(0, limit)
}

export const createProduct = async (payload) => {
  ensureDb()
  const product = sanitizeProductPayload(payload)
  const reference = await addDoc(collection(db, PRODUCTS_COLLECTION), product)

  return {
    id: reference.id,
    ...product,
  }
}

export const updateProduct = async (id, payload) => {
  ensureDb()

  const product = sanitizeProductPayload(payload, true)
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), product)

  return {
    id,
    ...product,
  }
}

export const deleteProduct = async (id) => {
  ensureDb()
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id))
}
