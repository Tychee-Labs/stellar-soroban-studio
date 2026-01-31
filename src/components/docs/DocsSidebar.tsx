import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, Book, Code, Shield, Rocket, FileText, Layers, CreditCard, Key, Lock, AlertTriangle, Puzzle, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
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
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quickstart", href: "/docs/quickstart" },
    ],
  },
  {
    title: "Core Concepts",
    icon: Layers,
    items: [
      { title: "Token Vault", href: "/docs/token-vault", icon: Lock },
      { title: "Card Lifecycle", href: "/docs/card-lifecycle", icon: CreditCard },
      { title: "Account Abstraction", href: "/docs/account-abstraction", icon: Key },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { title: "Encryption Model", href: "/docs/encryption-model" },
      { title: "Key Derivation", href: "/docs/key-derivation" },
      { title: "Threat Model", href: "/docs/threat-model", icon: AlertTriangle },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { title: "TycheeSDK", href: "/docs/api/tychee-sdk" },
      { title: "storeCard", href: "/docs/api/store-card" },
      { title: "retrieveCard", href: "/docs/api/retrieve-card" },
      { title: "revokeCard", href: "/docs/api/revoke-card" },
    ],
  },
  {
    title: "Guides",
    icon: Book,
    items: [
      { title: "Next.js Integration", href: "/docs/guides/nextjs", icon: Puzzle },
      { title: "Testnet to Mainnet Checklist", href: "/docs/guides/testnet-mainnet", icon: CheckSquare },
    ],
  },
];

interface CollapsibleGroupProps {
  group: NavGroup;
  activeItem: string;
  onItemClick: (href: string) => void;
  defaultOpen?: boolean;
}

const CollapsibleGroup = ({ group, activeItem, onItemClick, defaultOpen = true }: CollapsibleGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = group.icon;
  const hasActiveItem = group.items.some(item => item.href === activeItem);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
          hasActiveItem 
            ? "text-foreground bg-secondary/30" 
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
        )}
      >
        <span className="flex items-center gap-2.5">
          <Icon className={cn(
            "w-4 h-4 transition-colors",
            hasActiveItem ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )} />
          {group.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-1 space-y-0.5 border-l border-border/50 pl-3">
              {group.items.map((item) => {
                const isActive = activeItem === item.href;
                const ItemIcon = item.icon;
                
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => onItemClick(item.href)}
                      className={cn(
                        "relative flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavItem"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavItem"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    {/* Active glow */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none"
                        style={{
                          boxShadow: "inset 0 0 20px rgba(242, 87, 43, 0.1)",
                        }}
                      />
                    )}
                    
                      {ItemIcon && (
                        <ItemIcon className={cn(
                          "w-3.5 h-3.5 shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )} />
                      )}
                      <span className="relative">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
          </motion.div>
        )}
      </AnimatePresence>
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

  // Filter navigation based on search
  const filteredNavigation = searchQuery
    ? navigation.map(group => ({
        ...group,
        items: group.items.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(group => group.items.length > 0)
    : navigation;

  return (
    <aside className={cn("flex flex-col h-full", className)}>
      {/* Search */}
      <div className="p-4 border-b border-border/50">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/20 border-border/50 focus:border-primary/50 focus:bg-secondary/30 placeholder:text-muted-foreground transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {filteredNavigation.map((group, index) => (
          <CollapsibleGroup
            key={group.title}
            group={group}
            activeItem={activeItem}
            onItemClick={onItemClick}
            defaultOpen={index < 2} // First two groups open by default
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <a
          href="https://www.npmjs.com/package/@tychee/sdk"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>npm package</span>
        </a>
      </div>
    </aside>
  );
};
