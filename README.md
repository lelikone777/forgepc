# ForgePC

Next.js (App Router) project with a layered frontend architecture.

## Stack

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Radix UI + shadcn/ui
- Playwright

## Project structure

```text
app/                    # Routes, metadata, SEO, robots, sitemap
src/
  providers/            # App-level and theme providers
  screens/              # Route-level page components
  widgets/              # Composed UI blocks (layout, sections)
  shared/
    ui/                 # Reusable UI primitives (shadcn/ui)
    components/         # Shared presentational components
    hooks/              # Shared hooks
    lib/                # Shared utilities
tests/e2e/              # End-to-end tests
```
