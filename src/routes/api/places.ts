// app/routes/api/places.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, Place } from '@/shared/types.ts'
import { createPlace, deletePlace, getAllPlaces, updatePlace } from '@/shared/integrations/db/queries.ts'

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
  POST: async ({ request }) => {
    try {
      const body = (await request.json()) as Place
      const created = await createPlace(body)
      return new Response(JSON.stringify({ data: created, success: true } as ApiResponse<Place>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error creating place:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  PATCH: async ({ request }) => {
    try {
      const body = (await request.json()) as Partial<Place> & { id: string }
      const updated = await updatePlace(body.id, body)
      return new Response(JSON.stringify({ data: updated, success: true } as ApiResponse<Place>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error updating place:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  DELETE: async ({ request }) => {
    try {
      const body = (await request.json()) as { id: string }
      const ok = await deletePlace(body.id)
      if (!ok) {
        return new Response(JSON.stringify({ data: null, success: false, error: 'Place not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ data: true, success: true } as ApiResponse<boolean>), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error deleting place:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})
