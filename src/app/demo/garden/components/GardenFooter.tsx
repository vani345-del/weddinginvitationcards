"use client";

export default function GardenFooter() {
  return (
    <footer
      className="w-full py-20 md:py-28 flex flex-col items-center text-center px-6"
      style={{ backgroundColor: "#1A1614" }}
    >
      {/* Ring icon */}
      <div className="mb-8">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke="#C9A96E" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="10" stroke="#C9A96E" strokeWidth="0.75" opacity="0.4" />
          <circle cx="24" cy="8" r="3" fill="#C9A96E" opacity="0.6" />
        </svg>
      </div>

      {/* Names */}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
          color: "#FAF7F2",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }}
      >
        Emma & James
      </h2>

      {/* Gold line */}
      <div style={{ width: "60px", height: "1px", backgroundColor: "#C9A96E", marginBottom: "1.5rem" }} />

      {/* Date & venue */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: "0.875rem",
          color: "#8A7F75",
          letterSpacing: "0.05em",
          marginBottom: "3rem",
        }}
      >
        June 14, 2026 · The Rosewood Estate · Napa Valley, CA
      </p>

      {/* Quote */}
      <blockquote
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "1.1rem",
          color: "#8A7F75",
          maxWidth: "480px",
          lineHeight: 1.8,
          marginBottom: "1rem",
        }}
      >
        "Whatever our souls are made of, his and mine are the same."
      </blockquote>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "#6A6059", marginBottom: "3rem" }}>
        — Emily Brontë
      </p>

      {/* Gold line */}
      <div style={{ width: "60px", height: "1px", backgroundColor: "#C9A96E", marginBottom: "1.5rem", opacity: 0.4 }} />

      {/* Powered by */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6A6059" }}>
        Made with love · Powered by LumeWed
      </p>
    </footer>
  );
}
