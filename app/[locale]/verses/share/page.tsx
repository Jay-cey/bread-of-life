"use client";

import { useState, useRef, useMemo } from "react";
import html2canvas from "html2canvas";
import versesData from "@/lib/verses.json";

// Flatten all verses into a single array for the dropdown
const allVerses = Object.values(versesData).flat();

type LayoutStyle = "editorial" | "minimal" | "bold";

export default function ShareCardGenerator() {
  const [selectedVerseId, setSelectedVerseId] = useState(allVerses[0]?.id || "");
  const [layout, setLayout] = useState<LayoutStyle>("editorial");
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedVerse = useMemo(() => {
    return allVerses.find(v => v.id === selectedVerseId) || allVerses[0];
  }, [selectedVerseId]);

  const generateCanvas = async () => {
    if (!cardRef.current) return null;
    await new Promise(r => setTimeout(r, 100)); // Layout settle
    return await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null
    });
  };

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const canvas = await generateCanvas();
      if (!canvas) return;
      
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = `bread-of-life-${selectedVerse.reference.replace(/\s/g, '-')}.png`;
      a.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleWhatsAppShare = async () => {
    try {
      setIsExporting(true);
      const canvas = await generateCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("Failed to compress image.");
          setIsExporting(false);
          return;
        }

        const file = new File([blob], 'bread-of-life-card.png', { type: 'image/png' });
        const shareData = {
          files: [file],
          title: "Bread of Life",
          text: `"${selectedVerse.verse}" - ${selectedVerse.reference}\n\nDiscover more at Bread of Life.`
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log("Share cancelled or failed", err);
          }
        } else {
          alert("Direct image sharing is not supported by your browser. Please 'Download' the image instead and share it manually to WhatsApp.");
        }
        setIsExporting(false);
      }, 'image/png');
    } catch (error) {
      console.error(error);
      setIsExporting(false);
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "minimal":
        return "text-[#333333] justify-center p-12";
      case "bold":
        return "bg-[#0B1437] text-white justify-center p-12";
      case "editorial":
      default:
        return "bg-[#FAF7F0] text-[#0B1437] justify-center p-12";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-45 md:pt-40 pb-32 px-6">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* Controls Column */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>
            <h1 className="font-serif text-4xl text-[var(--primary)] mb-2">Share Card</h1>
            <p className="font-sans text-[var(--foreground)] opacity-70 text-sm">Create a beautiful typography card to share God's word.</p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold">
              1. Choose a Verse
            </label>
            <select
              value={selectedVerseId}
              onChange={(e) => setSelectedVerseId(e.target.value)}
              className="w-full p-3 font-sans border border-[var(--primary)] border-opacity-20 rounded bg-[var(--background)] text-[var(--primary)] focus:outline-none focus:border-[var(--accent)]"
            >
              {allVerses.map(v => (
                <option key={v.id} value={v.id}>{v.reference}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-sans text-xs uppercase tracking-widest text-[var(--primary)] font-bold">
              2. Select Style
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setLayout("editorial")}
                className={`flex-1 py-2 text-xs uppercase tracking-widest rounded transition-colors border ${layout === 'editorial' ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]' : 'bg-transparent text-[var(--primary)] border-[var(--primary)] border-opacity-20 hover:border-opacity-100'}`}
              >
                Editorial
              </button>
              <button
                onClick={() => setLayout("minimal")}
                className={`flex-1 py-2 text-xs uppercase tracking-widest rounded transition-colors border ${layout === 'minimal' ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]' : 'bg-transparent text-[var(--primary)] border-[var(--primary)] border-opacity-20 hover:border-opacity-100'}`}
              >
                Minimal
              </button>
              <button
                onClick={() => setLayout("bold")}
                className={`flex-1 py-2 text-xs uppercase tracking-widest rounded transition-colors border ${layout === 'bold' ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]' : 'bg-transparent text-[var(--primary)] border-[var(--primary)] border-opacity-20 hover:border-opacity-100'}`}
              >
                Bold
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="w-full py-4 bg-[var(--primary)] text-[var(--background)] hover:bg-opacity-90 rounded font-sans uppercase tracking-widest font-bold text-sm transition-colors flex justify-center items-center"
            >
              {isExporting ? "Generating..." : "Download as PNG"}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="w-full py-4 bg-transparent border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded font-sans uppercase tracking-widest font-bold text-sm transition-colors flex justify-center items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share to WhatsApp
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="w-full lg:w-2/3 flex items-center justify-center p-4 md:p-12 bg-black bg-opacity-5 rounded overflow-hidden relative">
          
          {/* Card Container - using physical pixels strictly for html2canvas reliability */}
          <div
            ref={cardRef}
            className={`w-full max-w-[500px] aspect-square flex flex-col relative overflow-hidden ${getLayoutClasses()}`}
            style={{ 
              fontFamily: 'var(--font-serif), serif',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              ...(layout === 'minimal' ? {
                background: 'linear-gradient(to bottom right, #E2E8F0, #F8FAFC, #FFFFFF)'
              } : {}),
              ...(layout === 'bold' ? {
                backgroundImage: 'radial-gradient(circle at top right, rgba(212,175,55,0.25) 0%, transparent 60%), radial-gradient(circle at bottom left, rgba(212,175,55,0.15) 0%, transparent 60%)',
                backgroundColor: '#0B1437'
              } : {})
            }}
          >
            {layout === 'bold' && (
              <>
                <div className="absolute inset-0 border-[1px] m-6 rounded" style={{ borderColor: 'rgba(212,175,55,0.3)' }} />
                <div className="absolute inset-0 border-[1px] m-8 rounded" style={{ borderColor: 'rgba(212,175,55,0.1)' }} />
              </>
            )}

            {layout === 'editorial' && (
              <div className="absolute -top-16 left-4 text-[350px] font-serif text-[#0B1437] opacity-5 select-none leading-none z-0">
                "
              </div>
            )}

            {layout === 'minimal' && (
              <div className="absolute inset-4 backdrop-blur-3xl rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-0" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }} />
            )}

            <div className={`relative z-10 text-center flex-1 flex flex-col justify-center ${layout === 'minimal' ? 'px-10' : layout === 'bold' ? 'px-14' : 'px-10'}`}>
              
              {layout === 'editorial' && (
                <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mb-8" />
              )}

              <blockquote className={`italic leading-relaxed tracking-wide mb-8 ${layout === 'minimal' ? 'text-xl md:text-2xl text-[#1f2937]' : layout === 'bold' ? 'text-xl md:text-2xl text-white drop-shadow-md' : 'text-xl md:text-2xl text-[#0B1437]'}`}>
                "{selectedVerse.verse}"
              </blockquote>
              
              <div
                className={`uppercase tracking-[0.25em] font-sans font-bold ${layout === 'minimal' ? 'text-[10px] text-[#6b7280]' : layout === 'bold' ? 'text-[11px] text-[#D4AF37]' : 'text-[11px] text-[#6B2737]'}`}
                style={{ fontFamily: 'var(--font-sans), sans-serif' }}
              >
                — {selectedVerse.reference}
              </div>
            </div>

            <div
              className={`absolute bottom-8 left-0 right-0 text-center uppercase tracking-[0.3em] font-bold text-[9px] z-10`}
              style={{ 
                fontFamily: 'var(--font-sans), sans-serif',
                color: layout === 'minimal' ? '#9ca3af' : layout === 'bold' ? 'rgba(255,255,255,0.3)' : 'rgba(11,20,55,0.3)'
              }}
            >
              Bread of Life
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
