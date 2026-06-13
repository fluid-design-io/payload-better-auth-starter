---
title: Keep One Stem and Use Responsibility-Driven Suffixes
slug: naming-stems-and-suffixes
group: Naming Stems and Suffixes
groupNumber: 4
section: "4.1"
impact: MEDIUM
tags: naming, conventions, suffixes
---

## Keep One Stem and Use Responsibility-Driven Suffixes

Naming should make ownership obvious before opening the file.

The default pattern in this skill is:

- one folder stem
- one repeated file stem
- one responsibility suffix per file

**Bad: mixed naming styles inside one folder**

```text
checkout/
  index.tsx
  useCheckout.ts
  CheckoutScreen.tsx
  helpers.ts
  types.ts
```

Problems:

- no consistent stem
- unclear ownership
- file purpose is hidden behind generic names

**Good: consistent stem plus explicit suffixes**

```text
checkout/
  checkout.tsx
  checkout.screen.tsx
  checkout.data.ts
  checkout.summary.tsx
  checkout.types.ts
  index.ts
```

**Per-folder reset**

The stem rule applies per folder boundary. A nested folder (see
`organization-nest-when-prefix-repeats.md`) resets the stem to the folder's own
name: `checkout/billing/billing.form.tsx` is correct;
`checkout/billing/checkout.billing.form.tsx` is not.

Useful suffixes:

- `.screen.tsx` for route-facing screen surfaces
- `.page.tsx` for page-oriented repos
- `.data.ts` for module-owned orchestration
- `.types.ts` for shared types
- `.context.tsx` for provider wiring
- `.display.tsx` for read-oriented compound leaves
- `.actions.tsx` for interactive compound leaves
- `.utils.ts` for pure helpers
- `.constants.ts` for static configuration
- `.md` for scoped documentation

**Adaptation rule**

Do not force a second naming system onto a mature repo. If the repo already uses
PascalCase files or another coherent style, preserve that style and translate
the structure:

- keep one stem
- keep explicit responsibilities
- keep one public boundary

Consistency matters more than whether the repo chooses kebab-case or PascalCase.

**Checklist**

- Do all module-owned files share a stem?
- Does each suffix communicate one clear responsibility?
- Are generic names like `helpers.ts` or `stuff.ts` avoided?
- Is the repo's existing naming system being preserved when it is already coherent?
