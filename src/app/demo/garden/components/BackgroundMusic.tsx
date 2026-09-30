"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // We completely removed the scroll auto-play. It now strictly waits for user interaction.

  const startWithSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    setHasInteracted(true);
  };

  const startQuietly = () => {
    setHasInteracted(true);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/moonpetalmedia-today-i-wear-forever-soft-romantic-wedding-ballad-female-vocals-556205.mp3" 
        loop 
      />

      <AnimatePresence>
        {!hasInteracted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[999] bg-[#1A1614] flex flex-col items-center justify-center text-[#EEDCBE]"
          >
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-serif italic text-2xl md:text-3xl mb-10 text-center px-4"
            >
              Experience our story with sound.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <button 
                onClick={startWithSound}
                className="px-12 py-4 border border-[#C9A96E] rounded-full text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-[#C9A96E] hover:text-[#1A1614] transition-all duration-500 shadow-[0_0_20px_rgba(201,169,110,0.15)]"
              >
                Play Music
              </button>
              <button 
                onClick={startQuietly}
                className="text-[10px] tracking-[0.2em] uppercase opacity-50 hover:opacity-100 transition-opacity"
              >
                Continue Quietly
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {hasInteracted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#1A1614]/80 backdrop-blur-md flex items-center justify-center border border-[#C9A96E]/30 text-[#EEDCBE] shadow-2xl hover:scale-105 transition-transform"
          aria-label="Toggle Music"
        >
          {isPlaying ? (
            <div className="flex gap-1 items-center justify-center h-4">
              <motion.div animate={{ scaleY: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 h-3 bg-current rounded-full" />
              <motion.div animate={{ scaleY: [1, 2.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 h-4 bg-current rounded-full" />
              <motion.div animate={{ scaleY: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 h-2 bg-current rounded-full" />
            </div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </motion.button>
      )}
    </>
  );
}
