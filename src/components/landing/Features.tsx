import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Shield,
  Zap,
  Code,
  Lock,
  Globe,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "PCI DSS Compliant",
    description:
      "Built-in compliance with industry security standards. Your sensitive data is always protected.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Sub-second tokenization with Stellar's high-throughput blockchain. No delays, no friction.",
  },
  {
    icon: Code,
    title: "Developer First",
    description:
      "Clean APIs, comprehensive SDKs, and detailed documentation. Ship faster, build better.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Military-grade encryption from card capture to token storage. Zero exposure risk.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Support for cards from 180+ countries. One SDK for worldwide payment tokenization.",
  },
  {
    icon: Layers,
    title: "Soroban Native",
    description:
      "Built specifically for Stellar Soroban smart contracts. Seamless blockchain integration.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="text-gradient">tokenize cards</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit for secure card tokenization on the Stellar network.
            No compromises on security, performance, or developer experience.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.1}>
              <TiltCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
