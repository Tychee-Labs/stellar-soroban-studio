import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "constructor", text: "Constructor", level: 2 },
  { id: "configuration", text: "Configuration Options", level: 2 },
  { id: "methods", text: "Methods", level: 2 },
  { id: "events", text: "Events", level: 2 },
  { id: "error-handling", text: "Error Handling", level: 2 },
];

export const TycheeSDKContent = () => {
  const { previous, next } = getNavLinks("/docs/api/tychee-sdk");
  
  return (
    <DocsPageTemplate
      title="TycheeSDK"
      description="The main SDK class for interacting with the Tychee card tokenization platform."
      badge="API Reference"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="constructor">Constructor</DocsH2>
      <DocsP>
        Create a new instance of the Tychee SDK:
      </DocsP>
      <DocsCodeBlock
        filename="usage.ts"
        language="typescript"
        code={`import { TycheeSDK } from '@tychee/sdk';

const tychee = new TycheeSDK(config: TycheeConfig);`}
      />

      <DocsH2 id="configuration">Configuration Options</DocsH2>
      <DocsP>
        The <DocsInlineCode>TycheeConfig</DocsInlineCode> object accepts these options:
      </DocsP>
      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Option</DocsTh>
            <DocsTh>Type</DocsTh>
            <DocsTh>Required</DocsTh>
            <DocsTh>Description</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd><DocsInlineCode>projectId</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>string</DocsInlineCode></DocsTd>
            <DocsTd>Yes</DocsTd>
            <DocsTd>Your Tychee project ID from the dashboard</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>chain</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>ChainName</DocsInlineCode></DocsTd>
            <DocsTd>Yes</DocsTd>
            <DocsTd>Target blockchain: 'ethereum' | 'polygon' | 'arbitrum'</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>environment</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>string</DocsInlineCode></DocsTd>
            <DocsTd>No</DocsTd>
            <DocsTd>'testnet' (default) or 'mainnet'</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>accountAbstraction</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>AAConfig</DocsInlineCode></DocsTd>
            <DocsTd>No</DocsTd>
            <DocsTd>ERC-4337 configuration for gasless transactions</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsCodeBlock
        filename="config.ts"
        language="typescript"
        code={`const tychee = new TycheeSDK({
  projectId: 'proj_abc123',
  chain: 'ethereum',
  environment: 'mainnet',
  accountAbstraction: {
    enabled: true,
    bundlerUrl: 'https://bundler.tychee.io',
  },
});`}
      />

      <DocsH2 id="methods">Methods</DocsH2>
      <DocsP>
        The SDK provides these core methods:
      </DocsP>
      <DocsUl>
        <DocsLi>
          <a href="/docs/api/store-card" className="text-primary hover:underline font-mono">storeCard()</a> — 
          Encrypt and store a card in the vault
        </DocsLi>
        <DocsLi>
          <a href="/docs/api/retrieve-card" className="text-primary hover:underline font-mono">retrieveCard()</a> — 
          Decrypt and retrieve stored card data
        </DocsLi>
        <DocsLi>
          <a href="/docs/api/revoke-card" className="text-primary hover:underline font-mono">revokeCard()</a> — 
          Permanently delete a card from the vault
        </DocsLi>
      </DocsUl>

      <DocsH2 id="events">Events</DocsH2>
      <DocsP>
        Subscribe to SDK events:
      </DocsP>
      <DocsCodeBlock
        filename="events.ts"
        language="typescript"
        code={`// Listen for events
tychee.on('card:stored', (event) => { ... });
tychee.on('card:retrieved', (event) => { ... });
tychee.on('card:revoked', (event) => { ... });
tychee.on('error', (error) => { ... });

// Remove listener
tychee.off('card:stored', handler);

// One-time listener
tychee.once('card:stored', (event) => { ... });`}
      />

      <DocsH2 id="error-handling">Error Handling</DocsH2>
      <DocsP>
        The SDK throws typed errors for different failure scenarios:
      </DocsP>
      <DocsCodeBlock
        filename="errors.ts"
        language="typescript"
        code={`import { TycheeError, UnauthorizedError, RateLimitError } from '@tychee/sdk';

try {
  await tychee.storeCard(cardData);
} catch (error) {
  if (error instanceof UnauthorizedError) {
    // Wallet doesn't have permission
  } else if (error instanceof RateLimitError) {
    // Too many requests
    console.log('Retry after:', error.retryAfter);
  } else if (error instanceof TycheeError) {
    // Other SDK errors
    console.error(error.code, error.message);
  }
}`}
      />

      <DocsCallout type="tip" title="TypeScript">
        All errors extend <DocsInlineCode>TycheeError</DocsInlineCode> and include 
        <DocsInlineCode>code</DocsInlineCode> and <DocsInlineCode>message</DocsInlineCode> properties.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
