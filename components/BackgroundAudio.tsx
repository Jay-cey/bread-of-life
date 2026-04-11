"use client";

import { useEffect, useState, useRef } from "react";

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check localStorage for user preference
    const savedPref = localStorage.getItem("audioPref");
    if (savedPref === "playing") {
      // Browsers often block autoplay without user interaction, 
      // but we'll flag it and try.
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented by browser, fallback to paused
          setIsPlaying(false);
          localStorage.setItem("audioPref", "paused");
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Handle tab visibility to pause when not active
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      
      if (document.hidden) {
        if (isPlaying) audioRef.current.pause();
      } else {
        if (isPlaying) audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    localStorage.setItem("audioPref", !isPlaying ? "playing" : "paused");
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/02/07/audio_c3ea31518b.mp3?filename=ambient-piano-amp-strings-10711.mp3" 
        preload="auto"
      />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={`fixed bottom-6 left-6 z-50 p-3 rounded-full shadow-lg border transition-all duration-300 flex items-center justify-center 
          ${isPlaying 
            ? 'bg-[var(--accent)] border-transparent text-[var(--background)]' 
            : 'bg-[var(--nav-bg)] backdrop-blur-sm border-[var(--secondary)] text-[var(--primary)] opacity-70 hover:opacity-100'}`}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </>
  );
}
