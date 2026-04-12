"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const isHome = pathname === "/" || 
                 pathname === `/${locale}` || 
                 pathname === `/${locale}/`;
  
  if (pathname.includes('/link')) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // On homepage: transparent when at top, solid when scrolled
  // On all other pages: always solid
  const isTransparent = isHome && !scrolled && !isMobileMenuOpen;

  const links = [
    { href: "/story", label: t("story") },
    { href: "/who-is-jesus", label: t("who") },
    { href: "/verses", label: t("verses") },
    { href: "/journal", label: t("journal") },
    { href: "/testimonies", label: t("testimonies") },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'yo' : 'en';
    // Strip current locale from path if present, then prepend new locale
    const strippedPath = pathname.replace(/^\/(en|yo)/, '') || '/';
    // If the new locale is 'en' (default), we don't necessarily need the prefix based on 'as-needed', 
    // but navigating to /en/... or just /... works since middleware handles it.
    router.push(`/${newLocale}${strippedPath === '/' ? '' : strippedPath}`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isTransparent
          ? "bg-transparent border-transparent"
          : "backdrop-blur-md bg-background border-b border-secondary shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className={`font-serif text-2xl font-bold transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-primary"
              }`}
            >
              Bread of Life
            </Link>
          </div>

          {/* Desktop Links Center */}
          <div className="hidden sm:flex flex-1 justify-center space-x-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans transition-colors text-xs uppercase tracking-widest font-medium ${
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-primary hover:text-accent"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex-shrink-0 flex items-center justify-end gap-3 md:gap-4">
            <button
              onClick={toggleLanguage}
              className={`font-sans text-xs uppercase tracking-widest font-bold px-2 py-1 rounded border transition-colors ${
                isTransparent 
                  ? "text-white border-white/30 hover:border-white" 
                  : "text-primary border-primary/20 hover:border-primary"
              }`}
            >
              {locale === 'en' ? 'EN' : 'YO'}
            </button>
            <DarkModeToggle />
            
            {/* Mobile Hamburger Toggle */}
            <button 
              className={`sm:hidden p-2 rounded-md transition-colors ${
                isTransparent ? "text-white" : "text-primary"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden absolute top-0 left-0 w-full bg-background pt-24 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-start h-full space-y-8 px-4 pb-20 overflow-y-auto">
              {links.map(({ href, label }, idx) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={href}
                    className="font-serif text-3xl font-medium text-primary hover:text-accent transition-colors block text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="pt-8 border-t border-secondary w-2/3 mx-auto mt-8 flex flex-col gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/daily"
                  className="font-sans text-xs uppercase tracking-widest text-accent font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daily Devotional
                </Link>
                <Link
                  href="/prayer"
                  className="font-sans text-xs uppercase tracking-widest text-accent font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Prayer Wall
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
