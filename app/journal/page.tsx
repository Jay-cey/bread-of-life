"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import journalData from "@/lib/journal.json";

const categories = ["All", "Faith", "Grace", "Redemption", "Eternal Life"];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = journalData.filter(article => 
    activeCategory === "All" ? true : article.category === activeCategory
  );

  const featured = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl text-[var(--primary)] mb-4">Faith Journal</h1>
            <p className="font-sans text-[var(--foreground)] opacity-70 text-lg">Editorial reflections on theology, scripture, and modern faith.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-sans rounded-full transition-colors border ${
                  activeCategory === cat 
                    ? "bg-[var(--primary)] text-[var(--background)] border-[var(--primary)]" 
                    : "bg-transparent text-[var(--primary)] border-[var(--primary)] border-opacity-20 hover:border-opacity-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Featured Article */}
            {featured ? (
              <div className="mb-16">
                <Link href={`/journal/${featured.slug}`} className="group block">
                  <div className="bg-[var(--secondary)] rounded-xl p-8 md:p-16 border border-[var(--primary)] border-opacity-10 flex flex-col md:flex-row gap-12 items-center transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-[var(--accent)] hover:border-opacity-40">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="bg-[var(--primary)] text-[var(--background)] px-3 py-1 text-[10px] uppercase tracking-widest rounded-full font-bold">
                          {featured.category}
                        </span>
                        <span className="font-sans text-xs text-[var(--primary)] opacity-50 uppercase tracking-widest">{featured.readTime}</span>
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl text-[var(--primary)] mb-6 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        {featured.title}
                      </h2>
                      <p className="font-serif italic text-xl md:text-2xl text-[var(--primary)] opacity-80 mb-6 leading-relaxed line-clamp-2">
                        {featured.subtitle}
                      </p>
                      <p className="font-sans text-lg text-[var(--foreground)] opacity-70 mb-8 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold group-hover:text-[var(--accent)] transition-colors">
                        Read Article 
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="py-20 text-center text-[var(--primary)] opacity-50 font-sans">
                No articles found for this category.
              </div>
            )}

            {/* Sub Grid */}
            {gridArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridArticles.map((article, idx) => (
                  <motion.div 
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link href={`/journal/${article.slug}`} className="group block h-full">
                      <div className="h-full bg-[var(--background)] p-8 rounded border border-[var(--primary)] border-opacity-10 hover:border-[var(--accent)] hover:shadow-lg transition-all flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">{article.category}</span>
                          <span className="text-[10px] uppercase tracking-widest text-[var(--primary)] opacity-40">{article.readTime}</span>
                        </div>
                        <h3 className="font-serif text-3xl text-[var(--primary)] mb-4 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="font-sans text-sm text-[var(--foreground)] opacity-70 flex-grow mb-8 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
                          Read 
                          <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
