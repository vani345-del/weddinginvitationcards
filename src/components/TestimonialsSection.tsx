"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const REVIEW_IMAGES = [
  "/review.png",
  "/review3.png",
  "/reviews4.png",
  "/reviews5.png"
];

export default function TestimonialsSection() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 bg-[#FAF8F5] overflow-hidden border-t border-[#F0EAE1]/50">
      
      {/* ── Subtle Background Decor ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#F4E8E1]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-[600px] h-[600px] bg-[#E8DDD0]/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 xl:px-16">
        
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#C5A97B]/60" />
            <span className="text-[10px] md:text-[11px] tracking-[0.35em] font-semibold text-[#8B6B3D] uppercase font-sans">
              Real Reactions
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#C5A97B]/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-[4rem] text-[#1A1A1A] font-light leading-[1.1] tracking-tight mb-6">
            Straight From <br className="hidden sm:block" />
            <em className="italic not-italic font-light text-[#5A4A3A]">Their DMs</em>
          </h2>
          
          <p className="font-sans text-sm md:text-base lg:text-[17px] text-[#5A5A5A] max-w-2xl font-light leading-relaxed">
            Sometimes the best review is the message they send us right after seeing their invitation.
          </p>
        </motion.div>

        {/* ── Review Images Grid ── */}
        <div className="max-w-[550px] mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-start"
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-4 md:gap-6">
              <motion.div variants={itemVariants} className="w-full relative rounded-3xl overflow-hidden border border-[#E8DDD0] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-transform duration-500">
                <Image src="/review.png" alt="Customer Review" width={800} height={1000} className="w-full h-auto object-cover" />
              </motion.div>
              <motion.div variants={itemVariants} className="w-full relative rounded-3xl overflow-hidden border border-[#E8DDD0] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-transform duration-500">
                <Image src="/review3.png" alt="Customer Review" width={800} height={1000} className="w-full h-auto object-cover" />
              </motion.div>
            </div>

            {/* Column 2 (Staggered down slightly on desktop) */}
            <div className="flex flex-col gap-4 md:gap-6 sm:mt-10">
              <motion.div variants={itemVariants} className="w-full relative rounded-3xl overflow-hidden border border-[#E8DDD0] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-transform duration-500">
                <Image src="/reviews4.png" alt="Customer Review" width={800} height={1000} className="w-full h-auto object-cover" />
              </motion.div>
              <motion.div variants={itemVariants} className="w-full relative rounded-3xl overflow-hidden border border-[#E8DDD0] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-transform duration-500">
                <Image src="/reviews5.png" alt="Customer Review" width={800} height={1000} className="w-full h-auto object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Section Bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 md:mt-28 text-center flex flex-col items-center"
        >
          <span className="font-serif italic text-[#5A4A3A] text-lg md:text-xl font-light mb-6">
            Real couples. Real reactions. One invitation they'll remember.
          </span>
          
          <Link
            href="/stories"
            className="group inline-flex items-center gap-3 px-8 py-3 bg-transparent border border-[#C5A97B] text-[#8B6B3D] text-[11px] tracking-[0.25em] uppercase font-semibold font-sans rounded-full transition-all duration-300 hover:bg-[#8B6B3D] hover:text-white hover:-translate-y-0.5"
          >
            See More Stories
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
