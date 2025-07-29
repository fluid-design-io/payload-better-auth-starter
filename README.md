# PayloadCMS Better Auth Starter

A production-ready PayloadCMS starter with Better Auth, modern UI components, and full-stack development tools.

## ✨ Features

- 🔐 **Better Auth** - Modern authentication with email OTP
- 🎨 **Shadcn UI** - Beautiful, accessible components
- 📝 **Blog System** - SEO-optimized with rich text editor
- 📧 **Email Templates** - Custom React Email templates
- 🗄️ **PostgreSQL** - Production-ready database
- ☁️ **S3 Storage** - Public & private file uploads
- 🐳 **Docker Compose** - One-command local development
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Motion Primitives** - Smooth animations
- 🔍 **SEO Plugin** - Built-in SEO management

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
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
