# React Composition Structure

A structured repository for React and React Native file-system composition
patterns that scale. These patterns help teams express good component
architecture in folders, files, naming, and export boundaries instead of
letting structure drift into monolithic files or bag-of-exports modules.

## Install

```bash
npx skills add fluid-design-io/react-composition-structure
```

## Structure

- `rules/` - Individual rule files (one per rule)
  - `architecture-compound-component-folders.md` - Shared multi-part component folders
  - `architecture-route-bound-module-folders.md` - Route-bound domain module folders
  - `boundaries-public-api.md` - Public export boundaries
  - `naming-stems-and-suffixes.md` - Naming conventions for module-owned files
- `SKILL.md` - Trigger metadata and quick reference
- `templates/agents.head.md` - Static intro (Note + Abstract) for the compiled guide
- `scripts/build-agents.mjs` - Generates `AGENTS.md` from the sources above
- `**AGENTS.md**` - Full compiled guide for agents (generated; do not edit by hand)

## Rules

### Component Folders (HIGH)

- `architecture-compound-component-folders.md` - Organize shared multi-part
components around one root namespace, provider-led state sharing, and clear
file ownership

### Route-Bound Module Folders (HIGH)

- `architecture-route-bound-module-folders.md` - Organize pages and screens into
domain module folders (wherever the repo groups route-bound UI, e.g.
`components/` or `screens/`) with thin route wrappers and colocated `*.data.ts`

### Public API Boundaries (MEDIUM)

- `boundaries-public-api.md` - Export one module root by default and keep
internal leaves private unless they are intentionally public

### Naming Stems and Suffixes (MEDIUM)

- `naming-stems-and-suffixes.md` - Keep one module stem, use explicit suffixes,
and preserve strong repo conventions instead of mixing naming systems

## Core Principles

1. **Structure should reflect composition** — If the UI is compound, the folder
  should make that obvious
2. **One module, one public root** — Export the namespace, not every internal leaf
3. **Colocate module-owned orchestration** — Keep screen and page-specific
  `*.data.ts` close to the module they serve
4. **Name by ownership and responsibility** — Reuse one stem and make file jobs
  obvious from their suffixes
5. **Preserve coherent repo conventions** — Adapt the structure to the codebase
  instead of forcing a second naming system

## Creating a New Rule

1. Create a new file in `rules/` using the appropriate prefix
2. Add frontmatter (`title`, `slug`, `group`, `groupNumber`, `section`,
  `impact`, optional `groupIntro`) so the generator can place and order it
3. Use one main concern per rule file
4. Include:
  - a short explanation of why the rule matters
  - bad and good examples
  - file trees or code snippets when helpful
  - practical exceptions or a checklist if the rule needs guardrails
5. Add the rule to `SKILL.md` so the quick reference stays current
6. Run `npm run build` to regenerate `AGENTS.md` from `rules/`

## Prefix Guide

- `architecture-` for folder shape and module organization
- `boundaries-` for public API and export rules
- `naming-` for file stems, suffixes, and naming consistency

## Impact Levels

- `HIGH` - Foundational structure patterns that prevent churn and unclear ownership
- `MEDIUM` - Patterns that improve maintainability, discoverability, and consistency

