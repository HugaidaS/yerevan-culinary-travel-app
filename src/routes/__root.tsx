import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { wrapCreateRootRouteWithSentry } from '@sentry/tanstackstart-react'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { TanStackQueryLayout } from '@/shared/integrations/tanstack-query'
import { ClickSpark } from '@/shared/ui'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = wrapCreateRootRouteWithSentry(
  createRootRouteWithContext,
)<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <Outlet />
      <TanStackRouterDevtools />

      <TanStackQueryLayout />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"
          async
        ></script>
      </head>
      <body>
        {children}
        <Scripts />
        <ClickSpark />
      </body>
    </html>
  )
}
