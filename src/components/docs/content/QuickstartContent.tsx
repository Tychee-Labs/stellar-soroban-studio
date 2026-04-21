import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "project-setup", text: "Project Setup", level: 2 },
  { id: "initialize-sdk", text: "Initialize the SDK", level: 2 },
  { id: "store-first-card", text: "Store Your First Card", level: 2 },
  { id: "retrieve-card", text: "Retrieve Card Data", level: 2 },
  { id: "next-steps", text: "Next Steps", level: 2 },
];

export const QuickstartContent = () => {
  const { previous, next } = getNavLinks("/docs/quickstart");

  return (
    <DocsPageTemplate
      title="Quickstart"
      description="Get up and running with Tychee in under 5 minutes. This guide walks you through storing your first card."
      badge="Getting Started"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="project-setup">Project Setup</DocsH2>
      <DocsP>
        First, create a new project in the Tychee dashboard to get your project ID:
      </DocsP>
      <DocsUl>
        <DocsLi>Visit <a href="https://app.tychee.store" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">app.tychee.store</a></DocsLi>
        <DocsLi>Create a new project</DocsLi>
        <DocsLi>Copy your <DocsInlineCode>projectId</DocsInlineCode> from the settings page</DocsLi>
      </DocsUl>

      <DocsCallout type="note">
        New projects start on testnet by default. Switch to mainnet when you're ready
        for production.
      </DocsCallout>

      <DocsH2 id="initialize-sdk">Initialize the SDK</DocsH2>
      <DocsP>
        Import and initialize Tychee with your project credentials:
      </DocsP>
      <DocsCodeBlock
        filename="src/lib/tychee.ts"
        language="typescript"
        code={`import { TycheeSDK } from '@tychee/sdk';

export const tychee = new TycheeSDK({
  projectId: process.env.TYCHEE_PROJECT_ID!,
  chain: 'ethereum', // or 'polygon', 'arbitrum'
  environment: 'testnet', // 'mainnet' for production
});`}
      />

      <DocsH2 id="store-first-card">Store Your First Card</DocsH2>
      <DocsP>
        Use the <DocsInlineCode>storeCard</DocsInlineCode> method to securely tokenize a card:
      </DocsP>
      <DocsCodeBlock
        filename="src/components/PaymentForm.tsx"
        language="typescript"
        code={`import { tychee } from '@/lib/tychee';

async function handlePayment(cardData: CardInput) {
  try {
    // Card data is encrypted client-side before transmission
    const token = await tychee.storeCard({
      number: cardData.number,
      expMonth: cardData.expMonth,
      expYear: cardData.expYear,
      cvc: cardData.cvc,
    });

    console.log('Card stored successfully:', token);
    // Store the token in your database for future use
    await saveTokenToDatabase(token);
  } catch (error) {
    console.error('Failed to store card:', error);
  }
}`}
      />

      <DocsCallout type="tip" title="Security">
        The SDK handles all encryption automatically. Raw card data never leaves the
        user's browser unencrypted.
      </DocsCallout>

      <DocsH2 id="retrieve-card">Retrieve Card Data</DocsH2>
      <DocsP>
        When you need to use the card for a transaction, retrieve it with the token:
      </DocsP>
      <DocsCodeBlock
        filename="src/lib/payment.ts"
        language="typescript"
        code={`async function processPayment(tokenId: string) {
  // Retrieve the decrypted card data
  const card = await tychee.retrieveCard(tokenId);

  // Use the card data with your payment processor
  await paymentProcessor.charge({
    number: card.number,
    expMonth: card.expMonth,
    expYear: card.expYear,
    cvc: card.cvc,
    amount: 1000, // $10.00
  });
}`}
      />

      <DocsH2 id="next-steps">Next Steps</DocsH2>
      <DocsP>
        Now that you've stored your first card, explore these topics:
      </DocsP>
      <DocsUl>
        <DocsLi>
          <a href="/docs/token-vault" className="text-primary hover:underline">Token Vault</a> —
          Learn how tokens are stored and managed
        </DocsLi>
        <DocsLi>
          <a href="/docs/card-lifecycle" className="text-primary hover:underline">Card Lifecycle</a> —
          Understand the full store/retrieve/revoke flow
        </DocsLi>
        <DocsLi>
          <a href="/docs/encryption-model" className="text-primary hover:underline">Encryption Model</a> —
          Deep dive into our security architecture
        </DocsLi>
      </DocsUl>
    </DocsPageTemplate>
  );
};
