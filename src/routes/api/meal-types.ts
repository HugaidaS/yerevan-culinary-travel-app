// app/routes/api/meal-types.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, MealType } from '@/shared/types.ts'
import { createMealType, deleteMealType, getAllMealTypes, updateMealType } from '@/shared/integrations/db/queries.ts'

export const ServerRoute = createServerFileRoute('/api/meal-types').methods({
  GET: async () => {
    try {
      const mealTypes = await getAllMealTypes()

      return new Response(
        JSON.stringify({
          data: mealTypes,
          success: true,
        } as ApiResponse<Array<MealType>>),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error('Error fetching meal types:', error)
      return new Response(
        JSON.stringify({
          data: [],
          success: false,
          error: 'Internal server error',
        } as ApiResponse<Array<MealType>>),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  },
  POST: async ({ request }) => {
    try {
      const body = (await request.json()) as { id: string; name: string }
      const created = await createMealType({ id: body.id, name: body.name })
      return new Response(JSON.stringify({ data: created, success: true } as ApiResponse<MealType>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error creating meal type:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  PATCH: async ({ request }) => {
    try {
      const body = (await request.json()) as { id: string; name?: string }
      const updated = await updateMealType(body.id, { name: body.name })
      return new Response(JSON.stringify({ data: updated, success: true } as ApiResponse<MealType>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error updating meal type:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  DELETE: async ({ request }) => {
    try {
      const body = (await request.json()) as { id: string }
      const ok = await deleteMealType(body.id)
      if (!ok) {
        return new Response(JSON.stringify({ data: null, success: false, error: 'Meal type not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ data: true, success: true } as ApiResponse<boolean>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error deleting meal type:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})
