import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bread-of-life-tawny.vercel.app/"),
  title: "Bread of Life | A Spiritually Immersive Journey",
  description: "Experience a spiritually immersive, editorial-quality journey into the Bread of Life. Explore the sacred story, verses, and testimonies.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bread of Life",
  },
  openGraph: {
    title: "Bread of Life",
    description: "Experience a spiritually immersive, editorial-quality journey into the Bread of Life.",
    url: "https://bread-of-life-tawny.vercel.app/",
    siteName: "Bread of Life",
    images: [{ url: "/api/og?title=Bread+of+Life&verse=A+spiritually+immersive+journey&type=Bread+of+Life", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og?title=Bread+of+Life&verse=A+spiritually+immersive+journey&type=Bread+of+Life"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1437",
};

// Script to inject initially to prevent FOUC (Flash of Unstyled Content) on dark mode
const themeScript = `
  (function() {
    try {
      const storedTheme = localStorage.getItem('theme');
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (storedTheme === 'dark' || (!storedTheme && systemPreference)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ServiceWorkerRegistration />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
          <BackgroundAudio />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
