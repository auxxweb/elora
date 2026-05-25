import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import StorefrontLayout from '../layouts/StorefrontLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import Loader from '../components/common/Loader'

const HomePage = lazy(() => import('../pages/public/HomePage'))
const AboutPage = lazy(() => import('../pages/public/AboutPage'))
const ProductsPage = lazy(() => import('../pages/public/ProductsPage'))
const ContactPage = lazy(() => import('../pages/public/ContactPage'))
const ProductDetailsPage = lazy(() => import('../pages/public/ProductDetailsPage'))
const CartPage = lazy(() => import('../pages/public/CartPage'))
const CheckoutPage = lazy(() => import('../pages/public/CheckoutPage'))
const OrderSuccessPage = lazy(() => import('../pages/public/OrderSuccessPage'))
const LoginPage = lazy(() => import('../pages/public/LoginPage'))
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'))
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'))
const AdminProductsPage = lazy(() => import('../pages/admin/AdminProductsPage'))
const AddProductPage = lazy(() => import('../pages/admin/AddProductPage'))
const EditProductPage = lazy(() => import('../pages/admin/EditProductPage'))
const AdminOrdersPage = lazy(() => import('../pages/admin/AdminOrdersPage'))
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'))

const AppRoutes = () => (
  <Suspense
    fallback={
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Loader label="Loading page..." />
      </div>
    }
  >
    <Routes>
      <Route element={<StorefrontLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="add-product" element={<AddProductPage />} />
          <Route path="edit-product/:id" element={<EditProductPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)

export default AppRoutes
