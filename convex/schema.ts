// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  tags: defineTable({
    id: v.string(),
    name: v.string(),
  })
    .index('byId', ['id'])
    .index('byName', ['name']),

  mealTypes: defineTable({
    id: v.string(),
    name: v.string(),
  }).index('byId', ['id']),

  places: defineTable({
    id: v.string(),
    name: v.string(),
    lat: v.number(),
    lng: v.number(),
    shortDescription: v.string(),
    longDescription: v.string(),
    factSnippet: v.string(),
    averageCheckUSD: v.number(),
    googleMapsUrl: v.string(),
    imageUrl: v.string(),
    tagIds: v.array(v.string()),
    mealTypeIds: v.array(v.string()),
  }).index('byId', ['id']),

  itineraries: defineTable({
    id: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    days: v.number(),
    schedule: v.array(
      v.object({
        dayNumber: v.number(),
        meals: v.array(
          v.object({
            placeId: v.string(),
            mealTypeId: v.string(),
            order: v.number(),
          }),
        ),
      }),
    ),
  }).index('byId', ['id']),
})
