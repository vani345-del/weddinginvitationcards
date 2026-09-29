"use client";
import { useEffect, useRef } from "react";

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(null);
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export default function CinematicStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let killed = false;

    (async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js");
      } catch { return; }

      if (killed) return;

      const { gsap, ScrollTrigger } = window as any;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      // Petals generator
      const petalLayer = document.getElementById("cs-petals");
      if (petalLayer && petalLayer.children.length === 0) {
        for (let i = 0; i < 70; i++) {
          const p = document.createElement("div");
          p.className = "cs-petal";
          p.style.left = `${Math.random() * 100}%`;
          p.style.width = `${12 + Math.random() * 16}px`;
          p.style.height = p.style.width;
          p.style.animationDelay = `${-10 + Math.random() * 20}s`;
          p.style.animationDuration = `${10 + Math.random() * 12}s`;
          p.style.opacity = `${0.6 + Math.random() * 0.4}`;
          petalLayer.appendChild(p);
        }
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#cs-stage",
          start: "top top",
          end: "+=7000",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to("#cs-foreground-reveal", { scale: 3.5, opacity: 0, duration: 0.15, ease: "power2.inOut" }, 0);
      tl.fromTo("#cs-world", { scale: 1 }, { scale: 1.8, duration: 1, ease: "none" }, 0);
      tl.to("#cs-dog", { y: "-3vh", rotation: 4, repeat: 14, yoyo: true, ease: "sine.inOut", duration: 1 / 15 }, 0);
      tl.to("#cs-scroll-hint", { opacity: 0, duration: 0.05 }, 0);

      tl.to("#cs-bg-dimmer", { opacity: 1, duration: 0.1 }, 0.16);
      tl.to("#cs-bg-dimmer", { opacity: 0, duration: 0.1 }, 0.78);

      const fadeDur = 0.04;
      const checkpoints = [
        { id: "#cs-cp1", start: 0.18, end: 0.28 },
        { id: "#cs-cp2", start: 0.34, end: 0.44 },
        { id: "#cs-cp3", start: 0.50, end: 0.60 },
        { id: "#cs-cp4", start: 0.66, end: 0.76 },
      ];

      checkpoints.forEach((cp) => {
        const isRight = cp.id === "#cs-cp2" || cp.id === "#cs-cp4";
        const startX = isRight ? 40 : -40;
        tl.fromTo(cp.id, { opacity: 0, x: startX }, { opacity: 1, x: 0, duration: fadeDur, ease: "power2.out" }, cp.start);
        tl.fromTo(`${cp.id} .cs-border-top, ${cp.id} .cs-border-bottom`, { scaleX: 0 }, { scaleX: 1, duration: fadeDur, ease: "power2.out" }, cp.start);
        tl.fromTo(`${cp.id} .cs-border-left, ${cp.id} .cs-border-right`, { scaleY: 0 }, { scaleY: 1, duration: fadeDur, ease: "power2.out" }, cp.start);
        tl.to(cp.id, { opacity: 0, x: startX, duration: fadeDur, ease: "power2.in" }, cp.end);
      });

      tl.fromTo("#cs-proposal-glow", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.82);
      
      tl.fromTo("#cs-ring", { opacity: 0, scale: 0, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: "back.out(2)" }, 0.86);
      tl.fromTo("#cs-proposal-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.08, ease: "power3.out" }, 0.88);
      
      tl.to("#cs-proposal-text", { opacity: 0, duration: 0.04 }, 0.94);
      tl.to("#cs-ring", { opacity: 0, duration: 0.04 }, 0.94);

      // Dark veil for seamless background
      tl.fromTo("#cs-veil", { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.94);
      
      // Forever begins (The beautifully boxed invitation card)
      tl.fromTo("#cs-forever", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" }, 0.96);

      ScrollTrigger.refresh();
    })();

    return () => {
      killed = true;
      const ST = (window as any).ScrollTrigger;
      if (ST) ST.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="cs-section" aria-label="Our illustrated story">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Italianno&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet" />

      <style>{`
        .cs-section { position: relative; font-family: "Cormorant Garamond", serif; }
        .cs-section *, .cs-section *::before, .cs-section *::after { box-sizing: border-box; }
        #cs-stage { width: 100%; height: 100vh; overflow: hidden; position: relative; background: #000; container-type: size; }

        #cs-world-wrap { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        #cs-world {
          position: relative;
          width: 100cqw; height: 56.28cqw; /* 16:9 aspect */
          min-height: 100cqh; min-width: 177.68cqh;
          transform-origin: center center;
        }
        #cs-mainbg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        
        #cs-couple-wrap {
          position: absolute; bottom: 38%; left: 50%; transform: translateX(-50%);
          width: 6.5%; z-index: 2;
        }
        #cs-couple { width: 100%; height: auto; display: block; }

        #cs-foreground-reveal {
          position: absolute; inset: 0; z-index: 5; pointer-events: none;
          display: flex; align-items: center; justify-content: center;
          transform-origin: center 40%;
        }
        @keyframes cs-sway-1 {
          0%, 100% { transform: rotate(-1deg) scale(1.02); }
          50% { transform: rotate(1.5deg) scale(1.02); }
        }
        #cs-foreground-reveal img.cs-hanging {
          position: absolute; top: 0; width: 100%; height: auto;
          animation: cs-sway-1 7s ease-in-out infinite;
          transform-origin: top right;
        }
        #cs-right-tree {
          position: absolute; right: 0; bottom: 0;
          width: 40%; height: auto; object-fit: contain; object-position: right bottom;
        }

        #cs-dog-wrap { position: absolute; bottom: -5vh; left: 50%; transform: translateX(-50%); z-index: 10; pointer-events: none; }
        #cs-dog { width: clamp(150px, 40vw, 350px); height: auto; display: block; }

        #cs-haze { position: absolute; inset: 0; z-index: 15; pointer-events: none; background: linear-gradient(to top, rgba(160,200,160,0.1), transparent 50%); mix-blend-mode: screen; }
        #cs-vignette { position: absolute; inset: 0; z-index: 16; pointer-events: none; background: radial-gradient(ellipse 95% 90% at 50% 50%, transparent 35%, rgba(10,16,6,0.85) 100%); }
        #cs-petals { position: absolute; inset: 0; z-index: 17; pointer-events: none; overflow: hidden; }
        .cs-petal {
          position: absolute; top: -20px; border-radius: 60% 0 60% 0;
          background: radial-gradient(ellipse, #f7ccd4 40%, #e8a5b5 100%);
          animation: cs-petal-fall linear infinite;
        }
        @keyframes cs-petal-fall {
          0% { transform: translateY(-5vh) rotate(0deg) translateX(0px); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(540deg) translateX(50px); opacity: 0; }
        }

        #cs-bg-dimmer { position: absolute; inset: 0; background: rgba(10, 16, 6, 0.45); z-index: 18; opacity: 0; pointer-events: none; }

        #cs-story-layer { position: absolute; inset: 0; z-index: 20; pointer-events: none; }
        .cs-checkpoint { position: absolute; top: 50%; transform: translateY(-50%); width: clamp(280px, 35vw, 450px); padding: 2.5rem; z-index: 20; opacity: 0; }
        .cs-cp-left { left: 8vw; text-align: left; }
        .cs-cp-right { right: 8vw; text-align: right; }
        .cs-border-top { position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: #c9a96e; transform-origin: left; opacity: 0.7; }
        .cs-border-right { position: absolute; top: 0; right: 0; width: 1px; height: 100%; background: #c9a96e; transform-origin: top; opacity: 0.7; }
        .cs-border-bottom { position: absolute; bottom: 0; right: 0; width: 100%; height: 1px; background: #c9a96e; transform-origin: right; opacity: 0.7; }
        .cs-border-left { position: absolute; bottom: 0; left: 0; width: 1px; height: 100%; background: #c9a96e; transform-origin: bottom; opacity: 0.7; }
        .cs-cp-year { font-family: "DM Sans", sans-serif; font-size: clamp(10px, 1.2vw, 13px); letter-spacing: 0.4em; text-transform: uppercase; color: #c9a96e; margin-bottom: 12px; }
        .cs-cp-title { font-family: "Cormorant Garamond", serif; font-size: clamp(32px, 4.5vw, 60px); line-height: 1; color: #fef6e8; margin: 0 0 16px; letter-spacing: -0.02em; text-shadow: 0 4px 24px rgba(0,0,0,0.8); }
        .cs-cp-title em { font-style: italic; color: #f9d5dc; }
        .cs-cp-body { font-family: "Cormorant Garamond", serif; font-size: clamp(16px, 1.8vw, 22px); font-style: italic; color: rgba(254,246,232,0.9); line-height: 1.5; text-shadow: 0 2px 14px rgba(0,0,0,0.7); }

        #cs-proposal-glow { position: absolute; inset: 0; z-index: 22; pointer-events: none; opacity: 0; background: radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,225,160,0.25) 0%, rgba(212,133,154,0.1) 50%, transparent 80%); }
        #cs-proposal-text { position: absolute; top: 50%; left: 50%; translate: -50% -50%; z-index: 25; opacity: 0; width: min(560px, 90vw); text-align: center; pointer-events: none; }
        #cs-ring { margin-bottom: 24px; }
        .cs-ring-icon { font-size: clamp(40px, 6vw, 80px); line-height: 1; animation: cs-ring-pulse 2s ease-in-out infinite; }
        @keyframes cs-ring-pulse {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(212,175,55,0.8)) drop-shadow(0 0 40px rgba(212,175,55,0.4)); }
          50% { filter: drop-shadow(0 0 35px rgba(212,175,55,1)) drop-shadow(0 0 80px rgba(212,175,55,0.7)); }
        }
        .cs-pt-eyebrow { font-family: "DM Sans", sans-serif; font-size: clamp(10px,1.2vw,13px); letter-spacing: 0.4em; text-transform: uppercase; color: #c9a96e; margin-bottom: 16px; }
        .cs-pt-headline { font-family: "Cormorant Garamond", serif; font-size: clamp(42px, 7vw, 90px); line-height: 0.86; color: #fef6e8; letter-spacing: -0.03em; margin: 0 0 20px; text-shadow: 0 4px 35px rgba(0,0,0,0.7); }
        .cs-pt-headline em { font-style: italic; color: #f9d5dc; }
        .cs-pt-body { font-family: "Cormorant Garamond", serif; font-size: clamp(16px, 2vw, 24px); font-style: italic; color: rgba(254,246,232,0.8); line-height: 1.55; text-shadow: 0 2px 16px rgba(0,0,0,0.6); }

        #cs-forever {
          position: absolute; inset: 0; z-index: 30; opacity: 0; pointer-events: none;
          display: flex; align-items: center; justify-content: center;
          background-color: #ebd8b2; /* Custom rich cream background */
        }
        .cs-f-floral-top { position: absolute; top: 0; left: 0; width: 100%; height: auto; object-fit: contain; object-position: top center; opacity: 1; pointer-events: none; z-index: 1; }
        .cs-f-floral-left { position: absolute; bottom: 0; left: 0; width: clamp(200px, 35vw, 600px); height: auto; object-fit: contain; object-position: bottom left; opacity: 1; pointer-events: none; z-index: 1; }
        .cs-f-floral-right { position: absolute; bottom: 0; right: 0; height: 100vh; width: auto; opacity: 1; pointer-events: none; z-index: 1; }

        .cs-f-card {
          position: relative;
          width: min(600px, 90vw);
          padding: 4rem 2rem;
          text-align: center;
          border: 2px solid #000000; /* Thicker black border */
          background: transparent;
          z-index: 2;
        }
        .cs-f-corner { position: absolute; width: 45px; height: 45px; }
        .cs-f-corner.top-left { top: -2px; left: -2px; border-top: 4px solid #000000; border-left: 4px solid #000000; }
        .cs-f-corner.bottom-right { bottom: -2px; right: -2px; border-bottom: 4px solid #000000; border-right: 4px solid #000000; }

        .cs-f-stars { color: #000000; font-size: 16px; letter-spacing: 12px; margin-bottom: 30px; }
        .cs-f-eyebrow { font-family: "DM Sans", sans-serif; font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #000000; margin-bottom: 30px; }
        .cs-f-names-wrapper { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 30px; }
        .cs-f-name { font-family: "Italianno", cursive; font-size: clamp(60px, 12vw, 100px); color: #000000; line-height: 0.8; margin: 0; font-weight: 400; }
        .cs-f-amp { font-family: "Italianno", cursive; font-size: clamp(30px, 6vw, 50px); color: #000000; line-height: 1; font-weight: 400; }
        .cs-f-divider { width: 6px; height: 6px; border-radius: 50%; background: #000000; margin: 0 auto 30px; }
        .cs-f-body { font-family: "Cormorant Garamond", serif; font-size: clamp(16px, 2vw, 20px); font-style: italic; color: #000000; line-height: 1.6; margin-bottom: 40px; max-width: 450px; margin-left: auto; margin-right: auto; }
        .cs-f-date { font-family: "Cormorant Garamond", serif; font-size: clamp(20px, 3vw, 28px); color: #000000; letter-spacing: 0.05em; margin-top: 15px; text-transform: uppercase; font-weight: 600; }

        #cs-veil { position: absolute; inset: 0; z-index: 28; background: #ebd8b2; opacity: 0; pointer-events: none; }
        #cs-scroll-hint {
          position: absolute; bottom: 5vh; left: 50%; translate: -50% 0; z-index: 30;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          color: rgba(254,246,232,0.5); font-family: "DM Sans", sans-serif; font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
        }
        #cs-scroll-hint-line { width: 1px; height: 40px; background: linear-gradient(to bottom, rgba(245,236,216,0.5), transparent); animation: cs-hint-pulse 2s ease-in-out infinite; }
        @keyframes cs-hint-pulse { 0%,100% { transform: scaleY(1); opacity: 0.5; } 50% { transform: scaleY(1.3); opacity: 1; } }

        @media (max-width: 900px) {
          #cs-dog { width: clamp(120px, 30vw, 260px); }
          .cs-cp-body { display: none; }
          .cs-f-floral-left, .cs-f-floral-right { width: 35vw; opacity: 0.4; } /* Dim and shrink slightly on tablet */
        }
        @media (max-width: 600px) {
          .cs-cp-left, .cs-cp-right { left: 5vw; text-align: left; }
          .cs-cp-right { right: auto; }
          #cs-dog-wrap { bottom: -1vh; }
          #cs-dog { width: clamp(100px, 35vw, 200px); }
          .cs-f-floral-left, .cs-f-floral-right { display: none; } /* Hide completely on small phones */
          .cs-f-floral-top { height: 15vh; }
          .cs-f-card { border: none; background: transparent; padding: 2rem 1rem; }
        }
      `}</style>

      <div id="cs-stage">
        
        <div id="cs-world-wrap">
          <div id="cs-world">
            <img id="cs-mainbg" src="/illustrated_wedding_assets/mainbg2.png" alt="Wedding Garden" aria-hidden="true" loading="eager" />
            <div id="cs-couple-wrap">
              <img id="cs-couple" src="/illustrated_wedding_assets/couple_main_illustration.webp" alt="The couple" loading="eager" />
            </div>
          </div>
        </div>

        <div id="cs-foreground-reveal">
          <img className="cs-hanging" src="/illustrated_wedding_assets/hangingimages.png" alt="" aria-hidden="true" loading="eager" />
          <img id="cs-right-tree" src="/illustrated_wedding_assets/righttree.png" alt="" aria-hidden="true" loading="eager" />
        </div>

        <div id="cs-dog-wrap">
          <img id="cs-dog" src="/illustrated_wedding_assets/doghead1.png" alt="Dog head" loading="eager" />
        </div>

        <div id="cs-haze" aria-hidden="true" />
        <div id="cs-vignette" aria-hidden="true" />
        <div id="cs-petals" aria-hidden="true" />
        <div id="cs-bg-dimmer" aria-hidden="true" />

        <div id="cs-story-layer" aria-live="polite">
          <div id="cs-cp1" className="cs-checkpoint cs-cp-left">
            <div className="cs-border-top" />
            <div className="cs-border-right" />
            <div className="cs-border-bottom" />
            <div className="cs-border-left" />
            <div className="cs-cp-year">Every story begins somewhere</div>
            <h2 className="cs-cp-title">A Garden<br /><em>Full of Promises</em></h2>
            <p className="cs-cp-body">A long path, a beautiful day, and a little companion carrying something very precious.</p>
          </div>
          <div id="cs-cp2" className="cs-checkpoint cs-cp-right">
            <div className="cs-border-top" />
            <div className="cs-border-right" />
            <div className="cs-border-bottom" />
            <div className="cs-border-left" />
            <div className="cs-cp-year">2019 — The First Hello</div>
            <h2 className="cs-cp-title"><em>It all began</em><br />with a moment</h2>
            <p className="cs-cp-body">A simple, unexpected moment that neither of us saw coming.</p>
          </div>
          <div id="cs-cp3" className="cs-checkpoint cs-cp-left">
            <div className="cs-border-top" />
            <div className="cs-border-right" />
            <div className="cs-border-bottom" />
            <div className="cs-border-left" />
            <div className="cs-cp-year">2021 — Growing Together</div>
            <h2 className="cs-cp-title">Moments became<br /><em>Memories</em></h2>
            <p className="cs-cp-body">Coffee dates, late nights, laughter — and a love quietly taking root.</p>
          </div>
          <div id="cs-cp4" className="cs-checkpoint cs-cp-right">
            <div className="cs-border-top" />
            <div className="cs-border-right" />
            <div className="cs-border-bottom" />
            <div className="cs-border-left" />
            <div className="cs-cp-year">2024 — Four Beautiful Years</div>
            <h2 className="cs-cp-title">One<br /><em>Beautiful</em><br />Journey</h2>
            <p className="cs-cp-body">Four years. Countless memories. One home. Each other.</p>
          </div>
        </div>

        <div id="cs-proposal-glow" aria-hidden="true" />
        <div id="cs-proposal-text">
          <div id="cs-ring" aria-hidden="true"><div className="cs-ring-icon">&#128141;</div></div>
          <p className="cs-pt-eyebrow">The Proposal</p>
          <h2 className="cs-pt-headline">Will you<br /><em>marry me?</em></h2>
          <p className="cs-pt-body">In the garden where our story found its roots,<br />a question that would change everything, forever.</p>
        </div>

        <div id="cs-forever">
          {/* Floral Overlays requested by user */}
          <img className="cs-f-floral-top" src="/illustrated_wedding_assets/wallhaningflowers.png" alt="" aria-hidden="true" />
          <img className="cs-f-floral-left" src="/illustrated_wedding_assets/leftdownbush.png" alt="" aria-hidden="true" />
          <img className="cs-f-floral-right" src="/illustrated_wedding_assets/righttree.png" alt="" aria-hidden="true" />

          <div className="cs-f-card">
            <div className="cs-f-corner top-left" />
            <div className="cs-f-corner bottom-right" />
            
            <div className="cs-f-stars">&#10022; &#10022; &#10022;</div>
            <p className="cs-f-eyebrow">Together with their families</p>
            
            <div className="cs-f-names-wrapper">
              <h1 className="cs-f-name">Emma</h1>
              <span className="cs-f-amp">&amp;</span>
              <h1 className="cs-f-name">James</h1>
            </div>

            <div className="cs-f-divider"></div>

            <p className="cs-f-body">
              Joyfully invite you to celebrate the beginning of their forever.<br/>
              A day of love, laughter, and a promise to cherish always.
            </p>

            <p className="cs-f-eyebrow" style={{ marginBottom: "15px" }}>The Celebration of Marriage</p>
            <p className="cs-f-date">20 March 2026</p>
          </div>
        </div>

        <div id="cs-veil" aria-hidden="true" />

        <div id="cs-scroll-hint" aria-hidden="true">
          <span>Scroll down</span>
          <div id="cs-scroll-hint-line" />
        </div>
      </div>
    </section>
  );
}
