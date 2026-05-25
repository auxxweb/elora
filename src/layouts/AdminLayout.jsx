import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FiLogOut, FiMenu } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminSidebar from '../components/admin/AdminSidebar'
import { useAuth } from '../hooks/useAuth'
import { logoutAdmin } from '../services/authService'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { user, syncAuthUser } = useAuth()

  const handleLogout = async () => {
    try {
      await logoutAdmin()
      syncAuthUser(null)
      toast.success('Signed out successfully.')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Unable to sign out.')
    }
  }

  return (
    <div className="min-h-screen bg-[#fbf7f2] md:grid md:grid-cols-[18rem_1fr]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-sand bg-[#fbf7f2]/90 px-4 py-4 backdrop-blur-lg sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white text-cocoa md:hidden"
              >
                <FiMenu />
              </button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/70">
                  Back Office
                </p>
                <h1 className="font-display text-3xl text-cocoa">Elora Operations</h1>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-sand bg-white px-4 py-2 shadow-soft">
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-mocha/70">Signed in</p>
                <p className="text-sm font-medium text-cocoa">{user?.email ?? 'Admin'}</p>
              </div>
              <button type="button" onClick={handleLogout} className="btn-secondary px-4 py-2">
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
