import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { Key, Package, Rocket } from "lucide-react";

const steps = [
  {
    icon: Key,
    step: "01",
    title: "Get API Keys",
    description:
      "Sign up for a free account and generate your API keys in under a minute.",
  },
  {
    icon: Package,
    step: "02",
    title: "Install SDK",
    description:
      "Add Tychee to your project with npm, yarn, or pnpm. Zero configuration required.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Start Tokenizing",
    description:
      "Call the tokenize function and watch your cards become secure tokens.",
  },
];

export const Integration = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Quick Start
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Go live in <span className="text-gradient">three steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From zero to tokenization in minutes. Our streamlined onboarding
            gets you building immediately.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <AnimatedSection key={step.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                className="relative group"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-60px)] h-[2px] bg-gradient-to-r from-border via-primary/30 to-border" />
                )}

                <div className="relative bg-card border border-border rounded-xl p-8 text-center hover:border-primary/30 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
