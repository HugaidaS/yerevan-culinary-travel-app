// posts.index.tsx
import { createFileRoute } from '@tanstack/react-router'

// Note the trailing slash, which is used to target index routes
export const Route = createFileRoute('/demo/')({
  component: DemoIndexComponent,
})

function DemoIndexComponent() {
  return <div>Please select a post!</div>
}
