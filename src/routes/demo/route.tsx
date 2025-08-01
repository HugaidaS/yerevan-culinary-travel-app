import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: DemoLayoutComponent,
})

function DemoLayoutComponent() {
  return (
    <div>
      <h1>Demo Layout</h1>
      <Outlet />
    </div>
  )
}
