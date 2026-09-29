import React from 'react';

// Deterministic generation of the far skyline
const generateSkyline = (count: number) => {
  const buildings = [];
  let currentLeft = -5; 
  
  for (let i = 0; i < count; i++) {
    const rand1 = ((Math.sin(i * 13.1) * 0.5) + 0.5);
    const rand2 = ((Math.cos(i * 27.4) * 0.5) + 0.5);
    const rand3 = ((Math.sin(i * 51.9) * 0.5) + 0.5);
    
    let baseWidth = 2.5 + rand1 * 5; 
    if (i % 5 === 0) baseWidth = 7 + rand1 * 3; 
    if (i % 7 === 0) baseWidth = 1.5 + rand1 * 2; 
    
    const height = 25 + rand2 * 75; 
    const left = currentLeft;
    currentLeft += baseWidth * (0.25 + rand3 * 0.6); 
    
    const colorPalette = [
      { top: '#1c1e3d', bottom: '#0b0c1c' },
      { top: '#171936', bottom: '#0a0a1a' },
      { top: '#201e42', bottom: '#0e0d21' },
      { top: '#191b36', bottom: '#080917' },
      { top: '#232247', bottom: '#111124' },
    ];
    const colors = colorPalette[Math.floor(rand1 * colorPalette.length)];
    const opacity = (0.7 + rand3 * 0.25).toFixed(3);
    const zIndex = Math.floor(rand3 * 10);
    
    let rooftop = 'none';
    if (rand2 > 0.85) rooftop = 'antenna-complex';
    else if (rand2 > 0.70) rooftop = 'setback';
    else if (rand2 > 0.55) rooftop = 'spire';
    else if (rand2 > 0.40) rooftop = 'sloped';
    else if (rand2 > 0.25) rooftop = 'water-tank';
    else if (rand2 > 0.10) rooftop = 'dome';
    
    const windows = [];
    const rows = Math.floor(4 + rand1 * 12);
    const cols = Math.floor(2 + rand2 * 4);
    
    for(let r = 1; r <= rows; r++) {
      for(let c = 1; c <= cols; c++) {
        const wRand = Math.abs(Math.sin(i * 10 + r * 5 + c * 3));
        if (wRand > 0.8) { 
           windows.push({
             id: `w-${i}-${r}-${c}`,
             x: ((c / (cols + 1)) * 100).toFixed(3),
             y: ((r / (rows + 1)) * 100).toFixed(3),
             opacity: (0.1 + wRand * 0.5).toFixed(3),
             color: wRand > 0.95 ? '#ffe9b3' : (wRand > 0.9 ? '#dce6ff' : '#9bb0c4') 
           });
        }
      }
    }
    
    buildings.push({
      id: i, left: left.toFixed(3), width: baseWidth.toFixed(3), height: height.toFixed(3),
      colorTop: colors.top, colorBottom: colors.bottom, opacity, zIndex, rooftop, windows
    });
  }
  return buildings.sort((a, b) => a.zIndex - b.zIndex);
};

const SKYLINE = generateSkyline(55); 

