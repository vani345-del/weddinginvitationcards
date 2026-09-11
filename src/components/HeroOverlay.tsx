"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroOverlayProps {
  className?: string;
  progress: MotionValue<number>;
}

export default function HeroOverlay({ className, progress }: HeroOverlayProps) {
  // Stage 1 (0 to 0.20) - Left
  const opacity1 = useTransform(progress, [0, 0.15], [1, 0]);
  const y1 = useTransform(progress, [0, 0.2], [0, -30]);
  const display1 = useTransform(progress, (v) => v > 0.2 ? "none" : "flex");

  // Stage 2 (0.25 to 0.45) - Right
  const opacity2 = useTransform(progress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.2, 0.45], [30, -30]);
  const display2 = useTransform(progress, (v) => (v > 0.15 && v < 0.5) ? "flex" : "none");

  // Stage 3 (0.50 to 0.70) - Bottom Center
  const opacity3 = useTransform(progress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.45, 0.7], [30, -30]);
  const display3 = useTransform(progress, (v) => (v > 0.4 && v < 0.75) ? "flex" : "none");

  // Stage 4 (0.75 to 1) - Center Left with buttons
  const opacity4 = useTransform(progress, [0.7, 0.75], [0, 1]);
  const y4 = useTransform(progress, [0.7, 0.75], [30, 0]);
  const pointerEvents4 = useTransform(progress, (v) => (v > 0.75 ? "auto" : "none"));
  const display4 = useTransform(progress, (v) => v > 0.65 ? "flex" : "none");

  return (
    <div className={cn("absolute inset-0 z-10 pointer-events-none", className)}>
      
      {/* Scroll indicator - always visible until the very end */}
      <motion.div 
        style={{ opacity: useTransform(progress, [0.8, 0.9], [1, 0]) }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-16 lg:left-24 flex flex-col items-center md:items-start gap-2 md:flex-row md:gap-4 animate-bounce-subtle pointer-events-none"
      >
        <span className="text-luxury-gray/50 tracking-[0.2em] text-[10px] md:text-xs font-medium uppercase">
          Scroll to Open
        </span>
        <div className="w-[1px] h-8 bg-luxury-gray/30 hidden md:block" />
        <div className="h-[1px] w-8 bg-luxury-gray/30 md:hidden" />
      </motion.div>

      {/* STAGE 1: Left */}
      <motion.div 
        style={{ opacity: opacity1, y: y1, display: display1 }}
        className="absolute top-[20%] md:top-1/3 left-4 right-4 md:right-auto md:left-16 lg:left-24 max-w-xl text-center md:text-left flex-col items-center md:items-start"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <div className="h-[1px] w-8 md:w-12 bg-gold/50" />
          <span className="text-luxury-gray/80 tracking-[0.2em] text-xs md:text-sm font-medium uppercase font-sans">
            The Wedding Cards UK
          </span>
          <div className="h-[1px] w-8 bg-gold/50 md:hidden" />
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.15] md:leading-[1.1] text-luxury-gray font-light mb-4 md:mb-6">
          The first impression<br />
          <span className="italic font-medium">of your forever.</span>
        </h1>
        <p className="text-luxury-gray/80 text-base sm:text-lg md:text-xl font-light font-sans max-w-sm md:max-w-md">
          Beautifully crafted wedding stationery, designed to set the perfect tone for your special day.
        </p>
      </motion.div>

      {/* STAGE 2: Right */}
      <motion.div 
        style={{ opacity: opacity2, y: y2, display: display2 }}
        className="absolute top-[20%] md:top-1/3 left-4 right-4 md:left-auto md:right-16 lg:right-24 max-w-xl text-center md:text-right flex-col items-center md:items-end"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-6 md:justify-end">
          <div className="h-[1px] w-8 bg-gold/50 md:hidden" />
          <span className="text-luxury-gray/80 tracking-[0.2em] text-xs md:text-sm font-medium uppercase font-sans">
            Unmatched Quality
          </span>
          <div className="h-[1px] w-8 md:w-12 bg-gold/50" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.15] md:leading-[1.1] text-luxury-gray font-light mb-4 md:mb-6">
          Bespoke Design &<br />
          <span className="italic font-medium">Premium Printing.</span>
        </h2>
        <p className="text-luxury-gray/80 text-base sm:text-lg md:text-xl font-light font-sans max-w-sm md:max-w-md">
          Elevate your invitations with luxurious paper textures, elegant gold foils, and exquisite craftsmanship.
        </p>
      </motion.div>

      {/* STAGE 3: Bottom Center */}
      <motion.div 
        style={{ opacity: opacity3, y: y3, display: display3 }}
        className="absolute bottom-20 md:bottom-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 max-w-2xl text-center flex-col items-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
          <div className="h-[1px] w-6 md:w-8 bg-gold/50" />
          <span className="text-luxury-gray/80 tracking-[0.2em] text-xs md:text-sm font-medium uppercase font-sans">
            Every Detail Matters
          </span>
          <div className="h-[1px] w-6 md:w-8 bg-gold/50" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.15] md:leading-[1.1] text-luxury-gray font-light mb-4 md:mb-6">
          Crafted with <span className="italic font-medium">Love.</span>
        </h2>
        <p className="text-luxury-gray/80 text-base sm:text-lg md:text-xl font-light font-sans max-w-sm md:max-w-md mx-auto">
          From your save-the-dates to the final thank you cards, we bring your vision to life flawlessly.
        </p>
      </motion.div>

      {/* STAGE 4: Left with Buttons */}
      <motion.div 
        style={{ opacity: opacity4, y: y4, display: display4, pointerEvents: pointerEvents4 as any }}
        className="absolute top-[15%] md:top-1/3 left-4 right-4 md:right-auto md:left-16 lg:left-24 max-w-xl text-center md:text-left flex-col items-center md:items-start"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <div className="h-[1px] w-8 md:w-12 bg-gold/50" />
          <span className="text-luxury-gray/80 tracking-[0.2em] text-xs md:text-sm font-medium uppercase font-sans">
            Begin Your Journey
          </span>
          <div className="h-[1px] w-8 bg-gold/50 md:hidden" />
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.15] md:leading-[1.1] text-luxury-gray font-light mb-4 md:mb-6">
          Your Story,<br />
          <span className="italic font-medium">Beautifully Printed.</span>
        </h2>
        <p className="text-luxury-gray/80 text-base sm:text-lg md:text-xl font-light font-sans max-w-sm md:max-w-md mb-8 md:mb-12">
          Let's create something unforgettable together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto px-4 md:px-0">
          <a href="/collection" className="group relative w-full sm:w-auto overflow-hidden flex items-center justify-center gap-3 bg-luxury-gray text-ivory px-6 md:px-8 py-4 transition-transform duration-300 hover:-translate-y-1 pointer-events-auto">
            <span className="relative z-10 text-xs md:text-sm tracking-widest font-medium">EXPLORE INVITATIONS</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gold translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
          </a>
          
          <button className="group w-full sm:w-auto flex items-center justify-center gap-3 border border-luxury-gray/20 bg-ivory/50 backdrop-blur-sm text-luxury-gray px-6 md:px-8 py-4 transition-all duration-300 hover:bg-ivory hover:shadow-lg hover:border-gold/30 hover:-translate-y-1">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs md:text-sm tracking-widest font-medium">WHATSAPP US</span>
          </button>
        </div>
      </motion.div>

    </div>
  );
}
