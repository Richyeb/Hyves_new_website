import type { Metadata } from "next";

export const siteUrl = "https://hyves.ng";
export const siteName = "Hyves";
export const defaultTitle = "Hyves | Cooperative Management, Finance & Digital Savings Platform";
export const defaultDescription =
  "Hyves helps cooperatives digitize savings, loans, member management, bookkeeping, reporting, wallets, and financial operations in Nigeria and across Africa.";

export const seoKeywords = [
  "cooperative management software",
  "cooperative finance",
  "cooperative savings platform",
  "loan management software",
  "digital cooperative platform",
  "cooperative ERP",
  "cooperative bookkeeping",
  "member management system",
  "financial reporting for cooperatives",
  "savings and loans software",
  "Hyves",
  "Hyves Africa",
  "Hyves Nigeria",
  "cooperative software Nigeria",
  "digital finance for cooperatives",
];

type SeoConfig = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export const createMetadata = ({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
}: SeoConfig): Metadata => {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url,
      siteName,
      title,
      description,
      images: [
        {
          url: "/favicon.svg",
          width: 1200,
          height: 630,
          alt: "Hyves cooperative management platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/favicon.svg"],
      creator: "@hyves_africa",
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  email: "hello@hyves.ng",
  telephone: "+2347058789944",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [
    "https://x.com/hyves_africa",
    "https://www.linkedin.com/company/hyvesng/",
    "https://www.instagram.com/hyvesafrica/",
  ],
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hyves",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: siteUrl,
  description: defaultDescription,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Loan management",
    "Contribution tracking",
    "Digital wallets",
    "Cooperative bookkeeping",
    "Financial reporting",
    "Member management",
    "Multi-branch cooperative support",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
