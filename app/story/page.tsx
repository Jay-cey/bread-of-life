"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ScriptureBlock from "@/components/ScriptureBlock";
import ChapterProgress from "@/components/ChapterProgress";

const chaptersData = [
  {
    id: 1,
    title: "In the beginning...",
    name: "Creation",
    bgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    paragraphs: [
      "God created the heavens and the earth. He spoke, and galaxies spun into existence. He formed the mountains, the oceans, and the forests. The masterpiece of His creation, however, was humanity. He carefully shaped us in His own image.",
      "We were made not just to exist, but to walk with Him in the perfection of Eden. Everything was whole. Everything was peace. Love was the rhythm of life."
    ],
    scripture: {
      verse: "God saw all that he had made, and it was very good.",
      reference: "Genesis 1:31",
      commentary: "Creation was an act of profound love. God's design was not flawed or chaotic. We were brought into existence to participate in this perfect goodness."
    }
  },
  {
    id: 2,
    title: "But humanity chose their own way...",
    name: "The Fall",
    bgUrl: "https://images.unsplash.com/photo-1505527376092-2cc7b05553e1?q=80&w=2070&auto=format&fit=crop",
    paragraphs: [
      "Despite the perfection of Eden, a choice remained. Love is not true love if it is forced. Humanity was given the freedom to choose, and we chose to rebel. The lie was whispered that we could be our own gods.",
      "In reaching for that forbidden autonomy, our ancestors severed the cord of life. The perfect union with the Creator was broken, plunging the world into darkness."
    ],
    scripture: {
      verse: "For all have sinned and fall short of the glory of God.",
      reference: "Romans 3:23",
      commentary: "Sin isn't merely breaking a rule; it is a fracture in our relationship with the Author of Life. It is a universal human condition that separates us from true fulfillment."
    }
  },
  {
    id: 3,
    title: "Sin separated us from God...",
    name: "Brokenness",
    bgUrl: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop",
    paragraphs: [
      "The consequences were immediate and enduring. The harmony was shattered. Pain, shame, and death entered the human experience. We found ourselves wandering through history, unable to fix the deepest ache of our hearts.",
      "A chasm was formed that no amount of good deeds, philosophy, or human effort could bridge. The debt of rebellion was death, and we were spiritually bankrupt."
    ],
    scripture: {
      verse: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
      reference: "Romans 6:23",
      commentary: "This 'death' is both physical and spiritual separation from God. It is a debt we earned, but God immediately offers a solution we could never earn."
    }
  },
  {
    id: 4,
    title: "God did not abandon us...",
    name: "The Cross",
    bgUrl: "https://images.unsplash.com/photo-1544070085-f5596b6b7183?q=80&w=1974&auto=format&fit=crop",
    paragraphs: [
      "In the greatest act of love history has ever known, God stepped across the chasm. The Creator became the created. Jesus Christ left the perfection of heaven to enter our brokenness.",
      "He lived the perfect life we could not live, and died the tortuous death that we deserved. On the cross, He carried the immense weight of our sin, paying our debt in full."
    ],
    scripture: {
      verse: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
      reference: "Romans 5:8",
      commentary: "He didn't wait for us to clean ourselves up. He didn't wait for us to deserve it. In the midst of our rebellion, He subjected Himself to unimaginable suffering to bring us back."
    }
  },
  {
    id: 5,
    title: "Death could not hold Him...",
    name: "Resurrection",
    bgUrl: "https://images.unsplash.com/photo-1506085695505-1811ee85fbee?q=80&w=2014&auto=format&fit=crop",
    paragraphs: [
      "The story did not end in a tomb. Three days later, Jesus rose from the dead, entirely defeating the power of sin and death. This was not a metaphor—it was a literal, historical triumph.",
      "His resurrection means that the debt is fully cleared. It means that physical death is no longer a permanent end, but a doorway. He conquered the grave to offer us new life."
    ],
    scripture: {
      verse: "I am the resurrection and the life. The one who believes in me will live, even though they die.",
      reference: "John 11:25",
      commentary: "Because He lives, the power that raised Him is available to us. We are offered a resurrected life right now, and the profound hope of eternal life."
    }
  },
  {
    id: 6,
    title: "The invitation is still open...",
    name: "Salvation Today",
    bgUrl: "https://images.unsplash.com/photo-1490283086708-348e89547ea7?q=80&w=1953&auto=format&fit=crop",
    paragraphs: [
      "This entire grand narrative hinges on a personal invitation. Jesus offers forgiveness and restored relationship as a free gift, but like any gift, it must be willingly received.",
      "You don't need to be perfect to receive it. All that is required is faith—to trust in what He has done on the cross, to turn away from a life lived independently of Him, and to surrender your life into His saving hands."
    ],
    scripture: {
      verse: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.",
      reference: "Ephesians 2:8",
      commentary: "Grace means unmerited favor. There are no religious hoops to jump through. To step into this story, simply talk to God, confess your need for Him, and believe."
    }
  }
];

