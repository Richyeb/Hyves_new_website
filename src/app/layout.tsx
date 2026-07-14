import type { Metadata, Viewport } from "next";
import "@/index.css";
import SiteShell from "@/components/SiteShell";
import {
  createMetadata,
  defaultDescription,
  defaultTitle,
  organizationJsonLd,
  siteName,
  siteUrl,
  softwareJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: defaultTitle,
    description: defaultDescription,
    path: "/",
  }),
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: "Hyves Technology Limited", url: siteUrl }],
  creator: "Hyves Technology Limited",
  publisher: "Hyves Technology Limited",
  category: "financial technology",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
  appLinks: {
    ios: {
      url: "https://apps.apple.com/us/app/hyves-corp/id6756138773",
      app_store_id: "6756138773",
      app_name: "Hyves Corp",
    },
    android: {
      package: "com.hyves.hyves",
      app_name: "Hyves",
      url: "https://play.google.com/store/apps/details?id=com.hyves.hyves",
    },
    web: {
      url: siteUrl,
      should_fallback: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#F9B509",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, softwareJsonLd, websiteJsonLd]),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
