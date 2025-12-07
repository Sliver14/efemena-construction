import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// =========================
//     SEO CONFIG
// =========================

export const metadata: Metadata = {
  title: {
    default: "Efemena Construction — Building the Future with Excellence",
    template: "%s | Efemena Construction",
  },

  description:
    "Efemena Construction is a trusted contractor for residential, commercial, and industrial building projects. We deliver excellence in architecture, construction, roofing, interior finishing, renovations, and project management across Nigeria.",

  keywords: [
    "construction company in Nigeria",
    "building contractors",
    "Efemena Construction",
    "real estate development",
    "architecture services",
    "construction engineering",
    "residential building",
    "commercial building",
    "project management",
  ],

  authors: [{ name: "Efemena Construction" }],
  creator: "Efemena Construction",
  publisher: "Efemena Construction",
  robots: "index, follow",

  metadataBase: new URL("https://efemenaconstruction.com"),
  alternates: {
    canonical: "https://efemenaconstruction.com",
  },

  // ====================
  // OPEN GRAPH (Facebook, Instagram, LinkedIn)
  // ====================
  openGraph: {
    title: "Efemena Construction and Cladding — Professional Building & Construction Services",
    description:
      "We provide world-class construction services for homes, offices, hotels, and large-scale projects across Nigeria.",
    url: "https://efemenaconstruction.com",
    siteName: "Efemena Construction",
    images: [
      {
        url: "/IMG-20251019-WA0041.jpg", // ⭐ Add banner image (1200 x 630 recommended)
        width: 1200,
        height: 630,
        alt: "Efemena Construction and Cladding — Professional Building Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ====================
  // TWITTER CARD
  // ====================
  twitter: {
    card: "summary_large_image",
    title: "Efemena Construction — Building with Integrity",
    description:
      "Reliable construction for residential, commercial, and industrial structures across Nigeria.",
    images: ["/banner.jpg"],
    creator: "@efemenaconstruction",
  },

  // ====================
  // ICONS
  // ====================
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ====================
  // SCHEMA.ORG (JSON-LD Structured Data)
  // ====================
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Efemena Construction",
      url: "https://efemenaconstruction.com",
      logo: "/https://efemenaconstruction.com/logo.png",
      description:
        "Professional building contractor offering architecture, construction, project management, and renovation services.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "Nigeria",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+2349159256954",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    }),
  },
};

// =========================
//       ROOT LAYOUT
// =========================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
