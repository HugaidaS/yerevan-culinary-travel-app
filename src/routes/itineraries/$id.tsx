import { createFileRoute, notFound } from '@tanstack/react-router'
import type { ItineraryWithDetails } from '@/shared/types.ts'
import { ItineraryPage } from '@/entities/itineraries/ui'

async function getItinerary(params: { id: string }): Promise<{
  data: ItineraryWithDetails
}> {
  const res = await fetch(`/api/itinerary/${params.id}`)

  if (!res.ok) {
    throw notFound()
  }

  return await res.json()
}

export const Route = createFileRoute('/itineraries/$id')({
  loader: ({ params }) =>
    getItinerary({
      id: params.id,
    }),
  component: Itinerary,
})

function Itinerary() {
  const { data: itinerary } = Route.useLoaderData()

  return <ItineraryPage itinerary={itinerary} />
}
