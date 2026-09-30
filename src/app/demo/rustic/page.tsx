"use client";

import React, { useEffect, useState, useRef } from 'react';
import NightSky from "./components/NightSky";
import FarCitySkyline from "./components/FarCitySkyline";
import MidForegroundCity from "./components/MidForegroundCity";
import SwingEnvironment from "./components/SwingEnvironment";
import SuperheroCouple from "./components/SuperheroCouple";
import StoryArtifact from "./components/StoryArtifact";
import InvitationShowcase from "@/components/InvitationShowcase";
import Footer from "@/components/Footer";
import BackgroundMusic from "./components/BackgroundMusic";

const WEDDING_DATA = {
  coupleNames: "PETER & MARY JANE",
  weddingDate: "2028-10-14",
  weddingTime: "16:00:00",
  ceremonyTime: "4:00 PM",
  receptionTime: "6:00 PM",
  venueName: "The Skyline Loft",
  venueAddress: "123 Web Slinger Ave, New York, NY 10001",
  latitude: 40.7128,
  longitude: -74.0060,
  googleMapsUrl: "https://maps.google.com/?q=40.7128,-74.0060",
  dressCode: "Black Tie Optional"
};

export default function SuperheroWeddingDemo() {
  useEffect(() => {
    const handleScrollToWedding = () => {
      document.getElementById('countdown-section')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('scroll-to-wedding', handleScrollToWedding);
    return () => window.removeEventListener('scroll-to-wedding', handleScrollToWedding);
  }, []);

  const exitStory = () => {
    document.getElementById('countdown-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToDetails = () => {
    document.getElementById('details-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToVenue = () => {
    document.getElementById('venue-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="wedding-wrapper">
      <BackgroundMusic />
      {/* HERO / LOVE STORY SECTION */}
      <section id="hero-section" className="superhero-wedding-scene">
        <NightSky />
        <FarCitySkyline />
        <MidForegroundCity />
        <SwingEnvironment />
        <SuperheroCouple />
        <StoryArtifact />
        
        <button className="exit-story-btn" onClick={exitStory}>
          EXIT STORY &rarr;
        </button>
      </section>

      {/* SECTION 1 - COUNTDOWN */}
      <section id="countdown-section" className="wedding-content-section cinematic-bg">
         <CountdownBlock onGoToDetails={goToDetails} />
      </section>

      {/* SECTION 2 - WEDDING DETAILS */}
      <section id="details-section" className="wedding-content-section cinematic-details-bg">
         <DetailsBlock onGoToVenue={goToVenue} />
      </section>

      {/* SECTION 3 - VENUE + MAP */}
      <section id="venue-section" className="wedding-content-section">
         <VenueBlock />
      </section>

      {/* ── Love This Experience Section ── */}
      <section className="w-full bg-[#0a0b08] pt-32 pb-24 flex flex-col items-center border-t border-white/5 relative z-50">
        <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] mb-10 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Love this <em className="italic text-[#C9A96E]">experience?</em>
        </h2>
        <a 
          href="https://instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer" 
          className="px-10 py-5 border border-[#C9A96E] rounded-full text-xs tracking-[0.2em] uppercase text-[#1A1614] bg-[#C9A96E] font-bold shadow-[0_0_40px_rgba(201,169,110,0.4)] hover:scale-105 hover:bg-[#DBC396] transition-all text-center"
          style={{ fontFamily: "sans-serif" }}
        >
          Order via Instagram
        </a>
      </section>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent relative z-50" />

      {/* ── Explore Other Experiences ── */}
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

      {/* ── Divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A97B]/30 to-transparent relative z-50" />

      {/* SECTION 4: Template Footer */}
      <footer className="w-full bg-[#050814] py-16 flex flex-col items-center relative z-50 gap-4">
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '28px', color: '#fff', letterSpacing: '6px', margin: 0 }}>PETER &amp; MARY JANE</h2>
        <p style={{ fontFamily: 'var(--ej-sans)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>Superhero Edition · Digital Wedding Invitation</p>
      </footer>
      
      {/* Main Site Footer */}
      <div className="relative z-50">
        <Footer />
      </div>

      <style>{`
        /* Global Reset for this page */
        html, body {
          margin: 0;
          padding: 0;
          background-color: #050814;
          color: #fff;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        .wedding-wrapper {
          display: flex;
          flex-direction: column;
          width: 100vw;
          overflow-x: hidden;
        }

        /* --- HERO GAME SECTION --- */
        .superhero-wedding-scene {
          position: relative;
          width: 100vw;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background-color: #050814;
          flex-shrink: 0;
        }

        .exit-story-btn {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          background: rgba(10, 15, 30, 0.7);
          border: 1px solid rgba(255, 77, 64, 0.5);
          color: #fff;
          padding: 10px 30px;
          font-size: 0.9rem;
          letter-spacing: 2px;
          border-radius: 20px;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .exit-story-btn:hover {
          background: rgba(255, 77, 64, 0.2);
          border-color: #ff4d40;
          box-shadow: 0 0 15px rgba(255, 77, 64, 0.3);
        }

        @media (max-width: 768px) {
          .exit-story-btn {
            top: 25px;
            padding: 8px 24px;
            font-size: 0.8rem;
          }
        }

        /* --- STANDARD WEDDING SECTIONS --- */
        .wedding-content-section {
          min-height: 100vh;
          min-height: 100svh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #050814;
          padding: 60px 20px;
          box-sizing: border-box;
          position: relative;
          z-index: 2;
        }

        .alt-bg {
          background-color: #0a0e1c;
          border-top: 1px solid rgba(255, 77, 64, 0.1);
          border-bottom: 1px solid rgba(255, 77, 64, 0.1);
        }

        .wedding-nav-btn {
          margin-top: 60px;
          background: transparent;
          border: 1px solid #ff4d40;
          color: #ff4d40;
          padding: 15px 40px;
          font-size: 1rem;
          letter-spacing: 3px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .wedding-nav-btn:hover {
          background: rgba(255, 77, 64, 0.15);
          box-shadow: 0 0 20px rgba(255, 77, 64, 0.3);
          transform: translateY(-2px);
        }

        /* --- CINEMATIC COUNTDOWN SECTION --- */
        .cinematic-bg {
          background: radial-gradient(circle at center, #0a1128 0%, #03050c 100%);
          position: relative;
        }

        .cinematic-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.9), rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
          animation: twinkle 5s infinite alternate;
          pointer-events: none;
        }

        .cinematic-countdown-wrapper {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cinematic-countdown-wrapper.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cinematic-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 800px;
          height: 600px;
          background: radial-gradient(circle, rgba(130, 190, 255, 0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: -1;
        }

        .countdown-couple {
          position: relative;
          width: 140px;
          height: 120px;
          margin-bottom: 20px;
          animation: gentle-sway 5s ease-in-out infinite alternate;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(130,190,255,0.2));
        }

        .c-male, .c-female {
          position: absolute;
          bottom: 0;
          height: 100%;
          object-fit: contain;
        }
        .c-male { left: 0; transform: scaleX(-1); }
        .c-female { right: 0; height: 90%; }

        @keyframes gentle-sway {
          0% { transform: translateY(0) rotate(-2deg); }
          100% { transform: translateY(-10px) rotate(2deg); }
        }

        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.5; }
        }

        .countdown-eyebrow {
          font-size: 0.85rem;
          letter-spacing: 6px;
          color: #a0b0d0;
          margin: 0 0 15px 0;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .cinematic-heading {
          font-family: 'Cinzel', serif;
          font-size: 3rem;
          color: #fff;
          letter-spacing: 10px;
          margin: 0 0 5px 0;
          text-shadow: 0 2px 15px rgba(255, 255, 255, 0.2);
        }

        .cinematic-names {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          color: #ff4d40;
          letter-spacing: 6px;
          margin: 0;
          font-weight: 300;
          text-transform: uppercase;
        }

        .cinematic-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          color: #ff4d40;
          font-size: 0.8rem;
          margin: 30px 0 50px 0;
          opacity: 0.6;
        }

        .divider-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff4d40, transparent);
        }

        .timer-glass-grid {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
        }

        .timer-glass-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(15, 22, 45, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 25px 20px;
          min-width: 110px;
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.4), 
            inset 0 0 15px rgba(130, 190, 255, 0.05);
          position: relative;
          overflow: hidden;
        }
        
        .timer-glass-box::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          opacity: 0.5;
        }

        .timer-num {
          font-family: 'Cinzel', serif;
          font-size: 4rem;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          display: inline-block;
          animation: num-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .timer-label {
          font-size: 0.75rem;
          letter-spacing: 4px;
          color: #8fa0c0;
          text-transform: uppercase;
          font-weight: 500;
        }

        @keyframes num-pop {
          0% { transform: scale(0.85); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .cinematic-primary-btn {
          background: rgba(255, 77, 64, 0.1);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 77, 64, 0.6);
          color: #fff;
          padding: 16px 45px;
          font-size: 1rem;
          letter-spacing: 4px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.4s ease;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .cinematic-primary-btn .arrow {
          transition: transform 0.3s ease;
        }

        .cinematic-primary-btn:hover {
          background: rgba(255, 77, 64, 0.25);
          border-color: #ff4d40;
          box-shadow: 0 10px 30px rgba(255, 77, 64, 0.2);
          transform: translateY(-3px);
        }

        .cinematic-primary-btn:hover .arrow {
          transform: translateX(5px);
        }

        .cinematic-secondary-btn {
          margin-top: 25px;
          background: transparent;
          border: none;
          color: #7a8aa5;
          font-size: 0.9rem;
          letter-spacing: 2px;
          cursor: pointer;
          transition: color 0.3s ease;
          text-transform: uppercase;
        }

        .cinematic-secondary-btn:hover {
          color: #fff;
        }

        @media (max-width: 768px) {
          .timer-glass-grid { gap: 12px; flex-wrap: wrap; }
          .timer-glass-box { min-width: 90px; padding: 15px; }
          .timer-num { font-size: 3rem; }
          .cinematic-heading { font-size: 2.2rem; letter-spacing: 6px; }
          .cinematic-names { font-size: 1rem; }
          .cinematic-primary-btn { padding: 14px 30px; font-size: 0.85rem; }
        }


        /* --- CINEMATIC DETAILS SECTION --- */
        .cinematic-details-bg {
          background: linear-gradient(180deg, #03050c 0%, #060913 50%, #03050c 100%);
          position: relative;
          overflow: hidden;
        }

        .cinematic-details-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 900px;
          z-index: 2;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cinematic-details-wrapper.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .details-moon-glow {
          position: absolute;
          top: -100px;
          left: -100px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(130, 190, 255, 0.1), transparent 70%);
          border-radius: 50%;
          animation: pulse-moon 8s infinite alternate;
          pointer-events: none;
        }

        .details-stars-bg {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(1px 1px at 30px 50px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 80px 20px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 150px 90px, rgba(255,255,255,0.9), rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 300px 300px;
          opacity: 0.2;
          animation: twinkle 6s infinite alternate;
          pointer-events: none;
        }

        .details-skyline-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(0deg, rgba(2, 4, 10, 0.9) 0%, transparent 100%);
          z-index: 0;
          pointer-events: none;
        }
        
        .details-skyline-bg::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0; top: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100' preserveAspectRatio='none'%3E%3Cpath fill='rgba(10,15,30,0.5)' d='M0,100 L0,80 L20,80 L20,60 L40,60 L40,90 L70,90 L70,40 L100,40 L100,70 L130,70 L130,50 L160,50 L160,85 L200,85 L200,30 L230,30 L230,70 L280,70 L280,45 L320,45 L320,80 L350,80 L350,20 L380,20 L380,65 L410,65 L410,50 L460,50 L460,85 L500,85 L500,40 L530,40 L530,75 L560,75 L560,10 L600,10 L600,60 L640,60 L640,35 L690,35 L690,70 L720,70 L720,25 L750,25 L750,80 L800,80 L800,40 L840,40 L840,65 L880,65 L880,15 L920,15 L920,55 L960,55 L960,30 L1000,30 L1000,100 Z'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          background-position: bottom;
          background-repeat: no-repeat;
        }

        @keyframes pulse-moon {
          0% { opacity: 0.5; transform: scale(0.9); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }

        .details-header {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .details-eyebrow {
          font-size: 0.85rem;
          letter-spacing: 6px;
          color: #a0b0d0;
          margin: 0 0 15px 0;
          text-transform: uppercase;
        }

        .details-heading {
          font-size: 2.5rem;
          margin-bottom: 5px;
        }

        .details-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          width: 100%;
          position: relative;
          z-index: 2;
          margin-bottom: 60px;
        }

        .details-card {
          background: rgba(10, 15, 28, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 0 20px rgba(130, 190, 255, 0.02);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          opacity: 0;
          transform: translateY(40px);
        }

        .is-visible .details-card {
          opacity: 1;
          transform: translateY(0);
        }
        
        .is-visible .details-card:nth-child(1) { transition-delay: 0.1s; }
        .is-visible .details-card:nth-child(2) { transition-delay: 0.2s; }
        .is-visible .details-card:nth-child(3) { transition-delay: 0.3s; }
        .is-visible .details-card:nth-child(4) { transition-delay: 0.4s; }

        .details-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: 0 25px 45px rgba(0,0,0,0.5), inset 0 0 20px rgba(255, 77, 64, 0.05);
          border-color: rgba(255, 77, 64, 0.25);
        }

        .card-icon {
          color: #ff4d40;
          width: 32px;
          height: 32px;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .card-label {
          font-size: 0.75rem;
          letter-spacing: 5px;
          color: #8fa0c0;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .card-large {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          color: #fff;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .card-small {
          font-size: 0.95rem;
          color: #a0b0d0;
          font-weight: 300;
        }

        .details-cta {
          margin-top: 10px;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .details-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .details-card {
            padding: 30px 20px;
          }
          .details-heading {
            font-size: 1.8rem;
          }
          .card-large {
            font-size: 1.5rem;
          }
        }

        /* --- VENUE BLOCK --- */
        .venue-container {
          text-align: center;
          max-width: 600px;
          width: 100%;
        }

        .map-wrapper {
          margin-top: 40px;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .directions-btn {
          display: inline-block;
          margin-top: 30px;
          background: #ff4d40;
          color: #fff;
          padding: 12px 30px;
          font-size: 0.9rem;
          letter-spacing: 2px;
          border-radius: 4px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .directions-btn:hover {
          background: #e63e32;
          box-shadow: 0 0 15px rgba(255, 77, 64, 0.4);
        }

        /* --- PROMO FOOTER --- */
        .promo-footer {
          width: 100%;
          background: #020308;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 20px;
          position: relative;
          z-index: 10;
        }

        .promo-text {
          font-family: 'Cinzel', serif;
          font-size: 1.3rem;
          color: #e0e0e0;
          letter-spacing: 2px;
          margin: 0;
          font-weight: 300;
        }

        .promo-btn {
          background: rgba(255, 77, 64, 0.05);
          border: 1px solid #ff4d40;
          color: #ff4d40;
          padding: 12px 35px;
          font-size: 0.95rem;
          letter-spacing: 3px;
          border-radius: 4px;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(255, 77, 64, 0.1);
        }

        .promo-btn:hover {
          background: rgba(255, 77, 64, 0.2);
          box-shadow: 0 0 20px rgba(255, 77, 64, 0.4);
          color: #fff;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function CountdownBlock({ onGoToDetails }: { onGoToDetails: () => void }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = new Date(`${WEDDING_DATA.weddingDate}T${WEDDING_DATA.weddingTime}`).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const dist = target - now;
      
      if (dist < 0) {
        clearInterval(timer);
        return;
      }
      
      setTimeLeft({
        d: Math.floor(dist / (1000 * 60 * 60 * 24)),
        h: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((dist % (1000 * 60)) / 1000)
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={sectionRef} className={`cinematic-countdown-wrapper ${isVisible ? 'is-visible' : ''}`}>
      {/* Background Ambience */}
      <div className="cinematic-glow"></div>
      
      {/* Subtle Couple Asset Above */}
      <div className="countdown-couple">
        <img src="/clear_spiderman1.png" alt="Groom" className="c-male" />
        <img src="/clear_spiderwomen1.png" alt="Bride" className="c-female" />
      </div>

      <p className="countdown-eyebrow">✦ OUR NEXT CHAPTER ✦</p>
      <h2 className="cinematic-heading">THE BIG DAY</h2>
      <h3 className="cinematic-names">{WEDDING_DATA.coupleNames}</h3>
      
      <div className="cinematic-divider">
        ✦ <div className="divider-line"></div> ✦
      </div>

      <div className="timer-glass-grid">
        <div className="timer-glass-box">
          <span className="timer-num" key={`d-${timeLeft.d}`}>{timeLeft.d}</span>
          <span className="timer-label">DAYS</span>
        </div>
        <div className="timer-glass-box">
          <span className="timer-num" key={`h-${timeLeft.h}`}>{timeLeft.h}</span>
          <span className="timer-label">HOURS</span>
        </div>
        <div className="timer-glass-box">
          <span className="timer-num" key={`m-${timeLeft.m}`}>{timeLeft.m}</span>
          <span className="timer-label">MINUTES</span>
        </div>
        <div className="timer-glass-box">
          <span className="timer-num" key={`s-${timeLeft.s}`}>{timeLeft.s}</span>
          <span className="timer-label">SECONDS</span>
        </div>
      </div>

      <button className="cinematic-primary-btn" onClick={onGoToDetails}>
        ENTER OUR WEDDING STORY <span className="arrow">&rarr;</span>
      </button>

      <button className="cinematic-secondary-btn" onClick={onGoToDetails}>
        Continue &darr;
      </button>
    </div>
  );
}

function DetailsBlock({ onGoToVenue }: { onGoToVenue: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const dateObj = new Date(WEDDING_DATA.weddingDate);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dateStr = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

  const dressCodeParts = WEDDING_DATA.dressCode.split(' ');
  const dressCodeLarge = dressCodeParts.slice(0, 2).join(' ').toUpperCase();
  const dressCodeSmall = dressCodeParts.slice(2).join(' ') || "Optional";

  return (
    <div ref={sectionRef} className={`cinematic-details-wrapper ${isVisible ? 'is-visible' : ''}`}>
      {/* Background Layers */}
      <div className="details-moon-glow"></div>
      <div className="details-stars-bg"></div>
      <div className="details-skyline-bg"></div>

      <div className="details-header">
         <p className="details-eyebrow">OUR WEDDING</p>
         <h2 className="cinematic-heading details-heading">THE DAY WE SAY I DO</h2>
         <h3 className="cinematic-names">{WEDDING_DATA.coupleNames}</h3>
         <div className="cinematic-divider" style={{ margin: '20px auto 50px auto' }}>
            ✦ <div className="divider-line" style={{ width: '120px' }}></div> ✦
         </div>
      </div>

      <div className="details-cards-grid">
        {/* CARD 1 - DATE */}
        <div className="details-card">
           <div className="card-icon">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
               <line x1="16" y1="2" x2="16" y2="6"></line>
               <line x1="8" y1="2" x2="8" y2="6"></line>
               <line x1="3" y1="10" x2="21" y2="10"></line>
             </svg>
           </div>
           <span className="card-label">THE DATE</span>
           <span className="card-large">{dayName}</span>
           <span className="card-small">{dateStr}</span>
        </div>

        {/* CARD 2 - CEREMONY */}
        <div className="details-card">
           <div className="card-icon">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="12" r="5"></circle>
                <circle cx="15" cy="12" r="5"></circle>
             </svg>
           </div>
           <span className="card-label">CEREMONY</span>
           <span className="card-large">{WEDDING_DATA.ceremonyTime}</span>
           <span className="card-small">Wedding Ceremony</span>
        </div>

        {/* CARD 3 - RECEPTION */}
        <div className="details-card">
           <div className="card-icon">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 2h8l-2 10l-2 10l-2-10z"></path>
                <line x1="12" y1="12" x2="12" y2="22"></line>
                <line x1="9" y1="22" x2="15" y2="22"></line>
             </svg>
           </div>
           <span className="card-label">RECEPTION</span>
           <span className="card-large">{WEDDING_DATA.receptionTime}</span>
           <span className="card-small">Dinner & Celebration</span>
        </div>

        {/* CARD 4 - DRESS CODE */}
        <div className="details-card">
           <div className="card-icon">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M12 12l-8 -5v10z"></path>
                <path d="M12 12l8 -5v10z"></path>
                <circle cx="12" cy="12" r="2"></circle>
             </svg>
           </div>
           <span className="card-label">DRESS CODE</span>
           <span className="card-large">{dressCodeLarge}</span>
           <span className="card-small">{dressCodeSmall}</span>
        </div>
      </div>

      <button className="cinematic-primary-btn details-cta" onClick={onGoToVenue}>
         DISCOVER THE VENUE <span className="arrow">&rarr;</span>
      </button>
    </div>
  );
}

function VenueBlock() {
  return (
    <div className="venue-container">
      <h2 className="wedding-heading">WHERE TO FIND US</h2>
      <h3 className="couple-names" style={{marginBottom: '20px'}}>{WEDDING_DATA.venueName}</h3>
      <p style={{color: '#aaa', letterSpacing: '1px'}}>{WEDDING_DATA.venueAddress}</p>
      
      <div className="map-wrapper">
        <iframe 
          width="100%" 
          height="300" 
          style={{border: 0, display: 'block'}} 
          loading="lazy" 
          allowFullScreen 
          src={`https://maps.google.com/maps?q=${WEDDING_DATA.latitude},${WEDDING_DATA.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
      </div>

      <a href={WEDDING_DATA.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="directions-btn">
        GET DIRECTIONS
      </a>
    </div>
  );
}
