"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-ivory text-luxury-gray py-24 md:py-32 overflow-hidden flex flex-col justify-center items-center min-h-0 md:max-h-[80vh]"
    >
      {/* Background texture & soft gradients to mimic premium stationery table */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-champagne/40 via-transparent to-champagne/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Text Content - Left side on desktop */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-gold tracking-[0.25em] text-xs uppercase font-medium mb-6 block"
          >
            YOUR STORY STARTS HERE
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-gray mb-10 leading-tight"
          >
            Beautiful invitations for your<br className="hidden lg:block" /> beautiful beginning.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
          >
            <a
              href="/collection"
              className="group w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gold/90 text-ivory uppercase tracking-widest text-xs font-medium hover:bg-gold transition-all duration-300 rounded-sm hover:-translate-y-0.5 hover:shadow-lg shadow-gold/20"
            >
              Explore The Collection
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="/contact"
              className="group w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-transparent border border-gold/40 text-luxury-gray uppercase tracking-widest text-xs font-medium hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 rounded-sm"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Image - Right side on desktop */}
        <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
          <motion.div 
            style={{ y: yTransform }}
            className="relative w-72 h-[350px] md:w-96 md:h-[450px] opacity-80 rotate-3 md:rotate-6 pointer-events-none"
          >
            <Image
              src="https://res.cloudinary.com/dclxwdpki/image/upload/v1789102946/ChatGPT_Image_Sep_11_2026_10_31_51_AM_rviheu.png"
              alt="Luxury wedding invitation detail"
              fill
              className="object-cover object-center shadow-2xl rounded-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
