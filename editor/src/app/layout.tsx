import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

/* SEO Metadata via Next.js Metadata API */
export const metadata: Metadata = {
  title: "ABHIZT STUDIO | Video Editor & Graphic Designer",
  description:
    "Premium video editing, motion design, and graphic design services. Transforming creative visions into stunning visual experiences.",
  keywords: [
    "video editor",
    "motion designer",
    "graphic designer",
    "content creator",
    "video production",
    "creative services",
  ],
  authors: [{ name: "Abhijeet Sarkar" }],
  creator: "Abhijeet Sarkar",
  openGraph: {
    title: "ABHIZT STUDIO | Video Editor & Graphic Designer",
    description:
      "Premium video editing, motion design, and graphic design services.",
    type: "website",
    locale: "en_US",
    siteName: "ABHIZT STUDIO",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABHIZT STUDIO | Video Editor & Graphic Designer",
    description:
      "Premium video editing, motion design, and graphic design services.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    location: "Bhopal, MP",
    email: "abhiztsarkar@gmail.com",
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
      </body>
    </html>
  );
}
