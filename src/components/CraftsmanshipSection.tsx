"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Slide data ─────────────────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    image: "/1template.png",
    label: "THE BEGINNING",
    heading: "Your Story Deserves\nMore Than a Link.",
    description:
      "From the first announcement to the final celebration, your wedding website becomes a beautiful digital reflection of your love story — created for the people who matter most.",
    features: [
      {
        num: "01",
        title: "YOUR STORY, BEAUTIFULLY TOLD",
        desc: "Every photo, detail, and moment comes together in one meaningful experience.",
      },
      {
        num: "02",
        title: "MADE FOR YOUR LOVE",
        desc: "Your names, colors, memories, and personality shape every part of the experience.",
      },
      {
        num: "03",
        title: "A MEMORY THEY CAN KEEP",
        desc: "More than an invitation — a digital keepsake your guests can return to.",
      },
    ],
    quote: "Because some stories deserve to be remembered.",
  },
  {
    id: 1,
    image: "/2template.png",
    label: "THE EXPERIENCE",
    heading: "Let Them Feel\nthe Moment.",
    description:
      "Your guests shouldn't just open an invitation. They should feel the excitement, anticipation, and emotion of your wedding from the very first tap.",
    features: [
      {
        num: "01",
        title: "CINEMATIC MOMENTS",
        desc: "Beautiful transitions and animations bring your story to life.",
      },
      {
        num: "02",
        title: "EVERY DETAIL MATTERS",
        desc: "From your photos to your schedule, every detail is designed around you.",
      },
      {
        num: "03",
        title: "MADE TO BE REMEMBERED",
        desc: "Create an experience your guests will talk about long after the celebration.",
      },
    ],
    quote: "Turn an invitation into an experience.",
  },
  {
    id: 2,
    image: "/3template1.png",
    label: "THE MEMORIES",
    heading: "One Beautiful Place\nfor Every Memory.",
    description:
      "Your wedding day passes in a moment. Your digital wedding experience can keep those memories alive — from the first announcement to the moments after 'I do.'",
    features: [
      {
        num: "01",
        title: "SHARE YOUR JOURNEY",
        desc: "Tell your story through photographs, messages, events, and meaningful details.",
      },
      {
        num: "02",
        title: "BRING EVERYONE CLOSER",
        desc: "Give family and friends one beautiful place to celebrate with you.",
      },
      {
        num: "03",
        title: "KEEP IT FOREVER",
        desc: "Your wedding website becomes part of the story you can look back on together.",
      },
    ],
    quote: "The day ends. The memories don't.",
  },
];

/* ─── Framer variants ────────────────────────────────────── */
const imgVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const textVariants = {
  enter: { opacity: 0, y: 22 },
  center: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: -14, transition: { duration: 0.4, ease: "easeIn" } },
};

const featureVariants = {
  enter: { opacity: 0, x: 16 },
  center: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, x: -10, transition: { duration: 0.3 } },
};

