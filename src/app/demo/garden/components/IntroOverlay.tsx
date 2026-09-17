"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface IntroOverlayProps {
  onComplete: () => void;
}

interface Petal {
  left: string;
  duration: string;
  delay: string;
  width: string;
  height: string;
  color: string;
  rotation: string;
}

const NAMES = "Emma & James".split("");

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [petals, setPetals] = useState<Petal[]>([]);

  // Generate petals client-side only — fixes SSR/client Math.random() hydration mismatch
  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 8 }, (_, i) => ({
      left: `${10 + i * 11}%`,
      duration: `${(1.5 + Math.random() * 1.5).toFixed(2)}s`,
      delay: `${(i * 0.15).toFixed(2)}s`,
      width: `${(8 + Math.random() * 6).toFixed(1)}px`,
      height: `${(5 + Math.random() * 4).toFixed(1)}px`,
      color: i % 2 === 0 ? "#D4A5A5" : "#C9A96E",
      rotation: `${Math.floor(Math.random() * 360)}deg`,
    }));
    setPetals(generated);
  }, []);

  // GSAP timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setTimeout(onComplete, 100),
      });

      tl.to(".intro-candle", { opacity: 1, duration: 0.8, ease: "power2.out" });
      tl.to(".intro-petal-wrap", { opacity: 1, duration: 0.5 }, "+=0.2");
      tl.to(
        ".intro-letter",
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
        "+=0.3"
      );
      tl.to(".intro-gold-line", { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, "-=0.3");
      tl.to(".intro-overlay", { opacity: 0, duration: 0.8, delay: 0.4 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="intro-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#1A1614" }}
    >
      {/* Candle */}
      <div className="intro-candle opacity-0 mb-10 flex flex-col items-center">
        <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
          <ellipse cx="20" cy="10" rx="5" ry="8" fill="#E8D5A3" className="animate-pulse" />
          <ellipse cx="20" cy="13" rx="3" ry="5" fill="#C9A96E" className="animate-pulse" />
          <line x1="20" y1="18" x2="20" y2="22" stroke="#333" strokeWidth="1.5" />
          <rect x="14" y="22" width="12" height="40" rx="2" fill="#FAF7F2" />
          <rect x="14" y="22" width="12" height="6" rx="2" fill="#E8D5A3" opacity="0.4" />
        </svg>
      </div>

      {/* Falling petals — only rendered after client mount to prevent hydration mismatch */}
      <div className="intro-petal-wrap opacity-0 absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: p.left,
              top: "-20px",
              animationName: "petalFall",
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationTimingFunction: "ease-in",
              animationFillMode: "forwards",
              width: p.width,
              height: p.height,
              backgroundColor: p.color,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0.7,
              transform: `rotate(${p.rotation})`,
            }}
          />
        ))}
      </div>

      {/* Names */}
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center">
          {NAMES.map((letter, i) => (
            <span
              key={i}
              className="intro-letter"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(2rem, 8vw, 4rem)",
                color: "#FAF7F2",
                opacity: 0,
                transform: "translateY(20px)",
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Gold underline */}
        <svg width="220" height="8" viewBox="0 0 220 8" className="mt-3">
          <line
            className="intro-gold-line"
            x1="0"
            y1="4"
            x2="220"
            y2="4"
            stroke="#C9A96E"
            strokeWidth="1"
            strokeDasharray="220"
            strokeDashoffset="220"
          />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes petalFall {
          0%   { transform: translateY(0)     rotate(0deg);   opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
