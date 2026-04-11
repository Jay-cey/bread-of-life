"use client";

interface ChapterProgressProps {
  totalChapters: number;
  activeChapter: number;
}

export default function ChapterProgress({ totalChapters, activeChapter }: ChapterProgressProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4">
      {Array.from({ length: totalChapters }, (_, i) => i + 1).map((chapter) => (
        <a
          key={chapter}
          href={`#chapter-${chapter}`}
          className="relative group p-2 focus:outline-none"
          aria-label={`Go to chapter ${chapter}`}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeChapter === chapter
                ? "bg-[var(--accent)] scale-125"
                : "bg-[var(--primary)] opacity-20 hover:opacity-100"
            }`}
          />
          <span
            className={`absolute right-8 top-1/2 -translate-y-1/2 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--accent)] transition-all duration-300 ${
              activeChapter === chapter ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
          >
            {chapter.toString().padStart(2, "0")}
          </span>
        </a>
      ))}
    </div>
  );
}
