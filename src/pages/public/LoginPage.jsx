import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Container from '../../components/common/Container'
import { firebaseSetupMessage, hasFirebaseEnv, isAdminEmail } from '../../firebase/config'
import { useAuth } from '../../hooks/useAuth'
import { loginAdmin, logoutAdmin } from '../../services/authService'
import { SAMPLE_ADMIN_CREDENTIALS } from '../../constants/sampleData'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin, syncAuthUser } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const demoAdmin = SAMPLE_ADMIN_CREDENTIALS[0]

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setSubmitting(true)
      const response = await loginAdmin(formData)
      syncAuthUser(response.user)

      if (response.user.authMode !== 'demo' && !isAdminEmail(response.user.email)) {
        await logoutAdmin()
        syncAuthUser(null)
        throw new Error('This account is not authorized for admin access.')
      }

      toast.success('Welcome back.')
      navigate(location.state?.from ?? '/admin', { replace: true })
    } catch (error) {
      toast.error(error.message || 'Unable to sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className="py-14">
      <div className="mx-auto grid max-w-5xl gap-8 rounded-[2.5rem] border border-sand bg-white p-8 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div className="rounded-[2rem] bg-cocoa p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">Admin access</p>
          <h1 className="mt-4 font-display text-5xl">Manage catalog, orders, and boutique ops.</h1>
          <p className="mt-4 text-sm leading-8 text-white/75">
            Use Firebase email/password authentication to access protected admin routes inside this
            same Vite project.
          </p>
          <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/10 p-5 text-sm leading-7 text-white/80">
            <p>Protected admin routes include dashboard, products, orders, and settings.</p>
            <p className="mt-3">Set `VITE_ADMIN_EMAILS` in your environment to restrict access to specific admin accounts.</p>
            {!hasFirebaseEnv ? (
              <p className="mt-3">
                Demo mode is active, so you can log in with the sample admin credentials shown on
                the right.
              </p>
            ) : null}
          </div>
        </div>

        <div className="panel-shell border-0 p-0 shadow-none">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/75">Login</p>
          <h2 className="mt-3 font-display text-4xl text-cocoa">Admin sign in</h2>

          {!hasFirebaseEnv ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.5rem] border border-[#e8cf8a] bg-[#fff7df] px-4 py-3 text-sm text-[#7a5b16]">
                {firebaseSetupMessage} Demo admin login is enabled until you connect Firebase.
              </div>
              <div className="rounded-[1.5rem] border border-sand bg-ivory px-4 py-4 text-sm text-cocoa">
                <p className="font-semibold">Sample admin credentials</p>
                <p className="mt-2">
                  Email: <span className="font-medium">{demoAdmin.email}</span>
                </p>
                <p className="mt-1">
                  Password: <span className="font-medium">{demoAdmin.password}</span>
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      email: demoAdmin.email,
                      password: demoAdmin.password,
                    })
                  }
                  className="btn-secondary mt-4 px-4 py-2"
                >
                  Use sample credentials
                </button>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="label-text" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="label-text" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? 'Signing in...' : hasFirebaseEnv ? 'Login to admin' : 'Login with demo admin'}
            </button>
          </form>

          <p className="mt-6 text-sm text-stone-600">
            Looking for the storefront instead? <Link to="/" className="font-semibold text-cocoa">Return home</Link>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default LoginPage
