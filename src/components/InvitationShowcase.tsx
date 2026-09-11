"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  "ALL",
  "TRADITIONAL",
  "FLORAL",
  "LASER CUT",
  "LUXURY FOIL",
  "MODERN",
  "ACRYLIC"
];

// Placeholder data structure ready for specific category images
const BASE_CARDS = [
  { id: 1, src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098405/ChatGPT_Image_Sep_11_2026_09_16_13_AM_qdiesg.png", alt: "Classic Invitation", title: "Classic Wedding Invitation", price: "From £1.00" },
  { id: 2, src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098477/ChatGPT_Image_Sep_11_2026_09_17_37_AM_iwedah.png", alt: "Floral Invitation", title: "Floral Elegance Suite", price: "From £1.50" },
  { id: 3, src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098551/ChatGPT_Image_Sep_11_2026_09_18_53_AM_kq7hyg.png", alt: "Laser Cut Invitation", title: "Luxury Laser Cut Design", price: "From £2.00" },
  { id: 4, src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098647/ChatGPT_Image_Sep_11_2026_09_20_26_AM_jayrul.png", alt: "Foil & Embossed Invitation", title: "Premium Foil & Embossed", price: "From £1.80" },
  { id: 5, src: "https://res.cloudinary.com/dclxwdpki/image/upload/v1789098872/ChatGPT_Image_Sep_11_2026_09_24_04_AM_itoyw3.png", alt: "Acrylic & Modern Invitation", title: "Modern Acrylic Invite", price: "From £2.50" },
];

const CATEGORY_DATA: Record<string, typeof BASE_CARDS> = {
  "ALL": [...BASE_CARDS],
  "TRADITIONAL": [...BASE_CARDS].reverse(), 
  "FLORAL": [...BASE_CARDS].slice(1).concat([...BASE_CARDS].slice(0, 1)), 
  "LASER CUT": [...BASE_CARDS].slice(2).concat([...BASE_CARDS].slice(0, 2)), 
  "LUXURY FOIL": [...BASE_CARDS].slice(3).concat([...BASE_CARDS].slice(0, 3)), 
  "MODERN": [...BASE_CARDS].slice(4).concat([...BASE_CARDS].slice(0, 4)), 
  "ACRYLIC": [...BASE_CARDS].slice(4).concat([...BASE_CARDS].slice(0, 4)), 
};

export default function InvitationShowcase() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(2); // Center card index (0 to 4)
  const [cards, setCards] = useState(CATEGORY_DATA["ALL"]);

  useEffect(() => {
    // When category changes, update cards array
    setCards(CATEGORY_DATA[activeCategory] || CATEGORY_DATA["ALL"]);
    setActiveIndex(2); // Reset to center when category changes
  }, [activeCategory]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 5);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + 5) % 5);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Helper to determine the visual offset for carousel positioning
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff < -2) diff += 5;
    if (diff > 2) diff -= 5;
    return diff;
  };

  const getCardStyle = (diff: number) => {
    // Very wide scattered arrangement - no arrows needed
    const baseScale = 1.0;
    const spacing = 55; // very wide spacing
    
    switch (diff) {
      case 0:
        // Center card - hero
        return { 
          x: "0%", 
          y: 0, 
          scale: 1.12, 
          rotate: 0,
          zIndex: 30, 
          opacity: 1, 
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.25))" 
        };
      case -1:
        // Left-center card
        return { 
          x: `${-spacing}%`, 
          y: "3%", 
          scale: 0.96, 
          rotate: -4,
          zIndex: 25, 
          opacity: 1, 
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.18))" 
        };
      case 1:
        // Right-center card
        return { 
          x: `${spacing}%`, 
          y: "3%", 
          scale: 0.96, 
          rotate: 3,
          zIndex: 25, 
          opacity: 1, 
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.18))" 
        };
      case -2:
        // Far left card
        return { 
          x: `${-spacing * 1.9}%`, 
          y: "6%", 
          scale: 0.89, 
          rotate: -6,
          zIndex: 20, 
          opacity: 0.95, 
          filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.15))" 
        };
      case 2:
        // Far right card
        return { 
          x: `${spacing * 1.9}%`, 
          y: "6%", 
          scale: 0.89, 
          rotate: 5,
          zIndex: 20, 
          opacity: 0.95, 
          filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.15))" 
        };
      default:
        return { 
          x: "0%", 
          y: 0, 
          scale: 0, 
          rotate: 0,
          zIndex: 0, 
          opacity: 0, 
          filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))" 
        };
    }
  };

  return (
    <section className="relative w-full pt-12 md:pt-14 lg:pt-16 pb-8 md:pb-10 overflow-hidden flex items-center justify-center text-[#2A2A2A] bg-[#F9F7F2] min-h-screen max-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="https://res.cloudinary.com/dclxwdpki/image/upload/v1789097815/ChatGPT_Image_Sep_11_2026_09_04_55_AM_t1b8xo.png"
          alt="Background Texture"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col items-center justify-center h-full py-4">
        
        {/* Top Area */}
        <div className="text-center flex flex-col items-center w-full mb-4 md:mb-5">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-2">
            <div className="h-[1px] w-10 md:w-14 bg-[#B59A6D]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-medium text-[#8B7347] uppercase">
              The Collection
            </span>
            <div className="h-[1px] w-10 md:w-14 bg-[#B59A6D]" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-[#1A1A1A] tracking-tight mb-2 leading-tight">
            Find Your <span className="italic font-light">Perfect</span> Invitation
          </h2>
          <p className="font-sans text-[11px] md:text-xs text-[#4A4A4A] max-w-xl font-light px-4">
            From timeless elegance to modern luxury, discover a design made for your day.
          </p>
        </div>

        {/* Category Navigation */}
        <nav className="mb-5 md:mb-6 flex flex-wrap justify-center items-center gap-2 px-2 max-w-3xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[9px] md:text-[10px] tracking-[0.15em] font-medium uppercase transition-all duration-300 px-4 py-2 md:px-5 md:py-2.5 rounded-full border whitespace-nowrap ${
                activeCategory === cat 
                  ? "bg-[#967C4B] text-white border-[#967C4B]" 
                  : "bg-transparent text-[#5A5A5A] border-[#D1C8B8] hover:border-[#967C4B] hover:text-[#967C4B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Main Card Showcase - Much wider, no arrows */}
        <div className="relative w-full max-w-[1600px] h-[45vh] min-h-[380px] max-h-[500px] flex items-center justify-center mb-5 md:mb-6">
          
          {/* Cards wrapped in AnimatePresence for category transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Card container - very wide scattered row */}
              <div className="relative w-full h-full flex justify-center items-center">
                {cards.map((card, index) => {
                  const diff = getOffset(index);
                  const style = getCardStyle(diff);
                  const isCenter = diff === 0;
                  
                  // Hide far cards on mobile/tablet
                  const shouldHide = 
                    (typeof window !== 'undefined' && window.innerWidth < 768 && Math.abs(diff) > 1) ||
                    (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024 && Math.abs(diff) > 1);

                  return (
                    <motion.div
                      key={card.id}
                      onClick={() => handleCardClick(index)}
                      initial={false}
                      animate={{ 
                        x: style.x, 
                        y: style.y, 
                        scale: shouldHide ? 0 : style.scale,
                        rotate: style.rotate,
                        opacity: shouldHide ? 0 : style.opacity,
                        filter: style.filter
                      }}
                      whileHover={isCenter ? { 
                        scale: 1.15, 
                        y: -12,
                        rotate: 0,
                        filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.3))"
                      } : {
                        scale: shouldHide ? 0 : style.scale * 1.05,
                        y: -8,
                        rotate: style.rotate * 0.7
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originY: 0.5, zIndex: style.zIndex }}
                      className={`absolute w-[160px] sm:w-[190px] md:w-[240px] lg:w-[280px] aspect-[2/3] transform-gpu ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="relative w-full h-full">
                        <Image 
                          src={card.src} 
                          alt={card.alt} 
                          fill 
                          className="object-contain mix-blend-multiply" 
                          priority={isCenter}
                          sizes="(max-width: 640px) 160px, (max-width: 768px) 190px, (max-width: 1024px) 240px, 280px"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product Info below Center Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={cards[activeIndex]?.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center z-20"
          >
            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-[#5A5A5A] uppercase mb-2 text-center px-4">
              {cards[activeIndex]?.title || "LUXURY LASER CUT DESIGN"}
            </span>
            <span className="font-serif text-2xl md:text-3xl lg:text-3xl text-[#1A1A1A] mb-4">
              {cards[activeIndex]?.price || "From £2.00"}
            </span>
            <button className="bg-[#967C4B] text-white text-[10px] font-medium tracking-[0.15em] uppercase px-6 py-2.5 md:px-7 md:py-3 rounded-full hover:bg-[#7a643b] transition-colors flex items-center gap-2 shadow-sm">
              VIEW DESIGN <span className="text-xs font-light">&rarr;</span>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Decorative Quote / Calligraphy */}
        <div className="absolute right-4 md:right-[8%] lg:right-[10%] bottom-6 md:bottom-8 lg:bottom-10 rotate-[-5deg] hidden lg:block z-10 pointer-events-none">
          <div className="font-serif italic text-lg lg:text-xl text-[#8A744A] leading-[1.2] opacity-60">
            More than <br/>
            an invitation,<br/>
            it's your story.
          </div>
        </div>

      </div>
    </section>
  );
}
