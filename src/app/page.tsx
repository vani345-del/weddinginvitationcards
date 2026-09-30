import HeroSection from "@/components/HeroSection";
import StatsBanner from "@/components/StatsBanner";
import InvitationShowcase from "@/components/InvitationShowcase";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";
import PricingSection from "@/components/PricingSection";
import DigitalVsVideoSection from "@/components/DigitalVsVideoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";

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

      {/* Luxury Invitation Showcase / Experiences */}
      <InvitationShowcase />

      {/* How It Works Journey */}
      <HowItWorksSection />

      {/* Digital vs Video Comparison */}
      <DigitalVsVideoSection />

      {/* Craftsmanship & Details Section */}
      <CraftsmanshipSection />

      {/* Customer Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <FinalCTASection />
    </main>
  );
}
