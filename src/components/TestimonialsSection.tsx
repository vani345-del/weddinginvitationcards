"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Mo Omar",
    rating: 5,
    text: "“I had my wedding cards made by Wedding Cards, and they went above and beyond my expectations. The quality is outstanding, the design is elegant, and the price is very reasonable for the high standard of work. I would highly recommend them to anyone looking for wedding cards or other print services.”",
  },
  {
    id: 2,
    name: "Liba Shafiq",
    rating: 5,
    text: "“I recently purchased cards from them for my birthday. The designs were exquisite, capturing the essence of my special day perfectly. The quality of the cards exceeded my expectations. The customization options allowed us to personalize our invitations, making them truly unique. Overall, good wedding cards a wonderful choice to make a lasting impression on your guests and set the tone for your celebration.”",
  },
  {
    id: 3,
    name: "Aisha Shafiq",
    rating: 5,
    text: "“I recently bought from WEDDING CARDS & ALL DESIGN/PRINT SERVICES AT ARTWORK STUDIO and I must say I'm impressed. The print quality was excellent, capturing intricate details vividly. The cardstock used was durable, giving the cards a professional feel. The ordering process was straightforward, and the customer service is great. Overall, a reliable choice for high-quality card printing.”",
  },
  {
    id: 4,
    name: "imran riaz",
    rating: 5,
    text: "“My experience of wedding card printing from art work studio is highly appreciatable . Quality versus price is also admirable. Designs are unique. I recommend this studio for others. Also I must say that this studio meet the deadlines of tasks assigned to them. Best wishes. Thank you art work studio.”",
  },
  {
    id: 5,
    name: "Raiyyat Abbas",
    rating: 5,
    text: "“I highly recommend for anyone in search of exquisite wedding cards. With their stunning designs, impeccable quality, and outstanding customer service, they truly exceeded my expectations. Thank you,for helping make my brother wedding day even more special”",
  },
];

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-5 h-5 inline-block mr-2"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.14 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);

const Stars = () => (
  <div className="flex space-x-1 text-gold text-lg">
    {"★★★★★"}
  </div>
);

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const activeReview = REVIEWS[activeIndex];

  return (
    <section className="relative w-full bg-ivory py-24 md:py-32 overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center md:items-start mb-16 text-center md:text-left"
        >
          <span className="text-gold tracking-widest text-xs uppercase font-medium mb-4 block">
            CUSTOMER LOVE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-gray mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg text-luxury-gray/70 max-w-xl">
            Real experiences from customers who trusted us with their printing and stationery.
          </p>

          <div className="mt-8 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 text-luxury-gray">
              <GoogleIcon />
              <span className="font-medium tracking-wide">Google Reviews</span>
            </div>
            <div className="mt-2 text-2xl tracking-widest text-gold">★★★★★</div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Featured Review (Left/Center) */}
          <div className="w-full lg:w-1/2 relative min-h-[300px]">
            <div className="absolute -top-12 -left-6 text-gold/10 font-serif text-[180px] leading-none select-none z-0">
              "
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <div className="text-2xl tracking-widest text-gold mb-6">★★★★★</div>
                <p className="text-xl md:text-2xl font-serif text-luxury-gray leading-relaxed mb-8">
                  {activeReview.text}
                </p>
                <div className="flex items-center justify-between border-t border-champagne pt-6">
                  <div>
                    <h4 className="font-medium text-luxury-gray text-lg uppercase tracking-wider">
                      — {activeReview.name}
                    </h4>
                    <div className="flex items-center text-sm text-luxury-gray/60 mt-1">
                      <GoogleIcon /> Google Review
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation (Right/Below) */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex space-x-2">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      idx === activeIndex
                        ? "bg-gold scale-100"
                        : "bg-gold/20 scale-75 hover:bg-gold/40"
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={prevReview}
                  className="p-3 rounded-full border border-champagne text-luxury-gray hover:bg-champagne/30 transition-colors duration-300"
                  aria-label="Previous review"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-3 rounded-full border border-champagne text-luxury-gray hover:bg-champagne/30 transition-colors duration-300"
                  aria-label="Next review"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hidden scrollbar container for mobile swipe, stacked cards on desktop */}
            <div className="flex overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-col lg:overflow-visible space-x-4 lg:space-x-0 lg:space-y-4 snap-x snap-mandatory hide-scrollbar">
              {REVIEWS.map((review, idx) => (
                <div
                  key={review.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`snap-center shrink-0 w-[280px] lg:w-full cursor-pointer transition-all duration-500 rounded-lg p-6 border ${
                    idx === activeIndex
                      ? "border-gold/40 bg-white/50 shadow-sm"
                      : "border-champagne bg-ivory/50 hover:bg-white/40 hover:-translate-y-1 hover:shadow-md hover:border-gold/30"
                  } relative overflow-hidden group`}
                >
                  {/* Subtle decorative edge */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500 ${idx === activeIndex ? "bg-gold/60" : "bg-transparent group-hover:bg-gold/30"}`} />
                  
                  <div className="text-gold text-sm tracking-widest mb-3">★★★★★</div>
                  <p className="text-luxury-gray/80 text-sm italic line-clamp-3 mb-4">
                    {review.text.substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-luxury-gray uppercase text-xs tracking-wider">
                      {review.name}
                    </span>
                    <GoogleIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="https://google.com" // Placeholder for GBP URL
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center text-sm font-medium text-luxury-gray uppercase tracking-widest hover:text-gold transition-colors duration-300"
          >
            Read More Reviews
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
