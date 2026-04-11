"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-20 transition-opacity duration-500"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[var(--background)] opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--primary)] mb-6 font-medium leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          The Bread<br />of Life
        </motion.h1>

        <motion.p 
          className="font-sans text-lg md:text-xl text-[var(--primary)] text-opacity-80 mb-10 max-w-2xl tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          A spiritually immersive experience exploring the sacred truth, 
          timeless verses, and personal testimonies of grace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Link 
            href="/story"
            className="inline-block px-10 py-4 bg-[var(--accent)] text-[var(--foreground)] font-serif text-xl tracking-wider uppercase rounded hover:bg-[var(--accent-secondary)] hover:text-white transition-all duration-300 shadow-xl"
          >
            Read the Story
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