/* ─── Component ─────────────────────────────────────────── */
export default function CraftsmanshipSection() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  /* always auto-rotate, no pause */
  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F5EFE6] py-20 md:py-28 lg:py-0 lg:min-h-screen flex items-center"
      aria-label="Wedding story showcase"
    >
      {/* ── Ambient background glow ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#DDD0C2]/40 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#C9BBA8]/30 blur-[120px]" />
      </div>

      {/* ── Decorative SVG top-right ── */}
      <svg className="pointer-events-none absolute top-0 right-0 w-64 opacity-[0.06] z-0" viewBox="0 0 260 260" fill="none">
        <circle cx="260" cy="0" r="200" stroke="#8B6B3D" strokeWidth="0.5" />
        <circle cx="260" cy="0" r="150" stroke="#8B6B3D" strokeWidth="0.5" />
        <circle cx="260" cy="0" r="100" stroke="#8B6B3D" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">

        {/* ════════════════════════════════════════════════════
            DESKTOP / TABLET  (lg:grid)
        ════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-12 gap-10 xl:gap-16 items-center min-h-[80vh]">

          {/* LEFT — image */}
          <div className="col-span-5 xl:col-span-5 relative flex flex-col items-center justify-center">
            {/* decorative ring behind image */}
            <div className="absolute -inset-6 rounded-3xl border border-[#C5A97B]/15 z-0" />
            <div className="absolute -inset-12 rounded-3xl border border-[#C5A97B]/07 z-0" />

            {/* Stacked images — all mounted, crossfade via opacity */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.14)] border border-[#E5DDD3] z-10">
              {SLIDES.map((s, i) => (
                <motion.div
                  key={s.id}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={i === 0 ? "relative w-full" : "absolute inset-0 w-full"}
                  style={{ pointerEvents: i === active ? "auto" : "none" }}
                >
                  <Image
                    src={s.image}
                    alt={s.label}
                    width={900}
                    height={1200}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1400px) 45vw, 600px"
                    quality={95}
                    priority={i === 0}
                  />
                </motion.div>
              ))}

              {/* corner watermark */}
              <div className="absolute bottom-5 left-5 z-20">
                <span className="text-white/60 text-[9px] tracking-[0.25em] uppercase font-sans font-medium">
                  Digital Interactive Invitations
                </span>
              </div>
            </div>

            {/* slide counter under image */}
            <div className="flex items-center gap-3 mt-8 self-start ml-2">
              <button onClick={prev} aria-label="Previous slide"
                className="w-8 h-8 rounded-full border border-[#C5A97B]/40 flex items-center justify-center text-[#8B6B3D] hover:bg-[#C5A97B]/10 transition-colors duration-300">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M11 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="flex items-center gap-2 group"
                >
                  <span className={`text-[10px] font-semibold tracking-widest transition-colors duration-300 ${i === active ? "text-[#8B6B3D]" : "text-[#B0A090]/60"}`}>
                    0{i + 1}
                  </span>
                  <span className={`block h-[1.5px] transition-all duration-500 rounded-full ${i === active ? "w-10 bg-[#C5A97B]" : "w-4 bg-[#C5A97B]/25 group-hover:bg-[#C5A97B]/50"}`} />
                </button>
              ))}
              <button onClick={next} aria-label="Next slide"
                className="w-8 h-8 rounded-full border border-[#C5A97B]/40 flex items-center justify-center text-[#8B6B3D] hover:bg-[#C5A97B]/10 transition-colors duration-300">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="col-span-7 xl:col-span-7 flex flex-col justify-center pl-4 xl:pl-10">
            <AnimatePresence mode="wait">
              <motion.div key={slide.id} className="flex flex-col">

                {/* eyebrow */}
                <motion.div
                  variants={textVariants} custom={0}
                  initial="enter" animate="center" exit="exit"
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="w-8 h-[1px] bg-[#C5A97B]" />
                  <span className="text-[#8B6B3D] text-[10px] tracking-[0.35em] font-semibold uppercase font-sans">
                    {slide.label}
                  </span>
                </motion.div>

                {/* heading */}
                <motion.h2
                  variants={textVariants} custom={0.05}
                  initial="enter" animate="center" exit="exit"
                  className="font-serif text-4xl xl:text-5xl 2xl:text-[3.4rem] leading-[1.1] text-[#1A1A1A] font-light tracking-tight mb-5 whitespace-pre-line"
                >
                  {slide.heading}
                </motion.h2>

                {/* thin rule */}
                <motion.div
                  variants={textVariants} custom={0.1}
                  initial="enter" animate="center" exit="exit"
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="h-[1px] w-8 bg-[#C5A97B]/50" />
                  <div className="w-1 h-1 rounded-full bg-[#C5A97B]/70" />
                  <div className="h-[1px] w-8 bg-[#C5A97B]/50" />
                </motion.div>

                {/* description */}
                <motion.p
                  variants={textVariants} custom={0.15}
                  initial="enter" animate="center" exit="exit"
                  className="font-sans text-[#4A4A4A] text-[15px] leading-relaxed max-w-[480px] mb-10"
                >
                  {slide.description}
                </motion.p>

                {/* features */}
                <div className="flex flex-col gap-7 mb-10 border-l border-[#C5A97B]/25 pl-6">
                  {slide.features.map((f, i) => (
                    <motion.div
                      key={f.num}
                      custom={i}
                      variants={featureVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="text-[#C5A97B] text-[10px] font-bold tracking-[0.2em]">{f.num}</span>
                        <span className="h-[1px] w-4 bg-[#C5A97B]/40" />
                        <h4 className="font-sans text-[11px] font-bold tracking-[0.12em] text-[#1A1A1A] uppercase">
                          {f.title}
                        </h4>
                      </div>
                      <p className="font-sans text-[#5A5A5A] text-sm leading-relaxed max-w-[400px]">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* bottom quote */}
                <motion.div
                  variants={textVariants} custom={0.55}
                  initial="enter" animate="center" exit="exit"
                  className="flex items-start gap-5"
                >
                  <div className="w-[1px] h-12 bg-[#C5A97B]/50 shrink-0 mt-1" />
                  <p className="font-serif italic text-[#5A4A3A] text-lg xl:text-xl font-light leading-snug">
                    "{slide.quote}"
                  </p>
                </motion.div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            MOBILE  (< lg)
        ════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-8 lg:hidden">

          {/* image — stacked all 3, crossfade via opacity */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.12)] border border-[#E5DDD3]">
            {SLIDES.map((s, i) => (
              <motion.div
                key={s.id}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={i === 0 ? "relative w-full" : "absolute inset-0 w-full"}
                style={{ pointerEvents: i === active ? "auto" : "none" }}
              >
                <Image
                  src={s.image}
                  alt={s.label}
                  width={800}
                  height={1100}
                  className="w-full h-auto object-cover"
                  sizes="100vw"
                  quality={90}
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </div>

          {/* mobile text */}
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} className="flex flex-col gap-5">

              <motion.div variants={textVariants} custom={0} initial="enter" animate="center" exit="exit"
                className="flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#C5A97B]" />
                <span className="text-[#8B6B3D] text-[10px] tracking-[0.3em] font-semibold uppercase">{slide.label}</span>
              </motion.div>

              <motion.h2 variants={textVariants} custom={0.05} initial="enter" animate="center" exit="exit"
                className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-[1.12] whitespace-pre-line">
                {slide.heading}
              </motion.h2>

              <motion.p variants={textVariants} custom={0.1} initial="enter" animate="center" exit="exit"
                className="font-sans text-[#4A4A4A] text-sm leading-relaxed">
                {slide.description}
              </motion.p>

              <div className="flex flex-col gap-5 border-l border-[#C5A97B]/25 pl-5">
                {slide.features.map((f, i) => (
                  <motion.div key={f.num} custom={i} variants={featureVariants} initial="enter" animate="center" exit="exit"
                    className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[#C5A97B] text-[10px] font-bold tracking-widest">{f.num}</span>
                      <span className="h-[1px] w-3 bg-[#C5A97B]/40" />
                      <h4 className="font-sans text-[10px] font-bold tracking-[0.12em] text-[#1A1A1A] uppercase">{f.title}</h4>
                    </div>
                    <p className="font-sans text-[#5A5A5A] text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={textVariants} custom={0.4} initial="enter" animate="center" exit="exit"
                className="flex items-start gap-4 pt-1">
                <div className="w-[1px] h-10 bg-[#C5A97B]/50 shrink-0 mt-1" />
                <p className="font-serif italic text-[#5A4A3A] text-base font-light leading-snug">"{slide.quote}"</p>
              </motion.div>

            </motion.div>
          </AnimatePresence>

          {/* mobile indicator */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button onClick={prev} aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-[#C5A97B]/40 flex items-center justify-center text-[#8B6B3D]">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M11 5H1M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {SLIDES.map((s, i) => (
              <button key={s.id} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}
                className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold tracking-widest transition-colors duration-300 ${i === active ? "text-[#8B6B3D]" : "text-[#B0A090]/50"}`}>
                  0{i + 1}
                </span>
                <span className={`block h-[1.5px] rounded-full transition-all duration-500 ${i === active ? "w-8 bg-[#C5A97B]" : "w-3 bg-[#C5A97B]/25"}`} />
              </button>
            ))}
            <button onClick={next} aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-[#C5A97B]/40 flex items-center justify-center text-[#8B6B3D]">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Progress bar at bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A97B]/10 z-20">
        <motion.div
          key={active}
          className="h-full bg-[#C5A97B]/50"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
        />
      </div>
    </section>
  );
}
