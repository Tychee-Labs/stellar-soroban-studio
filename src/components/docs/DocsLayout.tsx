import { useState } from "react";
import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useNavigate } from "react-router-dom";

interface DocsLayoutProps {
  children: React.ReactNode;
  activeSlug: string;
}

export const DocsLayout = ({ children, activeSlug }: DocsLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleItemClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            activeItem={activeSlug} 
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
          className="hidden lg:block w-72 shrink-0 border-r border-border/50 h-[calc(100vh-5rem)] sticky top-20 overflow-hidden"
        >
          <DocsSidebar 
            activeItem={activeSlug} 
            onItemClick={handleItemClick}
          />
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-6 lg:px-12 py-12"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
