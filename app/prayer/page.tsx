"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PrayerSubmission {
  id: string;
  name: string;
  prayer: string;
  timestamp: string;
}

export default function PrayerCorner() {
  const [name, setName] = useState("");
  const [prayer, setPrayer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentPrayers, setRecentPrayers] = useState<PrayerSubmission[]>([]);

  useEffect(() => {
    // Load prayers from storage
    const loadPrayers = () => {
      try {
        const stored = localStorage.getItem("prayerWall");
        if (stored) {
          setRecentPrayers(JSON.parse(stored));
        }
      } catch (e) {}
    };
    loadPrayers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayer.trim()) return;

    setIsSubmitting(true);

    const newPrayer: PrayerSubmission = {
      id: Date.now().toString(),
      name: name.trim() || "",
      prayer: prayer.trim(),
      timestamp: new Date().toISOString()
    };

    // Simulate slight network delay for reflective UX feeling
    setTimeout(() => {
      const stored = localStorage.getItem("prayerWall");
      let currentPrayers: PrayerSubmission[] = [];
      try {
        if (stored) currentPrayers = JSON.parse(stored);
      } catch (err) {}

      // Add new, keep max 5
      currentPrayers = [newPrayer, ...currentPrayers].slice(0, 5);
      
      localStorage.setItem("prayerWall", JSON.stringify(currentPrayers));
      setRecentPrayers(currentPrayers);
      
      setPrayer("");
      setName("");
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16 pb-32 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-sans text-sm tracking-widest uppercase text-[var(--accent)] font-bold mb-4 block">
            A Safe Space
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--primary)] mb-6">
            Prayer Corner
          </h1>
          <p className="font-sans text-[var(--foreground)] opacity-70 text-lg max-w-xl mx-auto">
            You do not have to carry your burdens alone. Leave a request below, 
            knowing that God hears you exactly where you are.
          </p>
        </motion.div>

        <motion.div 
          className="w-full max-w-2xl bg-[var(--secondary)] bg-opacity-50 p-8 md:p-12 rounded-lg mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2 opacity-60">
                First Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anonymous"
                className="w-full bg-transparent border-b border-[var(--primary)] border-opacity-20 py-3 text-[var(--primary)] font-sans focus:outline-none focus:border-opacity-100 transition-colors placeholder:opacity-30"
              />
            </div>
            
            <div>
              <label htmlFor="prayer" className="block font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2 opacity-60">
                Your Prayer Request *
              </label>
              <textarea
                id="prayer"
                value={prayer}
                onChange={(e) => setPrayer(e.target.value)}
                required
                rows={5}
                placeholder="Lord, I ask that..."
                className="w-full bg-transparent border border-[var(--primary)] border-opacity-10 rounded p-4 text-[var(--primary)] font-sans focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:opacity-30 resize-y"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !prayer.trim()}
                className="px-8 py-3 bg-[var(--accent)] text-[var(--background)] rounded font-sans uppercase tracking-widest text-sm hover:bg-[var(--accent-secondary)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Leave Request"}
              </button>
            </div>
          </form>
        </motion.div>

        {recentPrayers.length > 0 && (
          <div className="w-full max-w-2xl">
            <h3 className="font-serif text-3xl text-[var(--primary)] mb-8 text-center opacity-80">
              Recent Prayers
            </h3>
            <div className="space-y-6">
              <AnimatePresence>
                {recentPrayers.map((req) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-[var(--secondary)] rounded shadow-sm border-l-2 border-[var(--accent)] border-opacity-40"
                  >
                    <p className="font-serif italic text-xl text-[var(--primary)] leading-relaxed mb-4">
                      "{req.prayer}"
                    </p>
                    <div className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] opacity-50 flex items-center justify-between">
                      {req.name ? req.name : "Anonymous"}
                      <span>• praying</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
