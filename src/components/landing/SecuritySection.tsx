import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TiltCard } from "@/components/ui/TiltCard";
import { KeyRound, ShieldOff, Lock, UserCheck, Ban } from "lucide-react";

const flowSteps = [
  { label: "User Secret Key", icon: KeyRound },
  { label: "Key Derivation", icon: Lock },
  { label: "Client-side Encryption", icon: ShieldOff },
  { label: "Encrypted Payload", icon: Lock },
  { label: "Soroban Storage", icon: Lock },
];

const securityCards = [
  {
    icon: ShieldOff,
    title: "No master keys",
    description:
      "There is no central key that can decrypt user data. Only the user holds the keys to their encrypted card information.",
  },
  {
    icon: UserCheck,
    title: "Self-custody decryption",
    description:
      "Decryption happens entirely on the user's device using their private key. Your servers never see plaintext card data.",
  },
  {
    icon: Ban,
    title: "Revocation + access control",
    description:
      "Users can revoke tokens at any time. Fine-grained access control ensures only authorized operations succeed.",
  },
];

const FlowDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Flow container */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0 relative">
        {flowSteps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              className="relative group"
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-3 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                transition={{
                  delay: index * 0.15 + 0.5,
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Node circle */}
              <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-border bg-card flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                {/* Inner glow */}
                <div className="absolute inset-2 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                <step.icon className="w-6 h-6 lg:w-7 lg:h-7 text-primary relative z-10" />

                {/* Active pulse for first node */}
                {index === 0 && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/40"
                    animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span className="text-xs text-muted-foreground font-medium">
                  {step.label}
                </span>
              </motion.div>
            </motion.div>

            {/* Connector line */}
            {index < flowSteps.length - 1 && (
              <div className="hidden lg:block relative w-16 xl:w-24 h-px mx-2">
                {/* Base line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                  className="absolute inset-0 bg-border origin-left"
                />

                {/* Animated data particle */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(242,87,43,0.6)]"
                  initial={{ left: "-8px", opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          left: ["0%", "100%"],
                          opacity: [0, 1, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    delay: index * 0.5 + 1,
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: flowSteps.length * 0.5,
                    ease: "easeInOut",
                  }}
                />

                {/* Arrow head */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.3 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-muted border-y-[4px] border-y-transparent"
                />
              </div>
            )}

            {/* Mobile connector (vertical) */}
            {index < flowSteps.length - 1 && (
              <div className="lg:hidden relative h-8 w-px my-2">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                  className="absolute inset-0 bg-border origin-top"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-primary/[0.03] blur-[80px] pointer-events-none" />
    </div>
  );
};

export const SecuritySection = () => {
  return (
    <section id="security" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Security Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            User-Owned{" "}
            <span className="text-gradient">Security Model</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your users control their encryption keys. We never see plaintext
            card data—ever. Here's how the flow works.
          </p>
        </AnimatedSection>

        {/* Flow Diagram */}
        <AnimatedSection delay={0.2} className="mb-20">
          <div className="max-w-5xl mx-auto">
            <FlowDiagram />
          </div>
        </AnimatedSection>

        {/* Security Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {securityCards.map((card, index) => (
            <AnimatedSection key={card.title} delay={0.3 + index * 0.1}>
              <TiltCard className="h-full group">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 overflow-hidden">
                    <card.icon className="w-7 h-7 text-primary relative z-10" />
                    {/* Hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-auto pt-6">
                    <motion.div
                      className="h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
