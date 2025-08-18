export interface Place {
  id: string
  name: string
  lat: number
  lng: number
  shortDescription: string
  longDescription: string
  factSnippet: string
  averageCheckUSD: number
  googleMapsUrl: string
  imageUrl: string
  tagIds: Array<string> // References to Tag.id
  mealTypeIds: Array<string> // References to MealType.id - what meals this place serves
  createdAt?: Date
  updatedAt?: Date
}

export interface Tag {
  id: string
  name: string // e.g., "coffee", "breakfast", "historic"
  createdAt?: Date
  updatedAt?: Date
}

export interface MealType {
  id: string // e.g., "breakfast", "lunch", "dinner", "snack"
  name: string // e.g., "Breakfast", "Lunch", "Dinner", "Snack"
  createdAt?: Date
  updatedAt?: Date
}

export interface Itinerary {
  id: string
  name: string
  description?: string
  days: number // Number of days (1, 3, 7, etc)
  schedule: Array<ItineraryDay> // Array of days with places and meal types
  createdAt?: Date
  updatedAt?: Date
}

export interface ItineraryDay {
  dayNumber: number
  meals: Array<ItineraryMeal>
}

export interface ItineraryMeal {
  placeId: string // References Place.id
  mealTypeId: string // References MealType.id
  order: number // Order within the day
}

// DTOs for frontend consumption
export interface PlaceWithDetails extends Place {
  tags: Array<Tag>
  mealTypes: Array<MealType>
}

export interface ItineraryMealWithDetails extends ItineraryMeal {
  place: Place
  mealType: MealType
  tags: Array<Tag>
}

export interface ItineraryDayWithDetails extends ItineraryDay {
  meals: Array<ItineraryMealWithDetails>
}

export interface ItineraryWithDetails extends Itinerary {
  schedule: Array<ItineraryDayWithDetails>
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

// Map location for displaying on a map
export interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  description: string
}
