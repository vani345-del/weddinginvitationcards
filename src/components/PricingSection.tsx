"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PLANS = [
  {
    duration: "1 MONTH",
    price: "$199",
    billing: "One-time payment",
    desc: "Perfect for couples who need their invitation live around the wedding celebration.",
    features: [
      "Personalized wedding experience",
      "Choose from our available designs",
      "Names, photos & wedding details",
      "Interactive wedding sections",
      "Mobile & desktop responsive",
      "Shareable invitation link",
      "Live for 1 month",
    ],
    buttonText: "CHOOSE 1 MONTH",
    highlight: false,
  },
  {
    duration: "3 MONTHS",
    badge: "MOST POPULAR",
    price: "$299",
    billing: "One-time payment",
    desc: "More time for your guests to revisit your story before and after the celebration.",
    features: [
      "Everything in 1 Month",
      "Live for 3 months",
      "Personalized content & photos",
      "Interactive wedding experience",
      "Shareable link for guests",
    ],
    buttonText: "CHOOSE 3 MONTHS",
    highlight: true,
  },
  {
    duration: "6 MONTHS",
    price: "$499",
    billing: "One-time payment",
    desc: "Keep your wedding story online long after the celebration.",
    features: [
      "Everything in 3 Months",
      "Live for 6 months",
      "Extended guest access",
      "Keep your digital wedding story available longer",
      "Shareable link",
    ],
    buttonText: "CHOOSE 6 MONTHS",
    highlight: false,
  }
];

export default function PricingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative w-full pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-24 bg-[#FAF8F5] overflow-hidden">
      
      {/* ── Subtle Background Decor ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 right-20 w-[600px] h-[600px] bg-[#F4E8E1]/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 -left-20 w-[500px] h-[500px] bg-[#E8DDD0]/20 rounded-full blur-[100px]" />
        
        {/* Faint floral/botanical outline SVG */}
        <svg className="absolute top-10 left-10 w-64 h-64 opacity-[0.03]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M100 200 C 100 100, 0 100, 0 0 C 100 0, 100 100, 200 100 C 200 200, 100 200, 100 200 Z" stroke="#8B6B3D" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-10 right-10 w-64 h-64 opacity-[0.03] rotate-180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M100 200 C 100 100, 0 100, 0 0 C 100 0, 100 100, 200 100 C 200 200, 100 200, 100 200 Z" stroke="#8B6B3D" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 xl:px-16">
        
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
              Your Story, Your Way
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#C5A97B]/60" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-[4rem] text-[#1A1A1A] font-light leading-[1.1] tracking-tight mb-6">
            Choose How Long <br className="hidden sm:block" />
            <em className="italic not-italic font-light text-[#5A4A3A]">Your Story Lives</em>
          </h2>
          
          <p className="font-sans text-sm md:text-base lg:text-[17px] text-[#5A5A5A] max-w-2xl font-light leading-relaxed">
            Every invitation is personalized with your names, photos, wedding details, and chosen experience. Select the live-link duration that works for you.
          </p>
          
          <p className="font-serif italic text-[#8B6B3D] text-lg mt-8">
            Every plan includes a personalized wedding experience.
          </p>
        </motion.div>

        {/* ── Pricing Cards ── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 items-center"
        >
          {PLANS.map((plan, i) => (
            <motion.div 
              key={plan.duration} 
              variants={itemVariants}
              className={`relative flex flex-col h-full bg-white rounded-3xl transition-all duration-500 hover:-translate-y-2 
                ${plan.highlight 
                  ? "border border-[#C5A97B] shadow-[0_20px_50px_rgba(197,169,123,0.15)] lg:-mt-8 lg:mb-8 relative z-20" 
                  : "border border-[#E8DDD0] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10"
                }
              `}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#FAF8F5] border border-[#C5A97B] rounded-full shadow-sm">
                  <span className="text-[9px] tracking-[0.25em] text-[#8B6B3D] font-bold uppercase font-sans">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8 md:p-10 flex flex-col flex-1">
                <h3 className="font-sans text-[11px] tracking-[0.2em] font-semibold text-[#8B6B3D] uppercase mb-4 text-center">
                  {plan.duration}
                </h3>
                
                <div className="flex flex-col items-center mb-6">
                  <span className="font-serif text-5xl md:text-6xl text-[#1A1A1A] font-light tracking-tight mb-2">
                    {plan.price}
                  </span>
                  <span className="font-sans text-[11px] text-[#8A8A8A] uppercase tracking-wider">
                    {plan.billing}
                  </span>
                </div>

                <p className="font-sans text-sm text-[#5A5A5A] leading-relaxed text-center font-light mb-8 h-[60px]">
                  {plan.desc}
                </p>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8DDD0] to-transparent mb-8" />

                <ul className="flex flex-col gap-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 text-[#8B6B3D]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="font-sans text-sm md:text-[15px] text-[#3A3A3A] leading-snug font-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 px-6 rounded-full font-sans text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-300
                    ${plan.highlight 
                      ? "bg-[#1A1A1A] text-white hover:bg-[#8B6B3D] shadow-md hover:shadow-lg" 
                      : "bg-[#FAF8F5] text-[#1A1A1A] border border-[#E8DDD0] hover:border-[#8B6B3D] hover:bg-white"
                    }
                  `}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tiny Note Under Cards ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-serif italic text-[#5A4A3A] text-base md:text-lg">
            One beautiful experience. One simple link. Your story, beautifully shared.
          </p>
        </motion.div>

        {/* ── Custom Quote Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 md:mt-32 max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B6B3D]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B6B3D]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B6B3D]" />
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-light mb-5">
            Need something more personal?
          </h3>
          <p className="font-sans text-base md:text-[17px] text-[#3A3A3A] font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Want a completely custom experience, special animations, additional sections, or changes beyond our existing designs? Tell us what you have in mind and we'll create a custom quote for you.
          </p>
          
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] text-white text-[11px] tracking-[0.25em] uppercase font-semibold font-sans rounded-full shadow-md transition-all duration-300 hover:bg-[#8B6B3D] hover:shadow-lg hover:-translate-y-1"
          >
            Request a Custom Quote
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
