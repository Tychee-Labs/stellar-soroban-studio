// Navigation order for docs pages
export const navOrder = [
  { href: "/docs/introduction", title: "Introduction" },
  { href: "/docs/installation", title: "Installation" },
  { href: "/docs/quickstart", title: "Quickstart" },
  { href: "/docs/token-vault", title: "Token Vault" },
  { href: "/docs/card-lifecycle", title: "Card Lifecycle" },
  { href: "/docs/account-abstraction", title: "Account Abstraction" },
  { href: "/docs/encryption-model", title: "Encryption Model" },
  { href: "/docs/key-derivation", title: "Key Derivation" },
  { href: "/docs/threat-model", title: "Threat Model" },
  { href: "/docs/api/tychee-sdk", title: "TycheeSDK" },
  { href: "/docs/api/store-card", title: "storeCard" },
  { href: "/docs/api/retrieve-card", title: "retrieveCard" },
  { href: "/docs/api/revoke-card", title: "revokeCard" },
  { href: "/docs/guides/nextjs", title: "Next.js Integration" },
  { href: "/docs/guides/testnet-mainnet", title: "Testnet to Mainnet Checklist" },
];

export interface NavLink {
  href: string;
  title: string;
}

export const getNavLinks = (currentHref: string): { previous?: NavLink; next?: NavLink } => {
  const currentIndex = navOrder.findIndex(item => item.href === currentHref);
  return {
    previous: currentIndex > 0 ? navOrder[currentIndex - 1] : undefined,
    next: currentIndex < navOrder.length - 1 ? navOrder[currentIndex + 1] : undefined,
  };
};

// Slug to content mapping
export const slugToPath: Record<string, string> = {
  'introduction': '/docs/introduction',
  'installation': '/docs/installation',
  'quickstart': '/docs/quickstart',
  'token-vault': '/docs/token-vault',
  'card-lifecycle': '/docs/card-lifecycle',
  'account-abstraction': '/docs/account-abstraction',
  'encryption-model': '/docs/encryption-model',
  'key-derivation': '/docs/key-derivation',
  'threat-model': '/docs/threat-model',
  'api/tychee-sdk': '/docs/api/tychee-sdk',
  'api/store-card': '/docs/api/store-card',
  'api/retrieve-card': '/docs/api/retrieve-card',
  'api/revoke-card': '/docs/api/revoke-card',
  'guides/nextjs': '/docs/guides/nextjs',
  'guides/testnet-mainnet': '/docs/guides/testnet-mainnet',
};
