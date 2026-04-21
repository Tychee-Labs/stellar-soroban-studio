import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Developers", href: "#developers" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(23, 23, 23, 0)", "rgba(23, 23, 23, 0.85)"],
  );

  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(77, 77, 77, 0)", "rgba(77, 77, 77, 0.3)"],
  );

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Tychee"
                className="h-8 w-auto relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <motion.div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">
              Tychee{" "}
              <span className="text-muted-foreground font-normal">SDK</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="relative">
                    {link.label}
                    {/* Animated underline */}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <MagneticButton variant="ghost" href="/docs">
              View Docs
            </MagneticButton>
            <div className="relative inline-flex rounded-full">
              <MagneticButton
                variant="primary"
                href="#waitlist"
                disableInteractiveMotion
                className="relative z-10 rounded-full border-0 bg-primary px-7 py-3.5 text-primary-foreground"
              >
                Join Waitlist
              </MagneticButton>
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[2px] z-20 h-[calc(100%+4px)] w-[calc(100%+4px)] overflow-visible"
                viewBox="0 0 100 44"
                preserveAspectRatio="none"
              >
                <rect
                  x="1.1"
                  y="1.1"
                  width="97.8"
                  height="41.8"
                  rx="21"
                  fill="none"
                  stroke="rgba(242, 87, 43, 0.45)"
                  strokeWidth="1.6"
                />
                <motion.rect
                  x="1.1"
                  y="1.1"
                  width="97.8"
                  height="41.8"
                  rx="21"
                  fill="none"
                  stroke="url(#waitlistBorderDesktop)"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeDasharray="24 219"
                  animate={{ strokeDashoffset: [0, -243] }}
                  transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
                />
                <defs>
                  <linearGradient id="waitlistBorderDesktop" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#ffb37a" />
                    <stop offset="100%" stopColor="#f2572b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.nav
          initial={false}
          animate={
            mobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 border-t border-border mt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-3 text-sm rounded-lg transition-colors ${
                      isActive
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                    {link.label}
                  </a>
                );
              })}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
                <MagneticButton variant="ghost" href="/docs">
                  View Docs
                </MagneticButton>
                <div className="relative inline-flex w-fit self-start rounded-full">
                  <MagneticButton
                    variant="primary"
                    href="#waitlist"
                    disableInteractiveMotion
                    className="relative z-10 rounded-full border-0 bg-primary px-7 py-3.5 text-primary-foreground"
                  >
                    Join Waitlist
                  </MagneticButton>
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[2px] z-20 h-[calc(100%+4px)] w-[calc(100%+4px)] overflow-visible"
                viewBox="0 0 100 44"
                preserveAspectRatio="none"
              >
                    <rect
                      x="1.1"
                      y="1.1"
                      width="97.8"
                      height="41.8"
                      rx="21"
                      fill="none"
                      stroke="rgba(242, 87, 43, 0.45)"
                      strokeWidth="1.6"
                    />
                    <motion.rect
                      x="1.1"
                      y="1.1"
                      width="97.8"
                      height="41.8"
                      rx="21"
                      fill="none"
                      stroke="url(#waitlistBorderMobile)"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeDasharray="24 219"
                      animate={{ strokeDashoffset: [0, -243] }}
                      transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
                    />
                    <defs>
                      <linearGradient id="waitlistBorderMobile" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#ffb37a" />
                        <stop offset="100%" stopColor="#f2572b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};
