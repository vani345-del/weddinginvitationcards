"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function VenueSection() {
  return (
    <section className="w-full py-20 md:py-28" style={{ backgroundColor: "#1A1614" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
            The Venue
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#FAF7F2", lineHeight: 1.15 }}>
            The Rosewood Estate
          </h2>
          <div className="mx-auto mt-6" style={{ width: "60px", height: "1px", backgroundColor: "#C9A96E" }} />
        </motion.div>

        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

          {/* Photo — left */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: "420px",
                border: "1px solid rgba(201,169,110,0.35)",
                outline: "8px solid #1A1614",
                outlineOffset: "-16px",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=80"
                alt="The Rosewood Estate"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Content — right */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", color: "#8A7F75", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              1200 Rosewood Lane<br />
              Napa Valley, CA 94558
            </p>

            <div style={{ width: "60px", height: "1px", backgroundColor: "#C9A96E", marginBottom: "1.5rem" }} />

            {/* Time info */}
            <div className="flex flex-col gap-4 mb-10">
              {[
                { symbol: "◎", text: "Ceremony at 4:00 PM" },
                { symbol: "✦", text: "Reception at 6:30 PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span style={{ color: "#C9A96E", fontSize: "12px" }}>{item.symbol}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "#8A7F75" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Directions button */}
            <a
              href="https://maps.google.com/?q=Napa+Valley+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-10 w-fit transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#1A1614]"
              style={{
                border: "1px solid #C9A96E",
                color: "#C9A96E",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "12px 28px",
              }}
            >
              → Get Directions
            </a>

            {/* Info cards row */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Venue", value: "The Rosewood Estate" },
                { label: "Location", value: "Napa Valley, CA" },
                { label: "Ceremony", value: "4:00 PM, June 14" },
                { label: "Reception", value: "6:30 PM onwards" },
              ].map((item, i) => (
                <div key={i} className="p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderLeft: "2px solid rgba(201,169,110,0.3)" }}>
                  <span className="block mb-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E" }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: "#FAF7F2" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map embed */}
        <motion.div
          className="mt-12 w-full overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ border: "1px solid rgba(201,169,110,0.2)", borderRadius: "2px" }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Napa+Valley+CA&output=embed"
            width="100%"
            height="280"
            style={{ border: 0, display: "block", filter: "grayscale(0.3) contrast(1.1)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

      </div>
    </section>
  );
}
