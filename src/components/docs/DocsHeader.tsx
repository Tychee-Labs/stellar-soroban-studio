import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface DocsHeaderProps {
  onMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export const DocsHeader = ({ onMenuToggle, mobileMenuOpen }: DocsHeaderProps) => {
  const { scrollY } = useScroll();
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(23, 23, 23, 0)", "rgba(23, 23, 23, 0.85)"]
  );
  
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(77, 77, 77, 0)", "rgba(77, 77, 77, 0.3)"]
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ 
        backgroundColor: headerBg,
        borderColor: headerBorder,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with back to home */}
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Back</span>
            </Link>
            
            <div className="h-6 w-px bg-border" />
            
            <Link to="/docs" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Tychee"
                  className="h-7 w-auto relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <span className="text-lg font-semibold text-foreground tracking-tight">
                Tychee <span className="text-muted-foreground font-normal">Docs</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a href="#getting-started" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Getting Started
            </a>
            <a href="#api-reference" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              API Reference
            </a>
            <a href="#examples" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <MagneticButton variant="ghost" href="https://github.com/tychee-io/sdk">
              GitHub
            </MagneticButton>
            <MagneticButton variant="primary" href="https://www.npmjs.com/package/@tychee/sdk">
              Get Started
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
};
