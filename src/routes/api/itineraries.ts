// app/routes/api/itineraries.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, Itinerary } from '@/shared/types.ts'
import { getAllItineraries } from '@/shared/integrations/db/queries.ts'

export const ServerRoute = createServerFileRoute('/api/itineraries').methods({
  GET: async () => {
    try {
      const itineraries = await getAllItineraries()

      return new Response(
        JSON.stringify({
          data: itineraries,
          success: true,
        } as ApiResponse<Array<Itinerary>>),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error('Error fetching itineraries:', error)
      return new Response(
        JSON.stringify({
          data: [],
          success: false,
          error: 'Internal server error',
        } as ApiResponse<Array<Itinerary>>),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  },
})