function ChapterSection({ data, setActiveChapter }: { data: typeof chaptersData[0], setActiveChapter: (id: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveChapter(data.id);
      
      // Save max chapter reached to localStorage
      const savedMax = parseInt(localStorage.getItem('maxChapter') || '1', 10);
      if (data.id > savedMax) {
        localStorage.setItem('maxChapter', data.id.toString());
      }
    }
  }, [isInView, data.id, setActiveChapter]);

  return (
    <section id={`chapter-${data.id}`} className="min-h-screen w-full relative flex flex-col md:flex-row items-stretch" ref={ref}>
      {/* Background Media Side */}
      <div 
        className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 bg-cover bg-center brightness-75 md:brightness-100 dark:brightness-50 transition-all duration-700"
        style={{ backgroundImage: `url('${data.bgUrl}')` }}
      />
      
      {/* Scrollable Content Side */}
      <div className="w-full md:w-1/2 p-6 md:p-16 lg:p-24 flex items-center bg-background">
        <motion.div 
          className="max-w-xl w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-serif text-5xl md:text-7xl text-accent opacity-30 font-bold tracking-tighter">
              {data.id.toString().padStart(2, '0')}
            </span>
            <span className="font-sans text-sm tracking-widest uppercase text-accent-secondary font-bold">
              {data.name}
            </span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8 leading-tight">
            "{data.title}"
          </h2>

          <div className="space-y-6 text-lg text-foreground opacity-80 font-sans leading-relaxed">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ScriptureBlock 
            verse={data.scripture.verse}
            reference={data.scripture.reference}
            commentary={data.scripture.commentary}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default function StoryPage() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [maxChapterReached, setMaxChapterReached] = useState<number | null>(null);
  const [showResumeBanner, setShowResumeBanner] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('maxChapter');
    if (saved) {
      const maxId = parseInt(saved, 10);
      if (maxId > 1) {
        setMaxChapterReached(maxId);
        setShowResumeBanner(true);
      }
    }
  }, []);

  const handleResume = () => {
    if (maxChapterReached) {
      document.getElementById(`chapter-${maxChapterReached}`)?.scrollIntoView({ behavior: 'smooth' });
    }
    setShowResumeBanner(false);
  };

  return (
    <div className="bg-background relative">
      <ChapterProgress totalChapters={chaptersData.length} activeChapter={activeChapter} />
      
      {chaptersData.map((chap) => (
        <ChapterSection key={chap.id} data={chap} setActiveChapter={setActiveChapter} />
      ))}

      {/* Sticky Bottom Resume Banner */}
      <AnimatePresence>
        {showResumeBanner && maxChapterReached && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-secondary bg-nav-bg backdrop-blur-md shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex justify-between items-center"
          >
            <div className="max-w-7xl mx-auto flex w-full flex-col sm:flex-row justify-between items-center px-4">
              <span className="text-primary font-sans text-sm md:text-base font-medium">
                Welcome back. You left off at <strong className="text-accent pl-1">Chapter {maxChapterReached}</strong>
              </span>
              <div className="mt-3 sm:mt-0 flex gap-4 items-center">
                <button 
                  onClick={() => setShowResumeBanner(false)}
                  className="text-xs uppercase tracking-wider text-primary opacity-50 hover:opacity-100 transition-opacity font-sans"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleResume}
                  className="px-6 py-2 bg-accent text-background hover:bg-accent-secondary hover:text-white transition-colors text-sm font-sans uppercase tracking-wider rounded"
                >
                  Continue Story →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
