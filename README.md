[![Netlify Status](https://api.netlify.com/api/v1/badges/198777cc-9ba7-4bea-81a3-e0cf19f69464/deploy-status)](https://app.netlify.com/projects/superb-gecko-123aa9/deploys)

# Yerevan Culinary Travel App

A modern Tanstack Start app powered by Vite, TanStack Router, and Tailwind CSS. Ships with testing, linting, formatting, and optional UI/data tooling for fast iteration and deployment to Netlify.

## Tech Stack

- Framework: Tanstack Start
- Build: Vite, TypeScript, pnpm
- Routing: TanStack Router (file-based in src/routes)
- UI: Tailwind CSS, Shadcn UI
- Testing: Vitest
- Quality: ESLint (tanstack/eslint-config), Prettier
- Env types: T3Env
- Optional: TanStack Query (React Query)
- Deploy: Netlify + CLI
- Database: Convex
- Auth: Clerk

## Quick Start

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Scripts

```bash
pnpm build   # Production build
pnpm start   # Start build
pnpm dev    # Start dev server
pnpm test    # Run tests (Vitest)
pnpm lint    # Lint
pnpm format  # Format
pnpm check   # Type + lint checks (project-defined)
```

## Environment Variables (T3Env)

- Add variables to src/env.mjs.
- Use them with type safety in your code.

```ts
import { env } from '@/env'

console.log(env.VITE_APP_TITLE)
```

Note: Vite exposes variables prefixed with VITE\_ to the client.

## Development Notes

- Routing: Add files to src/routes for new routes. Use <Link /> and <Outlet /> from @tanstack/react-router.
- Styling: Tailwind CSS is preconfigured.
- UI Components (Shadcn): Add components as needed:
  ```bash
  pnpx shadcn@latest add button
  ```
- Data (optional): Add TanStack Query for server data fetching if needed.

## Testing

```bash
pnpm test
```

## Linting & Formatting

```bash
pnpm lint
pnpm format
pnpm check
```

## Deployment (Netlify)

1. Install CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Initialize (link to your site):
   ```bash
   netlify init
   ```
3. Deploy:
   ```bash
   netlify deploy --prod
   ```

The status badge above reflects deploy state.

## Learn More

- TanStack Router: https://tanstack.com/router
- TanStack Query: https://tanstack.com/query
- Tailwind CSS: https://tailwindcss.com
- Shadcn UI: https://ui.shadcn.com
- Vitest: https://vitest.dev
