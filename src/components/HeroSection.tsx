"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroScrollSequence from "./HeroScrollSequence";
import HeroOverlay from "./HeroOverlay";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress strictly within this 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <HeroScrollSequence progress={scrollYProgress} className="absolute inset-0 z-0">
          <HeroOverlay progress={scrollYProgress} />
        </HeroScrollSequence>
      </div>
    </section>
  );
}
