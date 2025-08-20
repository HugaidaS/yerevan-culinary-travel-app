// app/routes/api/place/$duration.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, Place } from '@/shared/types.ts'
import { getPlaceById } from '@/shared/integrations/db/queries.ts'

// TODO: add validators later
export const ServerRoute = createServerFileRoute('/api/place/$id').methods({
  GET: async ({ params }) => {
    try {
      const { id } = params as { id: string }
      const place = await getPlaceById(id)

      if (!place) {
        return new Response(
          JSON.stringify({
            data: null,
            success: false,
            error: 'Place not found',
          } as ApiResponse<Place | null>),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      return new Response(
        JSON.stringify({
          data: place,
          success: true,
        } as ApiResponse<Place>),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error('Error fetching place:', error)
      return new Response(
        JSON.stringify({
          data: null,
          success: false,
          error: 'Internal server error',
        } as ApiResponse<Place | null>),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  },
})
