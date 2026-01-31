import { GradientBlob } from "@/components/ui/GradientBlob";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { CodeShowcase } from "@/components/landing/CodeShowcase";
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
        <Features />
        <CodeShowcase />
        <Integration />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
