"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EXPERIENCES = [
  {
    id: 1,
    src: "/1template.png",
    alt: "Romantic Story Experience",
    title: "Romantic Story",
    desc: "Elegant, cinematic & timeless",
    link: "/demo/garden",
  },
  {
    id: 2,
    src: "/2template.png",
    alt: "Fairytale Journey Experience",
    title: "Fairytale Journey",
    desc: "Step into an enchanted world",
    link: "/demo/luxury",
  },
  {
    id: 3,
    src: "/3template1.png",
    alt: "Superhero Adventure Experience",
    title: "Superhero Adventure",
    desc: "Your love story, but make it epic",
    link: "/demo/rustic",
  },
];

export default function InvitationShowcase() {
  return (
    <section className="relative w-full pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 overflow-hidden bg-[#FAF8F5]">

      {/* ── Subtle background texture & gradients ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* radial glow top-left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#E8DDD0]/40 blur-[120px]" />
        {/* radial glow bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#D9CFC4]/30 blur-[100px]" />
        {/* fine horizontal rule across mid */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A97B]/10 to-transparent" />
      </div>

      {/* ── Decorative corner florals (SVG) ── */}
      <svg className="pointer-events-none absolute top-0 left-0 w-56 md:w-72 opacity-[0.08] z-0" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="180" stroke="#8B6B3D" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="140" stroke="#8B6B3D" strokeWidth="0.4" />
        <circle cx="60" cy="60" r="80" stroke="#8B6B3D" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="300" y2="300" stroke="#8B6B3D" strokeWidth="0.3" />
        <line x1="0" y1="150" x2="150" y2="0" stroke="#8B6B3D" strokeWidth="0.3" />
      </svg>
      <svg className="pointer-events-none absolute bottom-0 right-0 w-56 md:w-72 opacity-[0.08] z-0 rotate-180" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="180" stroke="#8B6B3D" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="140" stroke="#8B6B3D" strokeWidth="0.4" />
        <circle cx="60" cy="60" r="80" stroke="#8B6B3D" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="300" y2="300" stroke="#8B6B3D" strokeWidth="0.3" />
        <line x1="0" y1="150" x2="150" y2="0" stroke="#8B6B3D" strokeWidth="0.3" />
      </svg>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-16">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center mb-16 md:mb-20 lg:mb-28"
        >
          {/* eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-10 md:w-16 bg-gradient-to-r from-transparent to-[#C5A97B]" />
            <span className="text-[10px] md:text-[11px] tracking-[0.35em] font-semibold text-[#8B6B3D] uppercase font-sans">
              Our Experiences
            </span>
            <div className="h-[1px] w-10 md:w-16 bg-gradient-to-l from-transparent to-[#C5A97B]" />
          </div>

          {/* main heading */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] font-light leading-[1.08] tracking-tight mb-5">
            Choose the Story That<br className="hidden sm:block" />
            <em className="italic not-italic font-light text-[#5A4A3A]"> Feels Like You</em>
          </h2>

          {/* thin gold rule */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-6 bg-[#C5A97B]/40" />
            <div className="w-1 h-1 rounded-full bg-[#C5A97B]/60" />
            <div className="h-[1px] w-6 bg-[#C5A97B]/40" />
          </div>

          <p className="font-sans text-sm md:text-base lg:text-lg text-[#5A5A5A] max-w-lg font-light leading-relaxed">
            Every couple has a different story.<br/>
            Choose an experience and we'll make it yours.
          </p>
        </motion.div>

        {/* ── Experience Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {EXPERIENCES.map((exp, i) => {
            // On tablet (md), center the 3rd card
            const isThird = i === 2;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col group ${isThird ? "md:col-span-2 lg:col-span-1 md:w-[70%] md:mx-auto lg:w-full lg:mx-0" : ""}`}
              >
                <Link
                  href={exp.link}
                  className="relative block w-full overflow-hidden rounded-2xl border border-[#E2D9CC] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 flex-1 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-[#FAF8F5]">
                    <Image
                      src={exp.src}
                      alt={exp.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={95}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0905]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-6 lg:p-8 bg-white z-10 text-center items-center justify-center border-t border-[#F0EAE1]/50">
                    <h3 className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] font-light tracking-tight mb-2">
                      {exp.title}
                    </h3>
                    
                    <p className="font-sans text-sm text-[#5A5A5A] mb-6 font-light">
                      {exp.desc}
                    </p>

                    <div className="mt-auto w-full flex justify-center">
                      <span className="text-[10px] md:text-[11px] tracking-[0.2em] text-[#8B6B3D] uppercase font-semibold font-sans flex items-center gap-2 group-hover:text-[#1A1A1A] transition-colors duration-300">
                        See This Wedding Experience
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
                          <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
