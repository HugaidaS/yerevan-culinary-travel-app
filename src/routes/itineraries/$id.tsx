import { createFileRoute, notFound } from '@tanstack/react-router'
import type { ItineraryWithDetails } from '@/shared/types.ts'

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
  // Or in a component
  component: Itinerary,
})

function Itinerary() {
  // In a component!
  const { data: itinerary } = Route.useLoaderData()
  const { id } = Route.useParams()

  return (
    <div>
      <h1>Itinerary {id}</h1>
      <p>{itinerary.name}</p>
      <p>{itinerary.description}</p>

      <p>{itinerary.days}</p>
      <div>
        {itinerary.schedule.map((day) => (
          <div>
            <p>{`Day: ${day.dayNumber}`}</p>
            {day.meals.map((meal) => (
              <div>
                <p>{`${meal.place.name}`}</p>
                <img src={meal.place.imageUrl} alt={meal.place.name} className="w-[200px]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
