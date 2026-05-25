import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const StorefrontLayout = () => (
  <div className="min-h-screen bg-ivory">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default StorefrontLayout