export default function FarCitySkyline() {
  const layerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleCamera = (e: any) => {
      const { absX, vw } = e.detail;
      if (!layerRef.current) return;
      const speed = 0.5; // Increased speed for distant buildings
      let offset = (absX * speed) % vw;
      if (offset < 0) offset += vw; 
      layerRef.current.style.transform = `translateX(-${offset}px)`;
    };
    window.addEventListener('camera-update', handleCamera);
    return () => window.removeEventListener('camera-update', handleCamera);
  }, []);

  const skylineElements = SKYLINE.map((building) => (
    <div
      key={building.id}
      className="far-building"
      style={{
        left: `${building.left}%`, width: `${building.width}%`, height: `${building.height}%`,
        background: `linear-gradient(to bottom, ${building.colorTop}, ${building.colorBottom})`,
        opacity: building.opacity, zIndex: building.zIndex
      }}
    >
      {building.rooftop === 'antenna-complex' && (
        <div className="roof-antenna-complex">
          <div className="antenna-base" style={{ backgroundColor: building.colorTop }} />
          <div className="antenna-pole" style={{ backgroundColor: building.colorTop }} />
          <div className="antenna-light" />
        </div>
      )}
      {building.rooftop === 'setback' && (
        <div className="roof-setback">
          <div className="setback-tier1" style={{ backgroundColor: building.colorTop }} />
          <div className="setback-tier2" style={{ backgroundColor: building.colorTop }} />
        </div>
      )}
      {building.rooftop === 'sloped' && (
        <div className="roof-sloped" style={{ backgroundColor: building.colorTop }} />
      )}
      {building.rooftop === 'dome' && (
        <div className="roof-dome" style={{ backgroundColor: building.colorTop }} />
      )}
      {building.rooftop === 'water-tank' && (
        <div className="roof-water-tank">
          <div className="tank-legs" style={{ borderRightColor: building.colorTop, borderLeftColor: building.colorTop }} />
          <div className="tank-body" style={{ backgroundColor: building.colorTop }} />
        </div>
      )}
      {building.rooftop === 'spire' && (
        <div className="roof-spire" style={{ borderBottomColor: building.colorTop }} />
      )}
      
      {building.windows.map((w) => (
        <div
          key={w.id} className="far-window"
          style={{ left: `${w.x}%`, top: `${w.y}%`, backgroundColor: w.color, opacity: w.opacity }}
        />
      ))}
    </div>
  ));

  return (
    <div className="far-city-layer">
      <div ref={layerRef} className="far-city-scroll-container">
        <div className="city-block">{skylineElements}</div>
        <div className="city-block">{skylineElements}</div>
      </div>

      <div className="far-city-haze" />

      <style>{`
        .far-city-layer {
          position: absolute; bottom: 0; left: 0; width: 100vw; height: 32vh; 
          min-height: 200px; z-index: 1; pointer-events: none; overflow: hidden; 
        }
        .far-city-scroll-container {
          display: flex; width: 200vw; height: 100%; will-change: transform;
        }
        .city-block {
          position: relative; width: 100vw; height: 100%;
        }
        .far-building {
          position: absolute; bottom: 0; border-top-left-radius: 1px; border-top-right-radius: 1px;
        }
        .far-window {
          position: absolute; width: 1.5px; height: 3px; transform: translate(-50%, -50%);
          border-radius: 1px; box-shadow: 0 0 2px currentColor;
        }
        .roof-antenna-complex {
          position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
        }
        .antenna-base { width: 6px; height: 4px; border-top-left-radius: 1px; border-top-right-radius: 1px; }
        .antenna-pole { width: 1px; height: 12px; }
        .antenna-light { width: 2px; height: 2px; border-radius: 50%; background-color: #ff3333; opacity: 0.7; box-shadow: 0 0 3px #ff3333; margin-bottom: 1px; }

        .roof-setback {
          position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; justify-content: flex-end; width: 100%;
        }
        .setback-tier1 { width: 70%; height: 8px; border-top-left-radius: 2px; border-top-right-radius: 2px; }
        .setback-tier2 { width: 40%; height: 6px; border-top-left-radius: 1px; border-top-right-radius: 1px; }

        .roof-sloped {
          position: absolute; bottom: 100%; left: 0; width: 100%; height: 12px; clip-path: polygon(0 100%, 100% 100%, 100% 20%);
        }
        .roof-dome {
          position: absolute; bottom: 100%; left: 15%; width: 70%; height: 12px; border-top-left-radius: 20px; border-top-right-radius: 20px;
        }
        .roof-water-tank {
          position: absolute; bottom: 100%; left: 15%; width: 20px;
          display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
        }
        .tank-body { width: 100%; height: 6px; border-radius: 2px; }
        .tank-legs { width: 60%; height: 4px; border-left: 2px solid; border-right: 2px solid; }

        .roof-spire {
          position: absolute; bottom: 100%; left: 50%; width: 0; height: 0;
          border-left: 2px solid transparent; border-right: 2px solid transparent;
          border-bottom: 16px solid; transform: translateX(-50%);
        }

        .far-city-haze {
          position: absolute; bottom: 0; left: 0; width: 100%; height: 60%;
          background: linear-gradient(to top, rgba(12, 15, 32, 0.95) 0%, rgba(12, 15, 32, 0.4) 40%, transparent 100%);
          z-index: 100; pointer-events: none;
        }

        @media (max-width: 768px) {
          .far-city-layer { height: 28vh; }
          .far-window { width: 1px; height: 2px; }
        }
      `}</style>
    </div>
  );
}
