// posts.index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

function getItineraries() {
  return fetch('/api/itineraries').then((res) => res.json())
}

// Note the trailing slash, which is used to target index routes
export const Route = createFileRoute('/demo/')({
  component: DemoIndexComponent,
})

// TODO: add proper pages
function DemoIndexComponent() {
  useEffect(() => {
    console.log('useEffect for itineraries')
    getItineraries().then(console.log)
  }, [])
  return <div>Please select a post!</div>
}
