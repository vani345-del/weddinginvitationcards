"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const STEPS = [
  {
    num: "01",
    label: "PICK YOUR STORY",
    title: "Choose Your Experience",
    desc: "Start with a story that feels like you — romantic, fairytale, cinematic, superhero, or something entirely your own.",
  },
  {
    num: "02",
    label: "MAKE IT YOURS",
    title: "Share Your Story",
    desc: "Send us your names, photos, wedding details, memories, and everything that makes your story yours.",
  },
  {
    num: "03",
    label: "CRAFTED FOR YOU",
    title: "We Bring It to Life",
    desc: "We transform your details into a personalized, animated wedding experience designed around your story.",
  },
  {
    num: "04",
    label: "READY TO SHARE",
    title: "Share One Beautiful Link",
    desc: "Your finished experience is ready to share with family and friends through WhatsApp, Instagram, or anywhere you like.",
  }
];

export default function HowItWorksSection() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative w-full pt-12 md:pt-16 lg:pt-20 pb-24 md:pb-32 lg:pb-40 bg-[#FAF8F5] overflow-hidden border-t border-[#F0EAE1]/50">
      
      {/* ── Subtle Background Decor ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F4E8E1]/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E8DDD0]/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 md:px-12 xl:px-16">
        
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center mb-16 md:mb-24 lg:mb-32"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#C5A97B]/60" />
            <span className="text-[10px] md:text-[11px] tracking-[0.35em] font-semibold text-[#8B6B3D] uppercase font-sans">
              How It Works
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#C5A97B]/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-[4rem] text-[#1A1A1A] font-light leading-[1.1] tracking-tight mb-6">
            From Your Story <br className="hidden sm:block" />
            <em className="italic not-italic font-light text-[#5A4A3A]">to Your Wedding Experience.</em>
          </h2>
          
          <p className="font-sans text-sm md:text-base lg:text-lg text-[#5A5A5A] max-w-xl font-light leading-relaxed">
            Four simple steps to turn your story, photos, and wedding details into a beautiful digital experience.
          </p>
        </motion.div>

        {/* ── Process Journey ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full"
        >
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[18px] left-[10%] right-[10%] h-[1px]">
            <motion.div 
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="w-full h-full bg-[#E8DDD0]"
            />
          </div>

          {/* Steps Grid/Stack */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-4 relative">
            
            {/* Step 1: Choose Experience */}
            <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center lg:w-1/4 group">
              {/* Desktop Node */}
              <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8DDD0] items-center justify-center text-[#8B6B3D] font-serif italic text-lg mb-8 relative z-10 shadow-sm transition-colors duration-500 group-hover:bg-[#8B6B3D] group-hover:text-white">
                01
              </div>
              {/* Visual Container */}
              <div className="w-full max-w-[280px] lg:max-w-none aspect-[4/5] mb-8 relative flex items-center justify-center group-hover:-translate-y-1.5 transition-transform duration-500 ease-out">
                 <div className="w-full h-full relative rounded-2xl overflow-hidden border border-[#F0EAE1] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                   <Image src="/1card.png" alt="Choose Your Experience" fill className="object-cover" />
                 </div>
                 {/* Floating Label */}
                 <div className="absolute -bottom-3 px-4 py-1.5 bg-white border border-[#E8DDD0] rounded-full shadow-sm text-[8px] tracking-[0.2em] font-semibold text-[#8B6B3D] uppercase font-sans z-10">
                   {STEPS[0].label}
                 </div>
              </div>
              {/* Mobile Node */}
              <div className="lg:hidden text-[#C5A97B] font-serif italic text-2xl mb-3">01</div>
              {/* Text */}
              <h3 className="font-sans text-sm md:text-[15px] font-bold text-[#1A1A1A] uppercase tracking-[0.1em] mb-3">
                {STEPS[0].title}
              </h3>
              <p className="font-sans text-[13px] md:text-sm text-[#5A5A5A] font-light leading-relaxed max-w-[280px]">
                {STEPS[0].desc}
              </p>
              {/* Mobile vertical line */}
              <div className="lg:hidden w-[1px] h-12 bg-gradient-to-b from-[#E8DDD0] to-transparent mt-6" />
            </motion.div>

            {/* Step 2: Share Details */}
            <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center lg:w-1/4 group">
              <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8DDD0] items-center justify-center text-[#8B6B3D] font-serif italic text-lg mb-8 relative z-10 shadow-sm transition-colors duration-500 group-hover:bg-[#8B6B3D] group-hover:text-white">
                02
              </div>
              <div className="w-full max-w-[280px] lg:max-w-none aspect-[4/5] mb-8 relative flex items-center justify-center group-hover:-translate-y-1.5 transition-transform duration-500 ease-out">
                 <div className="w-full h-full relative rounded-2xl overflow-hidden border border-[#F0EAE1] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                   <Image src="/2card.png" alt="Share Your Story" fill className="object-cover" />
                 </div>
                 <div className="absolute -bottom-3 px-4 py-1.5 bg-white border border-[#E8DDD0] rounded-full shadow-sm text-[8px] tracking-[0.2em] font-semibold text-[#8B6B3D] uppercase font-sans z-10">
                   {STEPS[1].label}
                 </div>
              </div>
              <div className="lg:hidden text-[#C5A97B] font-serif italic text-2xl mb-3">02</div>
              <h3 className="font-sans text-sm md:text-[15px] font-bold text-[#1A1A1A] uppercase tracking-[0.1em] mb-3">
                {STEPS[1].title}
              </h3>
              <p className="font-sans text-[13px] md:text-sm text-[#5A5A5A] font-light leading-relaxed max-w-[280px]">
                {STEPS[1].desc}
              </p>
              <div className="lg:hidden w-[1px] h-12 bg-gradient-to-b from-[#E8DDD0] to-transparent mt-6" />
            </motion.div>

            {/* Step 3: Bring to life */}
            <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center lg:w-1/4 group">
              <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8DDD0] items-center justify-center text-[#8B6B3D] font-serif italic text-lg mb-8 relative z-10 shadow-sm transition-colors duration-500 group-hover:bg-[#8B6B3D] group-hover:text-white">
                03
              </div>
              <div className="w-full max-w-[280px] lg:max-w-none aspect-[4/5] mb-8 relative flex items-center justify-center group-hover:-translate-y-1.5 transition-transform duration-500 ease-out">
                 <div className="w-full h-full relative rounded-2xl overflow-hidden border border-[#F0EAE1] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                   <Image src="/3card.png" alt="We Bring It to Life" fill className="object-cover" />
                 </div>
                 <div className="absolute -bottom-3 px-4 py-1.5 bg-white border border-[#E8DDD0] rounded-full shadow-sm text-[8px] tracking-[0.2em] font-semibold text-[#8B6B3D] uppercase font-sans z-10">
                   {STEPS[2].label}
                 </div>
              </div>
              <div className="lg:hidden text-[#C5A97B] font-serif italic text-2xl mb-3">03</div>
              <h3 className="font-sans text-sm md:text-[15px] font-bold text-[#1A1A1A] uppercase tracking-[0.1em] mb-3">
                {STEPS[2].title}
              </h3>
              <p className="font-sans text-[13px] md:text-sm text-[#5A5A5A] font-light leading-relaxed max-w-[280px]">
                {STEPS[2].desc}
              </p>
              <div className="lg:hidden w-[1px] h-12 bg-gradient-to-b from-[#E8DDD0] to-transparent mt-6" />
            </motion.div>

            {/* Step 4: Share */}
            <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center lg:w-1/4 group">
              <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8DDD0] items-center justify-center text-[#8B6B3D] font-serif italic text-lg mb-8 relative z-10 shadow-sm transition-colors duration-500 group-hover:bg-[#8B6B3D] group-hover:text-white">
                04
              </div>
              <div className="w-full max-w-[280px] lg:max-w-none aspect-[4/5] mb-8 relative flex items-center justify-center group-hover:-translate-y-1.5 transition-transform duration-500 ease-out">
                 <div className="w-full h-full relative rounded-2xl overflow-hidden border border-[#F0EAE1] shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                   <Image src="/4card.png" alt="Share One Beautiful Link" fill className="object-cover" />
                 </div>
                 <div className="absolute -bottom-3 px-4 py-1.5 bg-white border border-[#E8DDD0] rounded-full shadow-sm text-[8px] tracking-[0.2em] font-semibold text-[#8B6B3D] uppercase font-sans z-10">
                   {STEPS[3].label}
                 </div>
              </div>
              <div className="lg:hidden text-[#C5A97B] font-serif italic text-2xl mb-3">04</div>
              <h3 className="font-sans text-sm md:text-[15px] font-bold text-[#1A1A1A] uppercase tracking-[0.1em] mb-3">
                {STEPS[3].title}
              </h3>
              <p className="font-sans text-[13px] md:text-sm text-[#5A5A5A] font-light leading-relaxed max-w-[280px]">
                {STEPS[3].desc}
              </p>
            </motion.div>

          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-24 text-center flex flex-col items-center"
        >
          <span className="font-serif italic text-[#5A4A3A] text-lg font-light mb-4">
            Your story is only four steps away.
          </span>
          <Link
            href="/templates"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#1A1A1A] text-white text-[11px] tracking-[0.25em] uppercase font-semibold font-sans rounded-full shadow-md transition-all duration-300 hover:bg-[#8B6B3D] hover:shadow-lg hover:-translate-y-0.5"
          >
            Create My Experience
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
