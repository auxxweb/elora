import { cn } from '../../utils/cn'
import { SITE_CONFIG } from '../../constants/site'

const BrandMark = ({
  className,
  imageClassName,
  titleClassName,
  captionClassName,
  caption,
  compact = false,
  hideTextOnMobile = false,
}) => (
  <div className={cn('flex items-center gap-3', compact ? 'gap-2.5' : 'gap-4', className)}>
    <img
      src="/elora-logo.png"
      alt={`${SITE_CONFIG.name} logo`}
      className={cn(
        'h-12 w-12 shrink-0 rounded-2xl border border-sand/70 bg-[#fcf7eb] p-1.5 object-contain shadow-soft',
        compact ? 'h-10 w-10' : 'h-14 w-14',
        imageClassName,
      )}
    />
    <div className={cn('min-w-0', hideTextOnMobile && 'hidden sm:block')}>
      <p className={cn('font-display text-3xl text-cocoa', compact && 'text-2xl', titleClassName)}>
        {SITE_CONFIG.name}
      </p>
      {(caption ?? SITE_CONFIG.tagline) ? (
        <p
          className={cn(
            'text-[11px] uppercase tracking-[0.32em] text-mocha/80',
            compact && 'tracking-[0.28em]',
            captionClassName,
          )}
        >
          {caption ?? SITE_CONFIG.tagline}
        </p>
      ) : null}
    </div>
  </div>
)

export default BrandMark
