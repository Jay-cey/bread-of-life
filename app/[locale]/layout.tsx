import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundAudio from "@/components/BackgroundAudio";

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
  metadataBase: new URL("https://breadoflife.vercel.app"),
  title: "Bread of Life | A Spiritually Immersive Journey",
  description: "Experience a spiritually immersive, editorial-quality journey into the Bread of Life. Explore the sacred story, verses, and testimonies.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Bread of Life",
    description: "Experience a spiritually immersive, editorial-quality journey into the Bread of Life.",
    url: "https://breadoflife.vercel.app",
    siteName: "Bread of Life",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
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

// Script to register PWA Service Worker
const swScript = `
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(
        function(registration) { console.log('SW registered'); },
        function(err) { console.log('SW registration failed: ', err); }
      );
    });
  }
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
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BackgroundAudio />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
