"use client";

import React from "react";
import Link from "next/link";

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-white pt-20 pb-8 px-6 md:px-12 border-t border-[#3A3A3A]">
      <div className="max-w-7xl mx-auto">
        {/* Footer Top / Brand */}
        <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4 text-[#F8F5EF]">
            THE WEDDING EXPERIENCE
          </h2>
          <p className="text-[#A0A0A0] max-w-md text-sm leading-relaxed font-sans font-light">
            Beautiful, interactive digital wedding invitations crafted to share your love story and make your celebration unforgettable.
          </p>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1 */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#8B6B3D] font-semibold mb-2">Explore</h3>
            <Link href="/" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">Home</Link>
            <Link href="/experiences" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">Our Experiences</Link>
            <Link href="/how-it-works" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">How It Works</Link>
            <Link href="/pricing" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">Pricing</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#8B6B3D] font-semibold mb-2">Information</h3>
            <Link href="/about" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">Our Story</Link>
            <Link href="/faqs" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">FAQs</Link>
            <Link href="/custom-quotes" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">Custom Quotes</Link>
            <Link href="https://www.instagram.com/digitalweddingwebpage/" target="_blank" rel="noopener noreferrer" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors text-sm font-light">Contact Us</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#8B6B3D] font-semibold mb-2">Features</h3>
            <span className="text-[#A0A0A0] text-sm font-light">Personalized Designs</span>
            <span className="text-[#A0A0A0] text-sm font-light">Digital RSVP Tracking</span>
            <span className="text-[#A0A0A0] text-sm font-light">Interactive Maps</span>
            <span className="text-[#A0A0A0] text-sm font-light">Custom Animations</span>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col space-y-6 text-center md:text-left">
            <div className="flex flex-col space-y-4">
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#8B6B3D] font-semibold mb-2">Connect</h3>
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="#" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="text-[#A0A0A0] hover:text-[#C5A97B] transition-colors" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Area */}
        <div className="flex justify-center md:justify-start mb-16 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0 text-[13px] text-[#A0A0A0] font-light">
            <div>
              <span className="block text-[#8B6B3D] text-[10px] tracking-[0.2em] font-semibold uppercase mb-1">Email</span>
              <a href="https://www.instagram.com/digitalweddingwebpage/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A97B] transition-colors">@digitalweddingwebpage</a>
            </div>
            <div className="hidden sm:block text-[#3A3A3A]">|</div>
            <div>
              <span className="block text-[#8B6B3D] text-[10px] tracking-[0.2em] font-semibold uppercase mb-1">Location</span>
              <span>Global / Remote</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#3A3A3A] mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs text-[#8A8A8A] font-light">
          <p>Â© 2026 The Wedding Experience. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-[#C5A97B] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C5A97B] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
