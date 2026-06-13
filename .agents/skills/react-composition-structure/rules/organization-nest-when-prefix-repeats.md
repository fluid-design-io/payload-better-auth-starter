---
title: Nest Folders When Filename Prefixes Repeat
slug: organization-nest-when-prefix-repeats
group: Organization Heuristics
groupNumber: 5
section: "5.1"
impact: MEDIUM
groupIntro: "These rules describe *when* to move between layouts the earlier sections define. They are triggers, not new structures: apply them to decide when a flat layout should nest and when colocated code should be lifted."
tags: file-organization, structure, refactoring
---

## Nest Folders When Filename Prefixes Repeat

A flat module that started with two or three files eventually grows into a
dozen. Once multiple files share the same prefix, the prefix is no longer
distinguishing information — it is noise.

**Trigger:** three or more sibling files share the same leading stem (e.g.
`calendar.detail.*`). Promote the shared prefix to a folder and give the folder
its own `index.ts`.

Keep a short sub-stem on files inside the new folder
(`detail/detail.header.tsx`, not `detail/header.tsx`). This preserves the one-
stem-per-module rule from `naming-stems-and-suffixes.md` and keeps search terms
like `detail.header` resolvable across the repo.

**Bad: flat layout with repeated prefixes**

```text
screens/
  calendar.detail.header.tsx
  calendar.detail.list.tsx
  calendar.detail.footer.tsx
  calendar.detail.utils.ts
  calendar.detail.data.ts
  calendar.detail.types.ts
  calendar.detail.index.ts
  calendar.list.tsx
  calendar.data.ts
  calendar.types.ts
```

Problems:

- the `detail` prefix is repeated in every filename with no structural payoff
- `calendar.detail.*` and `calendar.*` interleave when sorted, hiding ownership
- there is no public boundary — every file looks equally importable
- the `detail` subtree cannot be moved or deleted as a unit

**Good: nest once the prefix repeats**

```text
screens/
  calendar/
    detail/
      detail.header.tsx
      detail.list.tsx
      detail.footer.tsx
      detail.utils.ts
      detail.data.ts
      detail.types.ts
      index.ts
    calendar.list.tsx
    calendar.data.ts
    calendar.types.ts
    index.ts
```

The folder now carries the prefix. The files keep the sub-stem so intent stays
legible both inside and outside the folder. `index.ts` becomes the public
boundary (see `boundaries-public-api.md`) — internal leaves stay internal
unless intentionally exposed.

**Naming stays mechanical**


| File                           | Exports                |
| ------------------------------ | ---------------------- |
| `composer/composer.input.tsx`  | `ComposerInput`        |
| `composer/composer.footer.tsx` | `ComposerFooter`       |
| `composer/index.ts`            | `Composer` (namespace) |


The path maps 1:1 to the component name so agents and humans never have to
guess where `Composer.Input` lives.

**When not to nest**

- the folder would contain only one or two files
- the shared prefix appears only twice and has no signs of growing
- nesting would be purely aesthetic (keep symmetry for symmetry's sake out)

**Barrel caveat**

Subfolders may have a local `index.ts` only when they represent a real subflow
with its own public surface consumed by parent siblings (the nested `detail/`
example above is such a case). Otherwise, imports inside the subfolder should
reference files directly (`./detail.header`), and the module's root
`index.ts` remains the sole public boundary.

**Checklist**

- Do three or more sibling files share the same leading stem?
- Would promoting the stem to a folder collapse repetition without inventing
new names?
- Does the new folder expose only an intentional public surface via `index.ts`?
- Is the sub-stem preserved on files inside the folder?
