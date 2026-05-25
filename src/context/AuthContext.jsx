import { useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, hasFirebaseEnv, isAdminEmail } from '../firebase/config'
import { AuthContext } from './auth-context'
import { getDemoAdminUser, getDemoAuthEventName } from '../services/authService'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    !hasFirebaseEnv || !auth ? getDemoAdminUser() : null,
  )
  const [loading, setLoading] = useState(hasFirebaseEnv && Boolean(auth))

  useEffect(() => {
    if (!hasFirebaseEnv || !auth) {
      if (typeof window === 'undefined') {
        return undefined
      }

      const handleDemoAuthChange = (event) => {
        setUser(event.detail ?? null)
      }

      window.addEventListener(getDemoAuthEventName(), handleDemoAuthChange)

      return () => {
        window.removeEventListener(getDemoAuthEventName(), handleDemoAuthChange)
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.authMode === 'demo' ? true : isAdminEmail(user?.email),
      syncAuthUser: setUser,
    }),
    [loading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
