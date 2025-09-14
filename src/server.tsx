import * as Sentry from '@sentry/tanstackstart-react'
import { createClerkHandler } from '@clerk/tanstack-react-start/server'
import { createStartHandler, defaultStreamHandler, defineHandlerCallback } from '@tanstack/react-start/server'
import { createMiddleware, registerGlobalMiddleware } from '@tanstack/react-start'
import { createRouter } from './router'

Sentry.init({
  dsn: 'https://446ee926e9e0e31cae19ea91c26c4895@o4509729579728896.ingest.de.sentry.io/4509729583988816',
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
})

registerGlobalMiddleware({
  middleware: [
    createMiddleware({ type: 'function' }).server(({ next }) => {
      return next()
    }),
    createMiddleware({ type: 'function' }).server(Sentry.sentryGlobalServerMiddlewareHandler()),
  ],
})

// Create the start handler factory and wrap it with Clerk.
const handlerFactory = createClerkHandler(createStartHandler({ createRouter }))

export default defineHandlerCallback(async (event) => {
  const startHandler = await handlerFactory(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler))
  return startHandler(event)
})
