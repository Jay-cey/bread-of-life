"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScriptureBlock from "@/components/ScriptureBlock";
import versesData from "@/lib/verses.json";
import Link from "next/link";

type Emotion = keyof typeof versesData;
const emotions: Emotion[] = ["anxious", "lost", "hopeful", "grieving", "lonely", "thankful", "searching"];

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
    <div className="min-h-screen bg-[var(--background)] pt-45 md:pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--primary)] mb-4">
            How are you feeling?
          </h1>
          <p className="font-sans text-[var(--foreground)] opacity-80 text-lg">
            Let the living Word speak directly to your current season.
          </p>
        </motion.div>

        {!selectedEmotion ? (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {emotions.map((emotion) => (
              <button
                key={emotion}
                onClick={() => handleSelectEmotion(emotion)}
                className="py-6 px-4 bg-[var(--secondary)] border border-[var(--primary)] border-opacity-10 rounded shadow-sm hover:border-[var(--accent)] hover:shadow-md transition-all group focus:outline-none"
              >
                <span className="block font-serif text-2xl text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors capitalize">
                  {emotion}
                </span>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-serif text-3xl text-[var(--primary)] capitalize">
                {selectedEmotion}
              </h2>
              <button
                onClick={() => setSelectedEmotion(null)}
                className="text-[var(--accent-secondary)] text-sm font-sans uppercase tracking-widest hover:underline"
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
                className="px-6 py-3 border border-[var(--accent)] text-[var(--primary)] rounded text-sm uppercase tracking-widest font-sans hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors w-full sm:w-auto"
              >
                Find Another Verse
              </button>

              <Link
                href="/verses/share"
                className="px-6 py-3 bg-[var(--accent)] text-[var(--background)] rounded text-sm uppercase tracking-widest font-sans hover:bg-[var(--accent-secondary)] transition-colors w-full sm:w-auto text-center"
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
