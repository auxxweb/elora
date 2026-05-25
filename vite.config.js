import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
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
})
