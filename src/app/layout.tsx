import type { Metadata } from "next";
import { Urbanist, Inter } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jaycie — Multimedia Artist, Graphic Designer & Video Editor",
  description:
    "Janperson Carl M. Lorete (Jaycie) — multimedia artist crafting branding, video editing, motion graphics, and content that converts for brands, creators, and agencies.",
  keywords: [
    "multimedia artist",
    "graphic designer",
    "video editor",
    "motion graphics",
    "branding",
    "social media design",
    "Adobe Premiere",
    "Photoshop",
  ],
  openGraph: {
    title: "Jaycie — Multimedia Artist, Graphic Designer & Video Editor",
    description:
      "Multimedia artist crafting branding, video editing, motion graphics, and content that converts.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Janperson Carl M. Lorete",
  alternateName: "Jaycie",
  email: "jclorete09@gmail.com",
  jobTitle: "Multimedia Artist",
  description:
    "Multimedia artist specializing in graphic design, video editing, branding, and digital content creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${urbanist.variable} ${inter.variable} antialiased bg-bg text-white`}
      >
        {children}
      </body>
    </html>
  );
}
