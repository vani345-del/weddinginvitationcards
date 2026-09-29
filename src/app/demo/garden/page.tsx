"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import StorySection from "./components/StorySection";
import BackgroundMusic from "./components/BackgroundMusic";

export default function EmmaJamesCinematic() {
  const WEDDING = new Date('2028-03-20T10:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPassed, setIsPassed] = useState(false);
  const [flash, setFlash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const diff = WEDDING.getTime() - now.getTime();
      if (diff <= 0) {
        setIsPassed(true);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
        setFlash(true);
        setTimeout(() => setFlash(false), 400);
      }
    };
    updateTime(); // initial call
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const bokehDots = useMemo(() => Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 18 + 4,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 4
  })), []);

  const rosePetals = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 10,
    scale: Math.random() * 0.4 + 0.6
  })), []);

  const storyRef = useRef<HTMLElement>(null);
  const storyCardsRef = useRef<HTMLDivElement>(null);
  const [storyVisible, setStoryVisible] = useState(false);

  useEffect(() => {
    if (!storyRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStoryVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.25 });
    observer.observe(storyRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (!storyRef.current || !storyCardsRef.current) return;
      if (window.innerWidth <= 768) {
        storyCardsRef.current.style.transform = 'none';
        return;
      }
      const rect = storyRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = window.innerHeight - rect.top;
        const parallaxY = progress * 0.18; // Moves slower than scroll (0.82x speed roughly)
        storyCardsRef.current.style.transform = `translateY(${parallaxY}px)`;
      }
    };
    const loop = () => {
      handleScroll();
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafId);
  }, []);


  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed: ${src}`));
        document.head.appendChild(s);
      });

    let scrollListeners: Array<() => void> = [];
    let pointerListener: ((e: PointerEvent) => void) | null = null;

    (async () => {
      await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js");

      const { gsap, ScrollTrigger } = window as any;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);



      // ── Scroll buttons ────────────────────────────────────────────────
      document.querySelectorAll("[data-ej-scroll]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = (btn as HTMLElement).dataset.ejScroll;
          if (target) document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        });
      });


      // ── Wall Mask (Clip Path) ─────────────────────────────────────────
      // We calculate a precise SVG clip-path for the background wall to punch the door hole.
      // This is vastly more reliable than CSS mix-blend-mode across different browsers.
      const updateWallMask = () => {
        const wallBg = document.querySelector(".ej-hero-wall-bg") as HTMLElement;
        if (!wallBg) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        // Reduced width: Matches CSS clamp(260px, 45vw, 480px)
        const doorW = Math.min(Math.max(260, w * 0.45), 480);
        const doorH = h * 0.8; // 80vh
        const bottom = h * 0.1; // 10vh
        
        // Anti-aliasing fix: Shrink the hole cutout by 2px on all sides so the physical doors 
        // slightly overlap the wall, completely hiding the white sub-pixel halo.
        const pad = 2;
        const holeW = doorW - pad * 2;
        const r = holeW / 2;
        
        const top = h - bottom - doorH + pad;
        const left = (w - doorW) / 2 + pad;
        const right = left + holeW;
        
        // M0,0 Hw Vh H0 Z = Full screen bounding box
        // Mleft,bottom Vtop+r A r,r 0 0,1 right,top+r Vbottom Z = The arch hole (drawn inversely to subtract)
        wallBg.style.clipPath = `path(evenodd, "M0,0 H${w} V${h} H0 Z M${left},${h - bottom} V${top + r} A${r},${r} 0 0,1 ${right},${top + r} V${h - bottom} Z")`;
      };
      
      updateWallMask();
      const onResize = () => updateWallMask();
      window.addEventListener("resize", onResize);
      scrollListeners.push(() => window.removeEventListener("resize", onResize));

      // ── HERO: Wedding Invitation Doors (Fly-Through Zoom) ──────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".ej-hero",
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(".ej-hero-scroll-indicator", { opacity: 0, duration: 0.05 }, 0);
      tl.to(".ej-hero-door-text", { opacity: 0, duration: 0.1 }, 0);

      // STEP 1 (0.1 to 0.5): Doors open physically while everything else stays perfectly still
      tl.to(".ej-door-left", { rotationY: -110, ease: "power2.inOut", duration: 0.4 }, 0.1);
      tl.to(".ej-door-right", { rotationY: 110, ease: "power2.inOut", duration: 0.4 }, 0.1);

      // STEP 2 (0.5 to 1.3): The Fly-Through. Wait until doors finish opening at 0.5!
      
      // 2a. Parallax destination image for depth (scales UP as camera moves forward)
      tl.fromTo(".ej-hero-destination-img",
        { scale: 0.85 },
        { scale: 1.25, ease: "power2.inOut", duration: 0.8 },
        0.5 // <-- Starts EXACTLY when doors finish opening
      );

      // 2b. Scale the portal so the doors fly past the camera
      tl.to(".ej-hero-portal", {
        scale: 7, 
        ease: "power2.in",
        duration: 0.8
      }, 0.5); // <-- Starts EXACTLY when doors finish opening

      // 2c. Fade out the portal completely right as it clears the screen (1.1 to 1.3)
      tl.to(".ej-hero-portal", {
        opacity: 0,
        duration: 0.2
      }, 1.1);

      // STEP 3: Typography elegantly staggers in on the destination image as you arrive
      tl.fromTo(".ej-hero-content > *", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.25, stagger: 0.05 }, 
        1.0
      );

      // ── Camera crossfade for later sections ───────────────────────────
      gsap.to(".ej-bg-b", { opacity: 1, scale: 1.05, ease: "none", scrollTrigger: { trigger: ".ej-gallery", start: "top 80%", end: "top 20%", scrub: 1 } });
      gsap.to(".ej-bg-b", { scale: 1.18, ease: "none", scrollTrigger: { trigger: ".ej-details", start: "top 90%", end: "bottom top", scrub: 1 } });

      // ── Story pin ────────────────────────────────────────────────────
      // old story gsap removed

      // ── Interlude pin ─────────────────────────────────────────────────
      const interTL = gsap.timeline({ scrollTrigger: { trigger: ".ej-interlude", start: "top top", end: "+=100%", scrub: 1, pin: true } });
      interTL
        .from(".ej-giant-word", { scale: 1.35, opacity: 0, letterSpacing: "-.01em", duration: 0.6 })
        .from(".ej-interlude-copy p", { y: 40, opacity: 0, duration: 0.25 }, "<.2")
        .from(".ej-floating-date", { x: 100, opacity: 0, duration: 0.3 }, "<.1");

      // ── Gallery horizontal pin ────────────────────────────────────────
      const galleryTL = gsap.timeline({ scrollTrigger: { trigger: ".ej-gallery", start: "top top", end: "+=130%", scrub: 1, pin: true } });
      galleryTL
        .from(".ej-gallery-head", { y: 80, opacity: 0, duration: 0.25 })
        .to(".ej-gallery-track", {
          x: () => -(document.querySelector(".ej-gallery-track")!.scrollWidth - innerWidth + innerWidth * 0.08),
          duration: 1, ease: "none",
        }, "+=.05")
        .to(".ej-gallery-head", { y: -35, opacity: 0.25, duration: 0.3 }, "<");

      // ── Details pin ───────────────────────────────────────────────────
      const detailsTL = gsap.timeline({ scrollTrigger: { trigger: ".ej-details", start: "top top", end: "+=115%", scrub: 1, pin: true } });
      detailsTL
        .from(".ej-details-copy", { x: -100, opacity: 0, duration: 0.4 })
        .from(".ej-details-visual", { x: 140, rotation: 5, opacity: 0, duration: 0.5 }, "<.12")
        .from(".ej-detail-list > div", { y: 35, opacity: 0, stagger: 0.12, duration: 0.3 }, "<.2")
        .to(".ej-details-visual img", { scale: 1.14, ease: "none", duration: 0.8 }, "<");

      // ── RSVP ─────────────────────────────────────────────────────────
      gsap.from(".ej-rsvp-copy > *", { y: 55, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".ej-rsvp", start: "top 70%" } });
      gsap.to(".ej-rsvp-backdrop", { scale: 1, ease: "none", scrollTrigger: { trigger: ".ej-rsvp", start: "top bottom", end: "bottom top", scrub: 1 } });

      // ── Cursor glow ───────────────────────────────────────────────────
      const glow = document.querySelector(".ej-cursor-glow") as HTMLElement | null;
      if (glow) {
        pointerListener = (e: PointerEvent) =>
          gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
        window.addEventListener("pointermove", pointerListener);
      }

      // ── Misc ──────────────────────────────────────────────────────────
      document.querySelector(".ej-sound")?.addEventListener("click", (e) => {
        (e.currentTarget as HTMLElement).innerHTML = "♫ <span>Sound on</span>";
      });
      document.querySelector(".ej-open-rsvp")?.addEventListener("click", () => {
        (document.querySelector(".ej-dialog") as HTMLDialogElement | null)?.showModal();
      });

      ScrollTrigger.refresh();
    })();

    return () => {
      scrollListeners.forEach((fn) => fn());
      if (pointerListener) window.removeEventListener("pointermove", pointerListener);
      const ST = (window as any).ScrollTrigger;
      if (ST) ST.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&family=Italianno&display=swap"
        rel="stylesheet"
      />

      <style>{`
        /* ── Base ── */
        .ej-root *, .ej-root *::before, .ej-root *::after { box-sizing: border-box; }
        :root {
          --ej-cream:  #efe5d8;
          --ej-ink:    #27231f;
          --ej-rose:   #d98b9d;
          --ej-dark:   #0a080f;
          --ej-serif:  "Cormorant Garamond", serif;
          --ej-sans:   "DM Sans", sans-serif;
        }
        .ej-root {
          margin: 0;
          background: var(--ej-dark);
          color: #fff;
          font-family: var(--ej-sans);
          font-weight: 300;
          overflow-x: hidden;
          position: relative;
        }
        .ej-root button, .ej-root a { font: inherit; }
        .ej-root button { cursor: pointer; }
        .ej-root a { text-decoration: none; color: inherit; }

        /* ── Cursor glow ── */
        .ej-cursor-glow {
          position: fixed; z-index: 90;
          width: 200px; height: 200px; border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, #efb4c318, transparent 68%);
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
        }

        /* ── Fixed camera BG (later sections) ── */
        .ej-camera { position: fixed; inset: 0; z-index: -5; background: var(--ej-dark); overflow: hidden; }
        .ej-camera-bg { position: absolute; inset: -5%; background-position: center; background-size: cover; transform: scale(1.08); opacity: 0; will-change: transform, opacity; }
        .ej-bg-b { background-image: linear-gradient(#10120b22,#10120b72), url("/emma-james/details.jpg"); }
        .ej-camera-grain {
          position: absolute; inset: -50%; opacity: .05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light; animation: ej-grain .18s steps(2) infinite;
        }
        .ej-camera-vignette { position: absolute; inset: 0; background: radial-gradient(circle at 50% 45%, transparent 38%, #050306c0 100%); }
        @keyframes ej-grain {
          0%  { transform: translate(2%,1%); }
          25% { transform: translate(-1%,3%); }
          50% { transform: translate(3%,-2%); }
          75% { transform: translate(-2%,-1%); }
          100%{ transform: translate(1%,2%); }
        }



        /* ══════════════════════════════════════════════════════════════
           HERO — WEDDING INVITATION DOORS
        ══════════════════════════════════════════════════════════════ */
        .ej-hero {
          height: 100svh;
          background: #391211; /* Deep luxury burgundy environment */
          position: relative;
          overflow: hidden;
        }

        /* Destination (The world we fly into) */
        .ej-hero-destination {
          position: absolute; inset: 0; z-index: 1;
          background: url('/couplebgimage.png') center/cover;
          display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
          overflow: hidden;
        }
        .ej-hero-destination-img {
          position: absolute;
          bottom: 0;
          left: 0; right: 0; margin: auto;
          height: min(75vh, 800px); /* restricted height so it isn't massive */
          width: auto; max-width: 100vw;
          object-fit: contain;
          object-position: bottom center;
          will-change: transform;
          transform-origin: bottom center; /* anchors feet to bottom while scaling */
        }

        /* The Portal (Scales up to fly through) */
        .ej-hero-portal {
          position: absolute; inset: 0; z-index: 5;
          display: flex; align-items: flex-end; justify-content: center;
          padding-bottom: 10vh;
          transform-origin: center 60%; /* scale from center of the hole */
        }

        /* The Image Wall around the door */
        .ej-hero-wall-bg {
          position: absolute; inset: 0;
          background-color: #391211; /* The main hero environment color */
          background-image: url('/herobg.png');
          background-position: center;
          background-size: cover;
          /* clip-path is applied dynamically via JS to punch the perfect arch hole */
        }

        /* The Hole container for the doors */
        .ej-hero-hole {
          width: clamp(260px, 45vw, 480px); /* Matches cutter width */
          height: 80vh; /* Matches cutter height */
          border-radius: 500px 500px 0 0;
          position: relative;
          z-index: 1;
        }

        /* Door Frame */
        .ej-hero-door-frame {
          position: absolute; inset: 0; /* fills the hole */
          perspective: 2000px;
        }
        .ej-hero-door {
          position: absolute; top: 0; width: 50%; height: 100%;
          background: #ebe5d5;
          box-shadow: inset 0 0 40px rgba(180, 160, 130, 0.2);
          transform-style: preserve-3d;
          will-change: transform;
        }
        .ej-door-left { left: 0; transform-origin: left center; border-radius: 500px 0 0 0; border-right: 1px solid rgba(0,0,0,0.05); }
        .ej-door-right { right: 0; transform-origin: right center; border-radius: 0 500px 0 0; border-left: 1px solid rgba(0,0,0,0.05); }

        /* Typography on the closed doors */
        .ej-hero-door-text {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          z-index: 10; text-align: center; width: 100%; pointer-events: none;
          color: #391211; /* Matches the wine background */
        }
        .ej-hero-door-text .eyebrow {
          font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
          margin-bottom: 24px; opacity: 0.7; font-weight: 500;
        }
        .ej-hero-door-text h2 {
          font-family: var(--ej-serif); font-size: clamp(42px, 6vw, 64px);
          font-weight: 400; line-height: 1; margin: 0 0 20px;
        }
        .ej-hero-door-text .date {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          opacity: 0.7;
        }

        /* Ornate details inside doors */
        .ej-door-inner {
          position: absolute; inset: 16px;
          border: 1px solid #d4c5ab;
          pointer-events: none;
        }
        .ej-door-left .ej-door-inner { border-radius: 500px 0 0 0; border-right: none; }
        .ej-door-right .ej-door-inner { border-radius: 0 500px 0 0; border-left: none; }

        /* Handles */
        .ej-door-handle {
          position: absolute; top: 50%;
          width: 14px; height: 14px;
          border: 2px solid #b89f65; border-radius: 50%;
          background: linear-gradient(135deg, #e6d39a, #b89f65);
          box-shadow: 2px 4px 10px rgba(0,0,0,0.15);
          transform: translateY(-50%);
        }
        .ej-door-left .ej-door-handle { right: 12px; }
        .ej-door-right .ej-door-handle { left: 12px; }

        /* Content & Typography */
        .ej-hero-content {
          position: absolute; inset: 0; z-index: 10;
          pointer-events: none;
          display: flex; flex-direction: column; 
          align-items: flex-start; /* Left-aligned */
          justify-content: flex-end;
          padding: 8vh 8vw; /* Spacing from edges for mobile and desktop */
          /* Cinematic corner gradient to guarantee text legibility */
          background: linear-gradient(to top right, rgba(15, 5, 8, 0.95) 0%, rgba(15, 5, 8, 0.5) 30%, transparent 60%);
        }
        .ej-hero-eyebrow {
          font-family: var(--ej-serif);
          font-size: clamp(9px, 1.2vw, 13px);
          letter-spacing: 0.25em; text-transform: uppercase;
          line-height: 1.6;
          color: #f5c4d0; margin-bottom: 2vh;
          max-width: 280px; /* Wrap nicely on the left */
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .ej-hero-names {
          font-family: Italianno, cursive; 
          font-size: clamp(55px, 15vw, 150px); /* Adjusted clamp for perfect mobile responsiveness */
          font-weight: 400; line-height: 0.9; color: #ffffff;
          margin: 0;
          text-shadow: 0 4px 30px rgba(0,0,0,0.8), 0 2px 5px rgba(0,0,0,0.6);
        }
        .ej-hero-names span {
          font-size: 0.6em; margin: 0 0.15em; color: #f5c4d0; 
        }
        .ej-hero-divider {
          width: 50px; height: 1px; background: rgba(245, 196, 208, 0.6);
          margin: 20px 0;
        }
        .ej-hero-date {
          font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
          color: rgba(255, 255, 255, 0.95); margin: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        .ej-hero-scroll-indicator {
          position: absolute; top: 92vh; left: 50%; transform: translateX(-50%);
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        /* Scroll cue: bottom right */
        .ej-hero-cta {
          position: absolute;
          bottom: 3vh; right: 5vw;
          font-size: 9px; letter-spacing: .25em; text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          display: flex; align-items: center; gap: 12px;
          z-index: 10; opacity: 0;
          will-change: opacity;
        }
        .ej-hero-cta span {
          width: 38px; height: 1px;
          background: rgba(255,255,255,.25);
          display: block;
        }

        /* ── Chapters (story, interlude, details, gallery, rsvp) ── */
        .ej-chapter { position: relative; min-height: 100svh; overflow: hidden; }
        .ej-chapter-index { position: absolute; top: 9vh; left: 7vw; font-size: 9px; letter-spacing: .25em; opacity: .55; }
        .ej-eyebrow { font-size: 10px; letter-spacing: .28em; text-transform: uppercase; opacity: .72; margin: 0 0 24px; }

        /* Story */
        .ej-story { min-height: 180vh; background: var(--ej-cream); color: var(--ej-ink); }
        .ej-story-intro { position: absolute; left: 11vw; top: 18vh; width: min(620px,48vw); z-index: 4; }
        .ej-story-intro h2, .ej-details-copy h2, .ej-gallery-head h2, .ej-rsvp-copy h2 {
          font-family: var(--ej-serif); font-size: clamp(64px,8vw,132px); font-weight: 400; line-height: .82; letter-spacing: -.045em; margin: 0;
        }
        .ej-story-intro h2 em, .ej-details-copy h2 em, .ej-gallery-head h2 em, .ej-rsvp-copy h2 em { font-style: italic; }
        .ej-story-intro .ej-eyebrow { color: #8e5e68; }
        .ej-lead { font-family: var(--ej-serif); font-size: 22px; line-height: 1.25; max-width: 420px; margin: 46px 0 0; }
        .ej-story-photo { position: absolute; left: 51vw; top: 26vh; width: min(36vw,510px); z-index: 3; }
        .ej-photo-card { background: #e8dccd; padding: 14px 14px 55px; box-shadow: 0 50px 100px #4d392d2c; transform: rotate(5deg); position: relative; }
        .ej-photo-card img { width: 100%; display: block; aspect-ratio: 4/5; object-fit: cover; filter: saturate(.78); }
        .ej-photo-card span { position: absolute; left: 28px; bottom: 18px; font-family: var(--ej-serif); font-style: italic; font-size: 20px; }
        .ej-story-line { position: absolute; left: 17vw; top: 102vh; width: 370px; font-family: var(--ej-serif); font-size: 25px; line-height: 1.15; }
        .ej-story-end { position: absolute; right: 8vw; bottom: 12vh; font-size: 9px; letter-spacing: .25em; opacity: .48; }

        /* Interlude */
        .ej-interlude { height: 115vh; display: grid; place-items: center; background: #11130f; }
        .ej-interlude::before { content: ""; position: absolute; inset: 0; background: linear-gradient(#0b0d0a55,#0b0d0a88), url("/emma-james/story-garden.jpg") center/cover; opacity: .58; transform: scale(1.08); }
        .ej-interlude-copy { position: relative; text-align: center; z-index: 2; }
        .ej-giant-word { font-family: var(--ej-serif); font-size: clamp(100px,19vw,300px); letter-spacing: -.06em; line-height: .7; color: #f1e8dc; }
        .ej-interlude-copy p { font-family: var(--ej-serif); font-style: italic; font-size: 22px; margin-top: 65px; }
        .ej-floating-date { position: absolute; z-index: 3; right: 11vw; bottom: 12vh; display: flex; align-items: center; gap: 14px; }
        .ej-floating-date strong { font-family: var(--ej-serif); font-size: 100px; font-weight: 400; line-height: .6; }
        .ej-floating-date span { font-size: 9px; letter-spacing: .2em; line-height: 1.5; }

        /* Details */
        .ej-details { height: 155vh; background: #171912e8; display: flex; align-items: center; padding: 12vh 9vw; gap: 8vw; }
        .ej-details::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 78% 48%,#d2b59a18,transparent 30%); }
        .ej-details-copy { width: 48%; z-index: 2; }
        .ej-details-copy .ej-eyebrow { color: #e4b2bd; }
        .ej-detail-list { margin: 65px 0 44px; border-top: 1px solid #ffffff2d; }
        .ej-detail-list > div { display: grid; grid-template-columns: 110px 1fr; gap: 25px; padding: 21px 0; border-bottom: 1px solid #ffffff2d; }
        .ej-detail-list span { font-size: 9px; letter-spacing: .22em; opacity: .52; }
        .ej-detail-list strong { font-family: var(--ej-serif); font-size: 22px; font-weight: 400; line-height: 1.1; }
        .ej-detail-list small { font-family: var(--ej-sans); font-size: 10px; letter-spacing: .05em; opacity: .52; }
        .ej-text-link { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; border-bottom: 1px solid #fff8; padding-bottom: 9px; }
        .ej-text-link span { margin-left: 14px; }
        .ej-details-visual { width: 39%; height: 80vh; position: relative; z-index: 2; }
        .ej-arch { height: 100%; overflow: hidden; border-radius: 48% 48% 0 0 / 36% 36% 0 0; box-shadow: 0 40px 90px #0007; border: 1px solid #ffffff30; }
        .ej-arch img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.65); }
        .ej-location-stamp { position: absolute; right: -40px; bottom: 40px; border: 1px solid #ffffff66; padding: 18px 20px; font-size: 9px; letter-spacing: .23em; line-height: 1.5; background: #11130eb5; backdrop-filter: blur(9px); }

        /* Gallery */
        .ej-gallery { height: 100vh; background: #eee3d6; color: var(--ej-ink); padding-top: 15vh; overflow: hidden; }
        .ej-gallery-head { position: absolute; left: 8vw; top: 10vh; z-index: 4; }
        .ej-gallery-head .ej-eyebrow { color: #8e5e68; }
        .ej-gallery-track { position: absolute; top: 25vh; left: 0; height: 75vh; display: flex; align-items: center; gap: 7vw; padding-left: 8vw; width: max-content; }
        .ej-shot { margin: 0; position: relative; flex: 0 0 auto; }
        .ej-shot img { display: block; object-fit: cover; filter: saturate(.76); }
        .ej-shot figcaption { font-family: var(--ej-serif); font-size: 20px; font-style: italic; margin-top: 15px; }
        .ej-shot-one img { width: 34vw; height: 48vh; }
        .ej-shot-two { transform: translateY(-80px); }
        .ej-shot-two img { width: 26vw; height: 57vh; }
        .ej-shot-three img { width: 31vw; height: 43vh; }
        .ej-gallery-final { height: 45vh; width: 35vw; display: flex; flex-direction: column; justify-content: center; gap: 18px; margin-left: 4vw; }
        .ej-gallery-final span { font-size: 10px; letter-spacing: .25em; opacity: .5; }
        .ej-gallery-final strong { font-family: var(--ej-serif); font-size: 60px; line-height: .8; font-weight: 400; }

        /* RSVP */
        .ej-rsvp { height: 110vh; display: grid; place-items: center; background: var(--ej-dark); }
        .ej-rsvp-backdrop { position: absolute; inset: 0; background: linear-gradient(#0a0b0870,#0a0b08b8), url("/emma-james/hero.jpg") center/cover; transform: scale(1.08); filter: saturate(.7); }
        .ej-rsvp-copy { position: relative; z-index: 3; text-align: center; width: min(700px,90vw); }
        .ej-rsvp-copy .ej-eyebrow { color: #e5b2bc; }
        .ej-rsvp-copy h2 { font-family: var(--ej-serif); font-size: clamp(78px,11vw,170px); font-weight: 400; line-height: .82; letter-spacing: -.045em; margin: 0; }
        .ej-rsvp-copy h2 em { font-style: italic; }
        .ej-rsvp-copy p { font-family: var(--ej-serif); font-size: 22px; max-width: 440px; margin: 42px auto; }
        .ej-rsvp-button {
          border: 1px solid rgba(255,255,255,.4); background: transparent; color: #fff;
          padding: 14px 28px; border-radius: 999px; backdrop-filter: blur(10px);
          font-size: 10px; letter-spacing: .18em; text-transform: uppercase; cursor: pointer;
          transition: background .3s;
        }
        .ej-rsvp-button:hover { background: rgba(255,255,255,.1); }
        .ej-closing-mark { position: absolute; bottom: 35px; left: 50%; transform: translateX(-50%); font-family: var(--ej-serif); font-size: 26px; z-index: 3; }
        .ej-closing-mark i { font-family: Italianno; color: #e7a8b4; font-size: 40px; }



        /* Dialog */
        .ej-dialog { border: 0; padding: 50px; max-width: 480px; width: calc(100% - 32px); background: #f0e5d8; color: #28231f; box-shadow: 0 40px 100px rgba(0,0,0,.4); position: relative; }
        .ej-dialog::backdrop { background: rgba(8,9,5,.75); backdrop-filter: blur(8px); }
        .ej-dialog-close { position: absolute; right: 18px; top: 14px; background: none; border: 0; font-size: 28px; cursor: pointer; }
        .ej-dialog-eyebrow { font-size: 10px; letter-spacing: .28em; text-transform: uppercase; opacity: .72; margin: 0 0 24px; color: #8e5e68; }
        .ej-dialog h3 { font-family: var(--ej-serif); font-size: 62px; line-height: .8; font-weight: 400; margin: 0 0 34px; }
        .ej-dialog h3 em { font-style: italic; }
        .ej-dialog form { display: grid; gap: 11px; }
        .ej-dialog input, .ej-dialog select { padding: 14px 13px; border: 1px solid rgba(142,124,109,.27); background: #f8efe5; font: inherit; }
        .ej-dialog form > button { padding: 15px; border: 0; background: #27231f; color: #fff; text-transform: uppercase; letter-spacing: .16em; font-size: 10px; cursor: pointer; }

        /* ── Responsive ── */
        @media (max-width: 800px) {

          .ej-hero-names-wrap h1 { font-size: clamp(46px,13vw,90px); }
          .ej-story { min-height: 145vh; }
          .ej-story-intro { left: 8vw; top: 17vh; width: 84vw; }
          .ej-story-intro h2 { font-size: 18vw; }
          .ej-story-photo { left: 17vw; top: 57vh; width: 67vw; }
          .ej-story-line { left: 9vw; top: 111vh; width: 78vw; font-size: 21px; }
          .ej-story-end { right: 8vw; bottom: 6vh; }
          .ej-interlude { height: 100vh; }
          .ej-giant-word { font-size: 27vw; }
          .ej-floating-date { right: 8vw; bottom: 10vh; }
          .ej-details { height: auto; min-height: 145vh; display: block; padding: 18vh 8vw 10vh; }
          .ej-details-copy { width: 100%; }
          .ej-details-copy h2 { font-size: 18vw; }
          .ej-detail-list { margin-top: 48px; }
          .ej-details-visual { width: 72vw; height: 65vh; margin: 10vh auto 0; }
          .ej-gallery { height: 100vh; padding-top: 15vh; overflow: hidden; }
          .ej-gallery-head h2 { font-size: 17vw; }
          .ej-gallery-track { top: 35vh; height: 65vh; gap: 12vw; padding-left: 8vw; }
          .ej-shot-one img { width: 65vw; height: 40vh; }
          .ej-shot-two img { width: 54vw; height: 47vh; }
          .ej-shot-three img { width: 62vw; height: 36vh; }
          .ej-gallery-final { width: 68vw; }
          .ej-gallery-final strong { font-size: 48px; }
          .ej-rsvp { height: 95vh; }
          .ej-rsvp-copy h2 { font-size: 22vw; }
          .ej-rsvp-copy p { font-size: 19px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ej-root *, .ej-root *::before, .ej-root *::after {
            scroll-behavior: auto !important; animation: none !important; transition: none !important;
          }
        }

        /* ══════════════════════════════════════════════════════════════
           COUNTDOWN SECTION
        ══════════════════════════════════════════════════════════════ */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap');

        .ej-countdown-section {
          position: relative;
          min-height: 40vh;
          padding: 6rem 2rem;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          /* Warm Tuscany-dusk gradient */
          background: linear-gradient(135deg, #1f080a 0%, #391211 40%, #2c0e12 100%);
          color: #fff;
          overflow: hidden;
          text-align: center;
        }

        /* Layered vignette for depth */
        .ej-countdown-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 120%);
          z-index: 1; pointer-events: none;
        }

        .ej-countdown-content {
          position: relative; z-index: 10;
          padding: 2rem;
        }

        .ej-countdown-title {
          font-family: var(--ej-cormorant-garamond), var(--ej-serif);
          font-style: italic;
          font-size: clamp(40px, 8vw, 80px);
          color: #f5c4d0; /* Rose tinted */
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .ej-countdown-title span {
          font-family: Italianno, cursive;
          font-size: 1.2em;
          color: #e4c5c4;
          margin: 0 10px;
        }

        .ej-countdown-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 14px; letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 4rem;
          color: rgba(255,255,255,0.8);
        }

        .ej-countdown-timer {
          display: flex; gap: 3vw; justify-content: center;
          font-family: 'Montserrat', sans-serif;
        }

        .ej-countdown-item {
          display: flex; flex-direction: column; align-items: center;
          width: 80px;
        }

        .ej-countdown-value {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 300;
          line-height: 1;
          color: #fff;
          transition: text-shadow 0.3s ease;
        }
        
        .ej-countdown-value.flash {
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.4);
          color: #fffde7;
        }

        .ej-countdown-label {
          margin-top: 10px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        /* Bokeh dots */
        .ej-bokeh-dot {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 230, 180, 0.8) 0%, rgba(255, 230, 180, 0) 70%);
          filter: blur(2px);
          animation: float-bokeh linear infinite;
          z-index: 2;
        }

        @keyframes float-bokeh {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }

        /* Rose petals */
        .ej-petal {
          position: absolute;
          background: #8e2b3b;
          border-radius: 50% 0 50% 0;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
          animation: fall-petal linear infinite;
          z-index: 3;
        }

        @keyframes fall-petal {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }


        /* ══════════════════════════════════════════════════════════════
           OUR STORY SECTION (V2)
        ══════════════════════════════════════════════════════════════ */
        .ej-our-story-v2 {
          position: relative;
          min-height: 100vh;
          background: #f0ebe1; /* warm linen/cream */
          display: flex;
          justify-content: center; /* Center horizontally */
          padding: 6rem 5vw;
          color: #1a1410;
          overflow: hidden;
        }
        
        .ej-os-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Italianno', cursive;
          font-size: clamp(30rem, 50vw, 60rem);
          color: rgba(138, 122, 106, 0.05); /* very faint */
          z-index: 0;
          pointer-events: none;
          line-height: 0.8;
          white-space: nowrap;
        }

        .ej-os-gold-line {
          position: absolute;
          top: 0; left: 0;
          height: 1px;
          background: #c9a96e;
          width: 0%;
          transition: width 1.4s ease-out;
          z-index: 2;
        }
        .ej-our-story-v2.is-visible .ej-os-gold-line {
          width: 100%;
        }

        .ej-os-content {
          position: relative;
          z-index: 2;
          display: flex;
          width: 100%;
          max-width: 1300px;
          margin-top: 2rem;
          gap: 6rem;
        }

        .ej-os-top-label {
          position: absolute;
          top: 6rem; left: 5vw;
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          color: #8a7a6a;
          margin-bottom: 2.5rem;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease-out 0s, transform 0.7s ease-out 0s;
        }

        .ej-os-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ej-os-label {
          font-family: 'Montserrat', sans-serif;
          font-weight: 200;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          color: #8a7a6a;
          margin-bottom: 1rem;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s;
        }

        .ej-os-heading {
          display: flex;
          flex-direction: column;
          line-height: 1.05;
          margin: 0;
          color: #1a1410;
        }
        .ej-os-heading span {
          font-family: var(--font-cormorant-garamond), 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 6vw, 6rem);
          letter-spacing: -0.02em;
          opacity: 0; transform: translateY(30px);
        }
        .ej-os-h1 {
          font-weight: 400;
          transition: opacity 0.8s ease-out 0.22s, transform 0.8s ease-out 0.22s;
        }
        .ej-os-h2 {
          font-style: italic;
          font-weight: 400;
          transition: opacity 0.8s ease-out 0.36s, transform 0.8s ease-out 0.36s;
        }

        .ej-os-body {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 1.05rem;
          line-height: 1.85;
          color: #4a3f35;
          max-width: 480px;
          margin-top: 2rem;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.8s ease-out 0.5s, transform 0.8s ease-out 0.5s;
        }

        .ej-os-right {
          flex: 0 0 500px;
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          /* Parallax applied via inline styles in JS */
          will-change: transform;
        }

        .ej-os-card-stack {
          position: relative;
          height: 520px;
          width: 420px;
        }

        .ej-os-card-back, .ej-os-card-front {
          position: absolute;
          width: 320px;
          height: 440px;
          border: 14px solid #ffffff;
          background-size: cover;
          background-position: center;
          opacity: 0;
        }

        .ej-os-card-back {
          background-color: #2a2018; /* Dark placeholder or image */
          top: 40px; right: 80px;
          transform: translateX(100px) rotate(-6deg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.18s;
        }

        .ej-os-card-front {
          background-color: #3a2d20; /* Slightly lighter dark placeholder or image */
          background-image: url('/emma-james/story-garden.jpg');
          top: 0px; right: 20px;
          transform: translateX(100px) rotate(8deg);
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.32s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.32s;
        }

        .ej-our-story-v2.is-visible .ej-os-top-label,
        .ej-our-story-v2.is-visible .ej-os-label,
        .ej-our-story-v2.is-visible .ej-os-heading span,
        .ej-our-story-v2.is-visible .ej-os-body {
          opacity: 1; transform: translateY(0);
        }

        .ej-our-story-v2.is-visible .ej-os-card-back {
          opacity: 1; transform: translateX(0) rotate(-6deg);
        }
        .ej-our-story-v2.is-visible .ej-os-card-front {
          opacity: 1; transform: translateX(0) rotate(3deg);
        }

        .ej-os-caption {
          font-family: 'Italianno', cursive;
          font-size: 2.2rem;
          color: #8a7a6a;
          text-align: center;
          margin-top: 460px; /* pushes below the 440px card */
          opacity: 0;
          transition: opacity 1s ease-out 0.8s;
        }
        .ej-our-story-v2.is-visible .ej-os-caption {
          opacity: 1;
        }

        @media (max-width: 900px) {
          .ej-our-story-v2 {
            flex-direction: column;
            padding: 4rem 1.8rem;
          }
          .ej-os-top-label {
            position: relative;
            top: 0; left: 0;
            margin-bottom: 2rem;
          }
          .ej-os-content {
            flex-direction: column;
            margin-top: 0;
            gap: 2rem;
          }
          .ej-os-left {
            flex: none;
            margin-bottom: 2rem;
          }
          .ej-os-heading span {
            font-size: clamp(2.8rem, 10vw, 4rem);
          }
          .ej-os-right {
            flex: none;
            justify-content: center;
          }
          .ej-os-card-stack {
            width: 100%;
            height: 380px;
            display: flex;
            justify-content: center;
          }
          .ej-os-card-back, .ej-os-card-front {
            width: 240px;
            height: 330px;
            border-width: 10px;
          }
          .ej-os-card-back {
            top: 20px; right: auto; left: 10%;
          }
          .ej-os-card-front {
            top: 0px; right: auto; left: 30%;
          }
          .ej-os-caption {
            margin-top: 340px;
          }
          .ej-os-bg-text {
            font-size: 80vw;
          }
        }
      `}</style>

      <div className="ej-root">
        <div className="ej-cursor-glow" aria-hidden="true" />

        {/* Fixed camera layer for later dark sections */}
        <div className="ej-camera" aria-hidden="true">
          <div className="ej-camera-bg ej-bg-b" />
          <div className="ej-camera-grain" />
          <div className="ej-camera-vignette" />
        </div>


        <main>
          {/* ══════════════════════════════════════════════════════════════
              HERO — arch hole grows through dark overlay as you scroll
              Exact era-residence.com mechanic
          ══════════════════════════════════════════════════════════════ */}
          <section className="ej-hero" id="ej-home">

            {/* Destination Image (Always full screen, sits in back) */}
            <div className="ej-hero-destination">
              <img className="ej-hero-destination-img" src="/heroimage.png" alt="Emma and James" loading="eager" />
              {/* Content sits here to appear after zoom */}
              <div className="ej-hero-content">
                <p className="ej-hero-eyebrow">
                  You are warmly invited<br/>to celebrate the wedding of
                </p>
                <h1 className="ej-hero-names">Emma <span>&</span> James</h1>
                <div className="ej-hero-divider" />
                <p className="ej-hero-date">14 . 06 . 2026</p>
              </div>
            </div>

            {/* The Zooming Portal (Scales up to fly through) */}
            <div className="ej-hero-portal">
              {/* Image Wall around the door (Arch hole is punched via JS clip-path) */}
              <div className="ej-hero-wall-bg" />

              {/* The actual hole containing the doors */}
              <div className="ej-hero-hole">
                <div className="ej-hero-door-frame">
                  <div className="ej-hero-door ej-door-left">
                    <div className="ej-door-inner" />
                    <div className="ej-door-handle" />
                  </div>
                  <div className="ej-hero-door ej-door-right">
                    <div className="ej-door-inner" />
                    <div className="ej-door-handle" />
                  </div>
                </div>
              </div>
            </div>

            {/* Invitation Typography (Floating over the doors, fades out on scroll) */}
            <div className="ej-hero-door-text">
              <p className="eyebrow">The Wedding Of</p>
              <h2>Emma <i>&</i> James</h2>
              <p className="date">14 . 06 . 2026</p>
            </div>

            <div className="ej-hero-scroll-indicator">SCROLL TO OPEN</div>
            
            {/* Template Contact Button (Centered at the top for maximum visibility) */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[100]">
              <a 
                href="mailto:contact@yourdomain.com"
                className="px-8 py-4 border border-[#C9A96E] rounded-full text-xs tracking-[0.2em] uppercase text-[#1A1614] bg-[#C9A96E] font-bold shadow-[0_0_30px_rgba(201,169,110,0.5)] hover:scale-105 hover:bg-[#DBC396] transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Use This Template <span>↗</span>
              </a>
            </div>
          </section>

          {/* Countdown Section */}
          <section className="ej-countdown-section">
            {/* Bokeh Particles */}
            {mounted && bokehDots.map(dot => (
              <div 
                key={dot.id} 
                className="ej-bokeh-dot"
                style={{
                  left: `${dot.left}vw`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  animationDelay: `${dot.delay}s`,
                  animationDuration: `${dot.duration}s`
                }}
              />
            ))}
            {/* Rose Petals */}
            {mounted && rosePetals.map(petal => (
              <div 
                key={petal.id} 
                className="ej-petal"
                style={{
                  left: `${petal.left}vw`,
                  width: `${12 * petal.scale}px`,
                  height: `${12 * petal.scale}px`,
                  animationDelay: `${petal.delay}s`,
                  animationDuration: `${petal.duration}s`
                }}
              />
            ))}

            <div className="ej-countdown-content">
              {isPassed ? (
                <h2 className="ej-countdown-title">The Wait <span>is</span> Over</h2>
              ) : (
                <>
                  <h2 className="ej-countdown-title">Emma <span>&</span> James</h2>
                  <p className="ej-countdown-subtitle">Are getting married in</p>
                  
                  {mounted && (
                    <div className="ej-countdown-timer">
                      <div className="ej-countdown-item">
                        <span className={`ej-countdown-value ${flash ? 'flash' : ''}`}>{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="ej-countdown-label">Days</span>
                      </div>
                      <div className="ej-countdown-item">
                        <span className={`ej-countdown-value ${flash ? 'flash' : ''}`}>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="ej-countdown-label">Hours</span>
                      </div>
                      <div className="ej-countdown-item">
                        <span className={`ej-countdown-value ${flash ? 'flash' : ''}`}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="ej-countdown-label">Mins</span>
                      </div>
                      <div className="ej-countdown-item">
                        <span className={`ej-countdown-value ${flash ? 'flash' : ''}`}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="ej-countdown-label">Secs</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Story */}
          <StorySection />

          {/* Interlude */}
          <section className="ej-chapter ej-interlude">
            <div className="ej-interlude-copy">
              <span className="ej-giant-word">TOGETHER</span>
              <p>Years of small moments became one very big day.</p>
            </div>
            <div className="ej-floating-date">
              <strong>14</strong>
              <span>JUNE<br />2026</span>
            </div>
          </section>

          {/* Gallery */}
          <section className="ej-chapter ej-gallery" id="ej-gallery">
            <div className="ej-gallery-head">
              <p className="ej-eyebrow">02 / MOMENTS</p>
              <h2>A few frames<br /><em>from our story.</em></h2>
            </div>
            <div className="ej-gallery-track">
              <figure className="ej-shot ej-shot-one">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/emma-james/hero.jpg" alt="" />
                <figcaption>Before the vows</figcaption>
              </figure>
              <figure className="ej-shot ej-shot-two">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/emma-james/story-garden.jpg" alt="" />
                <figcaption>The quiet in-between</figcaption>
              </figure>
              <figure className="ej-shot ej-shot-three">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/emma-james/details.jpg" alt="" />
                <figcaption>Where it all becomes real</figcaption>
              </figure>
              <div className="ej-gallery-final">
                <span>ONE DAY.</span>
                <strong>A THOUSAND<br />MEMORIES.</strong>
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="ej-chapter ej-details" id="ej-details">
            <div className="ej-chapter-index">03 / THE DAY</div>
            <div className="ej-details-copy">
              <p className="ej-eyebrow">THE WEDDING</p>
              <h2>Meet us<br /><em>in the garden.</em></h2>
              <div className="ej-detail-list">
                <div><span>WHEN</span><strong>14 June 2026<br /><small>Ceremony · 4:30 PM</small></strong></div>
                <div><span>WHERE</span><strong>The Rosewood Estate<br /><small>Napa Valley, California</small></strong></div>
                <div><span>WEAR</span><strong>Garden Formal<br /><small>Soft evening tones</small></strong></div>
              </div>
              <a className="ej-text-link" href="#ej-rsvp">Save your place <span>↗</span></a>
            </div>
            <div className="ej-details-visual">
              <div className="ej-arch">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/emma-james/details.jpg" alt="The Rosewood Estate" />
              </div>
              <div className="ej-location-stamp">ROSEWOOD<br />ESTATE</div>
            </div>
          </section>

          {/* Map & Directions */}
          <section className="ej-chapter relative w-full bg-[#FCFBF9] py-24 md:py-40 px-6 flex flex-col items-center border-t border-[#C9A96E]/20">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                <p className="ej-eyebrow mb-6 text-[#8e5e68]">DIRECTIONS</p>
                <h2 style={{ fontFamily: "var(--ej-serif)" }} className="text-6xl md:text-7xl text-[#1A1614] mb-8 leading-none">
                  Finding your <br/><em className="italic font-light">way there.</em>
                </h2>
                <p style={{ fontFamily: "var(--ej-sans)" }} className="text-[#5A4F46] text-lg font-light leading-relaxed mb-10 max-w-sm">
                  The Rosewood Estate is tucked away in the rolling hills of Napa Valley. Valet parking will be provided upon arrival at the main gates.
                </p>
                <div className="flex flex-col gap-3 text-xs tracking-[0.2em] uppercase text-[#1A1614] opacity-80" style={{ fontFamily: "var(--ej-sans)" }}>
                  <span>1234 Vineyard Lane</span>
                  <span>St. Helena, California 94574</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-[400px] md:h-[600px] p-3 border border-[#C9A96E]/40 rounded-t-[200px]">
                <div className="w-full h-full rounded-t-[200px] overflow-hidden filter grayscale opacity-90 contrast-125">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100345.3610444558!2d-122.56948514588728!3d38.50246876404283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80845a05b3310033%3A0xc3f2402179a61327!2sSt%20Helena%2C%20CA%2094574!5e0!3m2!1sen!2sus!4v1717361839499!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </section>


          {/* RSVP */}
          <section className="ej-chapter ej-rsvp" id="ej-rsvp">
            <div className="ej-rsvp-backdrop" />
            <div className="ej-rsvp-copy">
              <p className="ej-eyebrow">04 / THE INVITATION</p>
              <h2>Will you<br /><em>join us?</em></h2>
              <p>Come for the ceremony, stay for dinner, dancing, and all the little moments after.</p>
              <button className="ej-rsvp-button ej-open-rsvp">RSVP <span>↗</span></button>
            </div>
            <div className="ej-closing-mark">E <i>&</i> J</div>
          </section>

          {/* Template Promotion Footer */}
          <footer className="w-full bg-[#0a0b08] py-20 flex flex-col items-center border-t border-white/5 relative z-50">
            <p className="text-base font-medium text-[#FAF7F2] mb-8 px-4 text-center" style={{ fontFamily: "var(--ej-sans)" }}>
              Want a beautiful digital invitation like this for your own wedding?
            </p>
            <a 
              href="mailto:contact@yourdomain.com" 
              className="px-10 py-4 border border-[#C9A96E] rounded-full text-xs tracking-widest uppercase text-[#1A1614] bg-[#C9A96E] font-bold shadow-[0_0_30px_rgba(201,169,110,0.5)] hover:scale-105 hover:bg-[#DBC396] transition-all text-center"
            >
              Contact Me to Use This Template
            </a>
          </footer>
          <BackgroundMusic />
        </main>

        {/* RSVP Dialog */}
        <dialog className="ej-dialog">
          <button
            className="ej-dialog-close"
            onClick={(e) => (e.currentTarget.closest("dialog") as HTMLDialogElement | null)?.close()}
          >×</button>
          <p className="ej-dialog-eyebrow">EMMA &amp; JAMES</p>
          <h3>We hope you&apos;ll<br /><em>be there.</em></h3>
          <form method="dialog">
            <input placeholder="Your name" />
            <input placeholder="Email address" />
            <select>
              <option>Number of guests</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
            <button>Send RSVP</button>
          </form>
        </dialog>
      </div>
    </>
  );
}
