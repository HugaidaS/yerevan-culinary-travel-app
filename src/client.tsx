import { hydrateRoot } from 'react-dom/client'
import {
  StartClient,
  createMiddleware,
  registerGlobalMiddleware,
} from '@tanstack/react-start'
import * as Sentry from '@sentry/tanstackstart-react'
import { StrictMode } from 'react'
import { createRouter } from './router.tsx'

const router = createRouter()

Sentry.init({
  dsn: 'https://446ee926e9e0e31cae19ea91c26c4895@o4509729579728896.ingest.de.sentry.io/4509729583988816',
  integrations: [
    Sentry.tanstackRouterBrowserTracingIntegration(router),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
})

registerGlobalMiddleware({
  middleware: [
    createMiddleware({ type: 'function' }).client(({ next }) => {
      console.log('global client middleware running')
      return next()
    }),
  ],
})

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
)
