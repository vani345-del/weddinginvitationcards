"use client";

import { useState } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import IntroOverlay from "./components/IntroOverlay";
import HeroSection from "./components/HeroSection";
import CountdownTimer from "./components/CountdownTimer";
import StorySection from "./components/StorySection";
import GallerySection from "./components/GallerySection";
import DetailsSection from "./components/DetailsSection";
import VenueSection from "./components/VenueSection";
import RSVPSection from "./components/RSVPSection";
import GardenFooter from "./components/GardenFooter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export default function GardenFloralDemo() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div
      className={`${cormorant.variable} ${inter.variable}`}
      style={{ backgroundColor: "#FAF7F2", overflowX: "hidden" }}
    >
      {/* Cinematic intro — covers page until complete */}
      {!introComplete && (
        <IntroOverlay onComplete={() => setIntroComplete(true)} />
      )}

      {/* All page sections */}
      <HeroSection visible={introComplete} />
      <CountdownTimer />
      <StorySection />
      <GallerySection />
      <DetailsSection />
      <VenueSection />
      <RSVPSection />
      <GardenFooter />
    </div>
  );
}
