export const getPriceTag = (price: number) => {
  if (price <= 8) return { label: 'Budget', color: 'bg-green-100 text-green-800 border-green-200' }
  if (price <= 15) return { label: 'Mid-range', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
  return { label: 'Premium', color: 'bg-red-100 text-red-800 border-red-200' }
}
