"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STORY = [
  {
    label: "HOW WE MET",
    headline: "A Rainy Tuesday",
    body: "We met on a rainy Tuesday at a bookshop in San Francisco. James reached for the same copy of Fitzgerald, and Emma pretended she wasn't already holding it.",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    reverse: false,
  },
  {
    label: "THE PROPOSAL",
    headline: "Same Shelf. Same Book.",
    body: "Three years later, James proposed at the same bookshop — same shelf, same book — with a ring hidden between the pages.",
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800&q=80",
    reverse: true,
  },
  {
    label: "TODAY",
    headline: "Our Everyday Adventure",
    body: "We've traveled to 14 countries, adopted a golden retriever named Gatsby, and laughed through every ordinary Tuesday since.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    reverse: false,
  },
];

const fadeSlide = (dir: "left" | "right") => ({
  hidden: { opacity: 0, x: dir === "left" ? -50 : 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } },
});

export default function StorySection() {
  return (
    <section className="w-full py-20 md:py-32 relative" style={{ backgroundColor: "#FAF7F2" }}>
      {/* Gold vertical line */}
      <div
        className="absolute left-8 md:left-16 top-0 bottom-0 w-px hidden md:block"
        style={{ backgroundColor: "#C9A96E", opacity: 0.2 }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
            Our Story
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#1A1614", lineHeight: 1.15 }}>
            The beginning of forever.
          </h2>
          <div className="mx-auto mt-6" style={{ width: "60px", height: "1px", backgroundColor: "#C9A96E" }} />
        </motion.div>

        {/* Story rows */}
        <div className="flex flex-col gap-20 md:gap-32">
          {STORY.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${item.reverse ? "md:flex-row-reverse" : ""}`}
            >
              {/* Photo */}
              <motion.div
                className="w-full md:w-1/2"
                variants={fadeSlide(item.reverse ? "right" : "left")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: "4px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
                  <Image src={item.image} alt={item.headline} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                className="w-full md:w-1/2 flex flex-col justify-center"
                variants={fadeSlide(item.reverse ? "left" : "right")}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="block mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
                  {item.label}
                </span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#1A1614", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                  {item.headline}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "#8A7F75" }}>
                  {item.body}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
