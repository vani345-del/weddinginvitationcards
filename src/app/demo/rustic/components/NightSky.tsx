import React from 'react';

// Generate a fixed array of stars deterministically so it doesn't change on re-renders
const generateStars = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    // Pseudo-random generation using math based on index
    // Using toFixed(3) ensures exact string matches during React SSR hydration
    const x = ((Math.sin(i * 42.1) * 0.5 + 0.5) * 100).toFixed(3);
    const y = ((Math.cos(i * 89.4) * 0.5 + 0.5) * 100).toFixed(3);
    const size = ((Math.sin(i * 12.5) * 0.5 + 0.5) * 1.5 + 0.5).toFixed(3);
    const opacity = ((Math.cos(i * 73.2) * 0.5 + 0.5) * 0.5 + 0.2).toFixed(3);
    return { id: i, x, y, size, opacity };
  });
};

const STARS = generateStars(150);

export default function NightSky() {
  const layerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleCamera = (e: any) => {
      const { absX, vw } = e.detail;
      if (!layerRef.current) return;
      const speed = 0.15; // Increased speed for stars/moon
      let offset = (absX * speed) % vw;
      if (offset < 0) offset += vw; 
      layerRef.current.style.transform = `translateX(-${offset}px)`;
    };
    window.addEventListener('camera-update', handleCamera);
    return () => window.removeEventListener('camera-update', handleCamera);
  }, []);

  const skyElements = (
    <>
      <div className="stars-container">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      <div className="moon" />
      <div className="haze haze-1" />
      <div className="haze haze-2" />
      <div className="haze haze-3" />
    </>
  );

  return (
    <div className="night-sky-layer">
      <div className="sky-gradient" />
      
      <div ref={layerRef} className="sky-scroll-container">
        <div className="sky-block">{skyElements}</div>
        <div className="sky-block">{skyElements}</div>
      </div>

      <style>{`
        .night-sky-layer {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .sky-scroll-container {
          display: flex;
          width: 200vw;
          height: 100%;
          will-change: transform;
        }

        .sky-block {
          position: relative;
          width: 100vw;
          height: 100%;
        }
        
        .sky-gradient {
          position: absolute;
          inset: 0;
          /* Top: very deep navy / dark blue
             Middle: dark blue with a subtle purple tint
             Lower horizon: slightly lighter blue/purple */
          background: linear-gradient(
            180deg, 
            #050814 0%, 
            #0d1126 40%, 
            #171433 75%, 
            #231d45 100%
          );
        }

        .stars-container {
          position: absolute;
          inset: 0;
        }

        .star {
          position: absolute;
          background-color: #ffffff;
          border-radius: 50%;
        }

        .moon {
          position: absolute;
          top: 15%;
          right: 18%;
          width: 10vw;
          max-width: 120px;
          min-width: 70px;
          aspect-ratio: 1;
          border-radius: 50%;
          /* Subtle circular gradient for the moon */
          background: radial-gradient(circle at 30% 30%, #fffff8 0%, #f4f0e6 50%, #e0d8c8 100%);
          /* Soft glow */
          box-shadow: 
            0 0 30px 10px rgba(224, 216, 200, 0.15),
            0 0 80px 30px rgba(224, 216, 200, 0.08),
            inset -8px -8px 16px rgba(0, 0, 0, 0.05);
        }

        .haze {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.5;
        }

        .haze-1 {
          bottom: -15%;
          left: -10%;
          width: 60%;
          height: 40%;
          background: radial-gradient(ellipse at center, rgba(30, 25, 60, 0.5) 0%, transparent 70%);
        }

        .haze-2 {
          bottom: 5%;
          right: -15%;
          width: 70%;
          height: 35%;
          background: radial-gradient(ellipse at center, rgba(20, 25, 70, 0.4) 0%, transparent 70%);
        }

        .haze-3 {
          bottom: 25%;
          left: 30%;
          width: 50%;
          height: 30%;
          background: radial-gradient(ellipse at center, rgba(40, 25, 70, 0.3) 0%, transparent 70%);
        }

        @media (max-width: 768px) {
          .moon {
            top: 10%;
            right: 12%;
          }
        }
      `}</style>
    </div>
  );
}
