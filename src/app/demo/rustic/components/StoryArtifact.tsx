import React, { useEffect, useRef, useState } from 'react';

const STORY_MILESTONES = [
  { id: 1, x: 1500, title: 'HOW THEY MET', text: 'Every great adventure begins with an unexpected encounter. It was a crowded room, but the world seemed to pause the moment their eyes met. A simple "hello" became the spark that ignited a beautiful friendship, full of shared laughter and late-night conversations.' },
  { id: 2, x: 3000, title: 'THE FIRST DATE', text: 'Coffee, nervous laughs, and a connection that felt instantly familiar. What was supposed to be a quick afternoon meetup turned into hours of talking under the city lights. They realized they were sharing more than just stories—they were sharing their hearts.' },
  { id: 3, x: 4500, title: 'FALLING IN LOVE', text: 'Through every challenge and quiet moment, the bond only grew stronger. It wasn\'t a single defining moment, but a million little things—the way they supported each other\'s dreams, the shared silences, and the realization that home was no longer a place, but a person.' },
  { id: 4, x: 6000, title: 'THE PROPOSAL', text: 'Under a canopy of shimmering stars, with hearts racing, a question was asked. The city lights faded into the background as "Will you?" was met with a tearful, joyous "Forever." A promise to swing through life\'s greatest adventures side by side.' },
  { id: 5, x: 7500, title: 'THE WEDDING', text: 'The greatest adventure is yet to come! Join us as we celebrate our love story and swing into the next chapter of our lives. Bring your dancing shoes, your biggest smiles, and get ready for a night to remember.' },
];

