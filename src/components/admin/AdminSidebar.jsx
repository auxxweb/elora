import { NavLink } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { ADMIN_NAV_LINKS } from '../../constants/site'
import { cn } from '../../utils/cn'
import BrandMark from '../common/BrandMark'

const AdminSidebar = ({ open, onClose }) => (
  <>
    <div
      className={cn(
        'fixed inset-0 z-40 bg-cocoa/30 backdrop-blur-sm transition md:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      onClick={onClose}
      aria-hidden="true"
    />

    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sand bg-white p-6 shadow-soft transition md:static md:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <BrandMark compact caption="Admin panel" />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand md:hidden"
        >
          <FiX />
        </button>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {ADMIN_NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            onClick={onClose}
            end={link.href === '/admin'}
            className={({ isActive }) =>
              cn(
                'rounded-2xl px-4 py-3 text-sm font-medium text-stone-600 transition hover:bg-ivory hover:text-cocoa',
                isActive && 'bg-ivory text-cocoa shadow-soft',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  </>
)

export default AdminSidebar
