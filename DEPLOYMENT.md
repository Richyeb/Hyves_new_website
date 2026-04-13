# Hyves Deployment Guide

This guide provides the steps to deploy the Hyves platform to a production environment.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Deployment Steps

### 1. Build the Application
First, you need to compile the frontend assets for production. This will generate a `dist` folder containing the optimized static files.

```bash
npm run build
```

### 2. Prepare the Server
The application uses a custom Express server (`server.ts`) to serve both the API and the static frontend files.

### 3. Start the Application
In production, set the `NODE_ENV` environment variable to `production` and start the server.

```bash
NODE_ENV=production npm start
```

## Environment Variables

- `NODE_ENV`: Set to `production` to serve static files from the `dist` folder.
- `PORT`: The server defaults to port `3000`.

## Data Persistence
The current implementation uses local JSON files (`blog-posts.json` and `roles.json`) for data storage. 
- **Important**: Ensure the server process has write permissions to the root directory.
- **Recommendation**: For high-scale production, it is recommended to migrate these to a managed database like MongoDB or PostgreSQL.

## Deployment Platforms

### Cloud Run (Recommended)
This application is optimized for containerized environments like Google Cloud Run.
1. Build a Docker image using the provided `package.json`.
2. Deploy the container to Cloud Run.
3. The platform will automatically handle the `PORT` and routing.

### Manual Server (VPS)
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Build: `npm run build`.
4. Use a process manager like `pm2` to keep the server running:
   ```bash
   pm2 start server.ts --name hyves --interpreter ./node_modules/.bin/tsx
   ```
   *Note: If your Node version supports TS stripping, you can use `node server.ts` directly.*

## Sharing and Preview
You can always share the latest version of your app using the **Share** button in the AI Studio header. This provides a public URL for stakeholders to review the application.
