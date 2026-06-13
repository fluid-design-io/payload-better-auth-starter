---
name: react-composition-structure
description: React and React Native file-system architecture patterns that scale. Use when restructuring component folders, route-bound domain modules (a calendar, cart, or checkout surface placed under `components/`, `screens/`, or any repo tree — not a literal `features/` directory), `index.ts` export boundaries, naming conventions, colocated `*.data.ts` files, or translating composition patterns into stable repo structure. Triggers on compound component folders, route-bound module folders, public API cleanup, and bad-vs-good file organization examples.
metadata:
  author: oliverpan
  version: 1.0.0
---

# React Composition Structure

File-system and module-boundary patterns for React and React Native codebases.
This skill complements `vercel-composition-patterns`: Vercel explains the
component architecture; this skill explains how to express those patterns in a
codebase's folders, files, exports, and naming.

## When to Apply

Reference these guidelines when:

- Restructuring reusable component folders
- Refactoring pages or screens into route-bound domain modules
- Cleaning up over-exported `index.ts` files
- Normalizing naming conventions across a module
- Deciding where context, data orchestration, and docs should live

## Rule Categories by Priority


| Priority | Category                   | Impact | Prefix          |
| -------- | -------------------------- | ------ | --------------- |
| 1        | Component Folders          | HIGH   | `architecture-` |
| 2        | Route-Bound Module Folders | HIGH   | `architecture-` |
| 3        | Public API Boundaries      | MEDIUM | `boundaries-`   |
| 4        | Naming Stems and Suffixes  | MEDIUM | `naming-`       |
| 5        | Organization Heuristics    | MEDIUM | `organization-` |


## Quick Reference

### 1. Component Folders (HIGH)

- `architecture-compound-component-folders` - Organize shared multi-part
components around one root namespace, clear file ownership, and provider-led
state sharing

### 2. Route-Bound Module Folders (HIGH)

- `architecture-route-bound-module-folders` - Organize pages and screens into
foldered domain modules (wherever the repo groups route-bound UI) with thin
route wrappers and colocated `*.data.ts`

### 3. Public API Boundaries (MEDIUM)

- `boundaries-public-api` - Export one module root by default and keep leaves
internal unless they are intentionally public

### 4. Naming Stems and Suffixes (MEDIUM)

- `naming-stems-and-suffixes` - Keep one module stem, use explicit suffixes, and
preserve strong repo conventions instead of mixing naming systems

### 5. Organization Heuristics (MEDIUM)

- `organization-nest-when-prefix-repeats` - Promote repeated filename prefixes
into a nested folder with an `index.ts` public boundary once 3+ files share
the stem
- `organization-colocate-internals` - Keep helpers/data/types with their
consumer, and tests in module-local `__test__/` folders, until a second
consumer proves the need to lift

## How to Use

Read the single rule file that matches the job:

```text
rules/architecture-compound-component-folders.md
rules/boundaries-public-api.md
```

Each rule file contains:

- A single main concern
- Why it matters
- Bad and good examples
- File trees or code samples
- Practical exceptions and checklists

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`.

`AGENTS.md` is generated from `rules/*.md` (plus `metadata.json` and
`templates/agents.head.md`). Edit the rule files, then run `npm run build` to
regenerate it — never edit `AGENTS.md` by hand.