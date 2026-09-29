import React from 'react';

// Hardcoded deterministic array to enforce a strict U-shaped cinematic composition
// The center must remain open (lower heights) for the future character swinging sequence.
const BASE_BUILDINGS = [
  // LEFT SIDE (Tall, framing the scene)
  { id: 1, left: -4, width: 18, height: 50, zIndex: 21, colorTop: '#181938', colorBottom: '#070817', roof: 'flat', edgeLight: 'right' },
  { id: 2, left: 11, width: 20, height: 47, zIndex: 25, colorTop: '#131430', colorBottom: '#060614', roof: 'detailed-water-tank', edgeLight: 'right' },
  { id: 3, left: 28, width: 16, height: 42, zIndex: 23, colorTop: '#1b193d', colorBottom: '#09081a', roof: 'landing-fire-escape', edgeLight: 'right' },
  
  // CENTER (The open gap for swinging, much lower heights)
  { id: 4, left: 42, width: 12, height: 22, zIndex: 22, colorTop: '#101126', colorBottom: '#050512', roof: 'ac-units', edgeLight: 'none' },
  { id: 5, left: 52, width: 15, height: 18, zIndex: 21, colorTop: '#151633', colorBottom: '#070717', roof: 'flat', edgeLight: 'left' },
  
  // RIGHT SIDE (Tall, framing the scene)
  { id: 6, left: 63, width: 18, height: 38, zIndex: 23, colorTop: '#1a1b3a', colorBottom: '#08091a', roof: 'flat-landing', edgeLight: 'left' },
  { id: 7, left: 75, width: 22, height: 52, zIndex: 26, colorTop: '#141433', colorBottom: '#060517', roof: 'detailed-helipad', edgeLight: 'left' },
  { id: 8, left: 91, width: 15, height: 48, zIndex: 22, colorTop: '#171836', colorBottom: '#07081a', roof: 'detailed-billboard', edgeLight: 'left' },
];

const FOREGROUND_BUILDINGS = BASE_BUILDINGS.map(b => {
  const windows = [];
  const cols = Math.max(4, Math.floor(b.width * 0.8));
  const rows = Math.max(6, Math.floor(b.height * 0.6));
  
  for(let r = 2; r < rows; r++) {
     for(let c = 1; c <= cols; c++) {
        if (c % 4 === 0) continue; 
        const rand = Math.abs(Math.sin(b.zIndex * 10 + r * 5.5 + c * 3.2));
        if (rand > 0.65) { 
           windows.push({
             id: `w-${b.id}-${r}-${c}`,
             x: ((c / (cols + 1)) * 100).toFixed(3),
             y: ((r / (rows + 1)) * 100).toFixed(3),
             opacity: (0.3 + rand * 0.7).toFixed(3),
             color: rand > 0.95 ? '#ffe9a6' : (rand > 0.85 ? '#e6f0ff' : '#aabdd6'),
             scale: rand > 0.98 ? 1.5 : 1
           });
        }
     }
  }
  return { ...b, windows };
});

