# Institutional Website Frontend

## Stack

- **Next.js** (App Router, Turbopack)
- **React 19** with TypeScript
- **Tailwind CSS v4** — CSS-based config, `@import "tailwindcss"` in globals.css
- **TanStack Query v5** — server state, no Redux/Zustand for async state
- **Yarn** — always use `yarn`, never `npm` or `pnpm`

## Commands

```bash
yarn dev          # dev server with Turbopack
yarn build        # production build
yarn lint         # ESLint check
yarn lint:fix     # ESLint auto-fix
yarn format       # Prettier format all files
yarn type-check   # TypeScript check without emit
```

## Project Structure

```text
app/                    # Next.js App Router pages and layouts
  layout.tsx            # Root layout with providers
  globals.css           # Global styles (@import "tailwindcss")
  api/
    proxy/[...path]/    # Reverse proxy to CMS — all CMS requests go here
components/
  providers/            # React context providers
  ui/                   # Reusable UI primitives
  sections/             # Page-level sections (Hero, Features, etc.)
hooks/                  # Custom React hooks (use-*.ts)
types/                  # Shared TypeScript types
```

## Data Fetching Rules (STRICT)

### Every page must be a Server Component

Pages live in `app/` and are Server Components by default. Never add `'use client'`
to a page file. Initial data must be fetched server-side so the page is fully rendered
on first load (SSR/SSG).

```tsx
// CORRECT — page.tsx
export default async function Page() {
    const data = await fetch(`${process.env.API_URL}/posts`, {
        next: { revalidate: 60 },
    });
    const posts = await data.json();
    return <PostList posts={posts} />;
}
```

### All CMS requests must go through the proxy

**Never call the CMS directly from client-side code.** All browser-initiated requests
to the CMS must go through `/api/proxy/[...path]`. This keeps `API_URL` and `API_TOKEN`
server-only and never exposed to the browser.

```ts
// CORRECT — client-side fetch
fetch('/api/proxy/posts?page=2');

// WRONG — exposes API_URL/token to the browser
fetch(process.env.NEXT_PUBLIC_API_URL + '/posts');
```

Server Components and `lib/api.ts` may call the CMS directly via `process.env.API_URL`
because they run only on the server.

### Never expose sensitive env variables

- `API_URL`, `API_TOKEN` and any secret — server-only, no `NEXT_PUBLIC_` prefix, never
  pass them as props or embed them in client bundles
- `NEXT_PUBLIC_*` — only for non-sensitive public config (app URL, feature flags)
- Do not add commented-out `NEXT_PUBLIC_API_URL` or similar to `next.config.mjs`

### Use fetch — never axios or other HTTP libs

```ts
// CORRECT
const res = await fetch('/api/proxy/posts');

// WRONG
import axios from 'axios';
const res = await axios.get('/api/proxy/posts');
```

### Client-side requests: always TanStack Query

When a client component needs async data, use `useQuery` / `useMutation`. Raw `fetch`
inside `useEffect` is forbidden on the client side.

```tsx
// CORRECT
const { data } = useQuery({ queryKey: ['posts'], queryFn: () => fetch('/api/proxy/posts').then(r => r.json()) });

// WRONG
useEffect(() => { fetch('/api/proxy/posts').then(...) }, []);
```

Only use client-side fetching for data that:

1. Does **not** impact SEO (dynamic user-specific data, infinite scroll, live counters)
2. Cannot or should not block the initial page render

For everything that matters for SEO or first paint — fetch in the Server Component page.

### Summary decision tree

```text
Is it a page?
  → Server Component, fetch data in the page with fetch()

Is it a fragment inside a page with dynamic, non-SEO data?
  → 'use client' + useQuery + fetch('/api/proxy/...')

Does it mutate data?
  → 'use client' + useMutation + fetch('/api/proxy/...')
```

## Code Conventions

### Imports

- Use `@/` alias for all internal imports (maps to project root)
- Group: externals → internal `@/` → relative — separated by blank lines
- No unused imports (`unused-imports/no-unused-imports` is an error)

### State Management with Context

Use React Context for state that needs to be shared across components or pages.
Avoid prop drilling — if a value needs to travel more than one level, it belongs in a context.

**When to use context:**

- **Global UI state** — language, theme, sidebar open/closed, modal state
- **Complex page state** — wizard steps, multi-section forms, tab state shared across sections
- **Feature-scoped state** — state shared among several components within the same feature

**Where to put it:** `components/providers/` — one file per context domain.
Each context file exports: the Provider component, and a `use<Name>` hook that throws if used outside the provider.

```tsx
// components/providers/UIContext.tsx
export function UIProvider({ children }) { ... }
export function useUI() { ... } // throws if used outside UIProvider
```

Register all providers in `app/layout.tsx`, wrapping children in dependency order (outermost = least dependent).

**Do NOT use context for:**

- Local component state that isn't shared (`useState` is fine)
- Server data — use TanStack Query for async/server state

### Components

- **One `export default` per `.tsx` file** — the main component is always the default export
- Sub-components used only within that file are declared as non-exported `const` arrow
  functions in the same file
- If a sub-component is reusable across files, or is large enough to deserve its own
  context, extract it to a new file with its own `export default`
- Server Components by default — add `'use client'` only when needed
- Props inline as destructured parameter, no separate `Props` type unless reused
- No unnecessary `useState`, `useMemo`, `useCallback`, or `memo` — add only when
  there is a measurable reason (profiling, specific re-render problem)

```tsx
// CORRECT — internal sub-components as arrow functions, one default export
const InternalPart = () => <div />;

export default function MyComponent() {
  return <InternalPart />;
}

// WRONG — multiple named exports for components
export function MyComponent() { ... }
export function InternalPart() { ... }
```

### Query Keys

Keep query keys in a co-located `queries.ts` file next to the feature:

```ts
// features/posts/queries.ts
export const postKeys = {
    all: ['posts'] as const,
    list: (page: number) => [...postKeys.all, 'list', page] as const,
    detail: (id: number) => [...postKeys.all, 'detail', id] as const,
};
```

### Env Variables

- `NEXT_PUBLIC_*` — exposed to the browser, safe for public config only
- No `NEXT_PUBLIC_` prefix — server-only, never exposed to client
- All variables must be documented in `.env.example`

### Formatting

- **Prettier** handles formatting: tabs, tabWidth 4, printWidth 80, singleQuote
- **ESLint** enforces quality; run `yarn lint:fix` before committing
- Auto-format on save should be configured in the IDE

## Tailwind v4 Notes

- No `tailwind.config.ts` — configuration lives in CSS via `@theme` blocks
- Use `@layer` utilities and `@apply` sparingly; prefer inline classes
- Custom design tokens go in `app/globals.css` under `@theme { ... }`

## Security

- All CMS credentials live in `.env.local` (gitignored), never in code or client bundles
- The proxy route (`app/api/proxy/[...path]/route.ts`) is the single egress point for
  CMS communication from the browser
- Never log or return `API_TOKEN` in error responses
- Sanitize any user input before including it in proxy path or query params

## Git

- Branch from `main`, PR back to `main`
- Commit messages: imperative mood, present tense (`add hero section`)
- Never commit `.env.local` — only `.env.example`
