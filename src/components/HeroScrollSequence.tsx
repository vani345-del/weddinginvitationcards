"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroScrollSequenceProps {
  className?: string;
  children?: ReactNode;
  progress: MotionValue<number>;
}

const FRAME_COUNT = 240;
const FRAME_START = 1;

export default function HeroScrollSequence({ className, children, progress }: HeroScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Transform scroll progress to frame index
  const frameIndex = useTransform(
    progress,
    [0, 1],
    [FRAME_START, FRAME_COUNT]
  );

  // Preload images — smart batched loading
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    // Priority batch — load first 30 frames immediately
    // This covers the initial viewport — user can start scrolling right away
    const PRIORITY_FRAMES = 30;

    const loadFrame = (i: number) => {
      const img = new Image();
      const indexStr = i.toString().padStart(5, "0");
      img.src = `/wedding_website_frames_24fps_best_quality/frame_${indexStr}.png`;
      img.onload = () => {
        loadedImages[i - 1] = img;
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      return img;
    };

    // Load frames 1–30 immediately with high priority
    for (let i = 1; i <= PRIORITY_FRAMES; i++) {
      loadFrame(i);
    }

    // Load remaining frames 31–240 after a short delay
    // This lets the browser finish painting the initial view first
    const timeoutId = setTimeout(() => {
      for (let i = PRIORITY_FRAMES + 1; i <= FRAME_COUNT; i++) {
        loadFrame(i);
      }
    }, 800);

    setImages(loadedImages);
    return () => clearTimeout(timeoutId);
  }, []);

  const renderFrame = () => {
    if (!canvasRef.current || images.length === 0) return;
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    // Determine the current frame index
    const currentFrame = Math.floor(frameIndex.get());
    const currentIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, currentFrame - 1)
    );
    
    const img = images[currentIndex];
    
    // Only draw if image is loaded
    if (img && img.complete) {
      // Clear canvas
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const x = (canvasWidth / 2) - (imgWidth / 2) * scale;
      const y = (canvasHeight / 2) - (imgHeight / 2) * scale;

      context.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    }
  };

  // Draw frame on canvas when scroll progress changes
  useMotionValueEvent(frameIndex, "change", () => {
    renderFrame();
  });

  // Handle canvas resize and initial draw when loaded
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      // Make canvas high res
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      renderFrame();
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener("resize", handleResize);
  }, [images, imagesLoaded]); // Re-run when images finish loading so it draws the first frame

  // Show content after first 30 frames are ready — user sees page fast
  // Remaining frames continue loading silently in background while user scrolls
  const READY_THRESHOLD = 30;
  const isLoading = imagesLoaded < READY_THRESHOLD;

  return (
    <div className={cn("relative w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          boxShadow: "0 20px 50px -10px rgba(0,0,0,0.3)" // Realistic subtle shadow behind the whole scene if needed
        }}
      />
      
      {/* Content wrapper - completely hidden while loading to prevent text showing early */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        {children}
      </div>

      {/* Loading Overlay - perfectly opaque and on top of everything */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ivory z-50">
          <div className="text-luxury-gray font-serif text-3xl mb-4 animate-pulse">
            The Wedding Cards
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <div className="text-luxury-gray/70 font-sans tracking-widest text-xs uppercase">
              Preparing your experience... {Math.min(100, Math.round((imagesLoaded / READY_THRESHOLD) * 100))}%
            </div>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </div>
      )}
    </div>
  );
}
