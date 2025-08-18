// app/routes/api/meal-types.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, MealType } from '@/shared/types.ts'
import { getAllMealTypes } from '@/shared/integrations/db/queries.ts'

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
})
