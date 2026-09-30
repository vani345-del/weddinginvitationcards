"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FAQS = [
  {
    q: "01 — What exactly is a digital wedding invitation?",
    a: "It's a personalized wedding website designed around your story. Instead of sending only a video, you share one beautiful link containing your wedding details, photos, story, schedule, location, RSVP and interactive elements."
  },
  {
    q: "02 — Can I customize the template?",
    a: "Yes. Your chosen experience is personalized with your names, photos, colors, wedding details, content and other requested elements. If you need something beyond the available designs, you can request a custom experience."
  },
  {
    q: "03 — What happens after I place my order?",
    a: "After you choose your experience, you'll share your wedding details, photos, preferences and any special requests with us. We then create and personalize your digital wedding experience for you."
  },
  {
    q: "04 — How long does it take to receive my invitation?",
    a: "Most personalized invitations are prepared within 2–3 days after we receive all required details and content. More complex custom requests may take longer."
  },
  {
    q: "05 — Can I make changes after my invitation is live?",
    a: "Yes. Minor content updates can be requested during your active live-link period. We'll help keep your important wedding details up to date."
  },
  {
    q: "06 — How long will my wedding website stay online?",
    a: "You can choose the live-link duration that works for you — 1 month, 3 months, or 6 months. The selected duration begins when your invitation goes live."
  },
  {
    q: "07 — How do my guests access the invitation?",
    a: "You receive one shareable link that you can send through WhatsApp, Instagram, email, text messages or anywhere else you like. Guests can open it directly on their phone, tablet or computer."
  },
  {
    q: "08 — Can guests RSVP through the website?",
    a: "Yes. Depending on your selected experience, your invitation can include RSVP collection, event details, maps, schedules, galleries and other interactive features."
  },
  {
    q: "09 — Can I request something that isn't shown in the templates?",
    a: "Absolutely. If you have a specific idea, animation, section or visual direction in mind, contact us for a custom quote."
  },
  {
    q: "10 — What do I need to provide?",
    a: "We'll need your names, wedding dates and locations, event details, photos and any personal content you'd like included. We'll guide you through everything you need to send."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full pt-16 md:pt-20 lg:pt-24 pb-24 md:pb-32 lg:pb-40 bg-[#FAF8F5] overflow-hidden border-t border-[#F0EAE1]/50">
      
      {/* ── Subtle Background Decor ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#F4E8E1]/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#E8DDD0]/20 rounded-full blur-[100px]" />
        
        {/* Subtle decorative wedding line art (matching homepage) */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M 100 0 C 100 100, 200 100, 200 200 C 100 200, 100 100, 0 100 C 0 0, 100 0, 100 0 Z" stroke="#8B6B3D" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-20 left-0 w-64 h-64 opacity-[0.03] rotate-180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M 100 0 C 100 100, 200 100, 200 200 C 100 200, 100 100, 0 100 C 0 0, 100 0, 100 0 Z" stroke="#8B6B3D" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 md:px-12 xl:px-0">
        
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#C5A97B]/60" />
            <span className="text-[10px] md:text-[11px] tracking-[0.35em] font-semibold text-[#8B6B3D] uppercase font-sans">
              Questions, Answered
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#C5A97B]/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] text-[#1A1A1A] font-light leading-[1.1] tracking-tight mb-6">
            Everything You <br className="hidden sm:block" />
            <em className="italic not-italic font-light text-[#5A4A3A]">May Be Wondering</em>
          </h2>
          
          <p className="font-sans text-sm md:text-base lg:text-[17px] text-[#5A5A5A] max-w-2xl font-light leading-relaxed">
            From choosing your experience to sharing the finished invitation, here are the answers to the questions couples ask most.
          </p>
        </motion.div>

        {/* ── Accordion ── */}
        <div className="w-full border-t border-[#E8DDD0]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="border-b border-[#E8DDD0]"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
                >
                  <span className={`font-serif text-[17px] md:text-xl pr-8 transition-colors duration-300 ${isOpen ? "text-[#1A1A1A]" : "text-[#3A3A3A] group-hover:text-[#1A1A1A]"}`}>
                    {faq.q}
                  </span>
                  <div className="relative w-5 h-5 md:w-6 md:h-6 shrink-0 flex items-center justify-center">
                    {/* Horizontal line (always visible) */}
                    <div className="absolute w-full h-[1px] bg-[#8B6B3D]" />
                    {/* Vertical line (rotates to horizontal when open) */}
                    <motion.div 
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute w-[1px] h-full bg-[#8B6B3D]" 
                    />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 md:pb-10 font-sans text-[15px] md:text-base text-[#5A5A5A] font-light leading-relaxed pr-10 md:pr-20">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Sub CTA Below FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 md:mt-40 text-center flex flex-col items-center"
        >
          <span className="font-serif italic text-[#8B6B3D] text-lg md:text-xl mb-4">
            Still have something in mind?
          </span>
          
          <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-light tracking-tight mb-8">
            Let's Create Something <em className="italic not-italic font-light text-[#5A4A3A]">That Feels Like You.</em>
          </h3>
          
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#FAF8F5] border border-[#E8DDD0] text-[#1A1A1A] text-[11px] tracking-[0.25em] uppercase font-semibold font-sans rounded-full shadow-sm transition-all duration-300 hover:border-[#8B6B3D] hover:shadow-md hover:bg-white hover:-translate-y-1"
          >
            Get In Touch
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
