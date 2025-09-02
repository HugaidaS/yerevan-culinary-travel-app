// convex/mealTypes.ts
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Get all meal types
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('mealTypes').collect()
  },
})

// Create a new meal type
export const create = mutation({
  args: { id: v.string(), name: v.string() },
  handler: async (ctx, { id, name }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('mealTypes')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (existing) throw new Error('Meal type with this id already exists')
    await ctx.db.insert('mealTypes', { id, name })
    return true
  },
})

// Update an existing meal type
export const update = mutation({
  args: { id: v.string(), name: v.string() },
  handler: async (ctx, { id, name }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('mealTypes')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) throw new Error('Meal type not found')
    await ctx.db.patch(existing._id, { name })
    return true
  },
})

// Remove a meal type
export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error('Unauthenticated call to mutation')
    }

    const existing = await ctx.db
      .query('mealTypes')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) return false
    await ctx.db.delete(existing._id)
    return true
  },
})
