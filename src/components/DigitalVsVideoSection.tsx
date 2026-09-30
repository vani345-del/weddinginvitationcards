"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FEATURES = [
  {
    num: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    ),
    title: "CRYSTAL CLEAR QUALITY",
    desc: "Perfectly crisp typography and high-resolution images on any device.",
  },
  {
    num: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    ),
    title: "INSTANT UPDATES",
    desc: "Need to change the venue? Make edits instantly — everyone always sees the latest details.",
  },
  {
    num: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M10 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
        <path d="M10 13l1.5 2.5L14 13"></path>
      </svg>
    ),
    title: "INTERACTIVE EXPERIENCE",
    desc: "Guests can explore your gallery, watch your story, interact with the timeline, and feel your journey.",
  },
  {
    num: "04",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M12 15h.01"></path>
      </svg>
    ),
    title: "THE ULTIMATE HUB",
    desc: "Integrated maps, event schedule, add-to-calendar buttons, and seamless RSVP collection.",
  }
];

export default function DigitalVsVideoSection() {
  return (
    <section className="relative w-full pt-12 md:pt-16 lg:pt-20 pb-24 md:pb-32 bg-[#FBF9F6] overflow-hidden border-t border-[#F0EAE1]">
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft floral/gradient blobs to mimic the romantic background */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-[#F4E8E1]/60 blur-[120px]" />
        <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-[#F4E8E1]/50 blur-[100px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[400px] rounded-full bg-[#EADCCF]/40 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 xl:px-16">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 md:w-16 bg-[#C5A97B]/50" />
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] font-semibold text-[#8B6B3D] uppercase font-sans">
              Why Go Digital?
            </span>
            <div className="h-[1px] w-8 md:w-16 bg-[#C5A97B]/50" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-[4rem] text-[#2A3439] font-light leading-[1.1] tracking-tight mb-6">
            Beyond a <span className="text-[#B97A7E] italic">Simple Video</span>
            <span className="inline-block ml-2 text-[#B97A7E] opacity-70">
              {/* Little drawn heart icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </span>
          </h2>
          
          <p className="font-sans text-base md:text-lg text-[#5A5A5A] max-w-2xl font-light leading-relaxed">
            Traditional video invitations are beautiful, but they have their limits.
            Discover why modern couples are choosing interactive digital
            experiences to tell their story and impress their guests.
          </p>
        </motion.div>

        {/* ── Visual Centerpiece (Mockups) ── */}
        <div className="relative w-full mb-24 lg:mb-32 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-4 mt-8 lg:mt-16">
          
          {/* Left: Video Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -4 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[90%] max-w-[450px] lg:w-[40%] z-10"
          >
            {/* Arrow/Text pointing to video */}
            <div className="absolute -top-12 -left-4 md:-top-16 md:-left-8 -rotate-12 flex flex-col items-center">
              <span className="font-serif italic text-xl md:text-2xl text-[#2A3439]">A Simple Video</span>
              <svg width="40" height="40" viewBox="0 0 50 50" fill="none" className="mt-1 opacity-60">
                <path d="M10 10 Q 30 10 40 30" stroke="#8B6B3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M35 30 L 40 30 L 40 25" stroke="#8B6B3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Video Player Mockup */}
            <div className="relative w-full aspect-video bg-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl border-4 border-[#3A3A3A]/20">
              <Image src="/ourstory.png" alt="Video Thumbnail" fill className="object-cover opacity-80" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#2A2421" className="ml-1">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Fake Progress bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="text-white/90 text-[10px] font-sans drop-shadow-md">0:00 / 1:30</div>
                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="w-1/3 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>

            {/* Cons Tooltip */}
            <div className="absolute -bottom-10 right-4 md:-bottom-16 md:right-10 w-[240px] bg-[#FDFBF9] rounded-xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#E8DDD0] rotate-2">
              <div className="flex gap-4">
                <div className="mt-1 text-[#B97A7E]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="15" x2="16" y2="15"></line>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <ul className="text-[11px] font-sans text-[#5A5A5A] space-y-2 flex-1">
                  <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#B97A7E] shrink-0" /> Just a one-way video</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#B97A7E] shrink-0" /> Cannot click or explore</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#B97A7E] shrink-0" /> No maps, RSVP or details</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#B97A7E] shrink-0" /> Gets lost in chats</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Dotted connecting arrow (Desktop only) */}
          <div className="hidden lg:block w-[15%] relative z-0">
             <svg width="100%" height="60" viewBox="0 0 200 60" fill="none" className="opacity-100 stroke-[#8B6B3D]">
                <path d="M 0 30 Q 100 -20 200 10" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                <path d="M 188 0 L 200 10 L 188 20" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>

          {/* Right: Laptop & Mobile Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[600px] lg:w-[45%] mt-16 lg:mt-0 z-20"
          >
            {/* Arrow/Text pointing to digital */}
            <div className="absolute -top-12 right-0 md:-top-16 md:right-10 rotate-6 flex flex-col items-center">
              <span className="font-serif italic text-xl md:text-2xl text-[#2A3439]">An Interactive<br/>Digital Experience</span>
              <svg width="40" height="40" viewBox="0 0 50 50" fill="none" className="mt-1 opacity-60 rotate-[140deg]">
                <path d="M10 10 Q 30 10 40 30" stroke="#8B6B3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M35 30 L 40 30 L 40 25" stroke="#8B6B3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            {/* Laptop Frame */}
            <div className="relative w-full aspect-[16/10] bg-[#ECECEC] rounded-t-xl rounded-b-sm shadow-2xl border-x-4 border-t-4 border-[#3A3A3A] overflow-hidden">
               {/* Website Mockup Image */}
               <div className="absolute inset-0 bg-[#FAF8F5]">
                  {/* Fake navbar */}
                  <div className="relative z-20 w-full h-8 border-b border-[#E8DDD0] flex items-center px-4 justify-between bg-white/90 backdrop-blur-md">
                    <div className="text-[#B97A7E]"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
                    <div className="flex gap-4 text-[6px] font-sans text-[#5A5A5A] uppercase tracking-wider font-semibold">
                      <span>Home</span><span>Our Story</span><span>Events</span><span>Gallery</span><span>RSVP</span>
                    </div>
                  </div>
                  {/* Fake hero */}
                  <div className="relative w-full h-[calc(100%-2rem)] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                     <Image src="/1template.png" alt="Laptop background" fill className="object-cover opacity-90" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/40 to-transparent" />
                     <div className="relative z-10">
                       <span className="block text-[7px] tracking-[0.3em] text-[#8B6B3D] font-bold uppercase mb-1 drop-shadow-sm">Our Wedding</span>
                       <h3 className="font-serif italic text-3xl text-[#2A3439] mb-3 drop-shadow-sm">A New Chapter</h3>
                       <div className="px-5 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-[6px] text-[#2A3439] uppercase font-bold tracking-widest mx-auto w-max border border-white/50 shadow-sm">Explore Our Story</div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Laptop Base */}
            <div className="w-[110%] -ml-[5%] h-4 bg-[#D1D1D1] rounded-b-xl rounded-t-sm shadow-lg border-b border-[#A1A1A1] relative z-10" />

            {/* Mobile Frame Overlapping */}
            <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 w-[140px] md:w-[170px] aspect-[1/2.1] bg-[#FAF8F5] rounded-[24px] shadow-2xl border-4 border-[#3A3A3A] overflow-hidden z-30">
               {/* iPhone notch */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#3A3A3A] rounded-b-xl z-20" />
               {/* Mobile Website UI */}
               <div className="w-full h-full overflow-hidden flex flex-col bg-[#FAF8F5]">
                  <div className="relative h-24 overflow-hidden">
                     <Image src="/2template.png" alt="Mobile header" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" quality={85} />
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF8F5]" />
                  </div>
                  <div className="p-3 flex flex-col gap-2 -mt-10 relative z-10">
                     <div className="w-full aspect-[4/3] bg-white rounded-lg shadow-sm overflow-hidden relative border border-[#E8DDD0]">
                         <Image src="/3template1.png" alt="Gallery preview" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" quality={85} />
                     </div>
                     <div className="text-[10px] font-serif text-[#8B6B3D] mt-2">RSVP</div>
                     <div className="w-full h-6 bg-white rounded shadow-sm border border-[#E8DDD0]" />
                     <div className="w-full h-6 bg-white rounded shadow-sm border border-[#E8DDD0]" />
                     <div className="w-full h-8 bg-[#8B6B3D] rounded-full text-white text-[8px] font-bold tracking-wider flex items-center justify-center mt-1">SEND RSVP</div>
                  </div>
               </div>
            </div>

          </motion.div>
        </div>

        {/* ── 4-Column Feature Grid (Bottom) ── */}
        <div className="w-full mt-20 pt-16 border-t border-[#E8DDD0]/50 relative">
          
          {/* Subtle dotted line connecting the steps */}
          <div className="hidden lg:block absolute top-[5.5rem] left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-[#C5A97B] to-transparent opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div 
                key={feature.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center relative z-10"
              >
                {/* Number & Icon */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="font-serif italic text-2xl text-[#C5A97B]">{feature.num}</span>
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[#E8DDD0] flex items-center justify-center text-[#8B6B3D] bg-gradient-to-br from-white to-[#FAF8F5]">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-sans text-[13px] tracking-[0.15em] font-bold text-[#1A1A1A] uppercase mb-4">
                  {feature.title}
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-[#5A5A5A]">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
