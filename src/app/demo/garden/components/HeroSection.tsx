"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

const COUPLE = {
  fullNames: "Emma & James",
  date: "Saturday, June 14, 2026",
  venue: "The Rosewood Estate",
  heroImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
};

interface HeroSectionProps {
  visible: boolean;
}

export default function HeroSection({ visible }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Canvas floating petals
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 4 + Math.random() * 6,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.2 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? "#D4A5A5" : "#C9A96E",
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.y -= p.speed;
        p.rotation += p.rotationSpeed;
        if (p.y < -20) p.y = canvas.height + 20;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <Image
          src={COUPLE.heroImage}
          alt="Emma and James"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,22,20,0.1) 0%, rgba(26,22,20,0.5) 50%, rgba(26,22,20,0.75) 100%)",
        }}
      />

      {/* Canvas petals */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Hero content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
      >
        <motion.span
          variants={itemVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#C9A96E",
          }}
          className="mb-6"
        >
          Together with their families
        </motion.span>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(3rem, 10vw, 6.5rem)",
            lineHeight: 1.1,
            color: "#FAF7F2",
          }}
        >
          Emma
          <br />
          <span style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#C9A96E" }}>
            &
          </span>
          <br />
          James
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="my-6 flex items-center justify-center"
        >
          <div style={{ width: "120px", height: "1px", backgroundColor: "#C9A96E" }} />
        </motion.div>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "1rem",
            color: "rgba(250,247,242,0.9)",
          }}
        >
          {COUPLE.date}
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "0.875rem",
            color: "#8A7F75",
            marginTop: "0.5rem",
          }}
        >
          {COUPLE.venue} · Napa Valley, California
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8A7F75",
          }}
        >
          Scroll to explore
        </span>
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="#C9A96E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
