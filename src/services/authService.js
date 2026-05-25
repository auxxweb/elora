import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, firebaseSetupMessage, hasFirebaseEnv } from '../firebase/config'
import { SAMPLE_ADMIN_CREDENTIALS } from '../constants/sampleData'

const DEMO_ADMIN_STORAGE_KEY = 'elora-designs-demo-admin'
const DEMO_ADMIN_EVENT = 'elora-designs-demo-auth-change'

const normaliseEmail = (email = '') => email.trim().toLowerCase()

const ensureAuth = () => {
  if (!hasFirebaseEnv || !auth) {
    throw new Error(firebaseSetupMessage)
  }
}

const emitDemoAuthChange = (user) => {
  if (typeof window === 'undefined') return

  window.dispatchEvent(
    new CustomEvent(DEMO_ADMIN_EVENT, {
      detail: user,
    }),
  )
}

export const getDemoAdminUser = () => {
  if (typeof window === 'undefined') return null

  const storedUser = window.localStorage.getItem(DEMO_ADMIN_STORAGE_KEY)
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser)
  } catch {
    window.localStorage.removeItem(DEMO_ADMIN_STORAGE_KEY)
    return null
  }
}

export const getDemoAuthEventName = () => DEMO_ADMIN_EVENT

export const loginAdmin = async ({ email, password }) => {
  if (!hasFirebaseEnv || !auth) {
    const matchedAdmin = SAMPLE_ADMIN_CREDENTIALS.find(
      (admin) =>
        normaliseEmail(admin.email) === normaliseEmail(email) && admin.password === password,
    )

    if (!matchedAdmin) {
      throw new Error('Invalid demo admin credentials.')
    }

    const demoUser = {
      uid: `demo-${normaliseEmail(matchedAdmin.email)}`,
      email: matchedAdmin.email,
      role: matchedAdmin.role,
      authMode: 'demo',
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DEMO_ADMIN_STORAGE_KEY, JSON.stringify(demoUser))
    }

    emitDemoAuthChange(demoUser)

    return {
      user: demoUser,
    }
  }

  ensureAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

export const logoutAdmin = async () => {
  if (!hasFirebaseEnv || !auth) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(DEMO_ADMIN_STORAGE_KEY)
    }

    emitDemoAuthChange(null)
    return
  }

  ensureAuth()
  return signOut(auth)
}
