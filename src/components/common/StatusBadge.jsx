import { cn } from '../../utils/cn'

const variants = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-sky-100 text-sky-800',
  shipped: 'bg-violet-100 text-violet-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-rose-100 text-rose-700',
  featured: 'bg-cocoa text-white',
  stock: 'bg-emerald-100 text-emerald-700',
  out: 'bg-rose-100 text-rose-700',
}

const StatusBadge = ({ children, status = 'pending', className }) => (
  <span
    className={cn(
      'inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize tracking-wide',
      variants[status] ?? 'bg-stone-100 text-stone-700',
      className,
    )}
  >
    {children}
  </span>
)

export default StatusBadge
