import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiShoppingBag, FiX } from 'react-icons/fi'
import { STORE_NAV_LINKS } from '../../constants/site'
import { useCartStore } from '../../store/useCartStore'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../utils/cn'
import Container from '../common/Container'
import BrandMark from '../common/BrandMark'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const itemCount = useCartStore((state) => state.itemCount)
  const { isAdmin } = useAuth()

  const navigationLinks = [
    ...STORE_NAV_LINKS,
    { label: isAdmin ? 'Admin' : 'Login', href: isAdmin ? '/admin' : '/login' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-ivory/90 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <Link to="/" className="min-w-0 shrink-0">
          <BrandMark
            compact
            hideTextOnMobile
            caption="Luxury fashion house"
            imageClassName="h-10 w-10 sm:h-10 sm:w-10"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium text-stone-600 transition hover:text-cocoa',
                  isActive && 'text-cocoa',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-3 py-2 text-sm font-semibold text-cocoa transition hover:-translate-y-0.5 sm:px-4"
          >
            <FiShoppingBag />
            <span>{itemCount}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white text-cocoa md:hidden"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div className="border-t border-sand bg-white md:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-stone-700"
              >
                {link.label}
              </NavLink>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
