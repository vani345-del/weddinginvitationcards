"use client";

import React, { useState } from 'react';

export default function SoulmatePromptBlock() {
  const [copied, setCopied] = useState(false);
  const promptText = `Act as an expert numerologist specializing in Pythagorean, Chaldean & Vedic numerology.

Based on my full name and date of birth, calculate my Life Path, Destiny/Expression, Soul Urge, Personality, Birthday and Maturity numbers.

Then analyze my relationship and marriage vibrations and predict:

1. Possible first letter(s) of my future partner’s name.
2. 5–10 possible partner names.
3. Their personality traits and likely career.
4. Our relationship dynamic and possible challenges.
5. Whether the connection may feel like a soulmate relationship.
6. The numerological reasoning behind your predictions.

My Name: [YOUR NAME]
DOB: [DD/MM/YYYY]

Keep it fun and detailed, but clearly state that this is a numerology-based interpretation, not a guaranteed prediction.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] border border-[#E8DDD0] rounded-xl p-6 md:p-10 text-left relative shadow-sm overflow-hidden">
      <button 
        onClick={handleCopy}
        className="absolute top-4 right-4 px-4 py-2 bg-[#8B6B3D] text-[#FAF8F5] text-[10px] tracking-[0.15em] uppercase font-bold font-sans rounded-lg hover:bg-[#5A4A3A] transition-all shadow-sm flex items-center gap-2"
        aria-label="Copy prompt to clipboard"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Prompt
          </>
        )}
      </button>
      <pre className="font-sans text-xs md:text-sm text-[#4A4A4A] whitespace-pre-wrap leading-relaxed mt-10 md:mt-0 md:pt-2">
        {promptText}
      </pre>
    </div>
  );
}
