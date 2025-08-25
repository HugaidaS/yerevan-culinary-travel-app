import * as Sentry from '@sentry/tanstackstart-react'
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createMiddleware, registerGlobalMiddleware } from '@tanstack/react-start'
import { createRouter } from './router.tsx'

Sentry.init({
  dsn: 'https://446ee926e9e0e31cae19ea91c26c4895@o4509729579728896.ingest.de.sentry.io/4509729583988816',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
})

registerGlobalMiddleware({
  middleware: [
    createMiddleware({ type: 'function' }).server(({ next }) => {
      console.log('global server middleware running')
      return next()
    }),
    createMiddleware({ type: 'function' }).server(Sentry.sentryGlobalServerMiddlewareHandler()),
  ],
})

export default createStartHandler({
  createRouter,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler))
