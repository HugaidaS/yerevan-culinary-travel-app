// app/routes/api/itinerary/$duration.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, ItineraryWithDetails } from '@/shared/types.ts'
import { getItineraryWithDetails } from '@/shared/integrations/db/queries.ts'

export const ServerRoute = createServerFileRoute('/api/itinerary/$id').methods({
  GET: async ({ params }) => {
    try {
      const { id } = params
      const itinerary = await getItineraryWithDetails(id)

      if (!itinerary) {
        return new Response(
          JSON.stringify({
            data: null,
            success: false,
            error: 'Itinerary not found',
          } as ApiResponse<ItineraryWithDetails | null>),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      return new Response(
        JSON.stringify({
          data: itinerary,
          success: true,
        } as ApiResponse<ItineraryWithDetails>),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error('Error fetching itinerary:', error)
      return new Response(
        JSON.stringify({
          data: null,
          success: false,
          error: 'Internal server error',
        } as ApiResponse<ItineraryWithDetails | null>),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  },
})
