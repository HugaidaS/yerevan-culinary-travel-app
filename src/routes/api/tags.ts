// app/routes/api/tags.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, Tag } from '@/shared/types.ts'
import { createTag, deleteTag, getAllTags, updateTag } from '@/shared/integrations/db/queries.ts'

export const ServerRoute = createServerFileRoute('/api/tags').methods({
  GET: async () => {
    try {
      const tags = await getAllTags()

      return new Response(
        JSON.stringify({
          data: tags,
          success: true,
        } as ApiResponse<Array<Tag>>),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error) {
      console.error('Error fetching tags:', error)
      return new Response(
        JSON.stringify({
          data: [],
          success: false,
          error: 'Internal server error',
        } as ApiResponse<Array<Tag>>),
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
      const tag = await createTag({ id: body.id, name: body.name })
      return new Response(JSON.stringify({ data: tag, success: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error creating tag:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  PATCH: async ({ request }) => {
    try {
      const body = (await request.json()) as { id: string; name?: string }
      const updated = await updateTag(body.id, { name: body.name })
      return new Response(JSON.stringify({ data: updated, success: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error updating tag:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  DELETE: async ({ request }) => {
    try {
      const body = (await request.json()) as { id: string }
      const ok = await deleteTag(body.id)
      if (!ok) {
        return new Response(JSON.stringify({ data: null, success: false, error: 'Tag not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response(JSON.stringify({ data: true, success: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Error deleting tag:', error)
      return new Response(JSON.stringify({ data: null, success: false, error: (error as Error).message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})
