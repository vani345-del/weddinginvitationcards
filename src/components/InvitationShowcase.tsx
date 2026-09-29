"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TEMPLATES = [
  {
    id: 1,
    src: "/1template.png",
    alt: "Cinematic Action Template",
    label: "TEMPLATE 01",
    title: "Cinematic Action",
    link: "/demo/garden",
  },
  {
    id: 2,
    src: "/2template.png",
    alt: "Romantic Adventure Template",
    label: "TEMPLATE 02",
    title: "Romantic Adventure",
    link: "/demo/luxury",
  },
  {
    id: 3,
    src: "/3template1.png",
    alt: "Classic Elegance Template",
    label: "TEMPLATE 03",
    title: "Classic Elegance",
    link: "/demo/rustic",
  },
];

export default function InvitationShowcase() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden bg-[#FAF8F5]">

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
      <svg
        className="pointer-events-none absolute top-0 left-0 w-56 md:w-72 opacity-[0.08] z-0"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="0" r="180" stroke="#8B6B3D" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="140" stroke="#8B6B3D" strokeWidth="0.4" />
        <circle cx="60" cy="60" r="80" stroke="#8B6B3D" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="300" y2="300" stroke="#8B6B3D" strokeWidth="0.3" />
        <line x1="0" y1="150" x2="150" y2="0" stroke="#8B6B3D" strokeWidth="0.3" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-0 right-0 w-56 md:w-72 opacity-[0.08] z-0 rotate-180"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="0" cy="0" r="180" stroke="#8B6B3D" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="140" stroke="#8B6B3D" strokeWidth="0.4" />
        <circle cx="60" cy="60" r="80" stroke="#8B6B3D" strokeWidth="0.4" />
        <line x1="0" y1="0" x2="300" y2="300" stroke="#8B6B3D" strokeWidth="0.3" />
        <line x1="0" y1="150" x2="150" y2="0" stroke="#8B6B3D" strokeWidth="0.3" />
      </svg>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16">

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
              Our Collection
            </span>
            <div className="h-[1px] w-10 md:w-16 bg-gradient-to-l from-transparent to-[#C5A97B]" />
          </div>

          {/* main heading */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] font-light leading-[1.08] tracking-tight mb-5">
            Discover Your{" "}
            <em className="italic not-italic font-light text-[#5A4A3A]">Perfect</em>{" "}
            Design
          </h2>

          {/* thin gold rule */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-6 bg-[#C5A97B]/40" />
            <div className="w-1 h-1 rounded-full bg-[#C5A97B]/60" />
            <div className="h-[1px] w-6 bg-[#C5A97B]/40" />
          </div>

          <p className="font-sans text-sm md:text-base text-[#5A5A5A] max-w-lg font-light leading-relaxed">
            Each template is handcrafted from scratch — your colors, your
            photos, your story. Nothing is a template, everything is yours.
          </p>
        </motion.div>

        {/* ── Template Cards ── */}
        {/* Desktop: editorial 3-col with center emphasis */}
        <div className="hidden lg:grid grid-cols-3 items-end gap-8 xl:gap-12">
          {TEMPLATES.map((t, i) => {
            const isCenter = i === 1;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: isCenter ? 20 : 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col items-center group ${isCenter ? "lg:-mt-10" : "mt-0"}`}
              >
                {/* card */}
                <Link
                  href={t.link}
                  className={`relative block w-full overflow-hidden rounded-2xl border border-[#E2D9CC] bg-white
                    shadow-[0_8px_30px_rgba(0,0,0,0.07)]
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)]
                    hover:-translate-y-3
                    ${isCenter ? "shadow-[0_16px_50px_rgba(0,0,0,0.10)]" : ""}
                  `}
                >
                  {/* badge */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-[#E2D9CC]">
                    <span className="text-[9px] tracking-[0.25em] text-[#8B6B3D] font-semibold uppercase">
                      {t.label}
                    </span>
                  </div>

                  {/* image */}
                  <Image
                    src={t.src}
                    alt={t.alt}
                    width={900}
                    height={1300}
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 1400px) 33vw, 430px"
                    quality={95}
                  />

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0905]/70 via-[#0D0905]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex flex-col justify-end p-7">
                    <span className="text-white font-sans text-xs tracking-[0.25em] uppercase font-medium flex items-center gap-2">
                      View Live Demo
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M1 5h12M9 1l4 4-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>

                {/* card footer */}
                <div className="mt-7 flex flex-col items-center text-center">
                  <h3 className="font-serif text-xl md:text-2xl text-[#1A1A1A] font-light tracking-tight">
                    {t.title}
                  </h3>
                  <div className="flex items-center gap-2 my-3">
                    <div className="h-[1px] w-6 bg-[#C5A97B]/50" />
                    <div className="w-[3px] h-[3px] rounded-full bg-[#C5A97B]/60" />
                    <div className="h-[1px] w-6 bg-[#C5A97B]/50" />
                  </div>
                  <Link
                    href={t.link}
                    className="text-[10px] tracking-[0.22em] text-[#8B6B3D] uppercase font-medium font-sans hover:text-[#1A1A1A] transition-colors duration-300 flex items-center gap-2 group/btn"
                  >
                    View Live Demo
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tablet: 3-col flat grid */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-6 items-start">
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center group"
            >
              <Link
                href={t.link}
                className="relative block w-full overflow-hidden rounded-xl border border-[#E2D9CC] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.07)] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:-translate-y-2"
              >
                <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 bg-white/80 backdrop-blur-sm rounded-full border border-[#E2D9CC]">
                  <span className="text-[8px] tracking-[0.2em] text-[#8B6B3D] font-semibold uppercase">{t.label}</span>
                </div>
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={700}
                  height={1000}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                  sizes="33vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0905]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-5">
                  <span className="text-white font-sans text-[10px] tracking-[0.2em] uppercase font-medium">View Live Demo →</span>
                </div>
              </Link>
              <div className="mt-5 text-center">
                <h3 className="font-serif text-lg text-[#1A1A1A] font-light">{t.title}</h3>
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-[1px] w-5 bg-[#C5A97B]/50" />
                  <div className="w-[3px] h-[3px] rounded-full bg-[#C5A97B]/60" />
                  <div className="h-[1px] w-5 bg-[#C5A97B]/50" />
                </div>
                <Link href={t.link} className="text-[9px] tracking-[0.2em] text-[#8B6B3D] uppercase font-medium hover:text-[#1A1A1A] transition-colors">View Demo →</Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-12 md:hidden">
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center group"
            >
              <Link
                href={t.link}
                className="relative block w-full overflow-hidden rounded-2xl border border-[#E2D9CC] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] active:scale-[0.99] transition-transform duration-300"
              >
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full border border-[#E2D9CC]">
                  <span className="text-[9px] tracking-[0.2em] text-[#8B6B3D] font-semibold uppercase">{t.label}</span>
                </div>
                <Image
                  src={t.src}
                  alt={t.alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover"
                  sizes="100vw"
                  quality={90}
                />
              </Link>
              <div className="mt-6 text-center">
                <h3 className="font-serif text-2xl text-[#1A1A1A] font-light">{t.title}</h3>
                <div className="flex items-center justify-center gap-2 my-3">
                  <div className="h-[1px] w-6 bg-[#C5A97B]/50" />
                  <div className="w-[3px] h-[3px] rounded-full bg-[#C5A97B]/60" />
                  <div className="h-[1px] w-6 bg-[#C5A97B]/50" />
                </div>
                <Link
                  href={t.link}
                  className="inline-block mt-1 px-6 py-2.5 border border-[#C5A97B]/50 rounded-full text-[10px] tracking-[0.22em] text-[#8B6B3D] uppercase font-medium hover:bg-[#C5A97B]/10 transition-colors"
                >
                  View Live Demo →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-24 lg:mt-32 flex flex-col items-center gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A97B]/50" />
            <p className="font-serif italic text-[#5A4A3A] text-lg md:text-xl font-light">
              Every website is built from scratch — nothing is a template.
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A97B]/50" />
          </div>
          <Link
            href="/templates"
            className="group mt-2 inline-flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] text-white text-[11px] tracking-[0.25em] uppercase font-medium font-sans transition-all duration-300 hover:bg-[#C5A97B] hover:-translate-y-0.5 rounded-sm"
          >
            Explore All Templates
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
