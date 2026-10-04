![header](https://github.com/user-attachments/assets/8cff9ffa-f8ef-482e-bb00-02d253f5e079)

> A production-ready PayloadCMS starter with [payload-auth](https://github.com/payload-auth/payload-auth), modern UI components, and full-stack development tools. [Visit Demo](https://payload-better-auth-starter.vercel.app)

<hr />
<h4>
<a href="#features" rel="dofollow"><strong>Features</strong></a>&nbsp;·&nbsp;<a href="#quick-start" rel="dofollow"><strong>Quick Start</strong></a>&nbsp;·&nbsp;<a href="#branding-your-company" rel="dofollow"><strong>Branding Your Company</strong></a>&nbsp;·&nbsp;<a href="#custom-ui-components" rel="dofollow"><strong>Custom UI Components</strong></a>&nbsp;·&nbsp;<a href="#custom-blocks" rel="dofollow"><strong>Custom Blocks</strong></a>&nbsp;·&nbsp;<a href="#form-plugin-optional" rel="dofollow"><strong>Form Plugin (Optional)</strong></a>
</h4>
<hr />

## Features

<img width="1200" height="630" alt="Features" src="https://github.com/user-attachments/assets/14d1bf03-febc-40ef-9d4c-f1d4289ca928" />

---

<details>
<summary id="custom-blocks">Custom Blocks </summary>

| Block                                                                                                                                          | Description                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [Content Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/content-block/config.ts)                   | Allows you to create a content section with multiple columns that are mobile responsive.                                  |
| [Media Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/media-block/config.ts)                       | Refined version of Payload's default media block (added zoom functionality).                                              |
| [Gallery Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/gallery-block/config.ts)                   | A grid of zoomable images.                                                                                                |
| [CopyRight Inline Block](https://github.com/fluid-design-io/payload-better-auth-starter/blob/main/src/blocks/copyright-inline-block/config.ts) | An inline block that adds `© Copyright ${fromYear}~${currentYear}...` so you don't have to manually change it every year. |

</details>

<details>
<summary id="custom-ui-components">Custom UI Components </summary>

| Component                                                                                                                           | Description                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [Section](https://github.com/fluid-design-io/payload-better-auth-starter/tree/main/src/components/layout/section)                   | A compound section primitive with composable header, content, and media. |
| [Container](https://github.com/fluid-design-io/payload-better-auth-starter/tree/main/src/components/layout/container)               | A focused horizontal width and gutter primitive.                         |
| [MediaFrame](https://github.com/fluid-design-io/payload-better-auth-starter/tree/main/src/components/layout/media-frame)            | A compound figure primitive with content, overlay, and caption slots.    |
| [VimeoEmbed](https://github.com/fluid-design-io/payload-better-auth-starter/tree/main/src/components/layout/vimeo-embed)            | An accessible Vimeo embed for public and unlisted videos.                |
| [Entrance](https://github.com/fluid-design-io/payload-better-auth-starter/tree/main/src/components/motion-primitives/entrance)      | Composable viewport reveal, fade, and explicit stagger primitives.       |
| [TextEffect](https://github.com/fluid-design-io/payload-better-auth-starter/tree/main/src/components/motion-primitives/text-effect) | Reduced-motion-aware animated text segmentation.                         |
| [GlowEffect](https://github.com/fluid-design-io/payload-better-auth-starter/tree/main/src/components/motion-primitives/glow-effect) | Decorative glow effects with static reduced-motion behavior.             |

</details>

<details>
<summary>Example usage</summary>

```tsx
import { Container, MediaFrame, Section } from '@/components/layout'
import { Entrance } from '@/components/motion-primitives'

export default function Page() {
	return (
		<Section variant="muted" layout="full-width">
			<Container>
				<Section.Header>
					<Section.Eyebrow>Acme</Section.Eyebrow>
					<Section.Title>Features</Section.Title>
					<Section.Description>Composable layout and motion primitives.</Section.Description>
				</Section.Header>
			</Container>

			<Entrance.Stagger>
				<Entrance.Stagger.Item>
					<Section.Media>
						<MediaFrame>
							<MediaFrame.Content>
								<img src="/website-template-OG.png" alt="Feature preview" />
							</MediaFrame.Content>
							<MediaFrame.Caption>Feature preview</MediaFrame.Caption>
						</MediaFrame>
					</Section.Media>
				</Entrance.Stagger.Item>
			</Entrance.Stagger>
		</Section>
	)
}
```

</details>

## Email UI

<img width="100%" height="auto" alt="Email UIs" src="https://github.com/user-attachments/assets/29219ab1-d76f-4792-9af7-6196f6930a76" />

## Quick Start

```bash
git clone https://github.com/fluid-design-io/payload-better-auth-starter.git
cd payload-better-auth-starter
bun install
cp .env.example .env   # edit with your values
bun run dev
```

## Local S3 storage

The local Compose stack uses SeaweedFS 4.48, pinned by image digest, instead of
the archived MinIO community distribution. The existing `S3_*` variables and
`S3_ENDPOINT=http://localhost:9001` remain unchanged. SeaweedFS creates both
configured buckets at startup, so no `mc` download or initialization container
is required. Its Admin UI is available locally at `http://localhost:9002`.

Both S3 buckets are private. Public media is served through Payload's public
`payload-uploads` collection; private files retain Payload's authentication
checks. Direct anonymous S3 downloads are denied for both buckets.

SeaweedFS uses a new `seaweedfs_data` volume. It cannot read the old MinIO volume.
Keep any existing MinIO volume and back it up before migrating objects through
the S3 API. This change does not migrate existing objects or policies.

To reproduce the integration test, use a disposable checkout and the dedicated
Compose project below. The script creates and removes test objects and a test
user, and recreates the SeaweedFS container to verify persistence.

```bash
cp .env.example .env # set the required local secrets
bun install --frozen-lockfile
docker compose -p payload-seaweedfs-test up -d --wait
bun run dev:next
# In a second terminal:
bun run test:storage
```

Results are written to `.scratch/seaweedfs-results.json`. Coverage includes S3
object operations, rejected anonymous access and invalid credentials, presigned
PUT/GET, a 12 MiB multipart upload, Better Auth authentication, Payload image
sizes and blur data, byte-range downloads, private file access, persistence,
and deletion of stored originals and variants.

## Branding Your Company

Replace **Acme**: logo in `src/components/icons.tsx` and `admin-icon.tsx`, favicon in `public/favicon.ico`, name in `src/lib/constants.ts` and `src/lib/email/email-template.tsx`, OG image `public/website-template-OG.png`.

**Env (required):** `PAYLOAD_SECRET`, `DATABASE_URI`. **Optional:** S3 vars, `RESEND_API_KEY` for email.

## Stack

**Collections:** Users, Blog, Media, Globals. **Plugins:** Better Auth, SEO, Import/Export, S3, optional Form Builder. **UI:** coss, Motion, theme, responsive.

## Form plugin (optional)

Payload form builder plugin with Tanstack form on the frontend

1. Move `extra/plugins/form-plugin` to `src/plugins/`
1. Move `extra/blocks/form` to `src/blocks/form`
1. Move `extra/components/form` to `src/components/form`
1. Move `extra/fields/slug` to `src/fields/slug`
1. Install `@payloadcms/plugin-form-builder country-data-list react-circle-flags`
1. Uncomment form plugin in `src/plugins/index.ts`
1. Run `bun run payload generate:importmap`
1. Restart development server 🥳

## Structure

`src/` → `app/`, `collections/`, `components/` (ui, layout, payload), `lib/`, `plugins/`, `blocks/`

## Deploy

**Docker:** `docker-compose -f docker-compose.prod.yml up -d`

## License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

**Need help?** Check out the [PayloadCMS docs](https://payloadcms.com/docs) or [Better Auth docs](https://better-auth.com/docs).
