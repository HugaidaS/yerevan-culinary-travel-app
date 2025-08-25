import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ApiResponse, MealType } from '@/shared/types.ts'
import { Button, Card, Input, Label } from '@/shared/ui'

export const Route = createFileRoute('/admin/meal-types')({
  component: MealTypesPage,
})

function MealTypesPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'meal-types'],
    queryFn: async () => {
      const res = await fetch('/api/meal-types')
      return (await res.json()) as ApiResponse<Array<MealType>>
    },
  })

  const createMut = useMutation({
    mutationFn: async (input: { id: string; name: string }) => {
      const res = await fetch('/api/meal-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return (await res.json()) as ApiResponse<MealType>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'meal-types'] }),
  })

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/meal-types', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      return (await res.json()) as ApiResponse<boolean>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'meal-types'] }),
  })

  const patchMut = useMutation({
    mutationFn: async (input: { id: string; name: string }) => {
      const res = await fetch('/api/meal-types', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return (await res.json()) as ApiResponse<MealType>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'meal-types'] }),
  })

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const id = (form.elements.namedItem('mealTypeId') as HTMLInputElement).value.trim()
    const name = (form.elements.namedItem('mealTypeName') as HTMLInputElement).value.trim()
    if (!id || !name) return
    createMut.mutate({ id, name })
    form.reset()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Meal Types</h2>

      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            data?.data.map((mt) => (
              <div key={mt.id} className="flex items-center justify-between border rounded px-3 py-2 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">{mt.id}</div>
                  <form
                    className="flex items-center gap-2 pt-1"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
                      if (!name || name === mt.name) return
                      patchMut.mutate({ id: mt.id, name })
                    }}
                  >
                    <Input name="name" defaultValue={mt.name} className="h-8" />
                    <Button type="submit" size="sm" disabled={patchMut.isPending}>
                      Save
                    </Button>
                  </form>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMut.mutate(mt.id)}
                  disabled={deleteMut.isPending}
                >
                  Remove
                </Button>
              </div>
            ))}
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="font-medium">Add new meal type</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="mealTypeId">ID</Label>
              <Input id="mealTypeId" name="mealTypeId" placeholder="e.g. breakfast" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="mealTypeName">Name</Label>
              <Input id="mealTypeName" name="mealTypeName" placeholder="e.g. Breakfast" />
            </div>
          </div>
          <Button type="submit" disabled={createMut.isPending}>
            Add meal type
          </Button>
        </form>
      </Card>
    </div>
  )
}
