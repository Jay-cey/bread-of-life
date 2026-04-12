import { notFound } from "next/navigation";
import Link from "next/link";
import journalData from "@/lib/journal.json";
import ScriptureBlock from "@/components/ScriptureBlock";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return journalData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = journalData.find((a) => a.slug === slug);
  if (!article) return {};

  const ogUrl = new URL(
    `/api/og?title=${encodeURIComponent(article.title)}&verse=${encodeURIComponent(article.subtitle)}&type=Journal`,
    'https://bread-of-life-tawny.vercel.app'
  );

  return {
    title: `${article.title} | Faith Journal`,
    description: article.subtitle,
    openGraph: {
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogUrl.toString()],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = journalData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Immersive Banner Header */}
      <header className="relative w-full h-[60vh] min-h-[400px] flex items-end pb-16 px-6 pt-40">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${article.image || 'https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1600&auto=format&fit=crop'}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/20" />
        
        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-primary opacity-60 hover:opacity-100 hover:text-accent font-sans text-xs uppercase tracking-widest font-bold transition-all mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Journal
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-accent text-background px-3 py-1 text-[10px] uppercase tracking-widest rounded-full font-bold shadow-sm">
              {article.category}
            </span>
            <span className="font-sans text-xs text-primary opacity-70 uppercase tracking-widest">
              {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-6 leading-[1.1]">
            {article.title}
          </h1>

          <p className="font-serif italic text-2xl text-primary opacity-80 leading-relaxed">
            {article.subtitle}
          </p>
        </div>
      </header>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 mt-16">

        <article className="font-sans text-lg md:text-xl text-foreground opacity-90 leading-loose space-y-10">
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

        <footer className="mt-20 pt-10 border-t border-primary border-opacity-10 text-center">
          <p className="font-sans text-sm text-primary opacity-50 uppercase tracking-widest">
            End of Article
          </p>
        </footer>
      </div>
    </div>
  );
}