export default function MidForegroundCity() {
  const layerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleCamera = (e: any) => {
      const { absX, vw } = e.detail;
      if (!layerRef.current) return;
      const speed = 1.1; // Vastly increased parallax speed for foreground rush
      let offset = (absX * speed) % vw;
      if (offset < 0) offset += vw; 
      layerRef.current.style.transform = `translateX(-${offset}px)`;
    };
    window.addEventListener('camera-update', handleCamera);
    return () => window.removeEventListener('camera-update', handleCamera);
  }, []);

  const cityElements = FOREGROUND_BUILDINGS.map((b) => (
    <div
      key={b.id}
      className={`fg-building edge-${b.edgeLight}`}
      style={{
        left: `${b.left}%`, width: `${b.width}%`, height: `${b.height}vh`,
        background: `linear-gradient(to bottom, ${b.colorTop}, ${b.colorBottom})`,
        zIndex: b.zIndex
      }}
    >
      <div className="fg-facade" />
      <div className="roof-ledge" style={{ backgroundColor: b.colorTop }} />

      {b.roof === 'detailed-water-tank' && (
        <>
          <div className="roof-setback-left" style={{ backgroundColor: b.colorTop }}>
            <div className="roof-water-tank-complex">
              <div className="wt-legs" style={{ borderLeftColor: b.colorTop, borderRightColor: b.colorTop }} />
              <div className="wt-tank" />
              <div className="wt-pipe" style={{ backgroundColor: b.colorTop }} />
            </div>
          </div>
          <div className="roof-door-room" style={{ backgroundColor: b.colorTop }} />
        </>
      )}

      {b.roof === 'detailed-helipad' && (
        <>
          <div className="roof-access-room" style={{ backgroundColor: b.colorTop }}>
            <div className="roof-door" />
          </div>
          <div className="roof-helipad-complex">
            <div className="hp-scaffold" />
            <div className="hp-pad" />
            <div className="hp-railing" />
            <div className="hp-antenna" />
          </div>
        </>
      )}

      {b.roof === 'detailed-billboard' && (
        <>
          <div className="roof-billboard-frame">
            <div className="bb-leg left" />
            <div className="bb-leg right" />
            <div className="bb-panel" />
            <div className="bb-catwalk" />
          </div>
          <div className="roof-vent" style={{ backgroundColor: b.colorTop }} />
        </>
      )}

      {b.roof === 'flat-landing' && (
        <div className="landing-pad">
          <div className="landing-pad-markings" />
        </div>
      )}

      {b.roof === 'landing-fire-escape' && (
        <>
          <div className="landing-pad">
            <div className="landing-pad-markings" />
          </div>
          <div className="fire-escape">
            <div className="fe-platform" /><div className="fe-platform" />
            <div className="fe-platform" /><div className="fe-platform" />
            <div className="fe-ladder" />
          </div>
        </>
      )}

      {b.roof === 'ac-units' && (
        <>
          <div className="roof-ac ac1" /><div className="roof-ac ac2" />
        </>
      )}

      {b.windows.map((w) => (
        <div
          key={w.id} className="fg-window"
          style={{
            left: `${w.x}%`, top: `${w.y}%`, backgroundColor: w.color,
            opacity: w.opacity, transform: `translate(-50%, -50%) scale(${w.scale})`
          }}
        />
      ))}
    </div>
  ));

  return (
    <div className="mid-city-layer">
      <div ref={layerRef} className="mid-city-scroll-container">
        <div className="city-block">{cityElements}</div>
        <div className="city-block">{cityElements}</div>
      </div>

      <style>{`
        .mid-city-layer {
          position: absolute; bottom: 0; left: 0; width: 100vw; height: 100%;
          z-index: 2; pointer-events: none; overflow: hidden;
        }

        .mid-city-scroll-container {
          display: flex; width: 200vw; height: 100%; will-change: transform;
        }

        .city-block {
          position: relative; width: 100vw; height: 100%;
        }

        .fg-building {
          position: absolute; bottom: 0; border-top-left-radius: 2px; border-top-right-radius: 2px;
          box-shadow: inset 0 10px 20px rgba(0,0,0,0.5);
        }

        .edge-right { box-shadow: inset -4px 0 15px rgba(220, 230, 255, 0.05), inset 0 10px 20px rgba(0,0,0,0.5); }
        .edge-left { box-shadow: inset 4px 0 15px rgba(220, 230, 255, 0.05), inset 0 10px 20px rgba(0,0,0,0.5); }
        .edge-none { box-shadow: inset 0 10px 20px rgba(0,0,0,0.5); }

        .fg-facade {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(90deg, transparent, transparent 15%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.15) 20%);
          opacity: 0.6;
        }

        .fg-window {
          position: absolute; width: clamp(1.5px, 0.25vw, 3px); height: clamp(3px, 0.5vw, 6px);
          border-radius: 1px; box-shadow: 0 0 4px currentColor;
        }

        .roof-ledge {
          position: absolute; bottom: 100%; left: -1%; width: 102%; height: 4px;
          border-top-left-radius: 2px; border-top-right-radius: 2px;
        }
        .roof-ac { position: absolute; bottom: 100%; background: #0a0b1a; border-radius: 1px; }
        .roof-ac.ac1 { left: 10%; width: 15%; height: 8px; }
        .roof-ac.ac2 { left: 35%; width: 12%; height: 12px; }

        .fire-escape {
          position: absolute; top: 8%; right: 8%; width: 12%; height: 65%;
          display: flex; flex-direction: column; justify-content: space-evenly; opacity: 0.8;
        }
        .fe-platform { width: 100%; height: 2px; background: #0c0c1a; border-bottom: 1px solid #1a1a2e; }
        .fe-ladder { position: absolute; top: 0; right: 15%; width: 2px; height: 100%; background: #080814; }

        .roof-setback-left {
          position: absolute; bottom: 100%; left: 0; width: 55%; height: 8vh;
          border-top-left-radius: 2px; border-top-right-radius: 2px; box-shadow: inherit;
        }
        .roof-water-tank-complex { position: absolute; bottom: 100%; left: 15%; width: 50%; height: 35px; }
        .wt-legs { position: absolute; bottom: 0; left: 10%; width: 80%; height: 15px; border-left: 2px solid; border-right: 2px solid; }
        .wt-tank { position: absolute; bottom: 15px; left: 0; width: 100%; height: 20px; background-color: #0b0c1c; border-radius: 4px; box-shadow: inset -2px 0 6px rgba(0,0,0,0.6); }
        .wt-pipe { position: absolute; top: -4px; left: 50%; width: 2px; height: 4px; }
        .roof-door-room { position: absolute; bottom: 100%; right: 10%; width: 25%; height: 14px; border-top-left-radius: 2px; border-top-right-radius: 2px; }

        .roof-access-room { position: absolute; bottom: 100%; right: 5%; width: 25%; height: 18px; border-top-left-radius: 2px; border-top-right-radius: 2px; }
        .roof-door { position: absolute; bottom: 0; left: 15%; width: 30%; height: 12px; background: #06060f; border-top-left-radius: 1px; border-top-right-radius: 1px; }
        .roof-helipad-complex { position: absolute; bottom: 100%; left: 5%; width: 60%; height: 25px; }
        .hp-scaffold {
          position: absolute; bottom: 0; left: 10%; width: 80%; height: 15px;
          background-image: repeating-linear-gradient(45deg, #0a0b17 0, #0a0b17 2px, transparent 2px, transparent 6px),
                            repeating-linear-gradient(-45deg, #0a0b17 0, #0a0b17 2px, transparent 2px, transparent 6px);
        }
        .hp-pad { position: absolute; bottom: 15px; left: 0; width: 100%; height: 5px; background: #0b0c1c; border-top: 1px solid #1a1c33; border-radius: 2px; }
        .hp-railing { position: absolute; bottom: 20px; left: 2%; width: 96%; height: 6px; border-bottom: 1px solid #1a1c33; background-image: repeating-linear-gradient(90deg, #1a1c33, #1a1c33 1px, transparent 1px, transparent 15%); }
        .hp-antenna { position: absolute; bottom: 20px; right: 5%; width: 2px; height: 15px; background: #1a1c33; }

        .roof-billboard-frame { position: absolute; bottom: 100%; left: 15%; width: 70%; height: 35px; }
        .bb-leg { position: absolute; bottom: 0; width: 2px; height: 15px; background: #06060f; }
        .bb-leg.left { left: 15%; } .bb-leg.right { right: 15%; }
        .bb-panel { position: absolute; top: 0; left: 0; width: 100%; height: 20px; background: #030308; border: 1px solid #0c0d1c; }
        .bb-catwalk { position: absolute; bottom: 13px; left: -5%; width: 110%; height: 2px; background: #111226; }
        .roof-vent { position: absolute; bottom: 100%; right: 10%; width: 15%; height: 8px; border-radius: 1px; }

        .landing-pad {
          position: absolute; bottom: 100%; left: 15%; width: 70%; height: 5px;
          background: #191b38; border-top: 1px solid #2a2c54; border-top-left-radius: 2px; border-top-right-radius: 2px; box-shadow: 0 -2px 10px rgba(42, 44, 84, 0.4);
        }
        .landing-pad-markings {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 2px;
          background-image: repeating-linear-gradient(90deg, #2a2c54, #2a2c54 6px, transparent 6px, transparent 12px);
        }
      `}</style>
    </div>
  );
}
