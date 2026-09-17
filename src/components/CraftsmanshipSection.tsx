"use client";

import { useState } from "react";
import Image from "next/image";

const MAIN_IMAGE = "https://res.cloudinary.com/dclxwdpki/image/upload/v1789102946/ChatGPT_Image_Sep_11_2026_10_31_51_AM_rviheu.png";
const DETAIL_IMAGES = [
  "https://res.cloudinary.com/dclxwdpki/image/upload/v1789103044/ChatGPT_Image_Sep_11_2026_10_33_54_AM_rll3eo.png",
  "https://res.cloudinary.com/dclxwdpki/image/upload/v1789103404/ChatGPT_Image_Sep_11_2026_10_39_32_AM_yw4vqv.png",
  "https://res.cloudinary.com/dclxwdpki/image/upload/v1789103415/ChatGPT_Image_Sep_11_2026_10_34_55_AM_vgngit.png",
  "https://res.cloudinary.com/dclxwdpki/image/upload/v1789103502/ChatGPT_Image_Sep_11_2026_10_40_59_AM_ghymkc.png"
];

const GRID_ITEMS = [
  { title: "ANIMATIONS", src: DETAIL_IMAGES[0] },
  { title: "RSVP BUILT IN", src: DETAIL_IMAGES[1] },
  { title: "PHOTO GALLERY", src: DETAIL_IMAGES[2] },
  { title: "MOBILE PERFECT", src: DETAIL_IMAGES[3] },
];

const FEATURES = [
  {
    num: "01",
    title: "BUILT JUST FOR YOU",
    desc: "Your names, your colors, your photos — every element designed from scratch for your wedding.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        <path d="M15 5l4 4"></path>
        <path d="M5 22c-1.5 0-3-1.5-3-3s2-2 4-2 4 1.5 4 3-1.5 3-4 3z"></path>
      </svg>
    )
  },
  {
    num: "02",
    title: "STUNNING ANIMATIONS",
    desc: "Smooth, cinematic animations your guests feel the moment they tap the link.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 12 12 17 22 12"></polyline>
        <polyline points="2 17 12 22 22 17"></polyline>
      </svg>
    )
  },
  {
    num: "03",
    title: "LIVE IN 3–5 DAYS",
    desc: "Share your link on WhatsApp and let every guest experience your day before it begins.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    )
  },
];

export default function CraftsmanshipSection() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <section className="relative w-full py-12 lg:py-0 overflow-hidden lg:h-screen lg:min-h-[750px] lg:max-h-[950px] flex items-center justify-center" style={{ backgroundColor: "#F2E8D9" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-16 items-center w-full">
        
        {/* Left Side: Images */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-4 lg:gap-6 w-full">
          {/* Main Large Image */}
          <div className="relative w-full aspect-[4/3] md:aspect-[1.25] shadow-2xl overflow-hidden group">
            {/* Base Image */}
            <Image
              src={MAIN_IMAGE}
              alt="Luxury Wedding Invitation"
              fill
              className={`object-cover transition-opacity duration-700 ease-in-out ${activeFeature === null ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Crossfade Images for interaction */}
            {GRID_ITEMS.map((item, idx) => (
              <Image
                key={idx}
                src={item.src}
                alt={item.title}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${activeFeature === idx ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            ))}

            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col gap-3 z-10 mix-blend-difference text-white">
              <span className="tracking-[0.2em] text-[10px] md:text-xs font-medium uppercase leading-loose">
                Built<br/>With<br/>Purpose
              </span>
              <span className="w-10 h-[1px] bg-white opacity-80"></span>
            </div>
          </div>

          {/* 4 Small Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-3 md:gap-5 w-full">
            {GRID_ITEMS.map((item, i) => (
              <div 
                key={i} 
                className="flex flex-col gap-3 cursor-pointer group/item"
                onMouseEnter={() => setActiveFeature(i)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={() => setActiveFeature(activeFeature === i ? null : i)}
              >
                <div className={`relative w-full aspect-[4/3] shadow-md overflow-hidden transition-all duration-300 ${activeFeature === i ? 'ring-2 ring-offset-2 ring-[#C5A059] ring-offset-[#F2E8D9]' : ''}`}>
                  <Image 
                    src={item.src} 
                    fill 
                    className="object-cover group-hover/item:scale-105 transition-transform duration-700" 
                    alt={item.title} 
                    sizes="(max-width: 1024px) 25vw, 15vw"
                  />
                  <div className={`absolute inset-0 bg-white/30 transition-opacity duration-500 ${activeFeature === i ? 'opacity-0' : 'opacity-100 group-hover/item:opacity-0'}`} />
                </div>
                <span className={`text-[9px] md:text-[11px] text-center tracking-[0.15em] font-semibold transition-colors duration-300 ${activeFeature === i ? 'text-[#C5A059]' : 'text-luxury-gray'}`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center h-full pt-2 lg:pt-0 lg:pl-10">
          
          <div className="mb-8 lg:mb-10">
            <div className="flex items-center gap-4 mb-4 lg:mb-6">
              <span className="w-8 h-[1px] bg-[#C5A059]"></span>
              <h3 className="text-[#C5A059] tracking-[0.2em] text-[10px] md:text-xs font-semibold uppercase">
                What We Build
              </h3>
              <span className="w-16 md:w-24 h-[1px] bg-[#C5A059]"></span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] leading-[1.1] mb-4 lg:mb-6 text-luxury-gray tracking-tight">
              More Than a Website.<br />
              A First Impression.
            </h2>
            
            <p className="font-sans text-luxury-gray/85 text-sm lg:text-[15px] leading-relaxed max-w-[460px]">
              Every wedding tells a unique story, and it begins the moment guests tap your link. We build fully custom animated websites — not templates — designed around your colors, your photos, and your day.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:gap-8 mb-10 lg:mb-12 border-l border-[#C5A059]/30 pl-4 md:pl-8 ml-2 md:ml-4">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx}
                className="group flex gap-6 items-start cursor-pointer relative"
                onMouseEnter={() => setActiveFeature(idx)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={() => setActiveFeature(activeFeature === idx ? null : idx)}
              >
                {/* Circular Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] shrink-0 transition-transform duration-500 group-hover:bg-[#C5A059] group-hover:text-white">
                  {feature.icon}
                </div>
                
                {/* Feature Text */}
                <div className="flex flex-col justify-center pt-1">
                  <div className="flex gap-4 items-center mb-1">
                    <span className="text-[#C5A059] text-xs font-semibold tracking-widest">{feature.num}</span>
                    <h4 className="font-sans text-[13px] md:text-[14px] font-bold tracking-[0.1em] text-luxury-gray uppercase">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-luxury-gray/70 text-sm leading-relaxed max-w-[320px]">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-full max-w-[500px]">
            <a href="/demo" className="inline-block border border-[#C5A059] text-luxury-gray text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase py-3 px-8 md:py-4 md:px-10 hover:bg-[#C5A059] hover:text-white transition-all duration-500 w-fit">
              See Live Demos &rarr;
            </a>
            <div className="absolute right-0 md:right-4 top-14 md:top-4 opacity-70 transform rotate-[-2deg]">
              <p className="font-serif italic text-luxury-gray text-base md:text-lg text-right">
                It's more than a link,<br/>
                it's the beginning of forever.
              </p>
              <div className="w-16 md:w-24 h-[1px] bg-[#C5A059] ml-auto mt-2"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
