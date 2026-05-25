import { Link } from 'react-router-dom'
import Container from '../../components/common/Container'

const NotFoundPage = () => (
  <Container className="py-16">
    <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-sand bg-white p-10 text-center shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/80">404</p>
      <h1 className="mt-4 font-display text-5xl text-cocoa">This page could not be found.</h1>
      <p className="mt-4 text-base leading-8 text-stone-600">
        The route does not exist in the boutique storefront or admin panel.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary">
          Go home
        </Link>
        <Link to="/products" className="btn-secondary">
          Browse products
        </Link>
      </div>
    </div>
  </Container>
)

export default NotFoundPage
