const EmptyState = ({ title, description, action }) => (
  <div className="rounded-[2rem] border border-sand bg-white/80 p-8 text-center shadow-soft">
    <h3 className="font-display text-2xl text-cocoa">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
)

export default EmptyState
