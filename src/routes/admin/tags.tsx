import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery, useConvexMutation } from '@convex-dev/react-query'
import { api } from '../../../convex/_generated/api'
import type { Tag } from '@/shared/types.ts'
import { Button, Card, Input, Label } from '@/shared/ui'

export const Route = createFileRoute('/admin/tags')({
  component: TagsPage,
})

function TagsPage() {
  const { data: convexTags } = useSuspenseQuery(convexQuery((api as any).tags.getAll, {}))

  const createTag = useMutation({ mutationFn: useConvexMutation((api as any).tags.create) })
  const deleteTag = useMutation({ mutationFn: useConvexMutation((api as any).tags.remove) })
  const updateTag = useMutation({ mutationFn: useConvexMutation((api as any).tags.update) })

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const id = (form.elements.namedItem('tagId') as HTMLInputElement).value.trim()
    const name = (form.elements.namedItem('tagName') as HTMLInputElement).value.trim()
    if (!id || !name) return
    createTag.mutate({ id, name })
    form.reset()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Tags</h2>

      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {!convexTags && <div>Loading...</div>}
          {(convexTags as Array<Tag>).map((t) => (
            <div key={t.id} className="flex items-center justify-between border rounded px-3 py-2 gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground">{t.id}</div>
                <form
                  className="flex items-center gap-2 pt-1"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
                    if (!name || name === t.name) return
                    updateTag.mutate({ id: t.id, name })
                  }}
                >
                  <Input name="name" defaultValue={t.name} className="h-8" />
                  <Button type="submit" size="sm" disabled={updateTag.isPending}>
                    Save
                  </Button>
                </form>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteTag.mutate({ id: t.id })}
                disabled={deleteTag.isPending}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 space-y-3">
        <h3 className="font-medium">Add new tag</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="tagId">ID</Label>
              <Input id="tagId" name="tagId" placeholder="e.g. veganFriendly" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tagName">Name</Label>
              <Input id="tagName" name="tagName" placeholder="e.g. Vegan Friendly" />
            </div>
          </div>
          <Button type="submit" disabled={createTag.isPending}>
            Add tag
          </Button>
        </form>
      </Card>
    </div>
  )
}
