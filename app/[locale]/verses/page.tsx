"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScriptureBlock from "@/components/ScriptureBlock";
import versesData from "@/lib/verses.json";
import Link from "next/link";

type Emotion = keyof typeof versesData;
const emotions: Emotion[] = ["hopeful", "searching", "anxious", "lost", "grieving", "lonely", "thankful"];

const emotionStyles: Record<Emotion, { span: string; image: string }> = {
  hopeful: { span: "md:col-span-2 md:row-span-2 min-h-[250px] md:min-h-[400px]", image: "/images/hopeful.jpg" },
  searching: { span: "md:col-span-1 md:row-span-2 min-h-[250px] md:min-h-[400px]", image: "/images/searching2.jpg" },
  anxious: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "/images/anxious.jpg" },
  lost: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "/images/lost4.jpg" },
  grieving: { span: "md:col-span-2 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "/images/grief2.jpg" },
  lonely: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "/images/lonely2.jpg" },
  thankful: { span: "md:col-span-1 md:row-span-1 min-h-[150px] md:min-h-[200px]", image: "/images/thankful.jpg" },
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 w-full flex justify-between items-end">
                    <span className="block font-serif text-3xl md:text-4xl text-white tracking-wide capitalize transition-colors duration-300">
                      {emotion}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 bg-background text-primary p-3 rounded-full shadow-lg">
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
            className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[40vh] flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Immersive Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${emotionStyles[selectedEmotion].image}')` }}
            />
            {/* Deep Overlay for reading clarity */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1437] via-[#0B1437]/90 to-[#0B1437]/70" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full flex-1 p-6 md:p-10">
              
              {/* Header inside the immersive view */}
              <div className="flex justify-between items-center mb-12">
                <span className="font-sans text-xs uppercase tracking-widest text-[#D4AF37] font-bold border border-[#D4AF37]/30 px-4 py-2 rounded-full">
                  Feeling {selectedEmotion}
                </span>
                <button
                  onClick={() => setSelectedEmotion(null)}
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-2 font-sans text-xs uppercase tracking-widest"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="hidden sm:inline">Return to Grid</span>
                  <span className="sm:hidden">Back</span>
                </button>
              </div>

              {/* Central Verse Space using Glassmorphism */}
              <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedEmotion}-${verseIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] md:shadow-[0_0_80px_rgba(212,175,55,0.2)] relative"
                  >
                    {/* Recreating scripture visually to guarantee contrast over dark imagery */}
                    <div className="text-center">
                      <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-8">
                        {versesData[selectedEmotion][verseIndex].verse}
                      </p>
                      <span className="inline-block font-sans text-xs md:text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-6">
                        — {versesData[selectedEmotion][verseIndex].reference}
                      </span>
                      
                      {versesData[selectedEmotion][verseIndex].commentary && (
                        <div className="pt-6 border-t border-white/10 mt-2">
                          <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed italic">
                            {versesData[selectedEmotion][verseIndex].commentary}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={handleNextVerse}
                  className="px-6 py-3 bg-transparent border border-white/20 text-white rounded font-sans text-[10px] sm:text-xs uppercase tracking-widest hover:border-white hover:bg-white/10 transition-all w-full sm:w-auto"
                >
                  Read Another Verse
                </button>

                <Link
                  href="/verses/share"
                  className="px-6 py-3 bg-[#D4AF37] text-[#0B1437] rounded font-sans text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-[#F4CF57] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all w-full sm:w-auto text-center"
                >
                  Create Share Card
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
