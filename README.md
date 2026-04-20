# Hyves - The Operating System for Modern Cooperatives

<p align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Hyves Banner" width="1200" />
</p>

Hyves is an end-to-end ERP system powering digital transformation for modern cooperatives in Nigeria. Manage memberships, finances, loans, and more all in one platform.

## 🌐 Live Website

Visit us at: [www.hyves.ng](https://www.hyves.ng)

## 🚀 Features

- **Membership Management** - Track and manage cooperative members efficiently
- **Financial Management** - Handle contributions, savings, and financial records
- **Loan Management** - Process and track member loans with ease
- **Digital Transformation** - Modernize traditional cooperative operations
- **Secure & Reliable** - Built with security best practices

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Motion (Framer Motion)
- **Routing**: React Router DOM
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn

## 🏁 Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
hyves-update/
├── src/
│   ├── assets/          # Static assets (images, logos)
│   ├── components/      # React components
│   │   ├── ui/          # Reusable UI components
│   │   └── *.tsx        # Page-specific components
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Public static files
├── server.ts            # Express server for production
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## 🔧 Environment Variables

Create a `.env.local` file with the following:

```env
GEMINI_API_KEY=your_api_key_here
```

## 📄 License

Copyright © 2024 Hyves Technology Limited. All rights reserved.

## 📞 Contact

- Email: hello@hyves.ng
- Website: www.hyves.ng
