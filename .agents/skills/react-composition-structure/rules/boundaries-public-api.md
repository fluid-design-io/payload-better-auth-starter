---
title: Export One Module Root by Default
slug: boundaries-public-api
group: Public API Boundaries
groupNumber: 3
section: "3.1"
impact: MEDIUM
tags: public-api, exports, boundaries
---

## Export One Module Root by Default

For both shared components and route-bound module folders, export one module
root by default. This keeps internal structure free to change without churn for
callers.

**Bad: export the entire inside of the folder**

```ts
export { CheckoutScreen } from "./checkout.screen"
export { CheckoutList } from "./checkout.list"
export { useCheckoutData } from "./checkout.data"
export { CheckoutSummary } from "./checkout.summary"
```

Problems:

- callers couple to internal layout
- every refactor becomes a breaking import change
- public API expands faster than the actual design intent

**Good: export only intentional public entry points**

```ts
export { Checkout } from "./checkout"
```

```ts
export { Faculty } from "./faculty"
export { FacultyDirectoryScreen } from "./faculty.directory.screen"
export { FacultyDetailScreen } from "./faculty.detail.screen"
```

The same rule applies to compound components:

```ts
export { Composer } from "./composer"
```

The rule is not "always exactly one export" — it is "exports match intentional
public entry points." One root is the default; screens become top-level
exports when a module has two or more route surfaces (see
`architecture-route-bound-module-folders.md`).

Keep internal leaves internal unless they are intentionally designed as public
entrypoints.

**Reasonable exceptions**

Export additional symbols only when they are truly part of the public contract:

- a documented type meant for external consumers
- a route helper explicitly reused outside the module
- a test utility in a clearly separate testing boundary

If an exception exists, document it rather than letting the barrel grow
implicitly.

**Checklist**

- Does `index.ts` export only intentional public entry points (root by default,
plus top-level screens when a module has two or more route surfaces)?
- Are callers importing namespace surfaces instead of internal leaves?
- Are exceptions intentional and documented?
