"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", location: "San Francisco" },
  { src: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800&q=80", location: "Napa Valley" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", location: "Napa Valley" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80", location: "The Estate" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", location: "San Francisco" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", location: "The Garden" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", location: "Napa Valley" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", location: "The Estate" },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleKey = (e: React.KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % IMAGES.length);
    if (e.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + IMAGES.length) % IMAGES.length);
    if (e.key === "Escape") setLightboxIndex(null);
  };

  return (
    <section className="w-full py-20 md:py-28" style={{ backgroundColor: "#1A1614" }} onKeyDown={handleKey}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
            Our Moments
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#FAF7F2", lineHeight: 1.15 }}>
            Captured forever.
          </h2>
        </motion.div>

        {/* Grid — 3 cols desktop, 2 cols mobile, explicit heights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden cursor-pointer group"
              style={{ height: i % 3 === 0 ? "380px" : "240px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img.src}
                alt={img.location}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Gold hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "rgba(201,169,110,0.35)" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FAF7F2" }}>
                  {img.location}
                </span>
                <span style={{ color: "#FAF7F2", fontSize: "1.5rem", marginTop: "6px" }}>↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative"
              style={{ width: "80vw", maxWidth: "900px", height: "70vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[lightboxIndex].src}
                alt={IMAGES[lightboxIndex].location}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Close */}
            <button
              className="absolute top-6 right-8 text-white text-4xl leading-none hover:text-yellow-300 transition-colors"
              onClick={() => setLightboxIndex(null)}
            >×</button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl px-4 hover:text-yellow-300 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + IMAGES.length) % IMAGES.length); }}
            >‹</button>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl px-4 hover:text-yellow-300 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % IMAGES.length); }}
            >›</button>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
                {IMAGES[lightboxIndex].location} · {lightboxIndex + 1} / {IMAGES.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
