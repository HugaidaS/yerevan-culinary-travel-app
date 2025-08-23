export const getMealTypeColor = (mealTypeName: string) => {
  const mealType = mealTypeName.toLowerCase()
  switch (mealType) {
    case 'breakfast':
      return 'text-yellow-600'
    case 'lunch':
      return 'text-orange-600'
    case 'dinner':
      return 'text-red-600'
    case 'snack':
      return 'text-pink-600'
    default:
      return 'text-gray-600'
  }
}

export const getMealTypeBorderColor = (mealTypeName: string) => {
  const mealType = mealTypeName.toLowerCase()
  switch (mealType) {
    case 'breakfast':
      return 'border-yellow-400'
    case 'lunch':
      return 'border-orange-400'
    case 'dinner':
      return 'border-red-400'
    case 'snack':
      return 'border-pink-400'
    default:
      return 'border-gray-400'
  }
}
