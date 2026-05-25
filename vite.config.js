import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const normalizeBasePath = (value = '/') => {
  if (!value || value === '/') return '/'

  const trimmed = value.replace(/^\/+|\/+$/g, '')
  return `/${trimmed}/`
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repositoryName = env.GITHUB_REPOSITORY?.split('/')[1]
  const base = normalizeBasePath(env.VITE_PUBLIC_BASE_PATH || repositoryName || '/')

  return {
    base,
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/firebase')) return 'firebase'
            if (id.includes('node_modules/framer-motion')) return 'motion'
            if (id.includes('node_modules/react-hot-toast')) return 'notifications'
            if (id.includes('node_modules/react-icons')) return 'icons'
            if (id.includes('node_modules/zustand')) return 'state'
            if (
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react/')
            ) {
              return 'react'
            }

            return undefined
          },
        },
      },
    },
  }
})
