import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search, Book, Code, Zap, Shield, Settings, Puzzle, Rocket, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

interface NavGroup {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Installation", href: "#installation" },
      { title: "Quick Start", href: "#quick-start" },
      { title: "Configuration", href: "#configuration" },
    ],
  },
  {
    title: "Core Concepts",
    icon: Book,
    items: [
      { title: "Wallet Connection", href: "#wallet-connection" },
      { title: "Account Abstraction", href: "#account-abstraction" },
      { title: "Gas Sponsorship", href: "#gas-sponsorship" },
      { title: "Session Keys", href: "#session-keys" },
    ],
  },
  {
    title: "SDK Reference",
    icon: Code,
    items: [
      { title: "TycheeProvider", href: "#tychee-provider" },
      { title: "useWallet Hook", href: "#use-wallet" },
      { title: "useTransaction Hook", href: "#use-transaction" },
      { title: "useSponsor Hook", href: "#use-sponsor" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { title: "Best Practices", href: "#best-practices" },
      { title: "Key Management", href: "#key-management" },
      { title: "Audit Reports", href: "#audit-reports" },
    ],
  },
  {
    title: "Integrations",
    icon: Puzzle,
    items: [
      { title: "React", href: "#react" },
      { title: "Next.js", href: "#nextjs" },
      { title: "Vite", href: "#vite" },
      { title: "Wagmi", href: "#wagmi" },
    ],
  },
  {
    title: "Advanced",
    icon: Settings,
    items: [
      { title: "Custom Paymasters", href: "#custom-paymasters" },
      { title: "Bundler Configuration", href: "#bundler-configuration" },
      { title: "Multi-chain Support", href: "#multi-chain" },
    ],
  },
];

interface CollapsibleGroupProps {
  group: NavGroup;
  activeItem: string;
  onItemClick: (href: string) => void;
}

const CollapsibleGroup = ({ group, activeItem, onItemClick }: CollapsibleGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const Icon = group.icon;

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 rounded-lg transition-colors group"
      >
        <span className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          {group.title}
        </span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
          {group.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onItemClick(item.href);
              }}
              className={cn(
                "block px-3 py-1.5 text-sm rounded-md transition-all duration-200",
                activeItem === item.href
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              )}
            >
              {item.title}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

interface DocsSidebarProps {
  activeItem: string;
  onItemClick: (href: string) => void;
  className?: string;
}

export const DocsSidebar = ({ activeItem, onItemClick, className }: DocsSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <aside className={cn("flex flex-col h-full", className)}>
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/30 border-border focus:border-primary/50 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((group) => (
          <CollapsibleGroup
            key={group.title}
            group={group}
            activeItem={activeItem}
            onItemClick={onItemClick}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <a
          href="https://www.npmjs.com/package/@tychee/sdk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>npm package</span>
        </a>
      </div>
    </aside>
  );
};
