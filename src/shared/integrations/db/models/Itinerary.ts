import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model, models } = mongoose

export interface ItineraryMealDoc {
  placeId: string
  mealTypeId: string
  order: number
}

export interface ItineraryDayDoc {
  dayNumber: number
  meals: Array<ItineraryMealDoc>
}

export interface ItineraryDoc extends Document {
  id: string
  name: string
  description?: string
  days: number
  schedule: Array<ItineraryDayDoc>
}

const ItineraryMealSchema = new Schema<ItineraryMealDoc>({
  placeId: { type: String, ref: 'Place', required: true },
  mealTypeId: { type: String, ref: 'MealType', required: true },
  order: Number,
})

const ItineraryDaySchema = new Schema<ItineraryDayDoc>({
  dayNumber: Number,
  meals: [ItineraryMealSchema],
})

const ItinerarySchema = new Schema<ItineraryDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    days: Number,
    schedule: [ItineraryDaySchema],
  },
  { timestamps: true },
)

const ExistingItineraryModel = (models as any).Itinerary as Model<ItineraryDoc> | undefined
export const ItineraryModel = ExistingItineraryModel ?? model<ItineraryDoc>('Itinerary', ItinerarySchema)
