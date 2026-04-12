# CLAUDE.md

## Overview

This is a Next.js 16 full-stack application using the App Router. The architecture emphasizes type safety, real-time data, and clear separation between client and server responsibilities.

---

## Tech Stack
Framework: Next.js 16 (App Router)
Runtime: Bun
Backend: Convex (database + real-time sync)
Validation: Zod v4
Auth: Better Auth
UI: shadcn/ui
Styling: Tailwind CSS v4
State Management: Zustand

---

## External documentation
- **Next.js 16 App Router**: https://nextjs.org/blog/next-16
- **Next.js Project Structure**: https://nextjs.org/docs/app/getting-started/project-structure
- **Next.js Mutating Data / Server Actions**: https://nextjs.org/docs/app/getting-started/mutating-data
- **Next.js caching**: https://nextjs.org/docs/app/getting-started/caching
- **Zod v4 Release notes**: https://zod.dev/v4
- **Zod v4 Formatting errors**: https://zod.dev/error-formatting
- **Zod v4 migration guide**: https://zod.dev/v4/changelog
---

## Core principles
- Server-first architecture — prefer server components and server actions
- Type safety everywhere — validate all inputs with Zod
- Single source of truth — Convex handles all persistent data
- Real-time by default — rely on Convex syncing instead of manual fetching
- Minimal client state — use Zustand only when necessary

---

## Data Flow
- UI triggers a Server Action
- Server Action validates input with Zod
- Server Action calls Convex mutation/query
- Convex updates data and syncs automatically to the client (
*Never mutate data directly from the client*

---

## Server Actions
- All mutations must go through Server Actions
- Keep actions small, typed, validated with Zod
- All return types must be explicit
- No business logic in client components

---

## Validation
- Keep all Zod schemas in `lib/validations/`
- Co-locate input schema and inferred type
- Use **Zod v4**. Do not use Zod v3 APIs

---

## Convex Usage
- Use Convex as the only backend layer
- Co-locate queries/mutations with domain logic
- Leverage real-time subscriptions instead of polling

---

## Authentication
- Use Better Auth for all auth flows
- Never trust client-side auth state without server verification

---

## UI & Styling
- Use shadcn/ui components as the default
- Customize via Tailwind (no ad-hoc CSS unless necessary)
- Keep components Reusable, Accessible and Minimal

---

## Runtime
- Use Bun for development and execution
- Prefer Bun-native tooling where applicable

---

## Folder Conventions (Suggested)
- app/ → routes & layouts
- components/ → reusable UI
- actions/ → server actions
- convex/ → backend logic
- store/ → Zustand stores
- lib/ → utilities & validation & shared logic

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->
