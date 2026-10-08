import React from 'react';
import Navbar from '@/components/Navbar';
import InvitationShowcase from '@/components/InvitationShowcase';
import Footer from '@/components/Footer';
import SoulmatePromptBlock from '@/components/SoulmatePromptBlock';

export const metadata = {
  title: 'Digital Wedding Invitations | Welcome',
  description: 'Create your perfect digital wedding invitation with our breathtaking, cinematic templates.',
};

export default function InstagramLandingPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col overflow-x-hidden pt-12 md:pt-20">
      <Navbar />

      {/* â”€â”€ Instagram Lead Hero Section â”€â”€ */}
      <section className="relative w-full pt-16 pb-16 md:pt-28 md:pb-24 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E8DDD0]/30 blur-[100px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <a href="#soulmate-prompt" className="mb-8 md:mb-12 animate-bounce flex flex-col items-center opacity-90 cursor-pointer hover:opacity-100 transition-opacity bg-white/60 backdrop-blur-sm px-6 py-2 md:px-8 md:py-3 rounded-full border border-[#8B6B3D]/30 shadow-sm">
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-[#8B6B3D]">
              ↓ Scroll for Soulmate Prompt ↓
            </span>
          </a>

          <span className="text-[10px] md:text-[11px] tracking-[0.35em] font-semibold text-[#8B6B3D] uppercase font-sans mb-6 block">
            Welcome to Our Studio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] font-light leading-[1.08] tracking-tight mb-8">
            Want to create a <br className="hidden md:block" />
            <em className="italic text-[#5A4A3A]">digital wedding invitation?</em>
          </h1>
          <p className="font-sans text-base md:text-lg lg:text-xl text-[#5A5A5A] max-w-xl font-light leading-relaxed mb-10">
            You're in the right place. We craft breathtaking, cinematic experiences to tell your unique love story. Explore our templates below to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="#templates-section"
              className="px-10 py-4 bg-[#8B6B3D] text-[#FAF8F5] text-[11px] tracking-[0.25em] uppercase font-bold font-sans rounded-full hover:bg-[#5A4A3A] transition-all shadow-[0_0_20px_rgba(139,107,61,0.2)]"
            >
              See Templates
            </a>
            <a 
              href="/"
              className="px-10 py-4 border border-[#8B6B3D] text-[#8B6B3D] text-[11px] tracking-[0.25em] uppercase font-bold font-sans rounded-full hover:bg-[#8B6B3D] hover:text-[#FAF8F5] transition-all"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€ Templates Section â”€â”€ */}
      <div id="templates-section">
        <InvitationShowcase />
      </div>

      {/* â”€â”€ Soulmate Prompt Section â”€â”€ */}
      <section id="soulmate-prompt" className="relative w-full py-16 md:py-24 bg-white flex flex-col items-center px-6 border-t border-[#E8DDD0]">
        <div className="max-w-3xl w-full flex flex-col items-center text-center">
          <span className="text-[10px] md:text-[11px] tracking-[0.35em] font-semibold text-[#8B6B3D] uppercase font-sans mb-4 block">
            A Fun Bonus For You
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] font-light tracking-tight mb-8">
            Here is the prompt to find your <em className="italic text-[#C9A96E]">soulmate</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-[#5A5A5A] mb-10 font-light leading-relaxed max-w-2xl">
            Copy the text below and paste it into ChatGPT (or any AI) to get a fun, detailed numerology reading about your future partner! Just remember to fill in your name and birth date.
          </p>
          
          <SoulmatePromptBlock />
        </div>
      </section>
      
      {/* â”€â”€ Call to Action / How to Order â”€â”€ */}
      <section className="relative w-full py-20 md:py-32 bg-[#0a0b08] text-center px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#FAF7F2] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Ready to <em className="italic text-[#C9A96E]">begin?</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-white/60 mb-10 font-light leading-relaxed">
            Message us back on Instagram with your favorite template to start personalizing your unforgettable digital invitation.
          </p>
          <a 
            href="https://www.instagram.com/digitalweddingwebpage/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-10 py-5 border border-[#C9A96E] rounded-full text-[11px] tracking-[0.2em] uppercase text-[#1A1614] bg-[#C9A96E] font-bold shadow-[0_0_40px_rgba(201,169,110,0.4)] hover:scale-105 hover:bg-[#DBC396] transition-all text-center font-sans mb-8"
          >
            DM Us to Order
          </a>
          <a 
            href="/" 
            className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
          >
            Return to Main Website
          </a>
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€ */}
      <Footer />
    </main>
  );
}
