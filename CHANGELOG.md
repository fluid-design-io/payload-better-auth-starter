# acme-website

## 1.11.0

### Minor Changes

- **Dependencies:** Payload 3.85.1 to 3.89.0 across all packages, `payload-auth` 1.9.4 to 3.0.0, `better-auth` and `@better-auth/passkey` 1.6.18 to 1.7.5, Next 16.2.9 to 16.3.5, React and React DOM 19.2.6 to 19.3.0, TypeScript 6.0.3 to 7.0.2, `motion` 12 to 13, `lucide-react` 0.577 to 1.47, `sharp` 0.34.5 to 0.35.4, `@base-ui/react` 1.5 to 1.8, and `oxfmt` / `oxlint` to 0.68.0 / 1.83.0. Drop `tsx` from devDependencies; no script has referenced it since the test suite moved to HTTP-based tests in 1.8.0.
- **Blog preview:** Add `admin.preview` to the blog collection, so the admin sidebar offers a preview link next to live preview. Both build their URL through one `previewURL` helper that returns `null` for a missing or non-string slug instead of linking to `/blog/undefined`.

### Patch Changes

- **Blog metadata:** `generateMetadata` read through `getDocument`, which always returned the published document, so previewing a draft showed the live post's title, description, and OG image. It now calls a cached `queryPageBySlug` that reads `draftMode()` and filters on `_status` only when draft mode is off. The `blog-${slug}` cache tag is unchanged, so the existing revalidation hooks still clear it.
- **Tooling:** Ignore `.scratch`. Add a local `unslop` writing skill under `.agents/skills` with the usual `.claude/skills` symlink; it stays out of `skills-lock.json` because it is authored here rather than installed from a source repo.

### Known Issues

- `oxlint` 1.83 adds `react(set-state-in-effect)`, which now fails `bun run lint` on five untouched files: `src/hooks/use-media-query.tsx`, `src/hooks/use-mobile.ts`, `src/components/shell/theme-switch.tsx`, and two spots in `extra/components/form/components/phone-field.tsx`. `bun run typecheck` and `next build` both pass.

## 1.10.0

### Minor Changes

- **Layout primitives (breaking):** Replace the 500-line `layout/elements.tsx` grab bag with focused compound roots under `components/layout`: `Section` (with `Header`, `Icon`, `Eyebrow`, `Title`, `Description`, `Content`, `Media`), `Container`, `MediaFrame` (with `Content`, `Overlay`, `Caption`), and `VimeoEmbed`. Each is a callable root with no `.Root` member, exposes HeroUI-style named exports and public prop types, forwards native props and refs, supports the Base UI `render` contract, and carries a stable `data-slot`. `LayoutHeader`, `SectionHeader`, `SectionHorizontal`, `SectionGrid`, `SectionGridItem`, `SectionSpacing`, `FullWidthImage`, `ImageMedia`, and `VideoMedia` are removed with no compatibility wrappers.
- **Animation primitives (breaking):** Replace `InView` and `AnimatedGroup` with one `Entrance` family — `Entrance`, `Entrance.Reveal`, `Entrance.Fade`, `Entrance.Stagger`, and `Entrance.Stagger.Item` — over a shared `reveal | fade | slide-up | scale | blur` effect union. Viewport entry defaults to a `-20%` bottom margin and plays once; supplying `isActive` replaces viewport observation entirely. Reduced motion is handled internally by every primitive rather than left to call sites. Trim `GlowEffect` to `rotate | pulse | breathe | static` and drop all `@ts-nocheck` from the animation surface.
- **Layout and animation are fully decoupled:** Layout primitives no longer import animation, so headers, grids, and full-width media stop hard-wiring reveal behavior. Pages compose motion explicitly, either by wrapping or through `render` (for example `<Container render={<Entrance />} />`).
- **Layout primitives are server components again:** `Section`, `Container`, `MediaFrame`, and `VimeoEmbed` no longer carry `'use client'`. Base UI's `useRender` invokes no hooks when `document` is undefined, so these render on the server and no longer ship Base UI, CVA, and `tailwind-merge` to the browser just to render a wrapper element. Only `Entrance`, `TextEffect`, and `GlowEffect` remain client modules.
- **App shell separated from reusable primitives:** Move `Main`, `Header`, `Footer`, `ThemeSelector`, `ThemeProvider`, and `BetterAuthUIProvider` to `components/shell`, leaving `components/layout` as exactly the extraction-ready surface.
- **Accessibility:** `aria-labelledby`, `id`, and other caller-owned attributes now survive render boundaries. The previous `InView` silently dropped native props despite typechecking, so section heading relationships were being lost at runtime.
- **React 19 conventions:** Drop `forwardRef` across every layout and motion primitive in favor of ref-as-prop, so public prop types stay `ComponentPropsWithRef`-shaped instead of splitting into `PropsWithoutRef & RefAttributes`.

