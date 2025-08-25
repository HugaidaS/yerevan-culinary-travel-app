import { dbConnect } from './mongo'
import { TagModel } from './models/Tag'
import { MealTypeModel } from './models/MealType'
import { PlaceModel } from './models/Place'
import { ItineraryModel } from './models/Itinerary'
import type { Itinerary, ItineraryWithDetails, MealType, Place, Tag } from '@/shared/types.ts'

// Why lean():
// - Mongoose documents carry getters, methods, and heavy prototypes not needed by our API/UI.
// - lean() returns plain JSON objects, which are cheaper to create/serialize and safer to spread.
// Typing approach:
// - We call .lean<T>() to get fully typed plain objects and avoid any unknown casts.

// Return a single Place by its stable "id" (not _id). Returns null if missing.
export async function getPlaceById(id: string): Promise<Place | null> {
  await dbConnect()
  const doc = await PlaceModel.findOne({ id }).lean<Place>()
  return doc ?? null
}

// Return a single Tag by its stable "id". Returns null if missing.
export async function getTagById(id: string): Promise<Tag | null> {
  await dbConnect()
  const doc = await TagModel.findOne({ id }).lean<Tag>()
  return doc ?? null
}

// Return a single MealType by its stable "id". Returns null if missing.
export async function getMealTypeById(id: string): Promise<MealType | null> {
  await dbConnect()
  const doc = await MealTypeModel.findOne({ id }).lean<MealType>()
  return doc ?? null
}

// Return a single Itinerary by its stable "id". Returns null if missing.
export async function getItineraryById(id: string): Promise<Itinerary | null> {
  await dbConnect()
  const doc = await ItineraryModel.findOne({ id }).lean<Itinerary>()
  return doc ?? null
}

// List all Places. We return lean() objects and cast to domain type.
export async function getAllPlaces(): Promise<Array<Place>> {
  await dbConnect()
  const docs = await PlaceModel.find({}).lean<Array<Place>>()
  return docs
}

// List all Tags.
export async function getAllTags(): Promise<Array<Tag>> {
  await dbConnect()
  const docs = await TagModel.find({}).lean<Array<Tag>>()
  return docs
}

// List all MealTypes with a friendly default order (breakfast -> snack).
export async function getAllMealTypes(): Promise<Array<MealType>> {
  await dbConnect()
  const docs = await MealTypeModel.find({}).lean<Array<MealType>>()
  // Keep friendly order for defaults; unknowns go to end
  const getOrder = (id: string) =>
    (
      ({
        breakfast: 1,
        lunch: 2,
        dinner: 3,
        snack: 4,
      }) as Record<string, number>
    )[id] ?? 99
  return docs.sort((a, b) => getOrder(a.id) - getOrder(b.id))
}

// List all Itineraries.
export async function getAllItineraries(): Promise<Array<Itinerary>> {
  await dbConnect()
  const docs = await ItineraryModel.find({}).lean<Array<Itinerary>>()
  return docs
}

// Hydrate an itinerary into a UI-friendly shape: each meal has its Place,
// its MealType, and the Place's tags (looked up individually).
export async function getItineraryWithDetails(id: string): Promise<ItineraryWithDetails | null> {
  const itinerary = await getItineraryById(id)
  if (!itinerary) return null

  const scheduleWithDetails = [] as ItineraryWithDetails['schedule']

  for (const day of itinerary.schedule) {
    const mealsWithDetails = [] as Array<any>

    for (const meal of day.meals) {
      const place = await getPlaceById(meal.placeId)
      const mealType = await getMealTypeById(meal.mealTypeId)

      if (place && mealType) {
        // Get tags for the place (each tag fetched by id)
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

// Create a new Tag with unique logical id.
export async function createTag(input: Pick<Tag, 'id' | 'name'>): Promise<Tag> {
  await dbConnect()
  const tag = await TagModel.create(input)
  return tag.toObject() as Tag
}

// Update an existing Tag by logical id. Returns the updated tag.
export async function updateTag(id: string, updates: Partial<Pick<Tag, 'name'>>): Promise<Tag> {
  await dbConnect()
  const doc = await TagModel.findOneAndUpdate({ id }, updates, { new: true }).lean<Tag | null>()
  if (!doc) throw new Error('Tag not found')
  return doc
}

// Delete a Tag by logical id. Returns true if deleted.
export async function deleteTag(id: string): Promise<boolean> {
  await dbConnect()
  const res = await TagModel.deleteOne({ id })
  return res.deletedCount === 1
}

// Create a new MealType.
export async function createMealType(input: Pick<MealType, 'id' | 'name'>): Promise<MealType> {
  await dbConnect()
  const doc = await MealTypeModel.create(input)
  return doc.toObject() as MealType
}

// Update an existing MealType by logical id.
export async function updateMealType(id: string, updates: Partial<Pick<MealType, 'name'>>): Promise<MealType> {
  await dbConnect()
  const doc = await MealTypeModel.findOneAndUpdate({ id }, updates, { new: true }).lean<MealType | null>()
  if (!doc) throw new Error('Meal type not found')
  return doc
}

// Delete a MealType by logical id.
export async function deleteMealType(id: string): Promise<boolean> {
  await dbConnect()
  const res = await MealTypeModel.deleteOne({ id })
  return res.deletedCount === 1
}

// Create a new Place. tagIds/mealTypeIds are arrays of logical ids.
export async function createPlace(input: Place): Promise<Place> {
  await dbConnect()
  const doc = await PlaceModel.create(input)
  return doc.toObject() as Place
}

// Update an existing Place by logical id.
export async function updatePlace(id: string, updates: Partial<Place>): Promise<Place> {
  await dbConnect()
  const doc = await PlaceModel.findOneAndUpdate({ id }, updates, { new: true }).lean<Place | null>()
  if (!doc) throw new Error('Place not found')
  return doc
}

// Delete a Place by logical id.
export async function deletePlace(id: string): Promise<boolean> {
  await dbConnect()
  const res = await PlaceModel.deleteOne({ id })
  return res.deletedCount === 1
}

// Create a new Itinerary. Days and meals are embedded in the document.
export async function createItinerary(input: Itinerary): Promise<Itinerary> {
  await dbConnect()
  const doc = await ItineraryModel.create(input)
  return doc.toObject() as Itinerary
}

// Update an existing Itinerary by logical id.
export async function updateItinerary(id: string, updates: Partial<Itinerary>): Promise<Itinerary> {
  await dbConnect()
  const doc = await ItineraryModel.findOneAndUpdate({ id }, updates, { new: true }).lean<Itinerary | null>()
  if (!doc) throw new Error('Itinerary not found')
  return doc
}

// Delete an Itinerary by logical id.
export async function deleteItinerary(id: string): Promise<boolean> {
  await dbConnect()
  const res = await ItineraryModel.deleteOne({ id })
  return res.deletedCount === 1
}
