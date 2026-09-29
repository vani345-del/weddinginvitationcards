import React from 'react';

// Set to true during development to visualize anchors, paths, and landing zones.
// MUST BE FALSE IN FINAL PRODUCTION.
const SHOW_SWING_DEBUG = false;

export type SceneCoordinate = {
  id: string;
  x: number; // 0-100 percentage of viewport width
  y: number; // 0-100 percentage of viewport height
};

// Logical web attachment points high in the city sky.
// The future couple will shoot webs toward these coordinates.
export const SWING_ANCHORS: SceneCoordinate[] = [
  { id: "anchor-left", x: 15, y: 15 },
  { id: "anchor-center-left", x: 35, y: 8 },
  { id: "anchor-center-right", x: 65, y: 8 },
  { id: "anchor-right", x: 88, y: 12 },
];

// Logical landing surfaces mapped perfectly to the Layer 3 building rooftops.
export const LANDING_POINTS: SceneCoordinate[] = [
  // Building 3 (Mid-Left, Flat roof with fire escape)
  // Building width centers around 36%, roof height is 42vh (y = 58% from top)
  { id: "landing-b3-midleft", x: 36, y: 58 },
  
  // Building 6 (Mid-Right, clear flat landing pad)
  // Building width centers around 72%, roof height is 38vh (y = 62% from top)
  { id: "landing-b6-midright", x: 72, y: 62 },
  
  // Building 7 (Right, detailed helipad)
  // Building width centers around 86%, roof height is 52vh. Helipad is elevated slightly.
  { id: "landing-b7-helipad", x: 86, y: 47 },
];

export default function SwingEnvironment() {
  // In production/final state, this layer provides no visible DOM elements.
  // It exists entirely to provide the infrastructure and coordinate context for future character mechanics.
  if (!SHOW_SWING_DEBUG) {
    return <div className="swing-layer-infrastructure" style={{ position: 'absolute', zIndex: 3, pointerEvents: 'none' }} />;
  }

  return (
    <div className="swing-layer-debug" style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Draw Path Lines between Anchors */}
        {SWING_ANCHORS.map((anchor, index) => {
          if (index === 0) return null;
          const prev = SWING_ANCHORS[index - 1];
          return (
            <line
              key={`path-${anchor.id}`}
              x1={`${prev.x}%`}
              y1={`${prev.y}%`}
              x2={`${anchor.x}%`}
              y2={`${anchor.y}%`}
              stroke="rgba(0, 255, 204, 0.4)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          );
        })}

        {/* Draw Swing Anchors */}
        {SWING_ANCHORS.map((anchor) => (
          <g key={anchor.id}>
            <circle cx={`${anchor.x}%`} cy={`${anchor.y}%`} r="6" fill="#00ffcc" />
            <circle cx={`${anchor.x}%`} cy={`${anchor.y}%`} r="12" fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0.6" />
            <text x={`${anchor.x}%`} y={`${anchor.y + 3}%`} fill="#00ffcc" fontSize="12" textAnchor="middle" fontWeight="bold">
              {anchor.id}
            </text>
          </g>
        ))}

        {/* Draw Landing Points */}
        {LANDING_POINTS.map((lp) => (
          <g key={lp.id}>
            {/* Landing pad representation */}
            <rect x={`${lp.x - 3}%`} y={`${lp.y}%`} width="6%" height="4px" fill="#ff00cc" />
            <circle cx={`${lp.x}%`} cy={`${lp.y}%`} r="4" fill="#ff00cc" />
            <text x={`${lp.x}%`} y={`${lp.y - 2}%`} fill="#ff00cc" fontSize="12" textAnchor="middle" fontWeight="bold">
              {lp.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
