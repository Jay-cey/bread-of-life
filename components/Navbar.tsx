import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--nav-bg)] border-b border-[var(--secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold text-[var(--primary)]">
              Bread of Life
            </Link>
          </div>
          
          {/* Links Center */}
          <div className="hidden sm:flex flex-1 justify-center space-x-6">
            <Link href="/story" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans transition-colors text-sm uppercase tracking-widest font-medium">
              Story
            </Link>
            <Link href="/who-is-jesus" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans transition-colors text-sm uppercase tracking-widest font-medium">
              Who is Jesus
            </Link>
            <Link href="/verses" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans transition-colors text-sm uppercase tracking-widest font-medium">
              Verses
            </Link>
            <Link href="/daily" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans transition-colors text-sm uppercase tracking-widest font-medium">
              Daily
            </Link>
            <Link href="/prayer" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans transition-colors text-sm uppercase tracking-widest font-medium">
              Prayer
            </Link>
          </div>

          {/* Dark Mode Toggle Right */}
          <div className="flex-shrink-0 flex items-center justify-end">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
