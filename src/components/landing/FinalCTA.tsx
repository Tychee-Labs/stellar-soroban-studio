import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Terminal, BookOpen, ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Primary glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(242,87,43,0.15) 0%, rgba(242,87,43,0.05) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-texture" />

        {/* Animated top border line */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
            style={{ width: "50%" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-primary font-medium">
                Ready to ship?
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">Ship secure card vaulting</span>
              <br />
              <span className="text-gradient">in days, not months.</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Join the developers building the future of payments on Stellar.
              Start with testnet free, scale to production when ready.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <MagneticButton variant="primary" href="https://www.npmjs.com/package/@tychee/sdk">
                <Terminal size={18} />
                Install Tychee SDK
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton variant="secondary" href="#">
                <BookOpen size={18} />
                Read Docs
              </MagneticButton>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Free to start
              </span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                No credit card required
              </span>
              <span className="w-px h-4 bg-border hidden sm:block" />
              <span className="hidden sm:flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Production-ready
              </span>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
