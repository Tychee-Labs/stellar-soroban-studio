import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const useCases = [
  {
    title: "Web3 fintech wallets",
    example: "Link cards to self-custodial wallets for seamless on/off ramp.",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
  },
  {
    title: "Rewards & loyalty rails",
    example: "Issue tokenized reward points backed by real card balances.",
    gradient: "from-blue-500/20 via-purple-500/10 to-transparent",
  },
  {
    title: "Merchant checkout vaulting",
    example: "Let users store cards once, pay everywhere with one token.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    title: "Token-gated vouchers",
    example: "Gate discounts or benefits to NFT or token holders.",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
];

// Abstract animated illustrations for each use case
const WalletIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Wallet shape */}
    <motion.div
      className="absolute w-16 h-12 rounded-lg border border-primary/40 bg-primary/5"
      animate={{ rotateY: [0, 10, 0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Cards inside */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-10 h-6 rounded border border-primary/30 bg-card"
        style={{ top: `${30 + i * 8}%`, left: `${35 + i * 5}%` }}
        animate={{
          y: [0, -3, 0],
          rotate: [-2 + i * 2, 2 + i, -2 + i * 2],
        }}
        transition={{
          duration: 3,
          delay: i * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
    {/* Connection dots */}
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-primary right-4 top-1/2"
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

const RewardsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Central star */}
    <motion.div
      className="absolute w-8 h-8"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-4 bg-primary/60 rounded-full left-1/2 top-0 origin-bottom"
          style={{ transform: `translateX(-50%) rotate(${i * 60}deg)` }}
        />
      ))}
    </motion.div>
    {/* Orbiting points */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full border border-primary/50 bg-primary/10"
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [20, 0, -20, 0, 20],
        }}
        transition={{
          duration: 4,
          delay: i * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const VaultIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Vault door */}
    <motion.div className="absolute w-14 h-14 rounded-lg border-2 border-primary/40 bg-card flex items-center justify-center">
      {/* Lock circle */}
      <motion.div
        className="w-6 h-6 rounded-full border-2 border-primary/60"
        animate={{ rotate: [0, 90, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-1/2 left-1/2 w-3 h-px bg-primary/60 origin-left" />
      </motion.div>
    </motion.div>
    {/* Lock bars */}
    {[0, 1].map((i) => (
      <motion.div
        key={i}
        className="absolute h-1 bg-primary/30 rounded-full"
        style={{
          width: "4px",
          right: i === 0 ? "-8px" : undefined,
          left: i === 1 ? "-8px" : undefined,
          top: "50%",
        }}
        animate={{ scaleX: [1, 2, 1] }}
        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
      />
    ))}
    {/* Shield glow */}
    <motion.div
      className="absolute w-20 h-20 rounded-full bg-primary/5"
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </div>
);

const VoucherIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Token/NFT */}
    <motion.div
      className="absolute w-10 h-10 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center"
      animate={{ rotateY: [0, 180, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-4 h-4 rounded bg-primary/30" />
    </motion.div>
    {/* Gate bars */}
    <div className="absolute flex gap-1 -left-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1 h-8 bg-muted/40 rounded-full"
          animate={{ height: ["32px", "24px", "32px"] }}
          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
    {/* Unlock arrow */}
    <motion.div
      className="absolute right-0 w-6 h-px bg-primary/50"
      animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="absolute right-0 top-1/2 w-0 h-0 border-l-[4px] border-l-primary/50 border-y-[3px] border-y-transparent -translate-y-1/2" />
    </motion.div>
  </div>
);

const illustrations = [
  WalletIllustration,
  RewardsIllustration,
  VaultIllustration,
  VoucherIllustration,
];

const UseCaseCard = ({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Illustration = illustrations[index];

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card */}
      <div className="relative h-full min-h-[280px] bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/30 flex flex-col">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={false}
          animate={isHovered ? { x: ["0%", "200%"] } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
            width: "50%",
          }}
        />

        <div className="relative p-6 lg:p-8 flex flex-col flex-1">
          {/* Illustration */}
          <div className="relative h-24 mb-6">
            <Illustration />
          </div>

          {/* Title */}
          <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {useCase.title}
          </h3>

          {/* Example - expands on hover */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isHovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-2">
              {useCase.example}
            </p>
          </motion.div>

          {/* Hover indicator - pushed to bottom */}
          <div className="flex items-center gap-2 mt-auto pt-4">
            <motion.div
              className="h-px bg-primary/50 origin-left"
              initial={{ width: 0 }}
              animate={isHovered ? { width: 24 } : { width: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="text-xs text-primary font-medium"
              initial={{ opacity: 0, x: -10 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              Learn more
            </motion.span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <motion.div
            className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

export const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Use Cases
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Built for{" "}
            <span className="text-gradient">real-world</span> products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From wallets to loyalty programs—Tychee powers secure card
            tokenization across the Stellar ecosystem.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <AnimatedSection key={useCase.title} delay={index * 0.1} className="h-full">
              <UseCaseCard useCase={useCase} index={index} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
