import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "lifecycle-overview", text: "Lifecycle Overview", level: 2 },
  { id: "store", text: "Store", level: 2 },
  { id: "retrieve", text: "Retrieve", level: 2 },
  { id: "revoke", text: "Revoke", level: 2 },
  { id: "lifecycle-events", text: "Lifecycle Events", level: 2 },
];

export const CardLifecycleContent = () => {
  const { previous, next } = getNavLinks("/docs/card-lifecycle");
  
  return (
    <DocsPageTemplate
      title="Card Lifecycle"
      description="Understand the complete lifecycle of a tokenized card: store, retrieve, and revoke operations."
      badge="Core Concepts"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="lifecycle-overview">Lifecycle Overview</DocsH2>
      <DocsP>
        Every card in Tychee follows a simple lifecycle with three primary operations:
      </DocsP>
      <DocsUl>
        <DocsLi><strong>Store</strong> — Encrypt and save card data to the vault</DocsLi>
        <DocsLi><strong>Retrieve</strong> — Decrypt and access card data for transactions</DocsLi>
        <DocsLi><strong>Revoke</strong> — Permanently delete card data from the vault</DocsLi>
      </DocsUl>

      <DocsH2 id="store">Store</DocsH2>
      <DocsP>
        The <DocsInlineCode>storeCard</DocsInlineCode> method encrypts card data and 
        stores it in the vault:
      </DocsP>
      <DocsCodeBlock
        filename="store.ts"
        language="typescript"
        code={`import { tychee } from '@/lib/tychee';

const token = await tychee.storeCard({
  number: '4242424242424242',
  expMonth: 12,
  expYear: 2025,
  cvc: '123',
  // Optional metadata
  billingAddress: {
    line1: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94102',
    country: 'US',
  },
});

console.log(token);
// {
//   id: 'tok_abc123...',
//   lastFour: '4242',
//   brand: 'visa',
//   fingerprint: 'fp_xyz789...',
//   createdAt: 1699900000000,
// }`}
      />

      <DocsCallout type="note">
        The CVC is encrypted but stored separately with a shorter TTL for security. 
        It's automatically cleared after 15 minutes.
      </DocsCallout>

      <DocsH2 id="retrieve">Retrieve</DocsH2>
      <DocsP>
        Use <DocsInlineCode>retrieveCard</DocsInlineCode> to decrypt and access the 
        stored card data:
      </DocsP>
      <DocsCodeBlock
        filename="retrieve.ts"
        language="typescript"
        code={`const card = await tychee.retrieveCard('tok_abc123...');

console.log(card);
// {
//   number: '4242424242424242',
//   expMonth: 12,
//   expYear: 2025,
//   cvc: '123', // Only if within CVC TTL
//   billingAddress: { ... },
// }

// Check if CVC is still available
if (card.cvc) {
  // Use for card-present transactions
} else {
  // Re-request CVC from user for card-not-present
}`}
      />

      <DocsCallout type="warning" title="Rate Limiting">
        Retrieve operations are rate-limited to prevent abuse. Default is 100 
        retrievals per token per day. Contact support for higher limits.
      </DocsCallout>

      <DocsH2 id="revoke">Revoke</DocsH2>
      <DocsP>
        Permanently delete a card from the vault with <DocsInlineCode>revokeCard</DocsInlineCode>:
      </DocsP>
      <DocsCodeBlock
        filename="revoke.ts"
        language="typescript"
        code={`// Revoke a single card
await tychee.revokeCard('tok_abc123...');

// Revoke all cards for a user
await tychee.revokeAllCards({
  owner: '0x123...', // Wallet address
});

// Revoke with reason (for compliance)
await tychee.revokeCard('tok_abc123...', {
  reason: 'user_requested',
  audit: true, // Log to audit trail
});`}
      />

      <DocsCallout type="tip" title="Compliance">
        Always provide a revocation reason when required by regulations (GDPR, PCI DSS). 
        The <DocsInlineCode>audit: true</DocsInlineCode> option creates an immutable log entry.
      </DocsCallout>

      <DocsH2 id="lifecycle-events">Lifecycle Events</DocsH2>
      <DocsP>
        Subscribe to lifecycle events for real-time notifications:
      </DocsP>
      <DocsCodeBlock
        filename="events.ts"
        language="typescript"
        code={`tychee.on('card:stored', (event) => {
  console.log('Card stored:', event.tokenId);
  analytics.track('card_added', { brand: event.brand });
});

tychee.on('card:retrieved', (event) => {
  console.log('Card accessed:', event.tokenId);
});

tychee.on('card:revoked', (event) => {
  console.log('Card deleted:', event.tokenId);
  // Clean up your database
  await removeTokenFromDB(event.tokenId);
});`}
      />
    </DocsPageTemplate>
  );
};
