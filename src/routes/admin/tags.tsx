import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ApiResponse, Tag } from '@/shared/types.ts'
import { Button, Card, Input, Label } from '@/shared/ui'

export const Route = createFileRoute('/admin/tags')({
  component: TagsPage,
})

function TagsPage() {
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'tags'],
    queryFn: async () => {
      const res = await fetch('/api/tags')
      return (await res.json()) as ApiResponse<Array<Tag>>
    },
  })

  const createMut = useMutation({
    mutationFn: async (input: { id: string; name: string }) => {
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return (await res.json()) as ApiResponse<Tag>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'tags'] }),
  })

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/tags', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      return (await res.json()) as ApiResponse<boolean>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'tags'] }),
  })

  const patchMut = useMutation({
    mutationFn: async (input: { id: string; name: string }) => {
      const res = await fetch('/api/tags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return (await res.json()) as ApiResponse<Tag>
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'tags'] }),
  })

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const id = (form.elements.namedItem('tagId') as HTMLInputElement).value.trim()
    const name = (form.elements.namedItem('tagName') as HTMLInputElement).value.trim()
    if (!id || !name) return
    createMut.mutate({ id, name })
    form.reset()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Tags</h2>

      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            data?.data.map((t) => (
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
                      patchMut.mutate({ id: t.id, name })
                    }}
                  >
                    <Input name="name" defaultValue={t.name} className="h-8" />
                    <Button type="submit" size="sm" disabled={patchMut.isPending}>
                      Save
                    </Button>
                  </form>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteMut.mutate(t.id)}
                  disabled={deleteMut.isPending}
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
          <Button type="submit" disabled={createMut.isPending}>
            Add tag
          </Button>
        </form>
      </Card>
    </div>
  )
}
