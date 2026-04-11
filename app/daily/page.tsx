"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dailyData from "@/lib/daily.json";

export default function DailyPage() {
  const [dailyEntry, setDailyEntry] = useState<typeof dailyData[0] | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Determine the index deterministically based on date string
    // e.g., "Mon Oct 09 2023"
    const dateStr = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % dailyData.length;
    setDailyEntry(dailyData[index]);
  }, []);

  const handleCopy = () => {
    if (!dailyEntry) return;
    const textToCopy = `"${dailyEntry.verse}" - ${dailyEntry.reference}\n\nReflection: ${dailyEntry.reflection}\n\nPrayer: ${dailyEntry.prayer}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  if (!dailyEntry) return <div className="min-h-screen bg-[var(--background)]"></div>;

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16 pb-32 px-6 flex items-center justify-center relative">
      <motion.div 
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-10">
          <span className="font-sans text-sm tracking-widest uppercase text-[var(--accent)] font-bold mb-4 block">
            60 Seconds With Jesus
          </span>
          <p className="font-serif italic text-lg text-[var(--primary)] opacity-70">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="bg-[var(--secondary)] p-8 md:p-12 rounded border border-[var(--primary)] border-opacity-10 shadow-sm relative">
          
          <div className="mb-10">
            <h2 className="font-sans text-xs uppercase tracking-widest text-[var(--accent-secondary)] mb-4 font-bold border-b border-[var(--primary)] border-opacity-10 pb-2 inline-block">
              Daily Verse
            </h2>
            <blockquote className="font-serif text-3xl md:text-4xl text-[var(--primary)] leading-tight mb-4">
              "{dailyEntry.verse}"
            </blockquote>
            <p className="font-sans font-medium text-[var(--accent)] uppercase tracking-wider text-sm">
              — {dailyEntry.reference}
            </p>
          </div>

          <div className="mb-10">
            <h2 className="font-sans text-xs uppercase tracking-widest text-[var(--accent-secondary)] mb-4 font-bold border-b border-[var(--primary)] border-opacity-10 pb-2 inline-block">
              Reflection
            </h2>
            <p className="font-sans text-lg text-[var(--foreground)] opacity-90 leading-relaxed">
              {dailyEntry.reflection}
            </p>
          </div>

          <div className="mb-10 bg-[var(--background)] p-6 rounded border-l-2 border-[var(--accent)]">
            <h2 className="font-sans text-xs uppercase tracking-widest text-[var(--accent-secondary)] mb-2 font-bold">
              A Prayer for Today
            </h2>
            <p className="font-serif italic text-xl text-[var(--primary)] leading-relaxed">
              "{dailyEntry.prayer}"
            </p>
          </div>

          <button 
            onClick={handleCopy}
            className="w-full py-4 flex justify-center items-center gap-2 border border-[var(--accent)] text-[var(--primary)] rounded text-sm uppercase tracking-widest font-sans hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Share Today's Word
          </button>
        </div>
      </motion.div>

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-[var(--background)] px-6 py-3 rounded-full font-sans text-sm tracking-wider shadow-xl z-50 flex items-center gap-3"
          >
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
