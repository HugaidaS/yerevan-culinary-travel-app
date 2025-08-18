// app/routes/api/tags.ts
import { createServerFileRoute } from '@tanstack/react-start/server'
import type { ApiResponse, Tag } from '@/shared/types.ts'
import { getAllTags } from '@/shared/integrations/db/queries.ts'

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
})
