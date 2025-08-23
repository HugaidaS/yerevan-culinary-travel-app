import { Calendar, Coffee, Cookie, Leaf, Star, Utensils, Wine } from 'lucide-react'

export const getTagIcon = (tagName: string) => {
  const tag = tagName.toLowerCase()
  switch (tag) {
    case 'coffee':
      return Coffee
    case 'breakfast':
    case 'lunch':
    case 'dinner':
      return Utensils
    case 'sweets':
    case 'snack':
      return Cookie
    case 'lightmeal':
      return Leaf
    case 'heavyfood':
      return Utensils
    case 'streetfood':
      return Star
    case 'historic':
      return Calendar
    case 'evening':
    case 'bestatnight':
      return Wine
    default:
      return Star
  }
}

export const getTagColor = (tagName: string) => {
  const tag = tagName.toLowerCase()
  switch (tag) {
    case 'coffee':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'breakfast':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'lunch':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'dinner':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'sweets':
    case 'snack':
      return 'bg-pink-100 text-pink-800 border-pink-200'
    case 'lightmeal':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'heavyfood':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'streetfood':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'historic':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'evening':
    case 'bestatnight':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    case 'veganfriendly':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'requiresbooking':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
