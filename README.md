# Payload BetterAuth Starter

This template comes configured with barebones Payload and BetterAuth.

## Features

- 👮 PayloadAuth = Better Auth + Better Auth UI
- 🔒 Pre-configured collections, access control, public & private uploads
- 👤 Tuned account management UI
- 💌 Built-in email templates
- 🎨 Refined Shadcn UI components
- 💅 Prettified Payload Admin UI
- 💨 Motion Primitives
- 🐍 Snake-cased Payload components
- 📝 Optional Shadcn Payload Form Plugin Renderer
- 🚢 Full-suite docker local development: S3, inbucket, postgres. (one command to start/stop)

## Quick start

Replace `Acme` with your company name.

## Quick Start - local setup

To spin up this template locally, follow these steps:

1. `cp .env.example .env` to copy the example environment variables.
2. `bun install` to install dependencies.
3. `bun run dev` to start the dev server and start the services (Inbucket - email, Minio - S3, etc.)
4. Login to the admin panel at `http://localhost:3000/admin`
5. Create your first admin user

## Extra Features

### Form Plugin

The form plugin is disabled by default. To enable it, move the `form` directory from `extra` to `src/plugins`. And uncomment all places with comment `//* [Extra] Form Plugin *//`

It also includes a custom "UserInfo" block that can infer the logged in user's information as part of the form input. You can even make it readonly so the user can't change it.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.
