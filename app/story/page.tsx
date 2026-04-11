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
    bgUrl: "/images/story_chapter_1_1775916955792.png",
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
    bgUrl: "/images/story_chapter_2_1775916977570.png",
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
    bgUrl: "/images/story_chapter_3_1775916992475.png",
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
    bgUrl: "/images/story_chapter_4_1775917007451.png",
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
    bgUrl: "/images/story_chapter_5_1775917023853.png",
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
    bgUrl: "/images/story_chapter_6_1775917041433.png",
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
  // Use a lower amount threshold so detection still works on mobile where sections
  // may not fill a full viewport height.
  const isInView = useInView(ref, { amount: 0.3, margin: "0px 0px -5% 0px" });

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
    /*
     * Mobile layout: simple stacked column — image on top (relative, fixed height),
     * content below. Each section is fully self-contained so sections cannot bleed
     * into each other. The `sticky` trick only works reliably in a side-by-side
     * flex-row layout (desktop).
     *
     * Desktop (md+): classic sticky split-screen — left half sticky image,
     * right half scrollable content, section fills at least the viewport.
     */
    <section
      id={`chapter-${data.id}`}
      className="w-full flex flex-col md:flex-row md:min-h-screen md:items-stretch"
      ref={ref}
    >
      {/* Image panel */}
      <div
        className={[
          // Mobile: normal flow, fixed height, no sticky
          "w-full h-[45vw] min-h-[220px] max-h-[380px]",
          "bg-cover bg-center brightness-75 dark:brightness-50 transition-all duration-700",
          // Desktop: half-width, full viewport height, sticky
          "md:w-1/2 md:h-auto md:max-h-none md:min-h-0 md:sticky md:top-0 md:self-start md:h-screen md:brightness-100",
        ].join(" ")}
        style={{ backgroundImage: `url('${data.bgUrl}')` }}
      />

      {/* Content panel */}
      <div className="w-full md:w-1/2 px-6 py-10 md:p-16 lg:p-24 flex items-start md:items-center bg-background">
        <motion.div
          className="max-w-xl w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="font-serif text-5xl md:text-7xl text-accent opacity-30 font-bold tracking-tighter">
              {data.id.toString().padStart(2, '0')}
            </span>
            <span className="font-sans text-sm tracking-widest uppercase text-accent-secondary font-bold">
              {data.name}
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-6 leading-tight">
            &ldquo;{data.title}&rdquo;
          </h2>

          <div className="space-y-5 text-base md:text-lg text-foreground opacity-80 font-sans leading-relaxed">
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

  // Keep maxChapterReached in sync as the user scrolls forward in this session
  useEffect(() => {
    if (activeChapter > (maxChapterReached ?? 0)) {
      setMaxChapterReached(activeChapter);
    }
  }, [activeChapter, maxChapterReached]);


  const handleResume = () => {
    if (maxChapterReached) {
      document.getElementById(`chapter-${maxChapterReached}`)?.scrollIntoView({ behavior: 'smooth' });
    }
    setShowResumeBanner(false);
  };

  return (
    <div className="bg-background relative">
      <ChapterProgress totalChapters={chaptersData.length} activeChapter={activeChapter} />
      
      {chaptersData.map((chap, idx) => (
        <div key={chap.id}>
          <ChapterSection data={chap} setActiveChapter={setActiveChapter} />
          {/* Mobile-only divider — gives a clear visual break between chapters */}
          {idx < chaptersData.length - 1 && (
            <div className="md:hidden h-px bg-secondary opacity-60 mx-6" />
          )}
        </div>
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
