import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { routeTree } from './routeTree.gen'

// Import the generated route tree
import './styles.css'
import {
  TanStackQueryProvider,
  getContext,
} from '@/shared/integrations/tanstack-query'

// Create a new router instance
export const createRouter = () => {
  const rqContext = getContext()

  return routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: { ...rqContext },
      defaultPreload: 'intent',
      Wrap: (props: { children: React.ReactNode }) => {
        return (
          <TanStackQueryProvider {...rqContext}>
            {props.children}
          </TanStackQueryProvider>
        )
      },
    }),
    rqContext.queryClient,
  )
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
