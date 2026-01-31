import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Check, Copy, Clock, FileCode, TestTube, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const codeExamples = {
  storeCard: `import { TycheeSDK } from '@tychee/sdk';

// Initialize SDK
const tychee = new TycheeSDK({
  apiKey: process.env.TYCHEE_API_KEY,
  network: 'testnet' // or 'mainnet'
});

// Store card securely (client-side encryption)
const result = await tychee.storeCard({
  cardNumber: '4242424242424242',
  expiryMonth: '12',
  expiryYear: '2026',
  cvv: '123',
  holderName: 'Alice Nakamoto'
});

console.log(result.tokenId); // 'tok_abc123...'
console.log(result.sorobanTxHash); // 'tx_...'`,

  retrieveCard: `import { TycheeSDK } from '@tychee/sdk';

const tychee = new TycheeSDK({
  apiKey: process.env.TYCHEE_API_KEY,
  network: 'testnet'
});

// Retrieve tokenized card metadata
const card = await tychee.retrieveCard({
  tokenId: 'tok_abc123...',
  // Only the user's private key can decrypt
  userPrivateKey: wallet.privateKey
});

console.log(card.last4);       // '4242'
console.log(card.brand);       // 'visa'
console.log(card.expiryMonth); // '12'
console.log(card.isActive);    // true`,

  revokeCard: `import { TycheeSDK } from '@tychee/sdk';

const tychee = new TycheeSDK({
  apiKey: process.env.TYCHEE_API_KEY,
  network: 'testnet'
});

// Permanently revoke a tokenized card
const revocation = await tychee.revokeCard({
  tokenId: 'tok_abc123...',
  reason: 'user_requested',
  // Signed by card owner
  signature: await wallet.signMessage('REVOKE:tok_abc123')
});

console.log(revocation.status);    // 'revoked'
console.log(revocation.revokedAt); // '2024-01-15T...'
console.log(revocation.txHash);    // 'tx_...'`,
};

const tabs = [
  { id: "storeCard", label: "storeCard()" },
  { id: "retrieveCard", label: "retrieveCard()" },
  { id: "revokeCard", label: "revokeCard()" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const highlights = [
  { icon: Clock, label: "3-minute integration" },
  { icon: FileCode, label: "Typed SDK" },
  { icon: TestTube, label: "Testnet-first" },
];

export const DeveloperSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>("storeCard");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet copied successfully.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              Developer Experience
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Built for{" "}
              <span className="text-gradient">developers</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Ship card tokenization in minutes, not months. Our SDK handles
              encryption, Soroban integration, and compliance—so you can focus
              on building your product.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/50"
                >
                  <item.icon size={16} className="text-primary" />
                  <span className="text-sm text-foreground font-medium">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <MagneticButton variant="primary" href="#">
              <BookOpen size={18} />
              Read SDK Docs
            </MagneticButton>
          </AnimatedSection>

          {/* Right Code Panel */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Glow behind panel */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl blur-2xl" />

              {/* Code window */}
              <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                {/* Window header with tabs */}
                <div className="flex items-center justify-between border-b border-border bg-secondary/30">
                  <div className="flex items-center">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-2 px-4 py-3 border-r border-border">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative px-4 py-3 text-xs font-mono transition-colors ${
                            activeTab === tab.id
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tab.label}
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="activeCodeTab"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 mr-2 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-500" />
                        <span className="text-green-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code content with shimmer */}
                <div className="relative">
                  {/* Shimmer line */}
                  <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                    <motion.div
                      className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                      animate={{ x: ["-100%", "400%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 2,
                      }}
                    />
                  </div>

                  {/* Code */}
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 overflow-x-auto text-sm max-h-[420px] overflow-y-auto"
                    >
                      <code className="font-mono text-[13px] leading-relaxed">
                        {codeExamples[activeTab].split("\n").map((line, i) => (
                          <div key={i} className="whitespace-pre">
                            {line.startsWith("//") ? (
                              <span className="text-muted-foreground">{line}</span>
                            ) : line.startsWith("import") ? (
                              <>
                                <span className="text-purple-400">import</span>
                                <span className="text-foreground">
                                  {line.slice(6).replace(" from ", "")}
                                </span>
                                {line.includes("from") && (
                                  <>
                                    <span className="text-purple-400"> from </span>
                                    <span className="text-green-400">
                                      '{line.split("'")[1]}'
                                    </span>
                                    ;
                                  </>
                                )}
                              </>
                            ) : line.includes("const ") ? (
                              <>
                                <span className="text-purple-400">const </span>
                                <span className="text-foreground">
                                  {line.replace("const ", "")}
                                </span>
                              </>
                            ) : line.includes("await ") ? (
                              <>
                                <span className="text-foreground">
                                  {line.split("await ")[0]}
                                </span>
                                <span className="text-purple-400">await </span>
                                <span className="text-foreground">
                                  {line.split("await ")[1]}
                                </span>
                              </>
                            ) : line.includes("console.log") ? (
                              <>
                                <span className="text-blue-400">console</span>
                                <span className="text-foreground">.log(</span>
                                <span className="text-foreground">
                                  {line.split("console.log(")[1]}
                                </span>
                              </>
                            ) : (
                              <span className="text-foreground">{line}</span>
                            )}
                          </div>
                        ))}
                      </code>
                    </motion.pre>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
