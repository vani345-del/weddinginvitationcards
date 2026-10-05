"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

// ─── Configuration ────────────────────────────────────────────────────────
const G = {
  w: 430, h: 290,    
  mW: 340, mH: 270, mLeft: 0,   mBottom: 0,
  fW: 205, fH: 242, fLeft: 225, fBottom: 8, 
};

// Exact hand pixels based on the visual assets
const MH = { x: 0.84, y: 0.37 }; 
const FH = { x: 0.95, y: 0.10 }; 

const ANCH_Y = -150; 

// Swing Motion Config
const PERIOD  = 6200;     
const AMP_FRAC = 0.22;    
const BASE_Y   = 0.18;    
const LEAN_DEG = 6;       

const SCALE = { desktop: 1, tablet: 0.72, mobile: 0.50 };
function bp(vw: number) { return vw < 640 ? 'mobile' : vw < 1100 ? 'tablet' : 'desktop'; }
function sc(vw: number) { return SCALE[bp(vw)]; }

// Helper to keep web mathematically pinned to hands during lean
function getRotatedOffset(fracX: number, fracY: number, w: number, h: number, angleDeg: number) {
  const cx = w / 2;
  const cy = h / 2;
  const x = fracX * w;
  const y = fracY * h;
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const rx = cos * (x - cx) - sin * (y - cy) + cx;
  const ry = sin * (x - cx) + cos * (y - cy) + cy;
  return { x: rx, y: ry };
}
// ─────────────────────────────────────────────────────────────────────────────

