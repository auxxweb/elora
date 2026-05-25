import { Link } from 'react-router-dom'
import Container from '../common/Container'
import { BOUTIQUE_BENEFITS, SITE_CONFIG } from '../../constants/site'
import BrandMark from '../common/BrandMark'

const Footer = () => (
  <footer className="mt-20 border-t border-sand/80 bg-white/95">
    <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-4">
        <BrandMark caption="Signature fashion and elevated essentials" />
        <p className="max-w-xl text-sm leading-7 text-stone-600">{SITE_CONFIG.description}</p>
        <div className="flex flex-wrap gap-3">
          {BOUTIQUE_BENEFITS.map((benefit) => (
            <span
              key={benefit}
              className="rounded-full border border-sand bg-ivory px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-mocha/80"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-cocoa">Explore</h3>
          <div className="mt-4 space-y-2 text-sm text-stone-600">
            <Link to="/about" className="block transition hover:text-cocoa">
              About Elora
            </Link>
            <Link to="/products" className="block transition hover:text-cocoa">
              Shop collection
            </Link>
            <Link to="/contact" className="block transition hover:text-cocoa">
              Contact us
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-cocoa">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-stone-600">
            <p>{SITE_CONFIG.addressLine1}</p>
            <p>{SITE_CONFIG.addressLine2}</p>
            <p>{SITE_CONFIG.supportPhone}</p>
            <p>{SITE_CONFIG.supportEmail}</p>
          </div>
        </div>
        <div className="sm:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-cocoa">Fulfilment</h3>
          <div className="mt-4 space-y-2 text-sm text-stone-600">
            <p>Cash on delivery orders only</p>
            <p>Order updates managed from the admin dashboard</p>
          </div>
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