### Patch Changes

- **Entrance stagger:** Fold stagger orchestration into the group's `visible` variant instead of replacing it, so passing `variants` to `Entrance.Stagger` no longer silently discards `delay` and `stagger`. Values a variant states explicitly still win.
- **Entrance stagger items:** Downgrade `Entrance.Stagger.Item`'s missing-context throw to a development warning — it now renders unanimated instead of unmounting the tree in production — and give it its own reduced-motion handling rather than relying on parent propagation.
- **Entrance viewport:** Make `once` the single source of replay behavior by removing it from the accepted `viewport` options, so the two can no longer disagree.
- **Vimeo:** Rename `playerOptions.title` to `showTitle`, mapped back to Vimeo's `title` query parameter, so it no longer collides with the required accessible `title` prop. Add `allow-popups-to-escape-sandbox` and `allow-forms` to the sandbox default, which previously trapped the player's "Watch on Vimeo" link and blocked its settings controls.
- **Section:** Remove the unread layout context and the inert `layout` variant; `layout="full-width"` only ever emitted an unstyled data attribute.
- **Cleanup:** Delete `src/lib/animation.ts` and the `transitionVariants` / `staggerVariants` helpers from `src/lib/utils.ts`, now that transitions live inside the animation contract. Resolve the outstanding iframe-sandbox lint warning via `VimeoEmbed`.

## 1.9.0

### Minor Changes

- **UI system (breaking):** Migrate the frontend component registry from shadcn/custom primitives to the current coss registry and Base UI composition APIs. Replace legacy component contracts such as `CardContent` with their documented coss equivalents such as `CardPanel`.
- **Navigation and controls:** Rebuild the mobile navigation with coss Sheet, convert the theme selector and blog filters to ToggleGroup, and use coss Button composition for application links while preserving active-route and responsive behavior.
- **Forms and feedback:** Move validation controls to coss Field, Input, InputGroup, Textarea, object-valued Select, and Checkbox composition; replace project Sonner usage with coss toast providers and `toastManager`, including the optional Form Builder templates.
- **Accessibility:** Preserve labels, descriptions, invalid state, keyboard behavior, button types, icon-only accessible names, and decorative icon semantics throughout the migrated component surface.
- **Cleanup:** Remove superseded UI wrappers and compatibility components, delete unused legacy primitives, and remove the direct `cmdk` and `vaul` dependencies. Keep Sonner only where required by Payload Auth and Better Auth UI.

## 1.8.0

### Minor Changes

- **Testing:** Re-implement the test suite as simple HTTP-based tests that run against a live Next.js dev server, so the test runtime never imports the Payload config in-process (avoids the `tsx` config-load and Bun `@lexical/react` issues). Schema now comes from the Postgres adapter's dev `push` on boot instead of a migration step; the runner truncates the test DB each run. Adds `helper/http.ts`, `helper/db.ts`, `smoke.test.ts`, and an `auth.test.ts` that exercises the real sign-up → verify → sign-in → session flow, and rewrites `docs/Testing.md`.

### Patch Changes

- **Typecheck:** Bump `tsconfig` `lib`/`target` from ES2022 to ES2023 so `Array.toSorted()` typechecks (fixes `tsc --noEmit` and the cascading implicit-`any` errors it caused).
- **Cleanup:** Remove the unused changelog fetch (and the `remark` / `remark-html` deps) left over from the html-react-parser removal; clear lint warnings (hoist `getBlurClass`, drop unused params, `filter(...)[0]` → `find(...)`); apply `oxfmt` to drifted files so `bun run check` passes.
- **UI:** Make the mobile menu Sign In action match the nav tab items — it now renders as a full-width row inside the menu instead of collapsing into a small right-aligned button on tablet widths.
- **Tooling:** Make `test:db:create` idempotent so it no longer logs `database "..._test" already exists`.

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
