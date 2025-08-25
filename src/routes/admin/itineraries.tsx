import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as React from 'react'
import type { ApiResponse, Itinerary, MealType, Place, Tag } from '@/shared/types.ts'
import { Button, Card, Input, Label, Textarea } from '@/shared/ui'

export const Route = createFileRoute('/admin/itineraries')({
  component: ItinerariesPage,
})

function ItinerariesPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'itineraries'],
    queryFn: async () => {
      const res = await fetch('/api/itineraries')
      return (await res.json()) as ApiResponse<Array<Itinerary>>
    },
  })

  const { data: placesData } = useQuery({
    queryKey: ['admin', 'places'],
    queryFn: async () => {
      const res = await fetch('/api/places')
      return (await res.json()) as ApiResponse<Array<Place>>
    },
  })

  const { data: mealTypesData } = useQuery({
    queryKey: ['admin', 'meal-types'],
    queryFn: async () => {
      const res = await fetch('/api/meal-types')
      return (await res.json()) as ApiResponse<Array<MealType>>
    },
  })

  const { data: tagsData } = useQuery({
    queryKey: ['admin', 'tags'],
    queryFn: async () => {
      const res = await fetch('/api/tags')
      return (await res.json()) as ApiResponse<Array<Tag>>
    },
  })

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/itineraries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      return (await res.json()) as ApiResponse<boolean>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'itineraries'] }),
  })

  const createMut = useMutation({
    mutationFn: async (it: Itinerary) => {
      const res = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(it),
      })
      return (await res.json()) as ApiResponse<Itinerary>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'itineraries'] }),
  })

  const patchMut = useMutation({
    mutationFn: async (it: Itinerary) => {
      const res = await fetch('/api/itineraries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(it),
      })
      return (await res.json()) as ApiResponse<Itinerary>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'itineraries'] }),
  })

  // Builder state
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [itineraryId, setItineraryId] = React.useState('')
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [days, setDays] = React.useState<number>(1)
  const [schedule, setSchedule] = React.useState<Array<Array<{ placeId: string; mealTypeId: string }>>>([[]])

  // Sync schedule length with days
  React.useEffect(() => {
    setSchedule((prev) => {
      const copy = prev.slice(0, days)
      while (copy.length < days) copy.push([])
      return copy
    })
  }, [days])

  function loadForEdit(it: Itinerary) {
    setEditingId(it.id)
    setItineraryId(it.id)
    setName(it.name)
    setDescription(it.description || '')
    setDays(it.days)
    const sched: Array<Array<{ placeId: string; mealTypeId: string }>> = []
    for (let d = 1; d <= it.days; d++) {
      const day = it.schedule.find((dd) => dd.dayNumber === d)
      sched.push(
        (day?.meals || [])
          .sort((a, b) => a.order - b.order)
          .map((m) => ({ placeId: m.placeId, mealTypeId: m.mealTypeId })),
      )
    }
    setSchedule(sched)
  }

  function resetForm() {
    setEditingId(null)
    setItineraryId('')
    setName('')
    setDescription('')
    setDays(1)
    setSchedule([[]])
  }

  function handleAddMeal(dayIndex: number) {
    setSchedule((prev) => {
      const next = [...prev]
      next[dayIndex] = [...next[dayIndex], { placeId: '', mealTypeId: '' }]
      return next
    })
  }

  function handleRemoveMeal(dayIndex: number, mealIndex: number) {
    setSchedule((prev) => {
      const next = [...prev]
      next[dayIndex] = next[dayIndex].filter((_, i) => i !== mealIndex)
      return next
    })
  }

  function handleChangeMeal(dayIndex: number, mealIndex: number, field: 'placeId' | 'mealTypeId', value: string) {
    setSchedule((prev) => {
      const next = prev.map((day, di) =>
        di === dayIndex ? day.map((meal, mi) => (mi === mealIndex ? { ...meal, [field]: value } : meal)) : day,
      )
      return next
    })
  }

  function buildItinerary(): Itinerary | null {
    if (!itineraryId || !name || !Number.isInteger(days) || days <= 0) return null
    const built: Itinerary = {
      id: itineraryId,
      name,
      description: description || undefined,
      days,
      schedule: schedule.map((dayMeals, idx) => ({
        dayNumber: idx + 1,
        meals: dayMeals
          .filter((m) => m.placeId && m.mealTypeId)
          .map((m, i) => ({ placeId: m.placeId, mealTypeId: m.mealTypeId, order: i + 1 })),
      })),
    }
    return built
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const it = buildItinerary()
    if (!it) return
    if (editingId) {
      patchMut.mutate(it, { onSuccess: resetForm })
    } else {
      createMut.mutate(it, { onSuccess: resetForm })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Itineraries</h2>
      </div>

      <Card className="p-4 space-y-3">
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <div className="grid gap-3">
            {data?.data.map((i) => (
              <div key={i.id} className="flex items-center justify-between border rounded px-3 py-2">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {i.days} days • {i.id}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => loadForEdit(i)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMut.mutate(i.id)}
                    disabled={deleteMut.isPending}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{editingId ? 'Edit itinerary' : 'Create itinerary'}</h3>
          {editingId && (
            <Button variant="ghost" size="sm" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="itId">ID</Label>
              <Input
                id="itId"
                value={itineraryId}
                onChange={(e) => setItineraryId(e.target.value)}
                placeholder="e.g. custom-3day"
                disabled={!!editingId}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="itName">Name</Label>
              <Input id="itName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Trip name" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="itDesc">Description</Label>
            <Textarea id="itDesc" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="itDays">Days</Label>
            <Input
              id="itDays"
              value={String(days)}
              onChange={(e) => setDays(Math.max(1, parseInt(e.target.value || '1', 10)))}
            />
          </div>

          <div className="space-y-4">
            {Array.from({ length: days }).map((_, dayIdx) => (
              <div key={dayIdx} className="border rounded p-3 space-y-3">
                <div className="font-medium">Day {dayIdx + 1}</div>

                <div className="space-y-2">
                  {schedule[dayIdx]?.map((meal, mealIdx) => (
                    <div key={mealIdx} className="grid sm:grid-cols-3 gap-2 items-end">
                      <div className="space-y-1">
                        <Label>Meal type</Label>
                        <select
                          className="border rounded h-10 px-3"
                          value={meal.mealTypeId}
                          onChange={(e) => handleChangeMeal(dayIdx, mealIdx, 'mealTypeId', e.target.value)}
                        >
                          <option value="">Select meal type</option>
                          {mealTypesData?.data?.map((mt) => (
                            <option key={mt.id} value={mt.id}>
                              {mt.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label>Place</Label>
                        <select
                          className="border rounded h-10 px-3"
                          value={meal.placeId}
                          onChange={(e) => handleChangeMeal(dayIdx, mealIdx, 'placeId', e.target.value)}
                        >
                          <option value="">Select place</option>
                          {placesData?.data?.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveMeal(dayIdx, mealIdx)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button type="button" size="sm" onClick={() => handleAddMeal(dayIdx)}>
                  Add meal
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createMut.isPending || patchMut.isPending}>
              {editingId ? 'Save itinerary' : 'Create itinerary'}
            </Button>
            <Button type="button" variant="secondary" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </form>
        <div className="text-xs text-muted-foreground">
          Tip: We can add filters by tags later. Tags loaded: {tagsData?.data?.length ?? 0}
        </div>
      </Card>
    </div>
  )
}
