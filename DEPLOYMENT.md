# Hyves Deployment Guide

This project now runs as a Next.js application using the App Router.

## Prerequisites

- Node.js 20 LTS or 22+
- npm

## Build

```bash
npm install
npm run build
```

## Start

```bash
npm start
```

The production server listens on the port provided by the hosting platform, or `3000` locally.

## API Routes

The previous Express API has been migrated to Next.js route handlers under `app/api`.

- `GET/POST /api/posts`
- `DELETE /api/posts/:id`
- `GET/POST /api/roles`
- `DELETE /api/roles/:id`
- `GET/PUT /api/ims-policy`
- `GET/PUT /api/whistleblower-policy`
- `GET/PUT/POST /api/terms-of-service-policy`
- `GET/PUT/POST /api/privacy-policy`
- `POST /api/upload-team-image`

## Data Persistence

Blog posts, roles, and policy content are currently stored in local JSON files in the project root, with a temporary-directory fallback for read-only environments.

For production with multiple instances or serverless deployments, migrate this data to a managed database or object store so updates persist reliably across deployments.

## Vercel

Vercel can detect and deploy the Next.js app directly:

```bash
npm install
npm run build
```

No custom rewrite to `index.html` is needed.
