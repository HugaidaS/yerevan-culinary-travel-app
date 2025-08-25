import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model, models } = mongoose

export interface TagDoc extends Document {
  id: string
  name: string
}

const TagSchema = new Schema<TagDoc>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
)

// Avoid OverwriteModelError in dev by reusing compiled model if present.
const ExistingTagModel = (models as any).Tag as Model<TagDoc> | undefined
export const TagModel = ExistingTagModel ?? model<TagDoc>('Tag', TagSchema)
