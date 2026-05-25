import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'

const App = () => (
  <>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: '18px',
          border: '1px solid #eadfd3',
          background: '#fffdf8',
          color: '#43342e',
        },
      }}
    />
    <AppRoutes />
  </>
)

export default App
