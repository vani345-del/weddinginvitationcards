"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  "ALL",
  "GARDEN FLORAL",
  "RUSTIC BOHO",
  "MODERN LUXURY",
  "MINIMALIST",
  "CINEMATIC"
];

const CARDS = [
  { id: 1, category: "GARDEN FLORAL", src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098405/ChatGPT_Image_Sep_11_2026_09_16_13_AM_qdiesg.png", alt: "Garden Floral Website", title: "Garden Floral Romance", price: "From $199" },
  { id: 2, category: "RUSTIC BOHO", src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098477/ChatGPT_Image_Sep_11_2026_09_17_37_AM_iwedah.png", alt: "Rustic Boho Website", title: "Rustic Boho", price: "From $199" },
  { id: 3, category: "MODERN LUXURY", src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098551/ChatGPT_Image_Sep_11_2026_09_18_53_AM_kq7hyg.png", alt: "Modern Luxury Website", title: "Modern Luxury", price: "From $399" },
  { id: 4, category: "MINIMALIST", src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098647/ChatGPT_Image_Sep_11_2026_09_20_26_AM_jayrul.png", alt: "Minimalist Website", title: "Clean Minimalist", price: "From $199" },
  { id: 5, category: "CINEMATIC", src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098872/ChatGPT_Image_Sep_11_2026_09_24_04_AM_itoyw3.png", alt: "Cinematic Website", title: "Cinematic Dark", price: "From $499" },
];

export default function InvitationShowcase() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(2); // Start with Laser Cut in center

  const syncCategoryWithIndex = (index: number) => {
    setActiveCategory(CARDS[index].category);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % 5;
    setActiveIndex(nextIndex);
    syncCategoryWithIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + 5) % 5;
    setActiveIndex(prevIndex);
    syncCategoryWithIndex(prevIndex);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    syncCategoryWithIndex(index);
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "ALL") {
      setActiveIndex(2); // Reset to center
    } else {
      const index = CARDS.findIndex(c => c.category === cat);
      if (index !== -1) setActiveIndex(index);
    }
  };

  // Helper to determine the visual offset for carousel positioning
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff < -2) diff += 5;
    if (diff > 2) diff -= 5;
    return diff;
  };

  const getCardStyle = (diff: number) => {
    // Exact alignment matching reference image (Image 2)
    const spacing = 85; // Less tight overlap, matching reference
    
    switch (diff) {
      case 0:
        // Center card - hero
        return { 
          x: "0%", 
          y: 0, 
          scale: 1.05, 
          zIndex: 30, 
          opacity: 1, 
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2))" 
        };
      case -1:
        // Left-center card
        return { 
          x: `${-spacing}%`, 
          y: 0, 
          scale: 0.95, 
          zIndex: 25, 
          opacity: 1, 
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))" 
        };
      case 1:
        // Right-center card
        return { 
          x: `${spacing}%`, 
          y: 0, 
          scale: 0.95, 
          zIndex: 25, 
          opacity: 1, 
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))" 
        };
      case -2:
        // Far left card
        return { 
          x: `${-spacing * 2}%`, 
          y: 0, 
          scale: 0.85, 
          zIndex: 20, 
          opacity: 1, 
          filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" 
        };
      case 2:
        // Far right card
        return { 
          x: `${spacing * 2}%`, 
          y: 0, 
          scale: 0.85, 
          zIndex: 20, 
          opacity: 1, 
          filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" 
        };
      default:
        return { 
          x: "0%", 
          y: 0, 
          scale: 0, 
          zIndex: 0, 
          opacity: 0, 
          filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))" 
        };
    }
  };

  return (
    <section className="relative w-full pt-12 md:pt-14 lg:pt-16 pb-12 md:pb-10 overflow-hidden flex items-center justify-center text-[#2A2A2A] bg-[#F9F7F2] min-h-[90vh] md:min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="https://res.cloudinary.com/dclxwdpki/image/upload/v1789097815/ChatGPT_Image_Sep_11_2026_09_04_55_AM_t1b8xo.png"
          alt="Background Texture"
          fill
          className="object-cover opacity-80"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center justify-center h-full py-4">
        
        {/* Top Area */}
        <div className="text-center flex flex-col items-center w-full mb-4 md:mb-5">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
            <div className="h-[1px] w-10 md:w-14 bg-[#B59A6D]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-medium text-[#8B7347] uppercase">
              Our Work
            </span>
            <div className="h-[1px] w-10 md:w-14 bg-[#B59A6D]" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-[#1A1A1A] tracking-tight mb-2 leading-tight">
            Find Your <span className="italic font-light">Perfect</span> Website Style
          </h2>
          <p className="font-sans text-[11px] md:text-xs text-[#4A4A4A] max-w-xl font-light px-4">
            Every website is built from scratch — your colors, your story, your animations. Nothing is a template.
          </p>
        </div>

        {/* Category Navigation - Horizontal scroll on mobile */}
        <nav className="relative z-50 mb-2 md:mb-6 flex overflow-x-auto justify-start md:justify-center items-center gap-2 md:gap-3 px-4 max-w-full w-full pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`text-[9px] md:text-[10px] tracking-[0.15em] font-medium uppercase transition-all duration-300 px-5 py-2.5 md:px-5 md:py-2.5 rounded-full border whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat 
                  ? "bg-[#967C4B] text-white border-[#967C4B]" 
                  : "bg-transparent text-[#5A5A5A] border-[#D1C8B8] hover:border-[#967C4B] hover:text-[#967C4B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Main Card Showcase */}
        <div className="relative w-full max-w-[1600px] h-[50vh] min-h-[380px] md:min-h-[420px] max-h-[580px] flex items-center justify-center mb-5 md:mb-6">
          
          {/* Left Navigation Arrow */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 lg:left-[12%] top-1/2 -translate-y-1/2 z-40 bg-white/90 p-2.5 md:p-3 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#4A4A4A]" />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-[12%] top-1/2 -translate-y-1/2 z-40 bg-white/90 p-2.5 md:p-3 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#4A4A4A]" />
          </button>

          {/* Card container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full flex justify-center items-center">
              {CARDS.map((card, index) => {
                const diff = getOffset(index);
                const spacing = 65; 
                
                let style = { x: "0%", y: 0, scale: 0, zIndex: 0, opacity: 0, filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))" };
                if (diff === 0) {
                  style = { x: "0%", y: 0, scale: 1.05, zIndex: 30, opacity: 1, filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2))" };
                } else if (diff === -1) {
                  style = { x: `${-spacing}%`, y: 0, scale: 0.95, zIndex: 25, opacity: 1, filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))" };
                } else if (diff === 1) {
                  style = { x: `${spacing}%`, y: 0, scale: 0.95, zIndex: 25, opacity: 1, filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))" };
                } else if (diff === -2) {
                  style = { x: `${-spacing * 1.9}%`, y: 0, scale: 0.85, zIndex: 20, opacity: 1, filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" };
                } else if (diff === 2) {
                  style = { x: `${spacing * 1.9}%`, y: 0, scale: 0.85, zIndex: 20, opacity: 1, filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" };
                }

                const isCenter = diff === 0;
                
                // Hide far cards on mobile screens
                const shouldHide = typeof window !== 'undefined' && window.innerWidth < 640 && Math.abs(diff) > 1;

                return (
                  <motion.div
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    initial={false}
                    animate={{ 
                      x: style.x, 
                      y: style.y, 
                      scale: shouldHide ? 0 : style.scale,
                      opacity: shouldHide ? 0 : style.opacity,
                      filter: style.filter
                    }}
                    whileHover={isCenter ? { 
                      scale: 1.10, 
                      y: -8,
                      filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.25))"
                    } : {
                      scale: shouldHide ? 0 : style.scale * 1.03,
                      y: -5
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originY: 0.5, zIndex: style.zIndex }}
                    className={`absolute w-[210px] sm:w-[240px] md:w-[280px] lg:w-[330px] aspect-[2/3] transform-gpu ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={card.src} 
                        alt={card.alt} 
                        fill 
                        className="object-contain" 
                        priority={isCenter}
                        sizes="(max-width: 640px) 210px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 330px"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Info below Center Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={CARDS[activeIndex]?.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center z-20"
          >
            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-[#5A5A5A] uppercase mb-2 text-center px-4">
              {CARDS[activeIndex]?.title || "MODERN LUXURY"}
            </span>
            <span className="font-serif text-2xl md:text-3xl lg:text-3xl text-[#1A1A1A] mb-4">
              {CARDS[activeIndex]?.price || "From $399"}
            </span>
            <a href="/demo" className="bg-[#967C4B] text-white text-[10px] font-medium tracking-[0.15em] uppercase px-6 py-2.5 md:px-7 md:py-3 rounded-full hover:bg-[#7a643b] transition-colors flex items-center gap-2 shadow-sm">
              VIEW LIVE DEMO <span className="text-xs font-light">&rarr;</span>
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Decorative Quote / Calligraphy */}
        <div className="absolute right-4 md:right-[8%] lg:right-[10%] bottom-6 md:bottom-8 lg:bottom-10 rotate-[-5deg] hidden lg:block z-10 pointer-events-none">
          <div className="font-serif italic text-lg lg:text-xl text-[#8A744A] leading-[1.2] opacity-60">
            More than <br/>
            a website,<br/>
            it's your story.
          </div>
        </div>

      </div>
    </section>
  );
}
