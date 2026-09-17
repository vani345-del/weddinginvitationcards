"use client";

import { useEffect, useState, useRef } from "react";

const WEDDING_DATE = new Date("2026-06-14T16:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const [flip, setFlip] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 600);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          perspective: "400px",
          width: "clamp(60px, 10vw, 90px)",
          height: "clamp(75px, 13vw, 110px)",
        }}
      >
        <div
          style={{
            backgroundColor: "#2A2420",
            borderRadius: "6px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            animation: flip ? "cardFlip 0.6s ease-in-out" : "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          {/* Mid line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#C9A96E",
              lineHeight: 1,
            }}
          >
            {display}
          </span>
        </div>
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#8A7F75",
        }}
      >
        {label}
      </span>
      <style jsx global>{`
        @keyframes cardFlip {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(-90deg); }
          100% { transform: rotateX(0deg); }
        }
      `}</style>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="w-full py-20 md:py-28"
      style={{ backgroundColor: "#1A1614" }}
    >
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Label */}
        <span
          className="mb-12 block"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A96E",
          }}
        >
          Counting down to
        </span>

        {/* Flip cards */}
        <div className="flex items-center gap-4 md:gap-8">
          <FlipCard value={timeLeft.days} label="Days" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#C9A96E", marginBottom: "2rem" }}>:</span>
          <FlipCard value={timeLeft.hours} label="Hours" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#C9A96E", marginBottom: "2rem" }}>:</span>
          <FlipCard value={timeLeft.minutes} label="Min" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#C9A96E", marginBottom: "2rem" }}>:</span>
          <FlipCard value={timeLeft.seconds} label="Sec" />
        </div>
      </div>
    </section>
  );
}
