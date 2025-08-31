import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { SignInButton, UserButton } from '@clerk/tanstack-react-start'
import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react'

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
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </header>
      <main className="max-w-6xl mx-auto w-full px-4 py-6 flex-1">
        <Authenticated>
          <Outlet />
        </Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center gap-4">
            <p>Please, sign in to continue</p>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <p>Still loading</p>
        </AuthLoading>
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
