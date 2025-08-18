// lib/database/queries.ts
import { itineraries, mealTypes, places, tags } from './db'
import type { Itinerary, ItineraryWithDetails, MealType, Place, Tag } from '@/shared/types.ts'

// Basic CRUD operations
export async function getPlaceById(id: string): Promise<Place | null> {
  return places.find((p) => p.id === id) || null
}

export async function getTagById(id: string): Promise<Tag | null> {
  return tags.find((t) => t.id === id) || null
}

export async function getMealTypeById(id: string): Promise<MealType | null> {
  return mealTypes.find((mt) => mt.id === id) || null
}

export async function getItineraryById(id: string): Promise<Itinerary | null> {
  return itineraries.find((i) => i.id === id) || null
}

// List operations
export async function getAllPlaces(): Promise<Array<Place>> {
  return places
}

export async function getAllTags(): Promise<Array<Tag>> {
  return tags
}

export async function getAllMealTypes(): Promise<Array<MealType>> {
  // Return in logical order: breakfast, lunch, dinner, snack
  const orderMap = { breakfast: 1, lunch: 2, dinner: 3, snack: 4 }
  return mealTypes.sort(
    (a, b) => (orderMap[a.id as keyof typeof orderMap] || 99) - (orderMap[b.id as keyof typeof orderMap] || 99),
  )
}

export async function getAllItineraries(): Promise<Array<Itinerary>> {
  return itineraries
}

export async function getItineraryWithDetails(id: string): Promise<ItineraryWithDetails | null> {
  const itinerary = await getItineraryById(id)
  if (!itinerary) return null

  const scheduleWithDetails = []

  for (const day of itinerary.schedule) {
    const mealsWithDetails = []

    for (const meal of day.meals) {
      const place = await getPlaceById(meal.placeId)
      const mealType = await getMealTypeById(meal.mealTypeId)

      if (place && mealType) {
        // Get tags for the place
        const placeTags: Array<Tag> = []
        for (const tagId of place.tagIds) {
          const tag = await getTagById(tagId)
          if (tag) placeTags.push(tag)
        }

        mealsWithDetails.push({
          ...meal,
          place,
          mealType,
          tags: placeTags,
        })
      }
    }

    scheduleWithDetails.push({
      ...day,
      meals: mealsWithDetails,
    })
  }

  return {
    ...itinerary,
    schedule: scheduleWithDetails,
  }
}
