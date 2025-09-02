// convex/places.ts
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('places').collect()
  },
})

export const create = mutation({
  args: {
    id: v.string(),
    name: v.string(),
    lat: v.number(),
    lng: v.number(),
    address: v.string(),
    shortDescription: v.string(),
    longDescription: v.string(),
    factSnippet: v.string(),
    averageCheckUSD: v.number(),
    googleMapsUrl: v.string(),
    imageUrl: v.string(),
    tagIds: v.array(v.string()),
    mealTypeIds: v.array(v.string()),
  },
  handler: async (ctx, doc) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('places')
      .withIndex('byId', (q) => q.eq('id', doc.id))
      .unique()
    if (existing) throw new Error('Place with this id already exists')
    await ctx.db.insert('places', doc)
    return true
  },
})

export const update = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    address: v.string(),
    shortDescription: v.optional(v.string()),
    longDescription: v.optional(v.string()),
    factSnippet: v.optional(v.string()),
    averageCheckUSD: v.optional(v.number()),
    googleMapsUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    tagIds: v.optional(v.array(v.string())),
    mealTypeIds: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { id, ...updates }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('places')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) throw new Error('Place not found')
    await ctx.db.patch(existing._id, updates)
    return true
  },
})

export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db
      .query('places')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) return false
    await ctx.db.delete(existing._id)
    return true
  },
})
