"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScriptureBlock from "@/components/ScriptureBlock";
import versesData from "@/lib/verses.json";
import Link from "next/link";

type Emotion = keyof typeof versesData;
const emotions: Emotion[] = ["hopeful", "searching", "anxious", "lost", "grieving", "lonely", "thankful"];

const emotionStyles: Record<Emotion, { span: string; image: string }> = {
  hopeful: { span: "md:col-span-2 md:row-span-2 min-h-[250px] md:min-h-[400px]", image: "https://images.unsplash.com/photo-1490730141103-6cac27fcab94?q=80&w=1200&auto=format&fit=crop" },
  searching: { span: "md:col-span-1 md:row-span-2 min-h-[250px] md:min-h-[400px]", image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200&auto=format&fit=crop" },
  anxious: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "https://images.unsplash.com/photo-1542408719-74ce0fde095d?q=80&w=1200&auto=format&fit=crop" },
  lost: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" },
  grieving: { span: "md:col-span-2 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "https://images.unsplash.com/photo-1544829744-8cb23e4215f7?q=80&w=1200&auto=format&fit=crop" },
  lonely: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1600&auto=format&fit=crop" },
  thankful: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=2070&auto=format&fit=crop" },
};

export default function VersesPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [verseIndex, setVerseIndex] = useState(0);

  const handleSelectEmotion = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setVerseIndex(0);
  };

  const handleNextVerse = () => {
    if (!selectedEmotion) return;
    const max = versesData[selectedEmotion].length;
    setVerseIndex((prev) => (prev + 1) % max);
  };

  return (
    <div className="min-h-screen bg-background pt-45 md:pt-40 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4">
            How are you feeling?
          </h1>
          <p className="font-sans text-foreground opacity-80 text-lg">
            Let the living Word speak directly to your current season.
          </p>
        </motion.div>

        {!selectedEmotion ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-min"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {emotions.map((emotion, idx) => {
              const { span, image } = emotionStyles[emotion];
              return (
                <motion.button
                  key={emotion}
                  onClick={() => handleSelectEmotion(emotion)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className={`relative group overflow-hidden rounded-2xl flex items-end p-6 md:p-8 text-left transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent ${span}`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url('${image}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10 group-hover:via-background/40 transition-colors duration-500" />
                  
                  <div className="relative z-10 w-full flex justify-between items-end">
                    <span className="block font-serif text-3xl md:text-4xl text-primary tracking-wide capitalize group-hover:text-white transition-colors duration-300">
                      {emotion}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 bg-accent text-white p-3 rounded-full shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-serif text-3xl text-primary capitalize">
                {selectedEmotion}
              </h2>
              <button
                onClick={() => setSelectedEmotion(null)}
                className="text-accent-secondary text-sm font-sans uppercase tracking-widest hover:underline"
              >
                ← Back
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedEmotion}-${verseIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ScriptureBlock
                  verse={versesData[selectedEmotion][verseIndex].verse}
                  reference={versesData[selectedEmotion][verseIndex].reference}
                  commentary={versesData[selectedEmotion][verseIndex].commentary}
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={handleNextVerse}
                className="px-6 py-3 border border-accent text-primary rounded text-sm uppercase tracking-widest font-sans hover:bg-accent hover:text-background transition-colors w-full sm:w-auto"
              >
                Find Another Verse
              </button>

              <Link
                href="/verses/share"
                className="px-6 py-3 bg-accent text-background rounded text-sm uppercase tracking-widest font-sans hover:bg-accent-secondary transition-colors w-full sm:w-auto text-center"
              >
                Share Card Generator
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
