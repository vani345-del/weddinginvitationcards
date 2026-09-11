"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-ivory/95 backdrop-blur-md shadow-sm py-4 border-b border-champagne/50"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <Link 
          href="/" 
          className={cn(
            "font-serif tracking-widest text-xl transition-colors duration-300",
            isScrolled ? "text-luxury-gray" : "text-luxury-gray"
          )}
        >
          THE WEDDING CARDS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/" className="text-sm font-medium tracking-wider uppercase text-luxury-gray/70 hover:text-gold transition-colors">
            Home
          </Link>
          <Link href="/collection" className="text-sm font-medium tracking-wider uppercase text-luxury-gray/70 hover:text-gold transition-colors">
            Collection
          </Link>
          <Link href="/services" className="text-sm font-medium tracking-wider uppercase text-luxury-gray/70 hover:text-gold transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-sm font-medium tracking-wider uppercase text-luxury-gray/70 hover:text-gold transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-6 py-2.5 border border-gold text-gold text-xs font-medium tracking-widest uppercase hover:bg-gold hover:text-ivory transition-colors duration-300"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-luxury-gray p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-ivory border-b border-champagne shadow-lg overflow-hidden transition-all duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-8 flex flex-col space-y-6 text-center">
          <Link href="/" className="text-sm font-medium tracking-wider uppercase text-luxury-gray hover:text-gold transition-colors">
            Home
          </Link>
          <Link href="/collection" className="text-sm font-medium tracking-wider uppercase text-luxury-gray hover:text-gold transition-colors">
            Collection
          </Link>
          <Link href="/services" className="text-sm font-medium tracking-wider uppercase text-luxury-gray hover:text-gold transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-sm font-medium tracking-wider uppercase text-luxury-gray hover:text-gold transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="inline-block mt-4 mx-auto px-8 py-3 bg-gold text-ivory text-xs font-medium tracking-widest uppercase transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </header>
  );
}
