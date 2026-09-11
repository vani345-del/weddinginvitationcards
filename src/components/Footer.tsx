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

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-4 h-4 inline-block"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.14 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#1c1a18] text-ivory pt-20 pb-8 px-6 md:px-12 border-t border-luxury-gray">
      <div className="max-w-7xl mx-auto">
        {/* Footer Top / Brand */}
        <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">
            THE WEDDING CARDS
          </h2>
          <p className="text-champagne/80 max-w-md text-sm leading-relaxed">
            Beautiful wedding invitations and stationery, crafted to make your celebration unforgettable.
          </p>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1 */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-xs tracking-widest uppercase text-gold font-medium mb-2">Explore</h3>
            <Link href="/" className="text-champagne/70 hover:text-gold transition-colors text-sm">Home</Link>
            <Link href="/invitations" className="text-champagne/70 hover:text-gold transition-colors text-sm">Our Invitations</Link>
            <Link href="/wedding-cards" className="text-champagne/70 hover:text-gold transition-colors text-sm">Wedding Cards</Link>
            <Link href="/collections" className="text-champagne/70 hover:text-gold transition-colors text-sm">Collections</Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-xs tracking-widest uppercase text-gold font-medium mb-2">Information</h3>
            <Link href="/about" className="text-champagne/70 hover:text-gold transition-colors text-sm">About Us</Link>
            <Link href="/delivery" className="text-champagne/70 hover:text-gold transition-colors text-sm">Delivery</Link>
            <Link href="/faqs" className="text-champagne/70 hover:text-gold transition-colors text-sm">FAQs</Link>
            <Link href="/contact" className="text-champagne/70 hover:text-gold transition-colors text-sm">Contact</Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-xs tracking-widest uppercase text-gold font-medium mb-2">Services</h3>
            <Link href="/services/wedding-invitations" className="text-champagne/70 hover:text-gold transition-colors text-sm">Wedding Invitations</Link>
            <Link href="/services/wedding-stationery" className="text-champagne/70 hover:text-gold transition-colors text-sm">Wedding Stationery</Link>
            <Link href="/services/custom-designs" className="text-champagne/70 hover:text-gold transition-colors text-sm">Custom Designs</Link>
            <Link href="/services/printing" className="text-champagne/70 hover:text-gold transition-colors text-sm">Printing Services</Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col space-y-6 text-center md:text-left">
            <div className="flex flex-col space-y-4">
              <h3 className="text-xs tracking-widest uppercase text-gold font-medium mb-2">Connect</h3>
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="#" className="text-champagne/70 hover:text-gold transition-colors" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="text-champagne/70 hover:text-gold transition-colors" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              </div>
            </div>

            {/* Google Reviews Trust Element */}
            <div className="pt-2">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-ivory mb-2">
                <GoogleIcon />
                <span className="font-medium tracking-wide">Google Reviews</span>
              </div>
              <div className="text-gold tracking-widest text-lg mb-2 flex justify-center md:justify-start">
                ★★★★★
              </div>
              <a 
                href="https://google.com" 
                target="_blank"
                rel="noreferrer"
                className="text-[10px] tracking-widest uppercase text-champagne/70 hover:text-gold transition-colors inline-block mt-1"
              >
                READ OUR REVIEWS →
              </a>
            </div>
          </div>
        </div>

        {/* Contact Area */}
        <div className="flex justify-center md:justify-start mb-16 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0 text-sm text-champagne/60">
            <div>
              <span className="block text-gold text-xs tracking-widest uppercase mb-1">Phone</span>
              <a href="#" className="hover:text-champagne transition-colors">+44 (0) 1234 567890</a>
            </div>
            <div className="hidden sm:block text-champagne/20">|</div>
            <div>
              <span className="block text-gold text-xs tracking-widest uppercase mb-1">Email</span>
              <a href="mailto:hello@theweddingcards.co.uk" className="hover:text-champagne transition-colors">hello@theweddingcards.co.uk</a>
            </div>
            <div className="hidden sm:block text-champagne/20">|</div>
            <div>
              <span className="block text-gold text-xs tracking-widest uppercase mb-1">Location</span>
              <span>United Kingdom</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-champagne/10 mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs text-champagne/50">
          <p>© 2026 The Wedding Cards. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
