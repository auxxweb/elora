import { cn } from '../../utils/cn'

const SectionHeading = ({ eyebrow, title, description, align = 'left', action }) => (
  <div
    className={cn(
      'mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
      align === 'center' && 'items-center text-center md:flex-col md:items-center',
    )}
  >
    <div className="max-w-2xl space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mocha/80">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl text-cocoa sm:text-4xl">{title}</h2>
      {description ? <p className="text-sm leading-7 text-stone-600 sm:text-base">{description}</p> : null}
    </div>
    {action}
  </div>
)

export default SectionHeading
