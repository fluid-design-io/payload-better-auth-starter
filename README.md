![header](https://github.com/user-attachments/assets/8cff9ffa-f8ef-482e-bb00-02d253f5e079)

> A production-ready PayloadCMS starter with [payload-auth](https://github.com/payload-auth/payload-auth), modern UI components, and full-stack development tools. [Visit Demo](https://payload-better-auth-starter.vercel.app)

<hr />
<h4>
<a href="#-features" rel="dofollow"><strong>Features</strong></a>&nbsp;·&nbsp;<a href="#-branding-your-company" rel="dofollow"><strong>Branding Your Company</strong></a>&nbsp;·&nbsp;<a href="#custom-ui-components" rel="dofollow"><strong>Custom UI Components</strong></a>&nbsp;·&nbsp;<a href="#custom-blocks" rel="dofollow"><strong>Custom Blocks</strong></a>&nbsp;·&nbsp;<a href="#screenshots" rel="dofollow"><strong>Screenshots</strong></a>
</h4>
<hr />

## ✨ Features

- 🔐 **Better Auth** - Email OTP via [payload-auth](https://github.com/payload-auth/payload-auth)
- 🎨 **Shadcn UI** - Accessible components · 📝 **Blog** - SEO-optimized · 📧 **React Email** templates
- 🗄️ **PostgreSQL** · ☁️ **S3** · 🐳 **Docker Compose** · 🔍 **SEO Plugin** · 📱 **Responsive**

## Custom Blocks

| Block | Description |
| ------------- | ------------- |
| [Content Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/content-block/config.ts) | Allows you to create a content section with multiple columns that are mobile responsive. |
| [Media Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/media-block/config.ts) | Refined version of Payload's default media block (added zoom functionality). |
| [Gallery Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/gallery-block/config.ts) | A grid of zoomable images. |
| [CopyRight Inline Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/copyright-inline-block/config.ts) | An inline block that adds `© Copyright ${fromYear}~${currentYear}...` so you don't have to manually change it every year. |

## Custom UI Components

| Component | Description |
| ------------- | ------------- |
| [LayoutHeader](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L100) | A header component with a badge, h1 title, and description. |
| [SectionSpacing](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L340) | A spacing component for vertical spacing between sections. |
| [SectionGrid](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L300) | A grid layout with multiple content items. |
| [SectionGridItem](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L310) | An individual content item for vertical row layout. |
| [SectionHeader](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L320) | A section header with a badge, h2 title, and description. |
| [SectionHorizontal](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L330) | A horizontal section with a title, description, and media. |
| [ImageMedia](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L200) | A reusable image media component with customizable gradients and styling. |
| [VideoMedia](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L250) | A reusable Vimeo video media component with configurable playback options. |
| [FullWidthImage](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L270) | A large full-width image section with a glow effect. |


<details>
<summary>Example usage</summary>

```tsx
import {
  FullWidthImage,
  ImageMedia,
  LayoutHeader,
  SectionGrid,
  SectionGridItem,
  SectionHeader,
  SectionHorizontal,
  SectionSpacing,
} from "@/components/layout/elements";
import { Main } from "@/components/layout/main";

export default function Page() {
  return (
    <Main>
      <LayoutHeader title='Features' badge='Acme' description='...' />
      <SectionSpacing>
        <SectionGrid>
          <SectionGridItem
            title='Title 1'
            description='...'
            media={<ImageMedia src={image} alt='Title 1' zoom />}
          />
          <SectionGridItem
            title='Title 2'
            description='...'
            media={<ImageMedia src={image} alt='Title 2' zoom />}
          />
        </SectionGrid>
        <FullWidthImage
          image={image}
          caption='Image Caption'
          alt='Title 1'
          zoom
        />
        <SectionHorizontal
          variant='right'
          title='Title 3'
          description='...'
          media={
            <ImageMedia
              src={image}
              alt='Title 3'
              className='p-8'
              imgClassName='rounded-2xl'
              gradientColors={[
                "from-cyan-200/20",
                "via-cyan-300/20",
                "to-cyan-500/20",
              ]}
              zoom
            />
          }
        />
      </SectionSpacing>
    </Main>
  );
}
```
</details>

## Email UI

<img width="100%" height="auto" alt="Email UIs" src="https://github.com/user-attachments/assets/29219ab1-d76f-4792-9af7-6196f6930a76" />

## 🚀 Quick Start

```bash
git clone fluid-design-io/payload-better-auth-starter
cd payload-better-auth-starter
bun install
cp .env.example .env   # edit with your values
bun run dev
```

Site: `http://localhost:3000` · Admin: `http://localhost:3000/admin`

## 🏢 Branding

Replace **Acme**: logo in `src/components/icons.tsx` and `admin-icon.tsx`, favicon in `public/favicon.ico`, name in `src/lib/constants.ts` and `src/lib/email/email-template.tsx`, OG image `public/website-template-OG.png`.

**Env (required):** `PAYLOAD_SECRET`, `DATABASE_URI`. **Optional:** S3 vars, `RESEND_API_KEY` for email.

## 🧩 Stack

**Collections:** Users, Blog, Media, Globals. **Plugins:** Better Auth, SEO, Import/Export, S3, optional Form Builder. **UI:** Shadcn, Motion, theme, responsive.

## 🛠️ Scripts

`bun run dev` \| `build` \| `start` · `services:start` \| `services:stop` \| `services:logs` · `db:reset` \| `db:connect` · `email:test`

**Form plugin (optional):** 

1. Move `extra/plugins/form-plugin` to `src/plugins/`
2. Move `extra/blocks/form` to `src/blocks/form`
3. Move `extra/fields/slug` to `src/fields/slug`
4. Install `@payloadcms/plugin-form-builder`
5. Run `bun run payload generate:importmap`
6. Uncomment form plugin in `src/plugins/index.ts`
7. Restart development server 🥳

## 📁 Structure

`src/` → `app/`, `collections/`, `components/` (ui, layout, payload), `lib/`, `plugins/`, `blocks/`

## 🚀 Deploy

**Vercel:** Connect repo, set env vars, deploy. **Docker:** `docker-compose -f docker-compose.prod.yml up -d`

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

**Need help?** Check out the [PayloadCMS docs](https://payloadcms.com/docs) or [Better Auth docs](https://better-auth.com/docs).
