import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const codeExample = `import { TycheeSDK } from '@tychee/sdk';

// Initialize the SDK
const tychee = new TycheeSDK({
  apiKey: process.env.TYCHEE_API_KEY,
  network: 'mainnet'
});

// Tokenize a card
const token = await tychee.tokenize({
  cardNumber: '4242424242424242',
  expiryMonth: '12',
  expiryYear: '2025',
  cvv: '123'
});

// Use the token in your Soroban contract
const tx = await contract.call('process_payment', {
  token: token.id,
  amount: 1000
});`;

export const CodeShowcase = () => {
  return (
    <section id="developers" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
              For Developers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">Simple APIs</span>
              <br />
              <span className="text-foreground">Powerful Results</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Integrate card tokenization in minutes, not months. Our SDK handles all
              the complexity—encryption, compliance, and blockchain interaction—so
              you can focus on building your product.
            </p>

            <ul className="space-y-4">
              {[
                "TypeScript & JavaScript support",
                "React hooks included",
                "Full Soroban integration",
                "Webhook notifications",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Code Block */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">
                    tokenize.ts
                  </span>
                </div>
                <pre className="p-6 overflow-x-auto text-sm">
                  <code className="font-mono">
                    {codeExample.split("\n").map((line, i) => (
                      <div key={i} className="leading-relaxed">
                        {line.includes("import") && (
                          <>
                            <span className="text-purple-400">import</span>{" "}
                            <span className="text-foreground">
                              {line.replace("import ", "").replace(" from '@tychee/sdk';", "")}
                            </span>{" "}
                            <span className="text-purple-400">from</span>{" "}
                            <span className="text-green-400">'@tychee/sdk'</span>;
                          </>
                        )}
                        {line.includes("//") && (
                          <span className="text-muted-foreground">{line}</span>
                        )}
                        {line.includes("const") && !line.includes("//") && (
                          <>
                            <span className="text-purple-400">const</span>{" "}
                            <span className="text-foreground">
                              {line.replace("const ", "")}
                            </span>
                          </>
                        )}
                        {!line.includes("import") &&
                          !line.includes("//") &&
                          !line.includes("const") && (
                            <span className="text-foreground">{line}</span>
                          )}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
