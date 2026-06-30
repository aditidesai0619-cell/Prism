import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import SampleEvaluation from "@/components/landing/SampleEvaluation";
import LandingCTA from "@/components/landing/LandingCTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div style={{ background: "#0a0a0a" }}>
      <HeroSection />
      <HowItWorks />
      <Features />
      <SampleEvaluation />
      <LandingCTA />
      <Footer />
    </div>
  );
}