export default function StoryArtifact() {
  const artifactRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hintRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [openedArtifact, setOpenedArtifact] = useState<typeof STORY_MILESTONES[0] | null>(null);
  const [collectedIds, setCollectedIds] = useState<Set<number>>(new Set());
  const [isGameEnded, setIsGameEnded] = useState(false);

  useEffect(() => {
    if (openedArtifact || isGameEnded) return;

    const handleCamera = (e: any) => {
      const { absX, screenX, screenY } = e.detail;
      
      STORY_MILESTONES.forEach((milestone, idx) => {
        if (collectedIds.has(milestone.id)) return;

        // Calculate screen position based on player's absolute travel
        const artifactScreenX = screenX + (milestone.x - absX);
        const artifactScreenY = screenY + 20;

        const el = artifactRefs.current[idx];
        if (el) {
          el.style.transform = `translate(${artifactScreenX}px, ${artifactScreenY}px)`;
        }

        // Proximity detection
        const distance = Math.hypot(artifactScreenX - screenX, artifactScreenY - screenY);
        const hintEl = hintRefs.current[idx];
        
        if (distance < 200) {
          if (hintEl) {
            hintEl.style.opacity = '1';
            hintEl.style.transform = 'translateY(0) scale(1)';
          }
          
          // Auto open if very close!
          if (distance < 40) {
             openArtifact(milestone);
          }
        } else {
          if (hintEl) {
            hintEl.style.opacity = '0';
            hintEl.style.transform = 'translateY(10px) scale(0.9)';
          }
        }
      });
    };

    window.addEventListener('camera-update', handleCamera);
    return () => window.removeEventListener('camera-update', handleCamera);
  }, [collectedIds, openedArtifact, isGameEnded]);

  const openArtifact = (milestone: typeof STORY_MILESTONES[0]) => {
    if (openedArtifact || collectedIds.has(milestone.id) || isGameEnded) return;
    window.dispatchEvent(new Event('pause-player'));
    setOpenedArtifact(milestone);
  };

  const closeArtifact = () => {
    if (!openedArtifact) return;
    const isLast = openedArtifact.id === STORY_MILESTONES.length;

    setCollectedIds(prev => {
      const next = new Set(prev);
      next.add(openedArtifact.id);
      return next;
    });
    setOpenedArtifact(null);

    if (isLast) {
      setIsGameEnded(true);
      // Do NOT dispatch 'resume-player'. The couple stays permanently paused.
    } else {
      window.dispatchEvent(new Event('resume-player'));
    }
  };

  return (
    <>
      {/* Cinematic End Screen */}
      {isGameEnded && (
        <div className="the-end-screen">
          <div className="end-content">
            <h1>THE END</h1>
            <button 
              className="continue-wedding-btn"
              onClick={() => window.dispatchEvent(new Event('scroll-to-wedding'))}
            >
              CONTINUE TO WEDDING &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Artifacts in the World */}
      {STORY_MILESTONES.map((milestone, idx) => {
        if (collectedIds.has(milestone.id)) return null;
        
        const isOpened = openedArtifact?.id === milestone.id;

        return (
          <div 
            key={milestone.id}
            ref={(el) => { artifactRefs.current[idx] = el; }}
            className="story-artifact-container"
            onClick={() => openArtifact(milestone)}
            style={{ display: isOpened ? 'none' : 'block' }}
          >
            <div className="artifact-title-floating">{milestone.title}</div>
            <div className="artifact-core" />
            <div className="artifact-glow" />
            <div className="artifact-sparkles">
              <div className="sparkle s1" />
              <div className="sparkle s2" />
              <div className="sparkle s3" />
            </div>
            <div ref={(el) => { hintRefs.current[idx] = el; }} className="artifact-hint">COLLECT</div>
          </div>
        );
      })}

      {/* Story Card Overlay */}
      {openedArtifact && (
         <div className="story-card-overlay">
            <div className="story-card">
              <div className="story-card-web-pattern" />
              <div className="story-card-content">
                <h2 className="story-title">{openedArtifact.title}</h2>
                <div className="story-divider" />
                <p className="story-body">
                  {openedArtifact.text}
                </p>
                <button className="story-continue-btn" onClick={closeArtifact}>
                  {openedArtifact.id === STORY_MILESTONES.length ? 'END' : 'CONTINUE'}
                </button>
              </div>
            </div>
         </div>
      )}

      <style>{`
        .the-end-screen {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(5, 8, 20, 0.7);
          backdrop-filter: blur(6px);
          z-index: 50;
          animation: fade-in-end 2s ease-out forwards;
        }

        .end-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .the-end-screen h1 {
          font-family: 'Cinzel', serif;
          font-size: 5rem;
          color: #ff4d40;
          letter-spacing: 15px;
          margin: 0;
          text-shadow: 0 0 30px rgba(255, 77, 64, 0.6);
          opacity: 0;
          animation: end-text-appear 4s ease-in forwards 1s;
        }

        .continue-wedding-btn {
          background: rgba(255, 77, 64, 0.1);
          border: 1px solid #ff4d40;
          color: #fff;
          padding: 15px 40px;
          font-size: 1.2rem;
          letter-spacing: 3px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          animation: end-btn-appear 2s ease-in forwards 3s;
        }

        .continue-wedding-btn:hover {
          background: rgba(255, 77, 64, 0.3);
          box-shadow: 0 0 20px rgba(255, 77, 64, 0.4);
          transform: translateY(-2px);
        }

        @keyframes fade-in-end {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes end-text-appear {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes end-btn-appear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .story-artifact-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          z-index: 10;
          cursor: pointer;
          will-change: transform;
        }

        .artifact-title-floating {
          position: absolute;
          top: -65px; left: -100px;
          width: 200px;
          text-align: center;
          color: #ffe6e6;
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-shadow: 0 2px 10px rgba(255, 77, 64, 0.9), 0 0 20px rgba(255, 77, 64, 0.5);
          pointer-events: none;
          animation: float-title 3s ease-in-out infinite;
        }

        .artifact-core {
          position: absolute;
          top: -15px; left: -15px;
          width: 30px; height: 30px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 15px 5px rgba(255, 215, 0, 0.6);
          animation: artifact-float 3s ease-in-out infinite, artifact-pulse 2s ease-in-out infinite;
        }

        .artifact-glow {
          position: absolute;
          top: -40px; left: -40px;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
          pointer-events: none;
        }

        .artifact-hint {
          position: absolute;
          top: 30px; left: -50px;
          width: 100px;
          text-align: center;
          color: #ffd700;
          font-weight: bold;
          font-size: 0.9rem;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          opacity: 0;
          transform: translateY(10px) scale(0.9);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          width: 4px; height: 4px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 4px #ffd700;
        }
        .s1 { top: -25px; left: -20px; animation: sparkle-anim 1.5s infinite; }
        .s2 { top: 15px; left: 25px; animation: sparkle-anim 2s infinite 0.5s; }
        .s3 { top: -5px; left: 20px; animation: sparkle-anim 1.8s infinite 1s; }

        @keyframes float-title {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes artifact-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes artifact-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px 5px rgba(255, 215, 0, 0.6); }
          50% { transform: scale(1.1); box-shadow: 0 0 25px 8px rgba(255, 215, 0, 0.8); }
        }
        @keyframes sparkle-anim {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* --- Story Card Overlay --- */
        .story-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(5, 6, 12, 0.85);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: overlay-fade-in 0.4s ease-out;
        }

        .story-card {
          position: relative;
          width: 90%;
          max-width: 550px;
          background: #0a0b16;
          border: 1px solid #3a1515;
          border-radius: 12px;
          box-shadow: 
            0 20px 50px rgba(0,0,0,0.8),
            0 0 0 1px rgba(255, 59, 48, 0.2),
            inset 0 0 80px rgba(255, 0, 0, 0.05);
          overflow: hidden;
          animation: card-slide-up 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .story-card-web-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-image: 
            repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 30px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 30px);
          pointer-events: none;
        }

        .story-card-content {
          position: relative;
          padding: 40px;
          text-align: center;
          z-index: 2;
        }

        .story-title {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          color: #ff4d40; 
          margin: 0;
          letter-spacing: 4px;
          text-shadow: 0 2px 10px rgba(255, 77, 64, 0.3);
        }

        .story-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ffd700, transparent);
          margin: 20px auto;
        }

        .story-body {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #e0e0e0;
          margin-bottom: 40px;
          text-align: justify;
          text-align-last: center;
        }

        .story-continue-btn {
          background: transparent;
          border: 1px solid #ff4d40;
          color: #ff4d40;
          padding: 12px 30px;
          font-size: 1rem;
          letter-spacing: 2px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .story-continue-btn:hover {
          background: rgba(255, 77, 64, 0.15);
          box-shadow: 0 0 15px rgba(255, 77, 64, 0.3);
        }

        @keyframes overlay-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes card-slide-up {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 600px) {
          .story-card-content {
            padding: 30px 20px;
          }
          .story-title {
            font-size: 1.5rem;
          }
          .story-body {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </>
  );
}
