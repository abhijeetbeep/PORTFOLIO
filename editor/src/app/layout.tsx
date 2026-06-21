import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

/* Google Fonts with CSS variable integration for Tailwind v4 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

import { personalData } from "@/data/personal";

/* SEO Metadata via Next.js Metadata API */
export const metadata: Metadata = {
  title: `${personalData.logoText} | Video Editor & Graphic Designer`,
  description: personalData.heroDescription,
  keywords: [
    "video editor",
    "motion designer",
    "graphic designer",
    "content creator",
    "video production",
    "creative services",
  ],
  authors: [{ name: personalData.name }],
  creator: personalData.name,
  openGraph: {
    title: `${personalData.logoText} | Video Editor & Graphic Designer`,
    description: personalData.heroDescription,
    type: "website",
    locale: "en_US",
    siteName: personalData.logoText,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalData.logoText} | Video Editor & Graphic Designer`,
    description: personalData.heroDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    location: personalData.contact.location,
    email: personalData.contact.email,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
