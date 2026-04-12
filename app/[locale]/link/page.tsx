"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LinkInBioPage() {
  const links = [
    { title: "Read The Story", url: "/story", isPrimary: true },
    { title: "60 Seconds with Jesus", url: "/daily", isPrimary: false },
    { title: "Verse Discovery", url: "/verses", isPrimary: false },
    { title: "Read Testimonies", url: "/testimonies", isPrimary: false },
    { title: "Prayer Corner", url: "/prayer", isPrimary: false },
  ];

  return (
    <div className="min-h-screen bg-[#0B1437] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A84C] opacity-5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="w-full max-w-sm flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        {/* Profile / Logo Header */}
        <div className="w-20 h-20 bg-[#FAF7F0] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(201,168,76,0.15)]">
          <span className="font-serif text-[#0B1437] text-3xl font-bold">B</span>
        </div>
        
        <h1 className="font-serif text-3xl text-white mb-2">Bread of Life</h1>
        <p className="font-sans text-white/50 text-sm mb-10 tracking-wide text-center">
          Truth. Grace. Eternal Life.
        </p>

        {/* Links Stack */}
        <div className="flex flex-col gap-4 w-full">
          {links.map((link, idx) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
            >
              <Link 
                href={link.url}
                className={`w-full flex items-center justify-center py-4 px-6 rounded-lg font-sans text-xs uppercase tracking-widest font-bold transition-all ${
                  link.isPrimary 
                    ? "bg-[#C9A84C] text-[#0B1437] hover:bg-white shadow-[0_4px_20px_rgba(201,168,76,0.2)]" 
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full text-center">
          <Link href="/" className="font-serif italic text-[#C9A84C] opacity-60 hover:opacity-100 transition-opacity">
            Visit full website
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
