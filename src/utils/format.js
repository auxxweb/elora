export const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)

export const formatDate = (value) => {
  if (!value) return '--'

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export const truncateText = (value = '', maxLength = 120) => {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength).trim()}...`
}
