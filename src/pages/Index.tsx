import { GradientBlob } from "@/components/ui/GradientBlob";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { CredibilityStrip } from "@/components/landing/CredibilityStrip";
import { Features } from "@/components/landing/Features";
import { DeveloperSection } from "@/components/landing/DeveloperSection";
import { Integration } from "@/components/landing/Integration";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GradientBlob />
      <Header />
      <main>
        <Hero />
        <CredibilityStrip />
        <Features />
        <DeveloperSection />
        <Integration />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
