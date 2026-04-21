import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is raw card data stored?",
    answer:
      "No. Tychee never stores raw card data. Card information is encrypted client-side using the user's own keys before it ever leaves their device. Only encrypted payloads are stored on Soroban—meaning even we cannot access the original card details.",
  },
  {
    question: 'What does "tokenization" mean here?',
    answer:
      "Tokenization replaces sensitive card data with a non-sensitive token that can be used for transactions. In Tychee's model, this token is stored on Stellar's Soroban blockchain, providing an immutable, auditable record while the actual card data remains encrypted and user-controlled.",
  },
  {
    question: "Can merchants decrypt card data?",
    answer:
      "No. Merchants receive only the token reference, not the encryption keys. Decryption requires the user's private key, which never leaves their device. This architecture ensures merchants can process payments without ever handling raw card data, simplifying PCI compliance.",
  },
  {
    question: "Does this replace network tokenization?",
    answer:
      "Tychee complements, rather than replaces, network tokenization (like Visa Token Service). Our SDK handles the secure storage and user-ownership layer, while network tokens can still be used for the actual payment rails. Many customers use both together.",
  },
  {
    question: "How does revocation work?",
    answer:
      "Users can revoke a token at any time through the SDK. Revocation is recorded on-chain and takes effect immediately. Once revoked, the token cannot be used for any future transactions, and the associated encrypted payload becomes inaccessible. This gives users full control over their card data lifecycle.",
  },
  {
    question: "Do you support mainnet?",
    answer:
      "Yes! Tychee supports both Stellar testnet and mainnet. We recommend starting on testnet during development (included free in all plans), then switching to mainnet for production. Pro and Enterprise plans include mainnet access with production-grade SLAs.",
  },
];

const FAQItem = ({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen
          ? "border-primary/30 bg-card shadow-lg shadow-primary/5"
          : "border-border bg-card/50 hover:border-border hover:bg-card"
          }`}
      >
        {/* Question button */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-6 text-left"
        >
          <span
            className={`text-base sm:text-lg font-medium transition-colors ${isOpen ? "text-foreground" : "text-foreground/90"
              }`}
          >
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-primary/10" : "bg-secondary"
              }`}
          >
            <ChevronDown
              size={18}
              className={`transition-colors ${isOpen ? "text-primary" : "text-muted-foreground"
                }`}
            />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="pt-2 border-t border-border/50">
                  <p className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6">
            <HelpCircle size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Common Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about Tychee's card tokenization SDK.
          </p>
        </AnimatedSection>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="mailto:ops@tychee.store"
              className="text-primary hover:underline font-medium link-underline"
            >
              Contact our team
            </a>{" "}
            or{" "}
            <a
              href="https://discord.gg/A4vBgXda93"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium link-underline"
            >
              join our Discord
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
