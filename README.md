# Hyves - The Operating System for Modern Cooperatives

Hyves is an end-to-end ERP system powering digital transformation for modern cooperatives in Nigeria. Manage memberships, finances, loans, and more in one platform.

## Live Website

Visit: [www.hyves.ng](https://www.hyves.ng)

## Features

- Membership management
- Financial management
- Loan management
- Digital transformation for cooperative operations
- Secure and reliable platform experience

## Tech Stack

- Frontend: Next.js App Router, React 19, TypeScript
- Styling: Tailwind CSS, shadcn/ui
- Animations: Motion
- API: Next.js route handlers
- Deployment: Vercel or any Node-compatible host

## Prerequisites

- Node.js 20 LTS or 22+
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```text
hyves-website/
+-- app/                 # Next.js routes and API route handlers
+-- public/              # Public static files
+-- src/
|   +-- assets/          # Imported images and logos
|   +-- components/      # Shared React components
|   +-- lib/             # Utilities and JSON storage helpers
|   +-- pages/           # Page-level client components reused by app routes
|   +-- index.css        # Global styles
+-- next.config.mjs
+-- tsconfig.json
+-- package.json
```

## Environment Variables

Create a `.env.local` file when needed:

```env
GEMINI_API_KEY=your_api_key_here
```

## License

Copyright (c) 2024 Hyves Technology Limited. All rights reserved.
