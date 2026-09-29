"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WeddingDetailsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Only register and run GSAP on the client
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the entire scene and create a long scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 viewport heights of scrolling
          scrub: 1.5,
          pin: pinRef.current,
        },
      });

      // ── PARALLAX CAMERA MOVEMENT ──
      // Background scales up slowly (distant)
      tl.to(".wds-bg", { scale: 1.15, duration: 10, ease: "power1.inOut" }, 0);
      
      // Midground Couple scales slightly faster (approaching them)
      tl.to(".wds-couple", { scale: 1.1, x: "-2vw", duration: 10, ease: "none" }, 0);
      
      // Foreground elements move outward and scale faster (passing them)
      tl.to(".wds-fg-left", { scale: 1.25, x: "-8vw", y: "5vh", duration: 10, ease: "none" }, 0);

      // ── TEXT REVEALS ──
      // Title fades in almost immediately
      tl.to(".wds-title", { opacity: 1, y: 0, duration: 1.5 }, 0.2);
      
      // Details fade in much faster so the user doesn't have to scroll far to see them
      tl.to(".wds-date", { opacity: 1, y: 0, duration: 1.5 }, 1.0);
      tl.to(".wds-ceremony", { opacity: 1, y: 0, duration: 1.5 }, 2.0);
      tl.to(".wds-reception", { opacity: 1, y: 0, duration: 1.5 }, 3.0);
      tl.to(".wds-dresscode", { opacity: 1, y: 0, duration: 1.5 }, 4.0);

      // Gentle fade out of the whole scene right at the very end before the next section
      tl.to(pinRef.current, { opacity: 0.001, duration: 1.5 }, 8.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="wds-container">
      <div ref={pinRef} className="wds-pin-target">
        
        {/* BACKGROUND */}
        <div className="wds-bg-color" />
        <img className="wds-bg" src="/illustrated_wedding_assets/mainbg2.png" alt="" aria-hidden="true" />
        
        {/* MIDGROUND COUPLE */}
        <img className="wds-couple" src="/illustrated_wedding_assets/couple_main_illustration.webp" alt="Illustrated couple" />

        {/* FOREGROUND FRAMING */}
        <img className="wds-fg-left" src="/illustrated_wedding_assets/leftdownbush.png" alt="" aria-hidden="true" />

        {/* TYPOGRAPHY OVERLAY */}
        <div className="wds-text-container">
          <h2 className="wds-title">Our<br /><em>Wedding</em><br />Day</h2>
          
          <div className="wds-info-block wds-date">
            <p className="wds-label">Friday, 20 March 2026</p>
          </div>
          
          <div className="wds-info-block wds-ceremony">
            <span className="wds-eyebrow">Ceremony</span>
            <p className="wds-value">St. Mary's Chapel</p>
          </div>
          
          <div className="wds-info-block wds-reception">
            <span className="wds-eyebrow">Reception</span>
            <p className="wds-value">The Garden Pavilion</p>
          </div>
          
          <div className="wds-info-block wds-dresscode">
            <span className="wds-eyebrow">Dress Code</span>
            <p className="wds-value">Black Tie Preferred</p>
          </div>
        </div>

      </div>

      <style>{`
        .wds-container {
          position: relative;
          width: 100%;
          background: #F8F4EC;
        }
        .wds-pin-target {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #F8F4EC;
        }

        /* LAYERS */
        .wds-bg-color {
          position: absolute; inset: 0; background: #F8F4EC; z-index: 0;
        }
        .wds-bg {
          position: absolute; top: -5%; left: -5%; width: 110%; height: 110%;
          object-fit: cover; opacity: 0.12; z-index: 1; pointer-events: none;
        }

        .wds-couple {
          position: absolute; bottom: 0; right: 10vw;
          height: 85vh; width: auto; max-width: 60vw;
          object-fit: contain; object-position: bottom right;
          z-index: 3; pointer-events: none;
        }

        /* FOREGROUND */
        .wds-fg-left {
          position: absolute; bottom: -5vh; left: -5vw;
          height: 80vh; width: auto; max-width: 50vw;
          object-fit: contain; object-position: bottom left;
          z-index: 5; pointer-events: none; opacity: 0.95;
        }

        /* TEXT */
        .wds-text-container {
          position: absolute; top: 50%; left: 10vw;
          transform: translateY(-50%);
          z-index: 4; /* Behind foreground, above couple */
          width: 45vw;
          display: flex; flex-direction: column; gap: 2rem;
        }
        .wds-title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(50px, 7vw, 100px);
          line-height: 0.85;
          color: #1a2618;
          margin: 0;
          font-weight: 400;
          opacity: 0; transform: translateY(30px);
        }
        .wds-title em { font-style: italic; color: #8c7343; font-weight: 300; }
        
        .wds-info-block {
          opacity: 0; transform: translateY(20px);
        }
        .wds-eyebrow {
          display: block; font-family: "DM Sans", sans-serif;
          font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          color: #8c7343; margin-bottom: 8px; font-weight: 700;
        }
        .wds-label {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(22px, 3vw, 32px);
          color: #1a2618; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
          margin: 0;
        }
        .wds-value {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(24px, 3vw, 36px);
          color: #1a2618; font-style: italic;
          margin: 0; line-height: 1.2;
        }

        /* ── RESPONSIVE DESIGN ── */
        @media (max-width: 1024px) {
          .wds-couple { right: 0; height: 70vh; opacity: 0.8; z-index: 2; }
          .wds-text-container { z-index: 4; width: 60vw; }
          .wds-fg-right { max-width: 35vw; opacity: 0.6; }
        }

        @media (max-width: 768px) {
          /* Mobile: Recompose Vertically */
          .wds-couple {
            bottom: 0; right: -15vw; height: 60vh; max-width: 90vw;
            opacity: 0.35; /* Push to background so text is readable */
            z-index: 1;
          }
          .wds-fg-left { height: 40vh; bottom: 0; left: -10vw; opacity: 0.7; z-index: 5; }
          .wds-fg-right { height: 60vh; bottom: 0; right: -10vw; opacity: 0.5; z-index: 5; }
          
          .wds-text-container {
            top: 15vh; left: 8vw; width: 84vw;
            transform: none; text-align: left;
            z-index: 4; gap: 1.5rem;
          }
          .wds-title { margin-bottom: 1rem; }
        }
      `}</style>
    </section>
  );
}
