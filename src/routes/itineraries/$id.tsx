import { createFileRoute } from '@tanstack/react-router'
import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'
import type { FunctionReturnType } from 'convex/server'
import { ItineraryPage } from '@/entities/itineraries/ui'

type ConvexItineraryWithDetails = FunctionReturnType<typeof api.itineraries.getById>

export const Route = createFileRoute('/itineraries/$id')({
  component: Itinerary,
})

function Itinerary() {
  const { id } = Route.useParams()
  const { data: itinerary } = useSuspenseQuery(convexQuery(api.itineraries.getById, { id }))

  if (!itinerary) return <div className="p-6">Itinerary not found.</div>
  return <ItineraryPage itinerary={itinerary as ConvexItineraryWithDetails} />
}
