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

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      
      // Delay briefly to let the UI update if needed, though not strictly required
      await new Promise(r => setTimeout(r, 100));

      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: null // Inherit from element
      });
      
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = `bread-of-life-${selectedVerse.reference.replace(/\s/g, '-')}.png`;
      a.click();
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generated image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `"${selectedVerse.verse}" - ${selectedVerse.reference}\n\nDiscover more at Bread of Life.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Layout style mappings
  const getLayoutClasses = () => {
    switch (layout) {
      case "minimal":
        return "bg-white text-gray-900 justify-center p-12";
      case "bold":
        return "bg-[#0B1437] text-white justify-center p-10";
      case "editorial":
      default:
        // Use standard theme variables simulated physically for html2canvas
        return "bg-[#FAF7F0] text-[#0B1437] justify-center p-12";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16 pb-32 px-6">
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
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share to WhatsApp
            </button>
          </div>
        </div>

        {/* Preview Column */}
        <div className="w-full lg:w-2/3 flex items-center justify-center p-4 md:p-12 bg-black bg-opacity-5 rounded overflow-hidden">
          {/* Card Container - using physical pixels strictly for html2canvas reliability */}
          <div 
            ref={cardRef}
            className={`w-full max-w-[500px] aspect-square flex flex-col relative shadow-2xl overflow-hidden ${getLayoutClasses()}`}
            style={{ fontFamily: 'var(--font-serif), serif' }}
          >
            {layout === 'bold' && (
              <div className="absolute inset-0 border-8 border-[#C9A84C] m-4 pointer-events-none" />
            )}
            
            <div className={`relative z-10 text-center flex-1 flex flex-col justify-center ${layout === 'minimal' ? 'px-8' : layout === 'bold' ? 'px-12' : ''}`}>
              <blockquote className={`italic leading-snug mb-8 ${layout === 'minimal' ? 'text-2xl text-gray-700' : layout === 'bold' ? 'text-4xl text-[#C9A84C]' : 'text-3xl text-[#0B1437]'}`}>
                "{selectedVerse.verse}"
              </blockquote>
              <div 
                className={`uppercase tracking-[0.2em] font-sans font-bold ${layout === 'minimal' ? 'text-xs text-gray-500' : layout === 'bold' ? 'text-sm text-white' : 'text-sm text-[#6B2737]'}`}
                style={{ fontFamily: 'var(--font-sans), sans-serif' }}
              >
                — {selectedVerse.reference}
              </div>
            </div>

            <div 
              className={`absolute bottom-6 left-0 right-0 text-center uppercase tracking-widest font-bold text-[10px] ${layout === 'minimal' ? 'text-gray-300' : layout === 'bold' ? 'text-white opacity-20' : 'text-[#0B1437] opacity-30'}`}
              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
            >
              Bread of Life
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
