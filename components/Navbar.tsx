"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On homepage: transparent when at top, solid when scrolled
  // On all other pages: always solid
  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isTransparent
          ? "bg-transparent border-transparent"
          : "backdrop-blur-md bg-[var(--nav-bg)] border-b border-[var(--secondary)] shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`font-serif text-2xl font-bold transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-[var(--primary)]"
              }`}
            >
              Bread of Life
            </Link>
          </div>

          {/* Links Center */}
          <div className="hidden sm:flex flex-1 justify-center space-x-6">
            {[
              { href: "/story", label: "Story" },
              { href: "/who-is-jesus", label: "Who is Jesus" },
              { href: "/verses", label: "Verses" },
              { href: "/journal", label: "Journal" },
              { href: "/testimonies", label: "Testimonies" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-sans transition-colors text-xs uppercase tracking-widest font-medium ${
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-[var(--primary)] hover:text-[var(--accent)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex-shrink-0 flex items-center justify-end">
            <DarkModeToggle />
          </div>

        </div>
      </div>
    </nav>
  );
}
