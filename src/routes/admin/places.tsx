import { Link, createFileRoute } from '@tanstack/react-router'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from '../../../convex/_generated/api'
import type { Place } from '@/shared/types.ts'
import { Button, Card, Input, Label, Textarea } from '@/shared/ui'

export const Route = createFileRoute('/admin/places')({
  component: PlacesPage,
})

function PlacesPage() {
  const { data: places } = useSuspenseQuery(convexQuery(api.places.getAll, {}))

  const { mutate: createPlace, isPending: isCreating } = useMutation({
    mutationFn: useConvexMutation(api.places.create),
  })
  const { mutate: removePlace, isPending: isDeleting } = useMutation({
    mutationFn: useConvexMutation(api.places.remove),
  })

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value.trim()
    const id = get('id')
    const name = get('name')
    const lat = parseFloat(get('lat') || '')
    const lng = parseFloat(get('lng') || '')
    const shortDescription = get('shortDescription')
    const longDescription = get('longDescription')
    const factSnippet = get('factSnippet')
    const averageCheckUSD = parseFloat(get('averageCheckUSD') || '')
    const googleMapsUrl = get('googleMapsUrl')
    const imageUrl = get('imageUrl')
    if (!id || !name || Number.isNaN(lat) || Number.isNaN(lng) || Number.isNaN(averageCheckUSD)) return
    const place: Place = {
      id,
      name,
      lat,
      lng,
      shortDescription,
      longDescription,
      factSnippet,
      averageCheckUSD,
      googleMapsUrl,
      imageUrl,
      tagIds: [],
      mealTypeIds: [],
    }
    createPlace(place)
    form.reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Places</h2>
      </div>

      <Card className="p-4 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {places.map((p: any) => (
            <div key={p.id} className="border rounded overflow-hidden">
              <div
                className="aspect-video bg-muted"
                style={{ backgroundImage: `url(${p.imageUrl})`, backgroundSize: 'cover' }}
              />
              <div className="p-3 space-y-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{p.shortDescription}</div>
                <div className="text-xs text-muted-foreground">Avg check: ${p.averageCheckUSD}</div>
                <div className="flex gap-2 pt-2">
                  <a href={p.googleMapsUrl} target="_blank" rel="noreferrer" className="text-xs underline">
                    Map
                  </a>
                  <Link to={'/itineraries/$id'} params={{ id: 'yerevan-1day' }} className="text-xs underline">
                    View sample itinerary
                  </Link>
                </div>
                <div className="pt-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePlace({ id: p.id })}
                    disabled={isDeleting}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="font-medium">Add new place (minimal)</h3>
        <form onSubmit={handleAdd} className="grid gap-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="id">ID</Label>
              <Input id="id" name="id" placeholder="e.g. new_place_id" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Place name" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="lat">Lat</Label>
              <Input id="lat" name="lat" placeholder="40.18" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lng">Lng</Label>
              <Input id="lng" name="lng" placeholder="44.51" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="averageCheckUSD">Average Check (USD)</Label>
              <Input id="averageCheckUSD" name="averageCheckUSD" placeholder="15" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
              <Input id="googleMapsUrl" name="googleMapsUrl" placeholder="https://maps.app..." />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input id="shortDescription" name="shortDescription" placeholder="Short text" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea id="longDescription" name="longDescription" placeholder="Long text" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="factSnippet">Fact Snippet</Label>
            <Input id="factSnippet" name="factSnippet" placeholder="Fun fact" />
          </div>
          <Button type="submit" disabled={isCreating}>
            Add place
          </Button>
        </form>
      </Card>
    </div>
  )
}
