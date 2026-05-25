# acme-website

## 1.7.0

### Minor Changes
- **Tooling:** Replace Biome with [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter); add `.oxlintrc.json` / `.oxfmtrc.json`, update `lint` / `format` / `check` scripts, and reformat the codebase.
- **Cache / revalidation:** Switch blog and global Payload hooks from `updateTag` to `revalidateTag(..., 'max')` for Next.js 16 cache invalidation.
- **Media URLs:** Normalize cache-busting query parameters in `getMediaUrl` using the `URL` API (`?v=` instead of appending raw cache tags).
- **Auth:** Simplify `Providers` by removing the `Suspense` + `AuthTreeWithContext` wrapper and resolving session context directly in the layout tree.
- **Docker:** Fix MinIO bucket bootstrap by following redirects when downloading the `mc` client (`curl -L`).
- **Build / runtime:** Fix `/features` static image import path; regenerate the Payload admin `importMap`; resolve oxlint/typecheck issues in blog hooks, globals fetch, and motion primitives.


### Minor Changes

- **Tooling:** Replace Biome with [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter); add `.oxlintrc.json` / `.oxfmtrc.json`, update `lint` / `format` / `check` scripts, and reformat the codebase.
- **Dependencies:** Bump Payload to `^3.83.0`, Next.js to `^16.2.4`, and Better Auth to `1.6.5`; remove `"type": "module"` from `package.json`.
- **Cache / revalidation:** Switch blog and global Payload hooks from `updateTag` to `revalidateTag(..., 'max')` for Next.js 16 cache invalidation.
- **Media URLs:** Normalize cache-busting query parameters in `getMediaUrl` using the `URL` API (`?v=` instead of appending raw cache tags).
- **Auth:** Simplify `Providers` by removing the `Suspense` + `AuthTreeWithContext` wrapper and resolving session context directly in the layout tree.
- **Docker:** Fix MinIO bucket bootstrap by following redirects when downloading the `mc` client (`curl -L`).
- **Build / runtime:** Fix `/features` static image import path; regenerate the Payload admin `importMap`; resolve oxlint/typecheck issues in blog hooks, globals fetch, and motion primitives.

### Patch Changes

- **Docs:** Fix the Quick Start `git clone` command in `README.md`.

## 1.6.0

### Minor Changes

- **Cache Components:** Set explicit `cacheLife('hours')` on `getDocument`, `getGlobal`, and the cached blog post section so cache behavior matches Next.js 16 guidance.
- **Sitemap:** Add `src/app/sitemap.ts` with static routes plus blog URLs behind `'use cache'`, `cacheTag('blog-sitemap')`, and `cacheLife('hours')`, wired to existing post revalidation tags.
- **Auth / PPR:** Wrap the Better Auth provider tree in `Suspense` with placeholder session promises until `headers()` resolves, so the shell can stream instead of blocking the whole layout on auth.
- **Errors:** Add `(frontend)/error.tsx` and `(frontend)/not-found.tsx` for branded error and 404 UI.
- **Prerender fix:** Lazy-load `react-medium-image-zoom` on the client in `ImageZoom` so `/features` (and other zoom pages) no longer hit `ReferenceError: Element is not defined` during `next build`.

## 1.5.2

### Patch Changes

- Add theme styles for admin panel, thanks to [Payload Twist](https://payloadtwist.com/editors/payload-cms-theme-generator)!

## 1.5.1

### Patch Changes

- Bump packages
- Fix form plugin & added missing files
- Fix blog page `generateStaticParams` placeholder return string instead of object

## 1.5.0

### Minor Changes

- ## 🚀 Features
  - Add about page showcasing changelog and package dependencies
  - Added Cache Component support

  ## 🔧 Refactors
  - Refactor from react-hook-form to [tanstack form](https://tanstack.com/form/latest)
  - Refactor radix-ui to [base-ui](https://base-ui.com/)

  ## 🎨 UI Updates
  - Minor UI updates and improvements

## 1.4.2

### Patch Changes

- - Update blog components,
  - Bump packages, update to Next 16
  - Moving towards to Cache Components
  - Update image remote patterns to include local image server

## 1.4.1

### Patch Changes

- Update payload auth

## 1.4.0

### Minor Changes

- ## 💥 Breaking Changes
  - Blog Collection: Remove `relatedBlogPosts` field, `heroImage` field.
  - Blog Components: Remove related blog posts, Hero image, and scroll progress components.

  ## 🚀 Features
  - Add category filters to the blog post layout.

  ## 🎨 UI Updates
  - Improves the blog post layout by adding category filters, pagination, author information, and a more modern design.

  ## 🔧 Dependencies
  - Bump dependencies

## 1.3.0

### Minor Changes

- ## 🚀 Features
  - New modern header style. The new header shrinks on scroll on desktop, providing a modern look and feel.

  ## 🔧 Chores
  - Bump package versions

## 1.2.1

### Patch Changes

- Fix Admin panel Event handlers cannot be passed to Client Component props
- Add `sendAdminInviteEmail` handler to `better-auth` options

## 1.2.0

### Minor Changes

- Switch to biome linter, setup modern code formatting

## 1.1.1

### Patch Changes

- Add zoom functionality to ImageMedia component

## 1.1.0

### Minor Changes

## 💥 Breaking Changes

- Removed custom settings card in favor of the new better-auth-ui account settings page.

## 🚀 Features

- Update better-auth-ui to V3
- Improve motion primitives components `AnimatedGroup` now starts the animation when the component is in view.

## 🎨 UI/UX

- Refactor layout elements
- Refactor theme colors UI
