"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScriptureBlockProps {
  verse: string;
  reference: string;
  commentary?: string;
  compact?: boolean;
}

export default function ScriptureBlock({ verse, reference, commentary, compact = false }: ScriptureBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`overflow-hidden rounded shadow-sm border border-secondary ${compact ? 'my-4' : 'my-8'}`}>
      <div 
        className={`${compact ? 'p-4 md:p-5' : 'p-6 md:p-8'} bg-secondary ${compact ? 'border-l-2' : 'border-l-4'} border-accent transition-colors ${commentary && !compact ? 'cursor-pointer hover:opacity-80' : ''}`}
        onClick={() => commentary && !compact && setIsExpanded(!isExpanded)}
      >
        <blockquote className={`font-serif italic text-primary leading-relaxed mb-4 ${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
          "{verse}"
        </blockquote>
        <div className={`flex items-center justify-between font-sans text-accent-secondary uppercase tracking-widest font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
          <span>— {reference}</span>
          {commentary && !compact && (
            <span className="text-primary opacity-50 flex items-center">
              {isExpanded ? "Collapse" : "Read Insight"}
              <svg 
                className={`ml-2 w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && commentary && !compact && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`p-6 md:p-8 bg-background border-l-4 border-background text-primary opacity-90 font-sans leading-relaxed text-base border-t border-secondary`}>
              {commentary}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
