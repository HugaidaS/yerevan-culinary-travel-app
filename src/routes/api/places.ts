// app/routes/api/places.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, Place } from '@/shared/types.ts'
import { getAllPlaces } from '@/shared/integrations/db/queries.ts'

export const ServerRoute = createServerFileRoute('/api/places').methods({
  GET: async () => {
    try {
      const places = await getAllPlaces()

      return new Response(
        JSON.stringify({
          data: places,
          success: true,
        } as ApiResponse<Array<Place>>),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error('Error fetching places:', error)
      return new Response(
        JSON.stringify({
          data: [],
          success: false,
          error: 'Internal server error',
        } as ApiResponse<Array<Place>>),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  },
})
