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
  title: "Alex Carter | Video Editor & Creative Designer",
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
  openGraph: {
    title: "Alex Carter | Video Editor & Creative Designer",
    description:
      "Premium video editing, motion design, and graphic design services.",
    type: "website",
    locale: "en_US",
    siteName: "Alex Carter Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Carter | Video Editor & Creative Designer",
    description:
      "Premium video editing, motion design, and graphic design services.",
  },
  robots: {
    index: true,
    follow: true,
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
