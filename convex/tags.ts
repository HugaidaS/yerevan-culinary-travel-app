// convex/tags.ts
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Get all tags
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tags').collect()
  },
})

// Create a new tag
export const create = mutation({
  args: { id: v.string(), name: v.string() },
  handler: async (ctx, { id, name }) => {
    const existing = await ctx.db
      .query('tags')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (existing) throw new Error('Tag with this id already exists')
    await ctx.db.insert('tags', { id, name })
    return true
  },
})

// Update an existing tag
export const update = mutation({
  args: { id: v.string(), name: v.string() },
  handler: async (ctx, { id, name }) => {
    const existing = await ctx.db
      .query('tags')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) throw new Error('Tag not found')
    await ctx.db.patch(existing._id, { name })
    return true
  },
})

// Remove a tag
export const remove = mutation({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db
      .query('tags')
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (!existing) return false
    await ctx.db.delete(existing._id)
    return true
  },
})
