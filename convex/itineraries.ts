// convex/itineraries.ts
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Get all itineraries
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('itineraries').collect()
  },
})

// Get single itinerary by logical id, with optional hydrated details
export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const it = await ctx.db
      .query('itineraries')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!it) return null

    // Hydrate client-friendly details (places, mealTypes, tags) for the page
    const [places, mealTypes, tags] = await Promise.all([
      ctx.db.query('places').collect(),
      ctx.db.query('mealTypes').collect(),
      ctx.db.query('tags').collect(),
    ])

    const schedule = it.schedule.map((day) => ({
      ...day,
      meals: day.meals
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((m) => {
          const place = places.find((p) => p.id === m.placeId)
          const mealType = mealTypes.find((mt) => mt.id === m.mealTypeId)
          const placeTags = (place?.tagIds || []).map((tid) => tags.find((t) => t.id === tid)).filter(Boolean)
          return { ...m, place, mealType, tags: placeTags }
        }),
    }))

    return { ...it, schedule }
  },
})

// Create a new itinerary
export const create = mutation({
  args: {
    id: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    days: v.number(),
    schedule: v.array(
      v.object({
        dayNumber: v.number(),
        meals: v.array(v.object({ placeId: v.string(), mealTypeId: v.string(), order: v.number() })),
      }),
    ),
  },
  handler: async (ctx, it) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('itineraries')
      .withIndex('byId', (q) => q.eq('id', it.id))
      .unique()
    if (existing) throw new Error('Itinerary with this id already exists')
    await ctx.db.insert('itineraries', it)
    return true
  },
})

// Update an existing itinerary
export const update = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    days: v.optional(v.number()),
    schedule: v.optional(
      v.array(
        v.object({
          dayNumber: v.number(),
          meals: v.array(v.object({ placeId: v.string(), mealTypeId: v.string(), order: v.number() })),
        }),
      ),
    ),
  },
  handler: async (ctx, { id, ...updates }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('itineraries')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) throw new Error('Itinerary not found')
    await ctx.db.patch(existing._id, updates)
    return true
  },
})

// Remove an itinerary
export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('itineraries')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) return false
    await ctx.db.delete(existing._id)
    return true
  },
})
