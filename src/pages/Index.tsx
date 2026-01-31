import { GradientBlob } from "@/components/ui/GradientBlob";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { CredibilityStrip } from "@/components/landing/CredibilityStrip";
import { Features } from "@/components/landing/Features";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { DeveloperSection } from "@/components/landing/DeveloperSection";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { AccountAbstractionSection } from "@/components/landing/AccountAbstractionSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Integration } from "@/components/landing/Integration";
import { TeamSection } from "@/components/landing/TeamSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Global grain overlay - subtle texture across entire page */}
      <div className="global-grain" aria-hidden="true" />
      
      <GradientBlob />
      <Header />
      <main>
        <Hero />
        <CredibilityStrip />
        <Features />
        <SecuritySection />
        <DeveloperSection />
        <UseCasesSection />
        <AccountAbstractionSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <Integration />
        <TeamSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
