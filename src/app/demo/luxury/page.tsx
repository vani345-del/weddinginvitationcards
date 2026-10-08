"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import InvitationShowcase from "@/components/InvitationShowcase";
import Footer from "@/components/Footer";
import BackgroundMusic from "./BackgroundMusic";

// Lazy-load the Cinematic Story since it uses GSAP/Browser APIs
const CinematicStory = dynamic(() => import("./CinematicStory"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100svh", background: "#ebd8b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "serif", fontStyle: "italic", color: "#3a4a3b" }}>Loading our story...</p>
    </div>
  ),
});

const WeddingDetailsScene = dynamic(() => import("./WeddingDetailsScene"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100svh", background: "#F8F4EC" }}></div>
  ),
});

export default function LuxuryDemo() {
  const getCountdown = () => {
    const difference = new Date("2028-03-20T16:00:00").getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeLeft(getCountdown()); // Calculate immediately to prevent flashing 0s
    setMounted(true);
    
    const timer = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);
    
    // FIX FOR GSAP OVERLAPPING SCENES:
    // Because CinematicStory and WeddingDetailsScene load dynamically, they change the page height
    // after GSAP has already calculated pinning positions. 
    // Dispatching 'resize' forces GSAP to perfectly recalculate all start/end points.
    const t1 = setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    const t2 = setTimeout(() => window.dispatchEvent(new Event('resize')), 1000);
    const t3 = setTimeout(() => window.dispatchEvent(new Event('resize')), 2500);

    // Bulletproof fix: listen to DOM changes and force ScrollTrigger refresh
    let ro: ResizeObserver | null = null;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(document.body);
    });

    return () => {
      clearInterval(timer);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <main style={{ background: "#F8F4EC", overflowX: "hidden" }}>
      <BackgroundMusic />
      {/* Our custom CSS for the remaining sections */}
      <style>{`
        :root {
          --lux-bg: #F8F4EC; 
          --lux-text: #1a2618;
          --lux-accent: #8c7343;
        }

        /* â”€â”€ COUNTDOWN SECTION â”€â”€ */
        .lux-countdown {
          padding: 12vh 8vw; background: #1a2618; text-align: center;
          position: relative; overflow: hidden;
          border-top: 1px solid rgba(201,169,110,0.2);
          border-bottom: 1px solid rgba(201,169,110,0.2);
        }
        .lux-countdown::before {
          content: ""; position: absolute; inset: 0;
          background: url('/illustrated_wedding_assets/mainbg2.png') center/cover;
          opacity: 0.12; pointer-events: none;
        }
        .lux-cd-title {
          position: relative; z-index: 2;
          font-family: "Cormorant Garamond", serif; font-size: clamp(35px, 5vw, 60px);
          color: #fdfbf7; margin: 0 0 50px; font-weight: 400; font-style: italic;
        }
        .lux-cd-grid {
          position: relative; z-index: 2;
          display: flex; gap: clamp(15px, 4vw, 50px); justify-content: center; flex-wrap: wrap;
        }
        .lux-cd-item { 
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: clamp(90px, 15vw, 140px); aspect-ratio: 1;
          border: 1px solid rgba(201,169,110,0.3); border-radius: 50%;
          background: rgba(253, 251, 247, 0.03); backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .lux-cd-num {
          font-family: "Cormorant Garamond", serif; font-size: clamp(32px, 5vw, 55px);
          color: #c9a96e; line-height: 1; font-weight: 400; margin-bottom: 6px;
        }
        .lux-cd-lbl {
          font-family: "DM Sans", sans-serif; font-size: 9px; letter-spacing: 0.25em;
          text-transform: uppercase; color: rgba(253, 251, 247, 0.7); font-weight: 600;
        }

        /* â”€â”€ GALLERY SECTION â”€â”€ */
        .lux-gallery {
          padding: 12vh 8vw 15vh; background: #F8F4EC;
        }
        .lux-gal-header { text-align: center; margin-bottom: 60px; }
        .lux-gal-eyeb { 
          font-family: "DM Sans", sans-serif; font-size: 11px; letter-spacing: 0.3em; 
          text-transform: uppercase; color: #8c7343; margin-bottom: 16px; display: block;
        }
        .lux-gal-title { 
          font-family: "Cormorant Garamond", serif; font-size: clamp(40px, 6vw, 70px); 
          color: #1a2618; margin: 0; font-weight: 400; line-height: 0.9;
        }
        .lux-gal-title em { font-style: italic; color: #d48c9d; }
        
        .lux-gal-grid {
          display: grid; grid-template-columns: repeat(12, 1fr); gap: 2vw; max-width: 1200px; margin: 0 auto;
        }
        .lux-gal-item { overflow: hidden; position: relative; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .lux-gal-img {
          width: 100%; height: 100%; object-fit: cover; 
          transition: transform 0.7s ease;
        }
        .lux-gal-item:hover .lux-gal-img { transform: scale(1.05); }

        /* Staggered Masonry placements using grid column/row spans */
        .gal-1 { grid-column: 1 / 6; grid-row: 1 / 3; aspect-ratio: 4/5; }
        .gal-2 { grid-column: 6 / 13; grid-row: 1 / 2; aspect-ratio: 16/9; }
        .gal-3 { grid-column: 6 / 10; grid-row: 2 / 3; aspect-ratio: 1/1; }
        .gal-4 { grid-column: 10 / 13; grid-row: 2 / 4; aspect-ratio: 3/4; }
        .gal-5 { grid-column: 1 / 10; grid-row: 3 / 4; aspect-ratio: 21/9; }

        @media (max-width: 768px) {
          .lux-gal-grid { display: flex; flex-direction: column; gap: 4vw; }
          .lux-gal-item { width: 100%; aspect-ratio: 4/3 !important; }
        }

        /* â”€â”€ RSVP & MAP SECTION â”€â”€ */
        .lux-rsvp-container {
          background: #1a2618; color: #fdfbf7; position: relative; overflow: hidden;
          padding: 12vh 8vw; border-top: 1px solid rgba(201,169,110,0.2);
        }
        .lux-rsvp-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8vw;
          max-width: 1200px; margin: 0 auto; align-items: center; position: relative; z-index: 2;
        }
        
        .lux-map-col {
          display: flex; flex-direction: column; gap: 20px;
        }
        .lux-map-title {
          font-family: "Cormorant Garamond", serif; font-size: clamp(32px, 4vw, 45px); color: #c9a96e; margin: 0; font-weight: 400; line-height: 1.1;
        }
        .lux-map-address {
          font-family: "DM Sans", sans-serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(253, 251, 247, 0.7); margin: 0;
        }
        .lux-map-frame-wrapper {
          width: 100%; aspect-ratio: 4/3; border: 1px solid rgba(201,169,110,0.3); padding: 8px; background: rgba(13, 21, 8, 0.5);
        }
        .lux-map-iframe {
          width: 100%; height: 100%; border: none;
          /* Magic CSS filter to turn standard Google Maps into a gorgeous dark green/gold aesthetic matching the theme */
          filter: grayscale(80%) invert(90%) sepia(30%) hue-rotate(80deg) brightness(85%) contrast(90%);
        }

        .lux-rsvp-col { text-align: center; }
        .lux-rsvp-eyeb { font-family: "DM Sans", sans-serif; font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #c9a96e; margin-bottom: 24px; }
        .lux-rsvp-title { font-family: "Cormorant Garamond", serif; font-size: clamp(50px, 6vw, 80px); line-height: 0.9; margin: 0 0 30px; font-weight: 400; }
        .lux-rsvp-title em { font-style: italic; color: #d48c9d; }
        .lux-rsvp-body { font-family: "Cormorant Garamond", serif; font-size: clamp(16px, 1.8vw, 22px); font-style: italic; color: rgba(253, 251, 247, 0.8); line-height: 1.6; max-width: 400px; margin: 0 auto 40px; }
        .lux-rsvp-btn {
          display: inline-flex; align-items: center; gap: 16px; border: 1px solid #c9a96e; background: transparent; color: #fdfbf7;
          padding: 16px 36px; font-family: "DM Sans", sans-serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; transition: all 0.3s;
        }
        .lux-rsvp-btn:hover { background: rgba(201,169,110,0.1); }
        .lux-rsvp-btn span { display: block; width: 30px; height: 1px; background: #c9a96e; }

        .lux-rsvp-floral-left { position: absolute; bottom: 0; left: -5vw; height: 50vh; opacity: 0.15; z-index: 1; pointer-events: none; }
        .lux-rsvp-floral-right { position: absolute; bottom: 0; right: -5vw; height: 60vh; opacity: 0.15; z-index: 1; pointer-events: none; }

        /* â”€â”€ FOOTER â”€â”€ */
        .lux-footer {
          background: #0d1508; padding: 10vh 8vw; text-align: center; border-top: 1px solid rgba(201,169,110,0.15);
          display: flex; flex-direction: column; align-items: center; gap: 20px; position: relative; overflow: hidden;
        }
        .lux-footer-names { font-family: "Italianno", cursive; font-size: clamp(60px, 8vw, 120px); color: #fdfbf7; margin: 0; line-height: 0.8; font-weight: 400; }
        .lux-footer-names span { color: #d48c9d; }
        .lux-footer-copy { font-family: "DM Sans", sans-serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(253, 251, 247, 0.4); margin: 0; }
        
        @media (max-width: 900px) {
          .lux-rsvp-grid { grid-template-columns: 1fr; gap: 10vh; text-align: center; }
          .lux-map-col { align-items: center; }
          .lux-map-frame-wrapper { max-width: 500px; }
        }
      `}</style>

      {/* SECTION 1: Cinematic Scroll (ends with the formal card) */}
      <CinematicStory />

      {/* SECTION 2: Interactive Illustrated Storybook Scene */}
      <WeddingDetailsScene />

      {/* SECTION 3: Countdown Timer */}
      <section className="lux-countdown" aria-label="Wedding Countdown">
        <h2 className="lux-cd-title">Counting down the days...</h2>
        {mounted && (
          <div className="lux-cd-grid">
            <div className="lux-cd-item">
              <span className="lux-cd-num">{timeLeft.days}</span>
              <span className="lux-cd-lbl">Days</span>
            </div>
            <div className="lux-cd-item">
              <span className="lux-cd-num">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="lux-cd-lbl">Hours</span>
            </div>
            <div className="lux-cd-item">
              <span className="lux-cd-num">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="lux-cd-lbl">Minutes</span>
            </div>
            <div className="lux-cd-item">
              <span className="lux-cd-num">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="lux-cd-lbl">Seconds</span>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 4: Gallery */}
      <section className="lux-gallery" aria-label="Moments Gallery">
        <div className="lux-gal-header">
          <span className="lux-gal-eyeb">Captured Moments</span>
          <h2 className="lux-gal-title">Our<br/><em>Journey</em></h2>
        </div>
        <div className="lux-gal-grid">
          {/* Using premium placeholder photography matching a wedding aesthetic */}
          <div className="lux-gal-item gal-1">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop" alt="Couple" className="lux-gal-img" loading="lazy" />
          </div>
          <div className="lux-gal-item gal-2">
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop" alt="Venue decor" className="lux-gal-img" loading="lazy" />
          </div>
          <div className="lux-gal-item gal-3">
            <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop" alt="Rings" className="lux-gal-img" loading="lazy" />
          </div>
          <div className="lux-gal-item gal-4">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" alt="Details" className="lux-gal-img" loading="lazy" />
          </div>
          <div className="lux-gal-item gal-5">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop" alt="Toast" className="lux-gal-img" loading="lazy" />
          </div>
        </div>
      </section>

      {/* SECTION 5: Location & RSVP */}
      <section className="lux-rsvp-container" aria-label="RSVP and Location">
        <div className="lux-rsvp-grid">
          
          {/* Left: Map & Location */}
          <div className="lux-map-col">
            <h3 className="lux-map-title">The Location</h3>
            <p className="lux-map-address">Heritage Estate, Mumbai, India</p>
            <div className="lux-map-frame-wrapper">
              <iframe 
                className="lux-map-iframe" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120638.0645227181!2d72.77533810237735!3d19.11172836267868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1714470295171!5m2!1sen!2sin" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: RSVP */}
          <div className="lux-rsvp-col">
            <p className="lux-rsvp-eyeb">You are cordially invited</p>
            <h2 className="lux-rsvp-title">Join<br /><em>Our</em><br />Story</h2>
            <p className="lux-rsvp-body">
              We would be honoured to have you witness the beginning of our forever. Please let us know if you can make it.
            </p>
            <button className="lux-rsvp-btn" type="button">
              <span />
              RSVP Now
              <span />
            </button>
          </div>
        </div>

        {/* Subtle decorative background foliage */}
        <img className="lux-rsvp-floral-left" src="/illustrated_wedding_assets/leftdownbush.png" alt="" aria-hidden="true" />
        <img className="lux-rsvp-floral-right" src="/illustrated_wedding_assets/righttree.png" alt="" aria-hidden="true" />
      </section>

      {/* â”€â”€ Love This Experience Section â”€â”€ */}
      <section className="w-full bg-[#0a0b08] pt-32 pb-24 flex flex-col items-center border-t border-white/5 relative z-50">
        <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] mb-10 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Love this <em className="italic text-[#C9A96E]">experience?</em>
        </h2>
        <a 
          href="https://www.instagram.com/digitalweddingwebpage/" target="_blank" rel="noopener noreferrer" 
          className="px-10 py-5 border border-[#C9A96E] rounded-full text-xs tracking-[0.2em] uppercase text-[#1A1614] bg-[#C9A96E] font-bold shadow-[0_0_40px_rgba(201,169,110,0.4)] hover:scale-105 hover:bg-[#DBC396] transition-all text-center"
          style={{ fontFamily: "sans-serif" }}
        >
          Order via Instagram
        </a>
      </section>

      {/* â”€â”€ Divider â”€â”€ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent relative z-50" />

      {/* â”€â”€ Explore Other Experiences â”€â”€ */}
      <div className="relative z-50 bg-[#FAF8F5]">
        <InvitationShowcase />

        <div className="w-full flex justify-center pb-24">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#8B6B3D] text-[#FAF8F5] text-[11px] tracking-[0.25em] uppercase font-bold font-sans rounded-full hover:bg-[#5A4A3A] transition-all shadow-[0_0_20px_rgba(139,107,61,0.2)]"
          >
            Back to Home Page
          </a>
        </div>
      </div>

      {/* â”€â”€ Divider â”€â”€ */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A97B]/30 to-transparent relative z-50" />

      {/* SECTION 6: Template Footer */}
      <footer className="lux-footer relative z-50">
        <h2 className="lux-footer-names">Emma <span>&amp;</span> James</h2>
        <p className="lux-footer-copy">20 March 2028 â€” Mumbai â€” With love &amp; gratitude</p>
      </footer>
      
      {/* Main Site Footer */}
      <div className="relative z-50">
        <Footer />
      </div>
    </main>
  );
}
