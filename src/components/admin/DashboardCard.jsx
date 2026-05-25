const DashboardCard = ({ label, value, helper }) => (
  <div className="rounded-[2rem] border border-sand bg-white p-6 shadow-soft">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mocha/75">{label}</p>
    <p className="mt-4 font-display text-4xl text-cocoa">{value}</p>
    {helper ? <p className="mt-2 text-sm text-stone-600">{helper}</p> : null}
  </div>
)

export default DashboardCard
