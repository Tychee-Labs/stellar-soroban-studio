import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";
import { DocsTableOfContents } from "@/components/docs/DocsTableOfContents";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Auto-generated TOC from content headings
const tocHeadings = [
  { id: "introduction", text: "Introduction", level: 2 },
  { id: "installation", text: "Installation", level: 2 },
  { id: "quick-start", text: "Quick Start", level: 2 },
  { id: "configuration", text: "Configuration", level: 2 },
  { id: "wallet-connection", text: "Wallet Connection", level: 2 },
  { id: "account-abstraction", text: "Account Abstraction", level: 2 },
  { id: "gas-sponsorship", text: "Gas Sponsorship", level: 2 },
  { id: "session-keys", text: "Session Keys", level: 2 },
  { id: "tychee-provider", text: "TycheeProvider", level: 2 },
  { id: "use-wallet", text: "useWallet Hook", level: 2 },
];

const Docs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("#introduction");
  const isMobile = useIsMobile();

  // Close mobile menu on navigation
  const handleItemClick = (href: string) => {
    setActiveItem(href);
    setMobileMenuOpen(false);
    
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  // Track scroll position to update active item
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocHeadings.map(h => h.id);
      const scrollPosition = window.scrollY + 150;

      for (const id of headings) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveItem(`#${id}`);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Global grain overlay */}
      <div className="global-grain" aria-hidden="true" />
      
      <GradientBlob />
      <DocsHeader 
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
        mobileMenuOpen={mobileMenuOpen}
      />
      
      {/* Mobile Sidebar Drawer */}
      <Sheet open={mobileMenuOpen && isMobile} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0 bg-background border-border">
          <VisuallyHidden>
            <SheetTitle>Documentation Navigation</SheetTitle>
          </VisuallyHidden>
          <DocsSidebar 
            activeItem={activeItem} 
            onItemClick={handleItemClick}
          />
        </SheetContent>
      </Sheet>

      {/* Main Layout */}
      <div className="pt-20 flex">
        {/* Desktop Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden lg:block w-72 shrink-0 border-r border-border h-[calc(100vh-5rem)] sticky top-20 overflow-hidden"
        >
          <DocsSidebar 
            activeItem={activeItem} 
            onItemClick={handleItemClick}
          />
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-12"
          >
            <DocsContent />
          </motion.div>
        </main>

        {/* Table of Contents - Desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden xl:block w-56 shrink-0 pr-6"
        >
          <DocsTableOfContents 
            headings={tocHeadings}
            className="pt-12"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Docs;
