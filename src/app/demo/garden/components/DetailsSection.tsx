"use client";

import { motion } from "framer-motion";

const DETAILS = [
  {
    label: "Ceremony",
    main: "4:00 PM",
    sub: "Saturday, June 14, 2026",
    sub2: "The Rosewood Estate",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Reception",
    main: "6:30 PM",
    sub: "Cocktails & Dinner",
    sub2: "Grand Ballroom",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22h8M12 11v11M5 11h14l-1.5-7h-11L5 11z" />
      </svg>
    ),
  },
  {
    label: "Dress Code",
    main: "Black Tie",
    sub: "Optional",
    sub2: "Garden attire welcome",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L8 7l4 2 4-2-4-5z" />
        <path d="M8 7l-4 15h16L16 7" />
      </svg>
    ),
  },
];

export default function DetailsSection() {
  return (
    <section className="w-full py-20 md:py-28" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
            Wedding Day
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1A1614", lineHeight: 1.15 }}>
            Every beautiful detail.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DETAILS.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-8 md:p-10"
              style={{
                backgroundColor: "#FFFFFF",
                borderTop: "3px solid #C9A96E",
                boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
                borderRadius: "2px",
              }}
            >
              <div className="mb-5">{d.icon}</div>
              <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E" }}>
                {d.label}
              </span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#1A1614", lineHeight: 1.1, marginBottom: "0.75rem" }}>
                {d.main}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.875rem", color: "#8A7F75", lineHeight: 1.6 }}>
                {d.sub}<br />{d.sub2}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
