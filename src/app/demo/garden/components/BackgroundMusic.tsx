"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We try to play on the first scroll event, if they haven't interacted yet.
    const handleScroll = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {
          // Auto-play was blocked by browser. User must click the button.
          console.log("Autoplay prevented by browser. User must click to play.");
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setHasInteracted(true);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/moonpetalmedia-today-i-wear-forever-soft-romantic-wedding-ballad-female-vocals-556205.mp3" 
        loop 
      />
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#1A1614]/80 backdrop-blur-md flex items-center justify-center border border-[#C9A96E]/30 text-[#EEDCBE] shadow-2xl hover:scale-105 transition-transform"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          // Playing Icon (bars)
          <div className="flex gap-1 items-center justify-center h-4">
            <motion.div animate={{ scaleY: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 h-3 bg-current rounded-full" />
            <motion.div animate={{ scaleY: [1, 2.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 h-4 bg-current rounded-full" />
            <motion.div animate={{ scaleY: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 h-2 bg-current rounded-full" />
          </div>
        ) : (
          // Muted Icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </motion.button>
    </>
  );
}
