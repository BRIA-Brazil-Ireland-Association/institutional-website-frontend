# Engineering Standards

## Project Context

- Next.js (App Router) consuming a third-party Laravel API
- Prioritizes stability, security, performance, and predictability
- Assume active production usage at all times
- Next.js 16.2.4 (App Router) consuming a third-party Laravel API
- Production-grade environment — assume active production usage at all times

## Git

- **Never commit or push without explicit user instruction.** Leave changes in the working tree after implementation. Do not offer to commit. Wait for the user to explicitly say so (e.g. "commita", "faz o commit", "pode commitar").

## Core Principles

- All code must be written in English
- Do not add comments unless explicitly requested
- Do not modify anything outside the explicit scope of the request
- No implicit refactors or convenience improvements
- Preserve existing behavior

## Mindset

- Stability over elegance
- Predictability over cleverness
- Minimal change surface
- Respect legacy decisions
- Production-first thinking

## Scope Control

- Never change unrelated files
- Never rename variables, functions, components, or files unless requested
- Never adjust behavior unless explicitly required
- Avoid cascading changes

## Security

- Never trust client-side data
- Avoid exposing sensitive information
- Do not log sensitive data
- Follow basic web security best practices
- Treat the Laravel API as untrusted input

## Performance

- Avoid unnecessary re-renders
- Avoid premature optimization
- Be mindful of bundle size
- Prefer simple and explicit solutions

## Code Quality

- Simple code over clever abstractions
- Readability over abstraction
- Avoid overengineering
- Avoid introducing new patterns without need

## Non-Goals

- No refactoring without request
- No optimization without clear need
- No dependency changes
- No stylistic rewrites

## UI Components

- Always use `<Modal` for modal/dialog elements
- Always use `<Button` for button elements
- Always use `<DefaultCard` for card elements

## Icons

- Never declare SVG icons inline inside a component file
- All SVG icons must live in `src/components/Icons/` as their own file
- Follow the existing pattern: `export default function FooIcon({ className = 'size-6' }: any)`
- Import icons from `@/components/Icons/FooIcon`

## Component Organization

- Components reused across multiple files must live in their own dedicated file
- Only define a component inside another component's file if it is small and exclusively used by that component
- In those cases, always declare it as `const` (not `function`)

## Data Fetching & Mutations

- Always use React Query for data fetching
- Always use React Query mutations for non-fetch actions (create, update, delete)
- Declare all API calls **and** all `useQuery`/`useMutation` hooks in `services/api` files; import and consume them in components — never define `useQuery` or `useMutation` inline inside a component
- `useQuery` hooks are named `useFoo(params)` and `useMutation` hooks are named `useFooMutation(params, onSuccess?)` or `useDoFoo(params, onSuccess?)`

## Validation

- Use Zod for form validation and complex validation logic; simple conditionals (`if`) are fine for straightforward checks

## Theming & Responsiveness

- Always support both dark and light themes
- Always implement responsive layouts

## Code Formatting

- After generating or modifying any TypeScript, TSX, JavaScript, or JSX file, run `yarn prettier --write <file>` on all changed files
- Also run `yarn prettier --write` on any SCSS or CSS files that were modified
- Never skip formatting — unformatted code must not be committed

## ESLint

- After generating or modifying any TypeScript or TSX file, run `yarn lint` on the project or `yarn eslint <file>` on the changed file and fix all reported errors and warnings before considering the task complete

## React Compiler — useMemo / memo / useCallback

This project uses React 19 with React Compiler, which handles memoization automatically. Follow these rules:

- **Never use `memo()`** — remove all existing wrappers; use `export default function Foo()` directly
- **Trivial `useMemo`** (single expression, property access, boolean, simple ternary) — remove the wrapper, inline the expression directly
- **Complex `useMemo`** (multi-line computation, data transformation, derived arrays) — extract the body to a module-level `const` arrow function named `processX`, then call `const x = processX(params)` without `useMemo`
- **Library config objects** (ECharts options, datatable column definitions, form field arrays passed to UI libs) — keep the `useMemo` for now; discuss before removing
- **`useCallback`** — keep for now; only remove when explicitly requested
- Module-level helpers must always use `const` arrow function syntax: `const processX = (...) => { ... }` — never `function processX(...)`

## Component Declaration Style

- Non-default React components must always be declared as `const` arrow functions
- Only the default export may use `export default function`
- Example: `const MyHelper = ({ prop }: IMyHelper) => { ... }` — never `function MyHelper(...) { ... }`

## Package Manager

- Always use `yarn` instead of `npm` for any Node-related commands (install, run, add, etc.)

## Final Rule

If it was not explicitly requested, do not do it.
