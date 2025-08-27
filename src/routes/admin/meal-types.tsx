import { createFileRoute } from '@tanstack/react-router'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'
import { Button, Card, Input, Label } from '@/shared/ui'

export const Route = createFileRoute('/admin/meal-types')({
  component: MealTypesPage,
})

function MealTypesPage() {
  const { data: mealTypes } = useSuspenseQuery(convexQuery(api.mealTypes.getAll, {}))

  const { mutate: createMealType, isPending: isCreating } = useMutation({
    mutationFn: useConvexMutation(api.mealTypes.create),
  })

  const { mutate: updateMealType } = useMutation({
    mutationFn: useConvexMutation(api.mealTypes.update),
  })

  const { mutate: removeMealType } = useMutation({
    mutationFn: useConvexMutation(api.mealTypes.remove),
  })

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const id = (form.elements.namedItem('mealTypeId') as HTMLInputElement).value.trim()
    const name = (form.elements.namedItem('mealTypeName') as HTMLInputElement).value.trim()
    if (!id || !name) return
    createMealType({ id, name })
    form.reset()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Meal Types</h2>

      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {mealTypes.map((mt) => (
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
                    updateMealType({ id: mt.id, name })
                  }}
                >
                  <Input name="name" defaultValue={mt.name} className="h-8" />
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                </form>
              </div>
              <Button size="sm" variant="destructive" onClick={() => removeMealType({ id: mt.id })}>
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
          <Button type="submit" disabled={isCreating}>
            Add meal type
          </Button>
        </form>
      </Card>
    </div>
  )
}
