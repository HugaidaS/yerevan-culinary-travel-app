import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model, models } = mongoose

export interface MealTypeDoc extends Document {
  id: string
  name: string
}

const MealTypeSchema = new Schema<MealTypeDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
)

const ExistingMealTypeModel = (models as any).MealType as Model<MealTypeDoc> | undefined
export const MealTypeModel = ExistingMealTypeModel ?? model<MealTypeDoc>('MealType', MealTypeSchema)
