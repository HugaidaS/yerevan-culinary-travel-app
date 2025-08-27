import { internalMutation } from './_generated/server'
import { itineraries, mealTypes, places, tags } from './db'

// Seed Convex with initial data from our mock arrays
// Run: npx convex run init
export default internalMutation(async (ctx) => {
  // Import here to avoid bundling these arrays unless the seed runs

  // Upsert helper
  const upsert = async (table: 'mealTypes' | 'tags' | 'places' | 'itineraries', id: string, doc: any) => {
    const existing = await ctx.db
      .query(table)
      .withIndex('byId', (q) => q.eq('id', id))
      .unique()
    if (existing) {
      await ctx.db.patch(existing._id, doc)
    } else {
      await ctx.db.insert(table, doc)
    }
  }

  // Seed meal types
  for (const mt of mealTypes) {
    await upsert('mealTypes', mt.id, { id: mt.id, name: mt.name })
  }

  // Seed tags
  for (const t of tags) {
    await upsert('tags', t.id, { id: t.id, name: t.name })
  }

  // Seed places
  for (const p of places) {
    await upsert('places', p.id, {
      id: p.id,
      name: p.name,
      lat: p.lat,
      lng: p.lng,
      shortDescription: p.shortDescription,
      longDescription: p.longDescription,
      factSnippet: p.factSnippet,
      averageCheckUSD: p.averageCheckUSD,
      googleMapsUrl: p.googleMapsUrl,
      imageUrl: p.imageUrl,
      tagIds: p.tagIds,
      mealTypeIds: p.mealTypeIds,
    })
  }

  // Seed itineraries
  for (const it of itineraries) {
    await upsert('itineraries', it.id, {
      id: it.id,
      name: it.name,
      description: it.description,
      days: it.days,
      schedule: it.schedule.map(
        (d: { dayNumber: number; meals: Array<{ placeId: string; mealTypeId: string; order: number }> }) => ({
          dayNumber: d.dayNumber,
          meals: d.meals.map((m: { placeId: string; mealTypeId: string; order: number }) => ({
            placeId: m.placeId,
            mealTypeId: m.mealTypeId,
            order: m.order,
          })),
        }),
      ),
    })
  }

  return true
})
