import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Zap, Fuel, Check, X, Sparkles, ArrowRight } from "lucide-react";

const aaStates = {
  off: {
    headline: "Traditional gas fees apply",
    description:
      "Users pay network fees in XLM for every transaction. Standard Stellar experience.",
    gasLabel: "Gas Fee",
    gasValue: "0.00001 XLM",
    gasStatus: "User pays",
    statusColor: "text-yellow-500",
    totalLabel: "Total Cost",
  },
  on: {
    headline: "Gasless transactions enabled",
    description:
      "Sponsor fees for your users. Zero friction, instant confirmations, better conversion.",
    gasLabel: "Gas Fee",
    gasValue: "Sponsored",
    gasStatus: "You pay",
    statusColor: "text-green-500",
    totalLabel: "User Pays",
  },
};

export const AccountAbstractionSection = () => {
  const [aaEnabled, setAaEnabled] = useState(true);
  const state = aaEnabled ? aaStates.on : aaStates.off;

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs text-primary font-medium">
                Optional Feature
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              <span className="text-foreground">Account Abstraction</span>
              <br />
              <span className="text-gradient">for Gasless UX</span>
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={aaEnabled ? "on" : "off"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-muted-foreground mb-8 max-w-lg"
              >
                {state.description}
              </motion.p>
            </AnimatePresence>

            {/* Toggle */}
            <div className="flex items-center gap-4 mb-10">
              <span
                className={`text-sm font-medium transition-colors ${
                  !aaEnabled ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                AA Off
              </span>

              <button
                onClick={() => setAaEnabled(!aaEnabled)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  aaEnabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
                  animate={{ left: aaEnabled ? "calc(100% - 28px)" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {aaEnabled ? (
                    <Zap size={12} className="text-primary" />
                  ) : (
                    <Fuel size={12} className="text-muted-foreground" />
                  )}
                </motion.div>
              </button>

              <span
                className={`text-sm font-medium transition-colors ${
                  aaEnabled ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                AA On
              </span>
            </div>

            <MagneticButton variant="primary" href="#">
              Enable AA in SDK
              <ArrowRight size={16} />
            </MagneticButton>
          </AnimatedSection>

          {/* Right - Floating Transaction Card */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Glow behind card */}
              <motion.div
                className="absolute -inset-8 rounded-3xl blur-3xl"
                animate={{
                  background: aaEnabled
                    ? "radial-gradient(circle, rgba(242,87,43,0.15) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(77,77,77,0.15) 0%, transparent 70%)",
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Floating card */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateX: [0, 2, 0],
                  rotateY: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="relative"
              >
                <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          Card Tokenization
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Soroban Transaction
                        </div>
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={aaEnabled ? "sponsored" : "standard"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          aaEnabled
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {aaEnabled ? "Sponsored" : "Standard"}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Transaction details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-muted-foreground">
                          Operation
                        </span>
                        <span className="text-sm text-foreground font-mono">
                          storeCard()
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">
                          Token ID
                        </span>
                        <span className="text-sm text-foreground font-mono">
                          tok_7x...f3k
                        </span>
                      </div>

                      {/* Gas row with animation */}
                      <motion.div
                        className="flex items-center justify-between py-2 border-t border-border/50"
                        animate={{
                          backgroundColor: aaEnabled
                            ? "rgba(34, 197, 94, 0.05)"
                            : "transparent",
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ margin: "0 -1.5rem", padding: "0.5rem 1.5rem" }}
                      >
                        <span className="text-sm text-muted-foreground">
                          {state.gasLabel}
                        </span>
                        <div className="flex items-center gap-2">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={aaEnabled ? "sponsored" : "fee"}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className={`text-sm font-medium ${
                                aaEnabled ? "text-green-500" : "text-foreground"
                              }`}
                            >
                              {state.gasValue}
                            </motion.span>
                          </AnimatePresence>
                          {aaEnabled && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center"
                            >
                              <Check size={10} className="text-green-500" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Total */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {state.totalLabel}
                      </span>
                      <div className="text-right">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={aaEnabled ? "zero" : "fee"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {aaEnabled ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-green-500">
                                  $0.00
                                </span>
                                <span className="text-xs text-green-500/70 line-through">
                                  $0.001
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-foreground">
                                ~$0.001
                              </span>
                            )}
                          </motion.div>
                        </AnimatePresence>
                        <span className={`text-xs ${state.statusColor}`}>
                          {state.gasStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 border-t border-border bg-secondary/20">
                    <motion.button
                      className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
                        aaEnabled
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {aaEnabled ? "Confirm (No fees for user)" : "Confirm & Pay Gas"}
                    </motion.button>
                  </div>

                  {/* Shimmer effect */}
                  {aaEnabled && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(242,87,43,0.03), transparent)",
                        }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{
                  y: [0, -5, 0],
                  opacity: aaEnabled ? 1 : 0.3,
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles size={14} className="text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                animate={{
                  y: [0, 5, 0],
                  opacity: aaEnabled ? 1 : 0,
                  scale: aaEnabled ? 1 : 0.5,
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Check size={12} className="text-green-500" />
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
