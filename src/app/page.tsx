import HeroSection from "@/components/HeroSection";
import StatsBanner from "@/components/StatsBanner";
import InvitationShowcase from "@/components/InvitationShowcase";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";

export default function Home() {
  return (
    <main className="relative w-full bg-ivory">
      {/* 
        The scroll-driven interactive hero section 
        encapsulates its own scroll targeting logic.
      */}
      <HeroSection />

      {/* 
        Metrics/Stats Banner 
      */}
      <StatsBanner />

      {/* Luxury Invitation Showcase */}
      <InvitationShowcase />

      {/* Craftsmanship & Details Section */}
      <CraftsmanshipSection />

      {/* Customer Testimonials Section */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <FinalCTASection />
    </main>
  );
}
