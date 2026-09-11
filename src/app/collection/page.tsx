import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CollectionDemoPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 relative overflow-hidden pt-24 pb-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-champagne/40 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        <span className="text-gold tracking-[0.2em] text-xs uppercase font-medium mb-6 block">
          Client Demo Area
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-gray mb-8 leading-tight">
          Collection Showcase
        </h1>
        
        <div className="w-16 h-px bg-gold/50 mb-8" />
        
        <p className="text-lg md:text-xl text-luxury-gray/80 font-light leading-relaxed mb-12">
          This page will feature the full gallery where all of the client's designs and past work will be uploaded. <br className="hidden md:block" />
          <span className="italic">This is currently a placeholder for the client demo.</span>
        </p>

        <Link
          href="/"
          className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gold/40 text-luxury-gray uppercase tracking-widest text-xs font-medium hover:bg-gold/10 hover:border-gold/60 transition-all duration-300 rounded-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
