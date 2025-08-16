![header](https://github.com/user-attachments/assets/8cff9ffa-f8ef-482e-bb00-02d253f5e079)

> A production-ready PayloadCMS starter with [payload-auth](https://github.com/payload-auth/payload-auth), modern UI components, and full-stack development tools.

## Table of Contents

- [Features](#-features)
- [Branding Your Company](#-branding-your-company)
- [Custom UI Components](#custom-ui-components)
- [Custom Blocks](#custom-blocks)
- [Screenshots](#screenshots)

## ✨ Features

- 🔐 **Better Auth** - Modern authentication with email OTP via [payload-auth](https://github.com/payload-auth/payload-auth) (Better Auth)
- 🎨 **Shadcn UI** - Beautiful, accessible components
- 📝 **Blog System** - SEO-optimized with rich text editor
- 📧 **Email Templates** - Custom React Email templates
- 🗄️ **PostgreSQL** - Production-ready database
- ☁️ **S3 Storage** - Public & private file uploads
- 🐳 **Docker Compose** - One-command local development
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Motion Primitives** - Smooth animations
- 🔍 **SEO Plugin** - Built-in SEO management

## Video Demo

https://github.com/user-attachments/assets/04009ca4-a212-44da-b6c8-bd26d5dc713e

## Custom Blocks

- **[Content Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/content-block/config.ts)**: Allows you to create a content section with multiple columns that are mobile responsive.
- **[Media Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/media-block/config.ts)**: Refined version of Payload's default media block (added zoom functionality).
- **[Gallery Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/gallery-block/config.ts)**: A grid of zoomable images.
- **[CopyRight Inline Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/copyright-inline-block/config.ts)**: An inline block that adds `© Copyright ${fromYear}~${currentYear}...` so you don't have to manually change it every year.

## Custom UI Components

- **[LayoutHeader](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L100)**: A header component with a badge, h1 title, and description.
- **[SectionSpacing](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L340)**: A spacing component for vertical spacing between sections.
- **[SectionGrid](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L300)**: A grid layout with multiple content items.
- **[SectionGridItem](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L310)**: An individual content item for vertical row layout.
- **[SectionHeader](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L320)**: A section header with a badge, h2 title, and description.
- **[SectionHorizontal](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L330)**: A horizontal section with a title, description, and media.
- **[ImageMedia](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L200)**: A reusable image media component with customizable gradients and styling.
- **[VideoMedia](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L250)**: A reusable Vimeo video media component with configurable playback options.
- **[FullWidthImage](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/components/layout/elements.tsx#L270)**: A large full-width image section with a glow effect.

<details>
<summary>Example usage 👀</summary>

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

export default function FeaturesPage() {
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

## Screenshots

**Main Pages**

<img width="1739" height="2014" alt="Main Pages" src="https://github.com/user-attachments/assets/54b8bbb0-4064-4204-adf2-cdf88eb85f14" />

**Account Settings**

<img width="1301" height="2046" alt="Screenshot 2" src="https://github.com/user-attachments/assets/d86f420b-e786-4735-a93b-901c7b93dc87" />

**Email UI**

<img width="1303" height="1513" alt="Email UIs" src="https://github.com/user-attachments/assets/29219ab1-d76f-4792-9af7-6196f6930a76" />

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone fluid-design-io/payload-better-auth-starter
cd payload-better-auth-starter
bun install
```

### 2. Environment Setup

```bash
# Create environment file
cp .env.example .env

# Edit with your values
nano .env
```

### 3. Start Development

```bash
# Start all services (PostgreSQL, S3, Email)
bun run dev
```

Visit `http://localhost:3000` for your site and `http://localhost:3000/admin` for the CMS.

## 🏢 Branding Your Company

### Replace "Acme" with Your Brand

1. **Logo & Icons**

   ```bash
   # Replace these files:
   src/components/icons.tsx          # Main logo
   src/components/payload/admin-icon.tsx  # Admin panel icon
   public/favicon.ico               # Browser favicon
   ```

2. **Company Name**

   ```bash
   # Search and replace "Acme" in:
   src/lib/constants.ts
   src/plugins/seo-plugin.ts
   src/lib/email/email-template.tsx
   ```

3. **Open Graph Images**

   ```bash
   # Replace default OG image:
   public/website-template-OG.png
   ```

4. **Email Templates**
   ```bash
   # Customize email branding:
   src/lib/email/email-template.tsx
   src/plugins/form-plugin/before-email.tsx
   ```

### Environment Variables

```bash
# Required for production
PAYLOAD_SECRET=your-secret-key
DATABASE_URI=postgresql://user:pass@host:port/db

# Optional - S3 Storage
S3_BUCKET=your-bucket
S3_ACCESS_KEY_ID=your-key
S3_SECRET_ACCESS_KEY=your-secret
S3_REGION=us-east-1

# Optional - Email (Resend)
RESEND_API_KEY=your-resend-key
```

## 🧩 Core Components

### Collections

- **Users** - Authentication & user management
- **Blog** - SEO-optimized blog posts with authors
- **Media** - Image/video uploads with S3 storage
- **Globals** - Site-wide content (footer, etc.)

### Plugins

- **Better Auth** - Modern authentication system
- **SEO Plugin** - Meta tags, Open Graph, structured data
- **Import/Export** - Data migration tools
- **S3 Storage** - Cloud file storage
- **Form Builder** - Contact forms (optional)

### UI Components

- **Shadcn UI** - 30+ accessible components
- **Motion Primitives** - Framer Motion utilities
- **Theme System** - Dark/light mode support
- **Responsive Layout** - Mobile-first design

## 🛠️ Development

### Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server

# Docker Services
bun run services:start    # Start PostgreSQL, S3, Email
bun run services:stop     # Stop all services
bun run services:logs     # View service logs

# Database
bun run db:reset         # Reset database
bun run db:connect       # Connect to PostgreSQL

# Email Testing
bun run email:test       # Test email functionality
```

### Form Plugin (Optional)

Enable the form plugin for contact forms:

1. Move `extra/form/` to `src/plugins/form/`
2. Uncomment form plugin in `src/plugins/index.ts`
3. Restart development server

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
├── collections/         # PayloadCMS collections
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── layout/         # Layout components
│   └── payload/        # CMS-specific components
├── lib/                 # Utilities & configurations
├── plugins/             # PayloadCMS plugins
└── blocks/              # Content blocks
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

**Need help?** Check out the [PayloadCMS docs](https://payloadcms.com/docs) or [Better Auth docs](https://better-auth.com/docs).
