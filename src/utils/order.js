export const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6)
  const randomChunk = Math.random().toString(36).slice(2, 6).toUpperCase()

  return `ELR-${timestamp}-${randomChunk}`
}

export const calculateCartSummary = (items = []) => {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = items.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,
    0,
  )

  return {
    items,
    itemCount,
    totalAmount,
  }
}
