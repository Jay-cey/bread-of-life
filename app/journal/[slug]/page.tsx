import { notFound } from "next/navigation";
import Link from "next/link";
import journalData from "@/lib/journal.json";
import ScriptureBlock from "@/components/ScriptureBlock";

export async function generateStaticParams() {
  return journalData.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = journalData.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pt-40 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/journal"
          className="inline-flex items-center gap-2 text-[var(--primary)] opacity-50 hover:opacity-100 hover:text-[var(--accent)] font-sans text-xs uppercase tracking-widest font-bold transition-all mb-16"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Journal
        </Link>
        
        <header className="mb-16 border-b border-[var(--primary)] border-opacity-10 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[var(--accent)] text-[var(--background)] px-3 py-1 text-[10px] uppercase tracking-widest rounded-full font-bold">
              {article.category}
            </span>
            <span className="font-sans text-xs text-[var(--primary)] opacity-50 uppercase tracking-widest">
              {article.readTime}
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--primary)] mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="font-serif italic text-2xl text-[var(--primary)] opacity-80 leading-relaxed">
            {article.subtitle}
          </p>
        </header>

        <article className="font-sans text-lg md:text-xl text-[var(--foreground)] opacity-90 leading-loose space-y-10">
          {article.content.map((block: any, idx: number) => {
            if (block.type === "paragraph") {
              return (
                <p key={idx}>
                  {block.text}
                </p>
              );
            }
            if (block.type === "scripture") {
              return (
                <div key={idx} className="my-12">
                  <ScriptureBlock 
                    verse={block.verse || ""}
                    reference={block.reference || ""}
                    commentary={block.commentary}
                  />
                </div>
              );
            }
            return null;
          })}
        </article>

        <footer className="mt-20 pt-10 border-t border-[var(--primary)] border-opacity-10 text-center">
          <p className="font-sans text-sm text-[var(--primary)] opacity-50 uppercase tracking-widest">
            End of Article
          </p>
        </footer>
      </div>
    </div>
  );
}
