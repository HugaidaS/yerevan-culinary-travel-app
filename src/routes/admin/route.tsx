import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/shared/ui'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-lg font-semibold">
              Admin Dashboard
            </Link>
            <nav className="hidden md:flex items-center gap-3 text-sm">
              <TabLink to="/admin/tags" label="Tags" />
              <TabLink to="/admin/meal-types" label="Meal Types" />
              <TabLink to="/admin/places" label="Places" />
              <TabLink to="/admin/itineraries" label="Itineraries" />
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto w-full px-4 py-6 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

function TabLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ includeSearch: false, exact: true }}
      activeProps={{ className: 'text-armenian-red font-semibold' }}
      inactiveProps={{ className: 'text-muted-foreground hover:text-foreground' }}
    >
      {label}
    </Link>
  )
}
