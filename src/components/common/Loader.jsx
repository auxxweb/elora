const Loader = ({ label = 'Loading...' }) => (
  <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[2rem] border border-sand bg-white/70 p-8 shadow-soft">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-sand border-t-mocha" />
    <p className="text-sm text-stone-600">{label}</p>
  </div>
)

export default Loader
