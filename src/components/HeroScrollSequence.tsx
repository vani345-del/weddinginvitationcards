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

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    
    // Load frame 1 immediately for initial render
    const firstImg = new Image();
    firstImg.src = `/wedding_website_frames_24fps_best_quality/frame_00001.png`;
    firstImg.onload = () => {
      loadedImages[0] = firstImg;
      setImagesLoaded(1);
    };
    setImages(loadedImages);

    // Defer loading the remaining 239 frames to prioritize initial page load
    const timeoutId = setTimeout(() => {
      let loadedCount = 1;
      for (let i = 2; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const indexStr = i.toString().padStart(5, "0");
        img.src = `/wedding_website_frames_24fps_best_quality/frame_${indexStr}.png`;
        img.onload = () => {
          loadedImages[i - 1] = img;
          loadedCount++;
          if (loadedCount % 10 === 0 || loadedCount === FRAME_COUNT) {
            setImagesLoaded(loadedCount);
          }
        };
      }
    }, 1500); // 1.5 second delay to let fonts, main images, and JS parse completely

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

  const isLoading = imagesLoaded < FRAME_COUNT;

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
            The Wedding Cards UK
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gold/30" />
            <div className="text-luxury-gray/70 font-sans tracking-widest text-xs uppercase">
              Preparing your experience... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
        </div>
      )}
    </div>
  );
}
