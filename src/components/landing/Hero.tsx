import { motion, useMotionValue, useSpring } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Play, Shield, Zap, Lock } from "lucide-react";
import { HeroVisual } from "./HeroVisual";
import { useEffect, useRef } from "react";

const trustPills = [
  { icon: Lock, label: "AES-256-GCM" },
  { icon: Zap, label: "Soroban Ready" },
  { icon: Shield, label: "Account Abstraction Optional" },
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 200);
      mouseY.set(e.clientY - rect.top - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Noise texture */}
        <div className="absolute inset-0 noise-texture" />
        
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-primary/[0.03] blur-[150px]" />
      </div>

      {/* Cursor-follow accent glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none"
        style={{ x: glowX, y: glowY }}
      />

      {/* 3D Visual */}
      <div className="absolute inset-0 lg:left-1/2 opacity-60 lg:opacity-100">
        <HeroVisual />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Web3 Card Tokenization SDK
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
            >
              <span className="text-foreground">Tokenize cards on Stellar.</span>
              <br />
              <span className="text-gradient">Securely. Client-side.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              Tychee SDK encrypts card data locally and stores only encrypted payloads
              on Soroban — built for fast integration and user-owned security.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <MagneticButton variant="primary" href="#">
                Install SDK
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton variant="secondary" href="#">
                <Play size={16} />
                Live Demo
              </MagneticButton>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline ml-2"
              >
                Read Security Model
              </a>
            </motion.div>

            {/* Trust Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              {trustPills.map((pill, index) => (
                <motion.div
                  key={pill.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm"
                >
                  <pill.icon size={12} className="text-primary" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {pill.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side spacer for 3D visual */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
