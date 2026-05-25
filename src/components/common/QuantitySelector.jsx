const QuantitySelector = ({
  quantity,
  onDecrease,
  onIncrease,
  disabledDecrease = false,
  disabledIncrease = false,
}) => (
  <div className="inline-flex items-center rounded-full border border-sand bg-white">
    <button
      type="button"
      onClick={onDecrease}
      disabled={disabledDecrease}
      className="rounded-l-full px-4 py-2 text-lg text-cocoa transition hover:bg-blush disabled:cursor-not-allowed disabled:opacity-40"
    >
      -
    </button>
    <span className="min-w-12 text-center text-sm font-semibold text-cocoa">{quantity}</span>
    <button
      type="button"
      onClick={onIncrease}
      disabled={disabledIncrease}
      className="rounded-r-full px-4 py-2 text-lg text-cocoa transition hover:bg-blush disabled:cursor-not-allowed disabled:opacity-40"
    >
      +
    </button>
  </div>
)

export default QuantitySelector
