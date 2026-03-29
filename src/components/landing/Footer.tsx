import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, MessageCircle } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Security", href: "#security" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "SDK Downloads", href: "#" },
    { label: "Examples", href: "#" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
    { label: "Compliance", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/Tychee-Labs", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/TycheeSDK", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/tychee-labs", label: "LinkedIn" },
  // { icon: MessageCircle, href: "#", label: "Discord" },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/30">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Tychee"
                  className="h-8 w-auto relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <span className="text-xl font-bold text-foreground">Tychee</span>
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              The most powerful SDK for tokenizing payment cards on Stellar
              Soroban. Secure, compliant, developer-first.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors relative inline-block group"
                    >
                      {link.label}
                      {/* Hover underline */}
                      <span className="absolute bottom-0 left-0 w-full h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tychee Labs Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#"
              className="hover:text-foreground transition-colors relative group"
            >
              Privacy
              <span className="absolute bottom-0 left-0 w-full h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
            <a
              href="#"
              className="hover:text-foreground transition-colors relative group"
            >
              Terms
              <span className="absolute bottom-0 left-0 w-full h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
            <a
              href="#"
              className="hover:text-foreground transition-colors relative group"
            >
              Cookies
              <span className="absolute bottom-0 left-0 w-full h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground/60 text-center max-w-3xl mx-auto leading-relaxed">
            Tychee SDK provides card tokenization infrastructure for Stellar
            Soroban. This service is not a payment processor and does not
            directly handle payment transactions. Users are responsible for
            ensuring compliance with applicable regulations in their
            jurisdictions. Stellar, Soroban, and related marks are trademarks of
            the Stellar Development Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
};
