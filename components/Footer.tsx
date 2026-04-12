"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const t = useTranslations("Footer");
  const pathname = usePathname();

  if (pathname.includes('/link')) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Subscribed successfully.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <footer className="bg-[var(--background)] border-t border-[var(--primary)] border-opacity-10 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="flex flex-col flex-1 max-w-sm">
            <Link href="/" className="font-serif text-3xl font-bold text-[var(--primary)] mb-4">
              Bread of Life
            </Link>
            <p className="font-sans text-sm text-[var(--primary)] opacity-70 mb-8 leading-relaxed">
              {t("tagline")}
            </p>
            <p className="text-xs text-[var(--primary)] opacity-50 font-sans">
              &copy; {new Date().getFullYear()} Bread of Life. All rights reserved.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-4">Daily Devotionals</h4>
            <p className="font-sans text-sm text-[var(--primary)] opacity-70 mb-4">
              Subscribe to receive the '60 Seconds With Jesus' daily devotional directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[var(--secondary)] text-[var(--primary)] font-sans text-sm p-3 rounded focus:outline-none focus:ring-1 ring-[var(--accent)]"
                />
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded font-sans uppercase tracking-widest text-xs hover:bg-[var(--accent)] transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Subscribe"}
                </button>
              </div>
              {status === "success" && <p className="text-xs text-green-600 dark:text-green-400 mt-1">{message}</p>}
              {status === "error" && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{message}</p>}
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 flex-1 md:justify-end">
            <div className="flex flex-col gap-3">
              <h4 className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] opacity-50 font-bold mb-1">Explore</h4>
              <Link href="/story" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans text-sm transition-colors">Story</Link>
              <Link href="/who-is-jesus" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans text-sm transition-colors">Who is Jesus</Link>
              <Link href="/verses" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans text-sm transition-colors">Verse Discovery</Link>
              <Link href="/daily" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans text-sm transition-colors">Daily Devotional</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] opacity-50 font-bold mb-1">Community</h4>
              <Link href="/journal" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans text-sm transition-colors">Faith Journal</Link>
              <Link href="/testimonies" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans text-sm transition-colors">Testimonies</Link>
              <Link href="/prayer" className="text-[var(--primary)] hover:text-[var(--accent)] font-sans text-sm transition-colors">Prayer Corner</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
