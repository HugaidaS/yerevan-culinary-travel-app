import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model, models } = mongoose

export interface PlaceDoc extends Document {
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
  tagIds: Array<string>
  mealTypeIds: Array<string>
}

const PlaceSchema = new Schema<PlaceDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lat: Number,
    lng: Number,
    shortDescription: String,
    longDescription: String,
    factSnippet: String,
    averageCheckUSD: Number,
    googleMapsUrl: String,
    imageUrl: String,
    tagIds: [{ type: String, ref: 'Tag' }],
    mealTypeIds: [{ type: String, ref: 'MealType' }],
  },
  { timestamps: true },
)

const ExistingPlaceModel = (models as any).Place as Model<PlaceDoc> | undefined
export const PlaceModel = ExistingPlaceModel ?? model<PlaceDoc>('Place', PlaceSchema)
