"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface PrayerSubmission {
  id: string;
  name: string | null;
  content: string;
  created_at: string;
  approved: boolean;
}

export default function PrayerCorner() {
  const [name, setName] = useState("");
  const [prayer, setPrayer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentPrayers, setRecentPrayers] = useState<PrayerSubmission[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // 1. Fetch initial robust load of approved prayers
    const fetchPrayers = async () => {
      const { data, error } = await supabase
        .from('prayers')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(20);
        
      if (data && !error) {
        setRecentPrayers(data as PrayerSubmission[]);
      }
    };
    
    fetchPrayers();

    // 2. Subscribe to Postgres Changes to update list in realtime when a prayer is approved
    const channel = supabase
      .channel('public:prayers')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'prayers' },
        (payload) => {
          // If a new prayer is inserted and approved, or updated to be approved
          if (payload.eventType === 'INSERT' && payload.new.approved === true) {
            setRecentPrayers(prev => [payload.new as PrayerSubmission, ...prev].slice(0, 20));
          } else if (payload.eventType === 'UPDATE' && payload.new.approved === true) {
            // Either it became approved just now, or it was updated. Just refetch cleanly for simplicity
            fetchPrayers();
          } else if (payload.eventType === 'DELETE') {
            setRecentPrayers(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayer.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase.from('prayers').insert({
      name: name.trim() || null,
      content: prayer.trim()
    });

    setIsSubmitting(false);

    if (!error) {
      setPrayer("");
      setName("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      alert("There was an issue submitting your prayer. Please try again.");
    }
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
            knowing that God hears you exactly where you are. Your request will be securely processed and added to the wall upon review.
          </p>
        </motion.div>

        <motion.div 
          className="w-full max-w-2xl bg-[var(--secondary)] bg-opacity-50 p-8 md:p-12 rounded-lg mb-20 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-[var(--secondary)] rounded-lg flex flex-col items-center justify-center p-8 text-center"
              >
                <h3 className="font-serif text-3xl text-[var(--primary)] mb-4">Prayer Submitted</h3>
                <p className="font-sans text-[var(--primary)] opacity-70 mb-8 max-w-md">
                  Thank you for trusting this community. Your prayer has been received and will appear on the wall shortly after moderation.
                </p>
                <button onClick={() => setShowSuccess(false)} className="px-6 py-2 border border-[var(--primary)] border-opacity-20 rounded text-sm uppercase tracking-widest hover:bg-[var(--primary)] hover:text-[var(--background)] transition-colors">
                  Submit Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>

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
              Community Prayers
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
                      "{req.content}"
                    </p>
                    <div className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] opacity-50 flex items-center justify-between">
                      {req.name ? req.name : "Anonymous believer"}
                      <span>
                        {new Date(req.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
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
