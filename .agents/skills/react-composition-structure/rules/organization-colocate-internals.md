---
title: Colocate Internals Until a Second Consumer Appears
slug: organization-colocate-internals
group: Organization Heuristics
groupNumber: 5
section: "5.2"
impact: MEDIUM
tags: file-organization, colocation, refactoring
---

## Colocate Internals Until a Second Consumer Appears

Module-owned helpers, data, and types belong next to the component that uses
them. Keep tests in a module-local `__test__/` folder instead of scattering
test files across the module root. Lifting code into a shared `lib/`,
`shared/`, or `utils/` location before a second consumer exists creates the
illusion of reuse and weakens ownership.

**Trigger:** a second consumer actually imports the helper. Until then,
colocate.

**Bad: extracted before a second consumer exists**

```text
src/
  lib/
    format-date.ts          // used only by calendar.detail
    detail-utils.ts         // used only by calendar.detail
  screens/
    calendar/
      detail/
        detail.header.tsx   // imports from ../../../lib/format-date
```

Problems:

- `lib/` advertises reuse that does not exist
- refactoring `detail` now requires edits in an unrelated directory
- later readers cannot tell what is genuinely shared from what was hoisted too
early

**Good: colocate until reuse is proven**

```text
src/
  screens/
    calendar/
      detail/
        detail.header.tsx
        detail.utils.ts     // format-date lives here
        detail.data.ts
        __test__/
          detail.header.test.tsx
        index.ts
```

When a second domain module genuinely needs the helper, promote it then:

```text
src/
  lib/
    format-date.ts          // now genuinely shared
  screens/
    calendar/detail/...
    cart/...
```

**Rules of thumb**

- one consumer → colocate
- two consumers in the same module tree → lift to the nearest common parent
- two or more consumers across unrelated domain modules → lift to `lib/` or
`shared/`
- when nesting a subflow folder (see `organization-nest-when-prefix-repeats.md`),
move data that is only consumed inside the subflow into a colocated `*.data.ts`;
data consumed by both the root module and the subflow stays in the module-level
`*.data.ts` until a second consumer proves it should split
- tests live in `__test__/` within the same module
(`detail/__test__/detail.header.test.tsx`)
- types used only inside a folder stay in `*.types.ts` within that folder;
types crossing a folder boundary are exported via `index.ts`

**Why this pairs with the earlier rules**

Compound component folders (see `architecture-compound-component-folders.md`)
and route-bound module folders (see
`architecture-route-bound-module-folders.md`) both treat a folder as an
ownership boundary. Colocation is the same idea applied to non-component code:
the folder owns its internals and `index.ts` decides what leaks out. Together
these rules make modules **movable** — a folder can be relocated or deleted as
a unit without hunting for strays in shared directories.

**Checklist**

- Does a second consumer actually exist before lifting the helper?
- Do helpers, data, and types live next to their consumer, with tests in
module-local `__test__/` folders?
- When code is lifted, is it lifted to the nearest real common ancestor?
- Is `lib/` or `shared/` reserved for code with genuine cross-module reuse?