export default function SuperheroCouple() {
  const groupRef = useRef<HTMLDivElement>(null);
  const mInRef   = useRef<HTMLDivElement>(null);
  const fInRef   = useRef<HTMLDivElement>(null);
  const lm1 = useRef<SVGLineElement>(null);
  const lm2 = useRef<SVGLineElement>(null);
  const lf1 = useRef<SVGLineElement>(null);
  const lf2 = useRef<SVGLineElement>(null);

  const t0  = useRef<number | null>(null);
  const raf = useRef<number>(0);

  // ── Game Mechanics State ──
  const moveState = useRef<'left' | 'right' | 'idle'>('idle');
  const moveVelocity = useRef(0);
  const worldXRef = useRef<number | null>(null);
  const absoluteXRef = useRef(0); // Tracks infinite travel distance for camera parallax
  const swingWeightRef = useRef(0); // 0 = hanging still, 1 = full swing
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Listeners for Story Artifact interactions
    const handlePause = () => { 
      isPausedRef.current = true; 
      moveState.current = 'idle'; 
      moveVelocity.current = 0; 
    };
    const handleResume = () => { 
      isPausedRef.current = false; 
    };
    window.addEventListener('pause-player', handlePause);
    window.addEventListener('resume-player', handleResume);

    const tick = (now: number) => {
      if (t0.current === null) t0.current = now;

      const vw  = window.innerWidth;
      const vh  = window.innerHeight;
      const s   = sc(vw);   

      const gW     = G.w * s;
      const gH     = G.h * s;
      const mW     = G.mW * s;
      const mH     = G.mH * s;
      const fW     = G.fW * s;
      const fH     = G.fH * s;
      const fLeft  = G.fLeft * s;
      const fBot   = G.fBottom * s;
      const mBot   = G.mBottom * s;

      // ── 1. Update Game Physics (World X Position) ──
      if (worldXRef.current === null) {
        // Initialize at center of screen
        worldXRef.current = vw / 2 - gW / 2;
      }

      if (!isPausedRef.current) {
        const isMobileScreen = vw <= 768;
        const ACCEL = isMobileScreen ? (vw * 0.004) : (vw * 0.0015); // Much faster acceleration
        const MAX_SPEED = isMobileScreen ? (vw * 0.045) : (vw * 0.02); // Higher max speed
        const FRICTION = 0.92; // Gliding effect when button released

        if (moveState.current === 'left') {
          moveVelocity.current -= ACCEL;
        } else if (moveState.current === 'right') {
          moveVelocity.current += ACCEL;
        } else {
          moveVelocity.current *= FRICTION;
        }
        // Clamp velocity
        moveVelocity.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, moveVelocity.current));
      }

      // Infinite camera travel (purely driven by player controls, ignores local swing!)
      absoluteXRef.current += moveVelocity.current;
      
      const gy = vh * BASE_Y; // Constant Y

      // Dispatch event to loop the parallax backgrounds AND update the story artifact
      window.dispatchEvent(new CustomEvent('camera-update', { 
        detail: { 
          absX: absoluteXRef.current, 
          vw, 
          screenX: worldXRef.current + (gW / 2), // Send center of couple 
          screenY: gy + (gH / 2) // Send center of couple Y
        } 
      }));

      // Update base world position on screen
      worldXRef.current += moveVelocity.current;

      // Calculate boundaries. We must account for the MAX swing amplitude so they never clip!
      const margin = vw * 0.05; 
      const baseAmp = vw * AMP_FRAC; 
      let minWorldX = margin + baseAmp;
      let maxWorldX = vw - gW - margin - baseAmp;

      // If screen is too small, fallback to centering
      if (minWorldX > maxWorldX) minWorldX = maxWorldX = vw / 2 - gW / 2;

      // Clamp world X to boundaries
      if (worldXRef.current <= minWorldX) {
        worldXRef.current = minWorldX;
        moveVelocity.current = 0;
      } else if (worldXRef.current >= maxWorldX) {
        worldXRef.current = maxWorldX;
        moveVelocity.current = 0;
      }

      // ── 2. Dynamic Swing Activation ──
      // The couple only swings when moving. If idle, they smoothly settle to a stop.
      const isMoving = moveState.current !== 'idle' || Math.abs(moveVelocity.current) > 0.1;
      const targetWeight = isMoving ? 1 : 0;
      swingWeightRef.current += (targetWeight - swingWeightRef.current) * 0.05; // Smooth fade in/out

      // ── 3. Add Swing Physics (Local X Position) ──
      const t = ((now - t0.current) % PERIOD) / PERIOD;
      const swing = Math.sin(t * 2 * Math.PI); // -1 to +1
      const vel = Math.cos(t * 2 * Math.PI);   
      
      const currentAmp = baseAmp * swingWeightRef.current;
      const swingX = swing * currentAmp;
      const gx = worldXRef.current + swingX; // Player position + scaled swinging arc
      // gy is already defined above

      if (groupRef.current) {
        groupRef.current.style.left   = `${gx.toFixed(1)}px`;
        groupRef.current.style.top    = `${gy.toFixed(1)}px`;
        groupRef.current.style.width  = `${gW.toFixed(1)}px`;
        groupRef.current.style.height = `${gH.toFixed(1)}px`;
      }

      const currentLean = vel * (LEAN_DEG * swingWeightRef.current);
      
      if (mInRef.current) mInRef.current.style.transform = `scaleX(-1) rotate(${(-currentLean).toFixed(1)}deg)`;
      if (fInRef.current) fInRef.current.style.transform = `rotate(${currentLean.toFixed(1)}deg)`;

      // ── 4. Exact Hand Tracking ──
      const mSlotX = gx;
      const mSlotY = gy + gH - mH - mBot;
      const mOffset = getRotatedOffset(MH.x, MH.y, mW, mH, currentLean);
      const mhx = mSlotX + mOffset.x;
      const mhy = mSlotY + mOffset.y;

      const fSlotX = gx + fLeft;
      const fSlotY = gy + gH - fH - fBot;
      const fOffset = getRotatedOffset(FH.x, FH.y, fW, fH, currentLean);
      const fhx = fSlotX + fOffset.x;
      const fhy = fSlotY + fOffset.y;

      // ── 5. Web Anchors ──
      // Anchors are fixed relative to the player's base WORLD position, allowing the couple
      // to physically swing left and right beneath them naturally.
      const groupCenterWorld = worldXRef.current + gW / 2;
      const mAx = groupCenterWorld - vw * 0.15; 
      const fAx = groupCenterWorld + vw * 0.15; 

      const setL = (el: SVGLineElement | null, x1: number, y1: number, x2: number, y2: number) => {
        if (!el) return;
        el.setAttribute('x1', x1.toFixed(1));
        el.setAttribute('y1', y1.toFixed(1));
        el.setAttribute('x2', x2.toFixed(1));
        el.setAttribute('y2', y2.toFixed(1));
      };

      setL(lm1.current, mhx,     mhy, mAx,     ANCH_Y);
      setL(lm2.current, mhx + 3, mhy, mAx + 5, ANCH_Y);
      setL(lf1.current, fhx,     fhy, fAx,     ANCH_Y);
      setL(lf2.current, fhx - 3, fhy, fAx - 5, ANCH_Y);

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const handlePointerDown = (dir: 'left' | 'right') => (e: React.PointerEvent) => {
    e.preventDefault(); // Prevent accidental scroll/zoom
    moveState.current = dir;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    moveState.current = 'idle';
  };

  return (
    <>
      <div className="cl">
        <svg className="cl-svg">
          <line ref={lm1} stroke="rgba(210,232,255,0.70)" strokeWidth="2.0" strokeLinecap="round"/>
          <line ref={lm2} stroke="rgba(210,232,255,0.22)" strokeWidth="0.9" strokeLinecap="round"/>
          <line ref={lf1} stroke="rgba(210,232,255,0.70)" strokeWidth="2.0" strokeLinecap="round"/>
          <line ref={lf2} stroke="rgba(210,232,255,0.22)" strokeWidth="0.9" strokeLinecap="round"/>
        </svg>

        <div ref={groupRef} className="cl-group">
          <div className="cl-male-slot">
            <div ref={mInRef} className="cl-inner" style={{ transform: 'scaleX(-1)' }}>
              <Image src="/spiderman1.png" alt="Male Superhero"
                fill style={{ objectFit: 'contain', objectPosition: 'center bottom' }} priority />
            </div>
          </div>

          <div className="cl-female-slot">
            <div ref={fInRef} className="cl-inner">
              <Image src="/spiderwomen1.png" alt="Female Superhero"
                fill style={{ objectFit: 'contain', objectPosition: 'center bottom' }} priority />
            </div>
          </div>
        </div>
      </div>

      {/* ── Game Controls ── */}
      <div className="game-controls-container">
        <div className="game-controls-hint">
          TAP TO MOVE • HOLD FOR CONTINUOUS SWING
        </div>
        <div className="game-controls">
          <button 
            className="game-btn left-btn"
            onPointerDown={handlePointerDown('left')}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Move left"
          >
            ←
          </button>
          <button 
            className="game-btn right-btn"
            onPointerDown={handlePointerDown('right')}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Move right"
          >
            →
          </button>
        </div>
      </div>

      <style>{`
        .cl {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          overflow: hidden;
        }
        .cl-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          z-index: 1;
        }
        .cl-group {
          position: absolute;
          z-index: 2;
          will-change: left, top;
          width: 430px;
          height: 290px;
        }
        .cl-male-slot {
          position: absolute;
          left: 0; bottom: 0;
          width: 340px; height: 270px;
          z-index: 1;
        }
        .cl-female-slot {
          position: absolute;
          left: 225px; bottom: 8px;
          width: 205px; height: 242px;
          z-index: 2;
        }
        .cl-inner {
          position: absolute;
          inset: 0;
          transform-origin: center center;
          will-change: transform;
          filter:
            drop-shadow(0 0 26px rgba(130, 190, 255, 0.55))
            drop-shadow(0 16px 36px rgba(0, 0, 0, 0.94));
        }

        /* ── Controls Styling ── */
        .game-controls-container {
          position: absolute;
          bottom: 80px;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          z-index: 10;
          pointer-events: none;
        }
        .game-controls-hint {
          color: #ffffff;
          font-weight: bold;
          font-size: 0.75rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          text-shadow: 0 2px 8px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8);
          animation: pulse-hint 2.5s infinite alternate;
        }
        @keyframes pulse-hint {
          0% { opacity: 0.8; }
          100% { opacity: 1; text-shadow: 0 2px 8px rgba(0,0,0,1), 0 0 12px rgba(255,255,255,0.6); }
        }
        .game-controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          pointer-events: none; /* Allows clicks to pass through the middle empty space */
        }
        .game-btn {
          pointer-events: auto;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(10, 15, 30, 0.65);
          border: 2px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), inset 0 0 10px rgba(212, 175, 55, 0.2);
          color: rgba(255, 255, 255, 0.9);
          font-size: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(8px);
          touch-action: none; /* Crucial for preventing scroll/zoom while holding */
          user-select: none;
          -webkit-user-select: none;
          transition: transform 0.1s ease-out, background 0.1s ease, border-color 0.2s ease;
        }
        .game-btn:hover {
          background: rgba(20, 25, 45, 0.8);
          border-color: rgba(212, 175, 55, 0.7);
        }
        .game-btn:active {
          transform: scale(0.85);
          background: rgba(212, 175, 55, 0.4);
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.6), inset 0 0 15px rgba(212, 175, 55, 0.5);
          color: white;
        }

        @media (max-width: 1099px) {
          .cl-group       { width: 310px; height: 209px; }
          .cl-male-slot   { width: 245px; height: 194px; }
          .cl-female-slot { left: 162px; width: 148px; height: 174px; bottom: 6px; }
        }
        @media (max-width: 639px) {
          .cl-group       { width: 215px; height: 145px; }
          .cl-male-slot   { width: 170px; height: 135px; }
          .cl-female-slot { left: 112px; width: 103px; height: 121px; bottom: 4px; }
          .game-controls-container { bottom: 30px; }
          .game-controls-hint { font-size: 0.65rem; }
          .game-btn       { width: 60px; height: 60px; font-size: 26px; }
        }
      `}</style>
    </>
  );
}
