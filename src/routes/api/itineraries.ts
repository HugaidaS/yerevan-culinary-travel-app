import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, Itinerary } from '@/shared/types.ts'
import {
  createItinerary,
  deleteItinerary,
  getAllItineraries,
  updateItinerary,
} from '@/shared/integrations/db/queries.ts'

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
  POST: async ({ request }) => {
    try {
      const body = (await request.json()) as Itinerary
      const created = await createItinerary(body)
      return new Response(JSON.stringify({ data: created, success: true } as ApiResponse<Itinerary>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error creating itinerary:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  PATCH: async ({ request }) => {
    try {
      const body = (await request.json()) as Partial<Itinerary> & { id: string }
      const updated = await updateItinerary(body.id, body)
      return new Response(JSON.stringify({ data: updated, success: true } as ApiResponse<Itinerary>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error updating itinerary:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  DELETE: async ({ request }) => {
    try {
      const body = (await request.json()) as { id: string }
      const ok = await deleteItinerary(body.id)
      if (!ok) {
        return new Response(JSON.stringify({ data: null, success: false, error: 'Itinerary not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ data: true, success: true } as ApiResponse<boolean>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error deleting itinerary:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})
