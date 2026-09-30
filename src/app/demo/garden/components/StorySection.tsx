"use client";

import { motion, useScroll, useInView, useTransform } from "framer-motion";
import { useRef } from "react";

const fonts = {
  serif: "'Cormorant Garamond', serif",
  sans: "'Inter', sans-serif"
};

const MILESTONES = [
  {
    year: "2019",
    title: "The First Hello",
    description: "A simple moment that started something neither of us expected.",
  },
  {
    year: "2021",
    title: "Growing Together",
    description: "Coffee dates, late-night conversations, laughter and countless little memories.",
  },
  {
    year: "2024",
    title: "Four Years",
    description: "Somewhere along the way, we knew this was home.",
  },
  {
    year: "2026",
    title: "Forever Begins",
    description: "And now, we begin the next chapter together.",
  },
];

function MilestoneItem({ item, index, isLast }: { item: typeof MILESTONES[0], index: number, isLast: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const isEven = index % 2 === 0;
  
  // Custom premium easing
  const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div ref={ref} className={`relative flex w-full flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"} gap-0 py-6 md:py-10`}>
      {/* Spacer for Desktop */}
      <div className="hidden md:block w-1/2" />

      {/* Marker and Glow */}
      <div className="absolute md:left-1/2 left-8 -translate-x-1/2 flex items-center justify-center top-1/2 -translate-y-1/2 h-full">
        {/* Soft radial glow when active */}
        <div 
          className="absolute w-40 h-40 rounded-full pointer-events-none transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle, rgba(201, 169, 110, 0.12) 0%, rgba(201, 169, 110, 0) 70%)",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scale(1)" : "scale(0.8)",
            transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        />
        
        {/* The actual dot */}
        <motion.div
          className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-[#C9A96E] z-10`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
          style={{
            backgroundColor: isLast ? "#C9A96E" : (isInView ? "#C9A96E" : "#FAF7F2"),
            boxShadow: isInView ? "0 0 20px rgba(201, 169, 110, 0.4)" : "none",
            transition: "background-color 1s ease, box-shadow 1s ease"
          }}
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 pl-16 md:pl-0 flex flex-col justify-center py-4 relative z-10">
        <div 
          className={`w-full max-w-lg ${isEven ? "md:pl-20 md:text-left" : "md:pr-20 md:text-right"} text-left`}
          style={{ 
            opacity: isInView ? 1 : 0.25, 
            transition: "opacity 1s cubic-bezier(0.22, 1, 0.36, 1)" 
          }}
        >
          <div className="overflow-hidden mb-3">
            <motion.span 
              style={{ fontFamily: fonts.sans }} 
              className="text-xs md:text-sm lg:text-base font-semibold tracking-[0.2em] uppercase text-[#C9A96E] block"
              initial={{ opacity: 0, y: 15, x: isEven ? 20 : -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1, ease: customEase }}
            >
              {item.year}
            </motion.span>
          </div>
          
          <div className="overflow-hidden mb-4 md:mb-6">
            <motion.h3 
              style={{ fontFamily: fonts.serif }} 
              className={`italic text-[#1A1614] transition-all duration-1000 ${isLast ? "text-4xl md:text-6xl font-medium" : "text-3xl md:text-5xl lg:text-6xl font-normal"}`}
              initial={{ opacity: 0, y: 25, x: isEven ? 25 : -25 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.2, delay: 0.1, ease: customEase }}
            >
              {item.title}
            </motion.h3>
          </div>
          
          <motion.p 
            style={{ fontFamily: fonts.sans }} 
            className={`font-normal text-[#4A3F39] text-base md:text-xl lg:text-2xl leading-relaxed ${isEven ? "md:mr-auto" : "md:ml-auto"} ${isLast ? "text-[#2A2421] font-medium" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
          >
            {item.description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function StorySection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: lineScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Background Parallax
  const bgAmpersandY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const bgAmpersandRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  // Corner Decor Parallax
  const cornerDecorY1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cornerDecorY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const noiseSvg = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

  return (
    <div className="w-full flex flex-col bg-[#E8E1D5]">
      {/* Cinematic Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] min-h-[300px] max-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Entrance Wrapper */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: customEase }}
          viewport={{ once: true }}
        >
          {/* Ken Burns Image */}
          <motion.div 
            className="w-full h-full origin-center"
            animate={{ 
              scale: [1, 1.05, 1],
              x: ["0%", "-1%", "0%"]
            }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity 
            }}
            style={{ 
              backgroundImage: "url('/ourstory.png')", 
              backgroundSize: "cover", 
              backgroundPosition: "center 30%" 
            }} 
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[#1A1614]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: customEase }}
          viewport={{ once: true }}
          className="relative z-20 text-center flex flex-col items-center px-6"
        >
          <h1 style={{ fontFamily: fonts.serif }} className="text-3xl md:text-5xl text-[#FAF7F2] mb-3 tracking-wide uppercase drop-shadow-md">
            Our Story
          </h1>
          <p style={{ fontFamily: fonts.serif }} className="text-lg md:text-2xl italic text-[#EEDCBE] mb-3 font-light drop-shadow-md">
            Two hearts. One beautiful beginning.
          </p>
          <p style={{ fontFamily: fonts.sans }} className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#FAF7F2] opacity-90 max-w-md mx-auto leading-relaxed drop-shadow-sm">
            A journey of little moments, lasting memories, and forever.
          </p>
        </motion.div>
      </div>

      {/* Existing Timeline Section */}
      <section ref={containerRef} className="relative w-full overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32" style={{ backgroundColor: "#E8E1D5" }}>
      {/* Background Texture & Decor */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url("${noiseSvg}")` }} 
      />
      
      {/* Huge Faint Parallax Ampersand */}
      <motion.div 
        style={{ fontFamily: fonts.serif, y: bgAmpersandY, rotate: bgAmpersandRotate }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.025] text-[50rem] md:text-[80rem] italic text-[#1A1614] leading-none select-none z-0"
      >
        &amp;
      </motion.div>

      {/* Subtle Botanical Line Art (Corners) */}
      <motion.div style={{ y: cornerDecorY1 }} className="absolute top-0 left-0 w-72 h-72 opacity-[0.06] pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 Q40,40 40,0" stroke="#1A1614" strokeWidth="0.2" fill="none" />
          <path d="M0,60 Q60,60 60,0" stroke="#1A1614" strokeWidth="0.2" fill="none" />
          <path d="M0,80 Q80,80 80,0" stroke="#1A1614" strokeWidth="0.2" fill="none" />
        </svg>
      </motion.div>
      <motion.div style={{ y: cornerDecorY2 }} className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.06] pointer-events-none z-0 rotate-180">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 Q40,40 40,0" stroke="#1A1614" strokeWidth="0.2" fill="none" />
          <path d="M0,60 Q60,60 60,0" stroke="#1A1614" strokeWidth="0.2" fill="none" />
          <path d="M0,80 Q80,80 80,0" stroke="#1A1614" strokeWidth="0.2" fill="none" />
        </svg>
      </motion.div>

      {/* Top Left Label */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: customEase }}
        viewport={{ once: true }}
        className="absolute top-16 left-8 md:top-24 md:left-16 z-20"
      >
        <span style={{ fontFamily: fonts.sans }} className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#6B5F54]">
          01 / Our Story
        </span>
      </motion.div>

      {/* Intro Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-24 text-center">
        <h2 
          style={{ fontFamily: fonts.serif, lineHeight: 1.15 }}
          className="italic font-light text-[#1A1614] text-5xl md:text-7xl lg:text-8xl mb-10 flex flex-col items-center"
        >
          <span className="overflow-hidden block">
            <motion.span 
              className="block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.4, ease: customEase }}
            >
              It started with
            </motion.span>
          </span>
          <span className="overflow-hidden block">
            <motion.span 
              className="block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.4, delay: 0.15, ease: customEase }}
            >
              a little moment.
            </motion.span>
          </span>
        </h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: customEase }}
          viewport={{ once: true }}
          style={{ fontFamily: fonts.sans }}
          className="font-light text-base md:text-lg text-[#5A4F46] max-w-lg mx-auto leading-relaxed"
        >
          Not with a grand entrance, but with a simple, unexpected hello that quietly shifted the axis of our world.
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-0 md:px-6 pb-40 md:pb-56 pt-10">
        
        {/* The Base Muted Line */}
        <div className="absolute top-0 bottom-0 md:left-1/2 left-8 w-[4px] bg-[#C9A96E] opacity-15 md:-translate-x-1/2 rounded-full" />
        
        {/* The Animated Draw Line */}
        <motion.div 
          className="absolute top-0 bottom-0 md:left-1/2 left-8 w-[4px] bg-[#C9A96E] opacity-90 md:-translate-x-1/2 origin-top rounded-full"
          style={{ scaleY: lineScrollProgress }}
        />

        {/* Timeline Items */}
        <div className="flex flex-col relative gap-4 md:gap-8">
          {MILESTONES.map((item, index) => (
            <MilestoneItem 
              key={index} 
              item={item} 
              index={index} 
              isLast={index === MILESTONES.length - 1} 
            />
          ))}
        </div>
      </div>

      {/* Closing Statement */}
      <div className="relative z-10 text-center px-6">
        <motion.h3 
          initial={{ opacity: 0, y: 30, letterSpacing: "0em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.8, ease: customEase }}
          style={{ fontFamily: fonts.serif }} 
          className="italic font-light text-2xl md:text-4xl text-[#1A1614] mb-4"
        >
          And this is only the beginning.
        </motion.h3>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.5, delay: 0.3, ease: customEase }}
          className="w-12 h-[1px] bg-[#C9A96E] mx-auto opacity-50"
        />
      </div>
    </section>
    </div>
  );
}
