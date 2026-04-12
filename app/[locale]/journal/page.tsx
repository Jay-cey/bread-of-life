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
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4">Faith Journal</h1>
            <p className="font-sans text-foreground opacity-70 text-lg">Editorial reflections on theology, scripture, and modern faith.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-sans rounded-full transition-colors border ${activeCategory === cat
                  ? "bg-primary text-background border-primary"
                  : "bg-transparent text-primary border-primary border-opacity-20 hover:border-opacity-100"
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
                  <div className="bg-secondary rounded-xl overflow-hidden border border-primary border-opacity-10 flex flex-col md:flex-row items-stretch transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-accent hover:border-opacity-40">
                    <div 
                      className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
                      style={{ backgroundImage: `url('${featured.image || 'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1600&auto=format&fit=crop'}')` }}
                    />
                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="bg-primary text-background px-3 py-1 text-[10px] uppercase tracking-widest rounded-full font-bold">
                          {featured.category}
                        </span>
                        <span className="font-sans text-xs text-primary opacity-50 uppercase tracking-widest">{featured.readTime}</span>
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 group-hover:text-accent transition-colors line-clamp-2">
                        {featured.title}
                      </h2>
                      <p className="font-serif italic text-xl md:text-2xl text-primary opacity-80 mb-6 leading-relaxed line-clamp-2">
                        {featured.subtitle}
                      </p>
                      <p className="font-sans text-lg text-foreground opacity-70 mb-8 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-primary font-bold group-hover:text-accent transition-colors">
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
              <div className="py-20 text-center text-primary opacity-50 font-sans">
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
                      <div className="h-full bg-background rounded-xl overflow-hidden border border-primary border-opacity-10 hover:border-accent hover:shadow-lg transition-all flex flex-col">
                        <div 
                          className="w-full h-48 bg-cover bg-center"
                          style={{ backgroundImage: `url('${article.image || 'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1600&auto=format&fit=crop'}')` }}
                        />
                        <div className="p-8 flex flex-col grow">
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{article.category}</span>
                            <span className="text-[10px] uppercase tracking-widest text-primary opacity-40">{article.readTime}</span>
                          </div>
                          <h3 className="font-serif text-3xl text-primary mb-4 group-hover:text-accent transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="font-sans text-sm text-foreground opacity-70 grow mb-8 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                          <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-primary font-bold opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all">
                            Read
                            <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </div>
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
