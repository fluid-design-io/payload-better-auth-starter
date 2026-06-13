---
title: Use Module Folders for Route-Bound UI
slug: architecture-route-bound-module-folders
group: Route-Bound Module Folders
groupNumber: 2
section: "2.1"
impact: HIGH
tags: file-organization, module-folders, route-bound, data-orchestration
---

## Use Module Folders for Route-Bound UI

Use a module folder when a page or screen owns real local complexity. *Feature*
here means the domain surface you are restructuring — not a required `features/`
parent directory. Place the folder wherever the repo already groups route-bound
UI (`screens/`, `components/`, etc.).

Signs the surface has grown enough:

- route UI plus several internal leaves
- domain-specific query or mutation orchestration
- multiple related route surfaces
- nested subflows within one module

Do not force small pages or screens into folders.

**Bad: domain logic scattered across unrelated globals**

```text
checkout.tsx
useCheckout.ts
CheckoutList.tsx
CheckoutSummary.tsx
types.ts
helpers.ts
```

Problems:

- the module has no obvious home
- data logic drifts into generic hook folders
- route wrappers tend to accumulate orchestration

**Good: one colocated module folder with thin route wiring**

```text
checkout/
  checkout.tsx
  checkout.screen.tsx
  checkout.data.ts
  checkout.list.tsx
  checkout.summary.tsx
  checkout.types.ts
  index.ts
```

File ownership:

- `<feature>.tsx` assembles the public namespace when the module exposes a
compound surface (2+ leaves, or 1 leaf plus shared state). A module that
only exposes screens and a single leaf can skip `<feature>.tsx` and export
directly from `index.ts`.
- `checkout.screen.tsx` owns the main route-facing UI
- `checkout.data.ts` owns module-local orchestration
- leaf files such as `checkout.list.tsx` and `checkout.summary.tsx` own
presentational sections
- `index.ts` owns the public boundary (module root by default; top-level
screen exports when a module has two or more route surfaces — see
**Multi-screen modules**)

**Bad: route file owns domain orchestration**

```tsx
export default function CheckoutRoute() {
  const { cart, isSubmitting, submitOrder } = useCheckout()

  return (
    <CheckoutLayout>
      <CheckoutList cart={cart} />
      <CheckoutSubmitButton
        loading={isSubmitting}
        onPress={submitOrder}
      />
    </CheckoutLayout>
  )
}
```

**Good: route wrapper stays thin**

```tsx
import { Checkout } from "@/screens/checkout"

export default function CheckoutRoute() {
  return <Checkout.Screen />
}
```

If the router requires params, read them in the route file and pass them into
the module surface. Keep the rest of the orchestration inside the module.

**Multi-screen modules**

When a domain module has two or more route surfaces, export each screen as a
top-level symbol from `index.ts` instead of namespacing them under the module
root. Keep the module namespace reserved for genuinely shared compound leaves
(for example `Faculty.Avatar`). A module with exactly one screen may still use
`Feature.Screen` for symmetry.

```text
faculty/
  faculty.tsx                // Faculty = { Avatar }
  faculty.directory.screen.tsx
  faculty.detail.screen.tsx
  faculty.avatar.tsx
  faculty.data.ts
  index.ts
```

```ts
export { Faculty } from "./faculty"
export { FacultyDirectoryScreen } from "./faculty.directory.screen"
export { FacultyDetailScreen } from "./faculty.detail.screen"
```

The set of exports should map to the set of intentional public entry points —
one root is the default, not a hard cap.

**What belongs in `*.data.ts`**

Put module-owned orchestration there:

- grouped view models
- screen-local queries and mutations
- filtering and search state
- adapters only this module uses

Do not put generic API clients or widely shared hooks there.

When a subflow nests (see `organization-nest-when-prefix-repeats.md`),
subflow-only data moves into the subflow's `*.data.ts`; see
`organization-colocate-internals.md`.

**Nested subflows**

When one domain module contains distinct subflows, use nested folders only if
they represent real ownership.

```text
profile/
  profile.tsx
  profile.screen.tsx
  profile.data.ts
  security/
    profile-security.tsx
    profile-security.screen.tsx
    profile-security.data.ts
    index.ts
  preferences/
    profile-preferences.tsx
    profile-preferences.form.tsx
    index.ts
  index.ts
```

Create nested folders for real subflows, not symmetry.

**Checklist**

- Is a flat route file still enough?
- Does the module have one obvious home?
- Is route wiring thin?
- Is module-owned orchestration colocated in `*.data.ts`?
- Do nested folders represent real subflows?
