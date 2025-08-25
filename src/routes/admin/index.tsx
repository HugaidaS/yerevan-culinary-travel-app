import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminHome,
})

function AdminHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-sm text-muted-foreground">
        Use the tabs above to manage content. Start with{' '}
        <Link to="/admin/tags" className="underline">
          Tags
        </Link>{' '}
        or{' '}
        <Link to="/admin/meal-types" className="underline">
          Meal Types
        </Link>
        .
      </p>
    </div>
  )
}
