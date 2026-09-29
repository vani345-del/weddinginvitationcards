"use client";

import React, { useState, useEffect } from 'react';

export default function GlowingInvitation({ isVisible = true }: { isVisible?: boolean }) {
  const [isCollected, setIsCollected] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  const handleCollect = () => {
    if (isCollected) return;
    setIsCollected(true);
    
    // Reveal message after collection animation completes
    setTimeout(() => {
      setShowMessage(true);
    }, reducedMotion ? 100 : 1200);
  };

  return (
    <div className={`invitation-layer ${isVisible ? 'visible' : 'hidden'}`}>
      {/* ── Celebration Particles ── */}
      {isCollected && !showMessage && !reducedMotion && (
        <div className="particle-burst">
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            return (
              <div 
                key={i} 
                className="particle" 
                style={{ 
                  '--tx': `${tx}px`, 
                  '--ty': `${ty}px`,
                  animationDelay: `${Math.random() * 0.2}s`
                } as React.CSSProperties} 
              />
            );
          })}
        </div>
      )}

      {/* ── Glowing Invitation Object ── */}
      {!showMessage && (
        <button 
          className={`invitation-btn ${isCollected ? 'collected' : 'idle'}`}
          onClick={handleCollect}
          aria-label="Collect wedding invitation"
          tabIndex={0}
        >
          {/* Idle Sparkles around the envelope */}
          {!isCollected && !reducedMotion && (
            <>
              <div className="idle-sparkle s1"></div>
              <div className="idle-sparkle s2"></div>
              <div className="idle-sparkle s3"></div>
            </>
          )}

          {/* Envelope Graphic */}
          <svg className="envelope-svg" viewBox="0 0 100 70" width="100%" height="100%">
            <defs>
              <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect x="5" y="5" width="90" height="60" rx="4" fill="#fdfcf8" stroke="#d4af37" strokeWidth="2.5" filter="url(#gold-glow)"/>
            <path d="M5,10 L50,40 L95,10" fill="none" stroke="#d4af37" strokeWidth="2.5" />
            <circle cx="50" cy="40" r="5" fill="#d4af37" />
            <circle cx="50" cy="40" r="2" fill="#fff" />
          </svg>
        </button>
      )}

      {/* ── Story Placeholder ── */}
      {showMessage && (
        <div className="story-placeholder">
          <p className="story-title">Our Story Begins...</p>
          <p className="story-subtitle">(Next layer content will go here)</p>
        </div>
      )}

      <style>{`
        .invitation-layer {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 30vh; 
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }
        .invitation-layer.visible {
          opacity: 1;
        }

        /* ── Collectible Button ── */
        .invitation-btn {
          position: relative;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          pointer-events: auto;
          width: 90px;
          height: 64px;
          outline: none;
          filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.3));
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .invitation-btn:hover, .invitation-btn:focus-visible {
          transform: scale(1.1);
          filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.8)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.5));
        }

        /* Idle Floating Animation */
        .invitation-btn.idle {
          animation: float-invitation 3s ease-in-out infinite;
        }

        @keyframes float-invitation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .invitation-btn.idle { animation: none; }
        }

        /* Collected Animation */
        .invitation-btn.collected {
          animation: collect-invitation 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        @keyframes collect-invitation {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          40% {
            transform: translateY(-60px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(0.1);
            opacity: 0;
          }
        }

        /* ── Idle Sparkles ── */
        .idle-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 8px 2px #d4af37;
          opacity: 0;
          animation: pulse-sparkle 2s infinite ease-in-out;
        }
        .s1 { top: -10px; left: -10px; animation-delay: 0s; }
        .s2 { top: 20px; right: -15px; animation-delay: 0.7s; }
        .s3 { bottom: -10px; left: 30px; animation-delay: 1.4s; }

        @keyframes pulse-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* ── Celebration Burst Particles ── */
        .particle-burst {
          position: absolute;
          width: 0;
          height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #d4af37;
          border-radius: 50%;
          box-shadow: 0 0 10px #fff;
          animation: burst-fly 1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
          opacity: 1;
        }

        @keyframes burst-fly {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }

        /* ── Placeholder Message ── */
        .story-placeholder {
          text-align: center;
          color: #fdfcf8;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.5);
          animation: fade-in-up 1s ease-out forwards;
        }

        .story-title {
          font-family: serif;
          font-size: 2.5rem;
          margin: 0 0 10px 0;
          letter-spacing: 2px;
        }

        .story-subtitle {
          font-family: sans-serif;
          font-size: 1rem;
          opacity: 0.8;
          margin: 0;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive Scaling ── */
        @media (max-width: 1099px) {
          .invitation-btn { width: 80px; height: 57px; }
          .story-title { font-size: 2rem; }
        }
        @media (max-width: 639px) {
          .invitation-btn { width: 60px; height: 43px; }
          .story-title { font-size: 1.5rem; }
          .invitation-layer { padding-top: 20vh; }
        }
      `}</style>
    </div>
  );
}
