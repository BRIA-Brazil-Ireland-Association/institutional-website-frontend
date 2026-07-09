<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project conventions

- Prefer Server Components by default. Add `"use client"` only when the component needs browser APIs, event handlers, React state, or React Query.
- For Client Components, all client-side data fetching must use React Query. Use `useQuery` for reads and `useMutation` for writes.
- Loading and pending UI for mutations must come from the mutation state, such as `isPending`; do not create duplicate loading state with `useState`.
- Every form must validate its data with Zod before submit or mutation execution. Reuse helpers from `libs/validation.ts` when parsing `FormData`.
- Never call Strapi CMS directly from Client Components. Use the Next.js API proxy route `/api/cms/...` so Strapi URLs and tokens remain server-only.
- Strapi integration env vars must not use the `NEXT_PUBLIC_` prefix. Keep values such as `STRAPI_CMS_URL` and `STRAPI_CMS_TOKEN` available only on the server.
- CMS reads must be locale-aware. Pass the current locale to Strapi via `locale`, and handle Strapi v5 localized response shapes including `{data: {data, meta}}` wrappers and `localizations`.
- Shared or reusable UI components must live in `components/`.
- Small components that are exclusive to one parent may be local arrow functions in the parent file. If a component grows large or is reused, move it into its own file under `components/`.
- Keep shared project folders at the repository root: `components/`, `providers/`, `hooks/`, `helpers/`, `services/`, and `libs/`.
- React context and application providers must live under `providers/`.
