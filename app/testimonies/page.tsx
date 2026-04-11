"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface Testimony {
  id: string;
  name: string | null;
  before_text: string;
  encounter_text: string;
  after_text: string;
  created_at: string;
}

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [beforeText, setBeforeText] = useState("");
  const [encounterText, setEncounterText] = useState("");
  const [afterText, setAfterText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchTestimonies = async () => {
      const { data, error } = await supabase
        .from('testimonies')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
        
      if (data && !error) {
        setTestimonies(data as Testimony[]);
      }
    };
    
    fetchTestimonies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeText.trim() || !encounterText.trim() || !afterText.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase.from('testimonies').insert({
      name: name.trim() || null,
      before_text: beforeText.trim(),
      encounter_text: encounterText.trim(),
      after_text: afterText.trim()
    });

    setIsSubmitting(false);

    if (!error) {
      setBeforeText("");
      setEncounterText("");
      setAfterText("");
      setName("");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsDrawerOpen(false);
      }, 3000);
    } else {
      alert("Failed to submit story. Please try again.");
    }
  };

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isDrawerOpen]);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl text-[var(--primary)] mb-4">
              Testimonies
            </h1>
            <p className="font-sans text-[var(--foreground)] opacity-70 text-lg max-w-xl">
              These are real stories of encounter with God. 
              The power of a testimony is that it proves what God does for one, He can do for another.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-8 py-4 bg-[var(--accent)] text-[var(--background)] rounded font-sans uppercase tracking-widest text-sm hover:bg-[var(--accent-secondary)] hover:text-white transition-all shadow-lg"
            >
              Share your story
            </button>
          </motion.div>
        </div>

        {/* Testimonies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonies.map((t, idx) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[var(--secondary)] rounded-lg p-8 md:p-12 border border-[var(--primary)] border-opacity-10 shadow-sm"
            >
              <div className="mb-8 pb-8 border-b border-[var(--primary)] border-opacity-10">
                <span className="font-sans text-xs uppercase tracking-widest text-[var(--accent)] font-bold mb-4 block">Before</span>
                <p className="font-serif text-xl leading-relaxed text-[var(--primary)] opacity-90">{t.before_text}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-[var(--primary)] border-opacity-10">
                <span className="font-sans text-xs uppercase tracking-widest text-[var(--accent)] font-bold mb-4 block">The Encounter</span>
                <p className="font-serif text-xl leading-relaxed text-[var(--primary)] opacity-90">{t.encounter_text}</p>
              </div>

              <div className="mb-10">
                <span className="font-sans text-xs uppercase tracking-widest text-[var(--accent)] font-bold mb-4 block">After</span>
                <p className="font-serif text-xl leading-relaxed text-[var(--primary)] opacity-90">{t.after_text}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] opacity-10" />
                <span className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold">
                  {t.name ? t.name : "Anonymous believer"}
                </span>
              </div>
            </motion.div>
          ))}
          {testimonies.length === 0 && (
            <p className="font-sans text-[var(--primary)] opacity-50 italic">No testimonies available yet.</p>
          )}
        </div>
      </div>

      {/* Slide-in Submission Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-[var(--background)] shadow-2xl z-50 overflow-y-auto border-l border-[var(--primary)] border-opacity-10"
            >
              <div className="p-8 md:p-12 relative min-h-full flex flex-col">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-8 right-8 text-[var(--primary)] opacity-50 hover:opacity-100 transition-opacity"
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="font-serif text-4xl text-[var(--primary)] mb-4">Share Your Story</h2>
                <p className="font-sans text-[var(--foreground)] opacity-70 mb-10">
                  Your testimony is a weapon against darkness. Tell us what God has done.
                </p>

                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-[var(--secondary)] p-8 rounded text-center flex-1 flex flex-col items-center justify-center border border-[var(--accent)] border-opacity-30"
                    >
                      <svg className="w-12 h-12 text-[#C9A84C] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <h3 className="font-serif text-2xl text-[var(--primary)] mb-2">Thank you.</h3>
                      <p className="font-sans text-sm text-[var(--primary)] opacity-70">Your story matters. It is currently pending moderation and will appear soon.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="flex flex-col gap-8 flex-1"
                      exit={{ opacity: 0 }}
                    >
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
                          Your Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Anonymous"
                          className="w-full bg-[var(--secondary)] rounded p-4 text-[var(--primary)] font-sans focus:outline-none focus:ring-1 ring-[var(--accent)] border border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
                          Before <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-[var(--primary)] opacity-50 mb-2">What was your life, situation, or struggle like before?</p>
                        <textarea
                          required
                          rows={3}
                          value={beforeText}
                          onChange={(e) => setBeforeText(e.target.value)}
                          className="w-full bg-[var(--secondary)] rounded p-4 text-[var(--primary)] font-sans focus:outline-none focus:ring-1 ring-[var(--accent)] border border-transparent transition-all resize-none"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
                          The Encounter <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-[var(--primary)] opacity-50 mb-2">How did God intervene or reveal Himself?</p>
                        <textarea
                          required
                          rows={3}
                          value={encounterText}
                          onChange={(e) => setEncounterText(e.target.value)}
                          className="w-full bg-[var(--secondary)] rounded p-4 text-[var(--primary)] font-sans focus:outline-none focus:ring-1 ring-[var(--accent)] border border-transparent transition-all resize-none"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
                          After <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-[var(--primary)] opacity-50 mb-2">What has changed? What is life like now?</p>
                        <textarea
                          required
                          rows={3}
                          value={afterText}
                          onChange={(e) => setAfterText(e.target.value)}
                          className="w-full bg-[var(--secondary)] rounded p-4 text-[var(--primary)] font-sans focus:outline-none focus:ring-1 ring-[var(--accent)] border border-transparent transition-all resize-none"
                        />
                      </div>

                      <div className="mt-auto pt-8">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-[var(--accent)] text-[var(--background)] rounded font-sans uppercase tracking-widest text-sm hover:bg-[var(--accent-secondary)] hover:text-white transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Testimony"}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
