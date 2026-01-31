import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "what-is-tychee", text: "What is Tychee?", level: 2 },
  { id: "key-features", text: "Key Features", level: 2 },
  { id: "how-it-works", text: "How It Works", level: 2 },
  { id: "architecture", text: "Architecture", level: 3 },
  { id: "supported-chains", text: "Supported Chains", level: 2 },
];

export const IntroductionContent = () => {
  const { previous, next } = getNavLinks("/docs/introduction");
  
  return (
    <DocsPageTemplate
      title="Introduction"
      description="Tychee SDK enables secure, compliant card tokenization and storage on Web3 infrastructure. Build payment experiences without handling raw card data."
      badge="Getting Started"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="what-is-tychee">What is Tychee?</DocsH2>
      <DocsP>
        Tychee is a developer SDK that brings PCI-compliant card tokenization to Web3 applications. 
        It allows you to securely store, retrieve, and revoke payment card data using decentralized 
        infrastructure—eliminating the need for centralized databases.
      </DocsP>

      <DocsCallout type="note">
        Tychee handles the complexity of encryption and key management so you can focus on 
        building great user experiences.
      </DocsCallout>

      <DocsH2 id="key-features">Key Features</DocsH2>
      <DocsUl>
        <DocsLi>
          <strong className="text-foreground">Zero-Knowledge Encryption</strong> — Card data is encrypted client-side 
          before it ever touches our infrastructure.
        </DocsLi>
        <DocsLi>
          <strong className="text-foreground">PCI DSS Compliant</strong> — Built from the ground up to meet 
          payment industry security standards.
        </DocsLi>
        <DocsLi>
          <strong className="text-foreground">Multi-Chain Support</strong> — Works seamlessly across Ethereum, 
          Polygon, Arbitrum, and more.
        </DocsLi>
        <DocsLi>
          <strong className="text-foreground">Account Abstraction Ready</strong> — Optional ERC-4337 integration 
          for gasless transactions.
        </DocsLi>
      </DocsUl>

      <DocsH2 id="how-it-works">How It Works</DocsH2>
      <DocsP>
        The SDK provides a simple API for the complete card lifecycle:
      </DocsP>

      <DocsCodeBlock
        filename="example.ts"
        language="typescript"
        code={`import { TycheeSDK } from '@tychee/sdk';

// Initialize the SDK
const tychee = new TycheeSDK({
  projectId: 'your-project-id',
  chain: 'ethereum',
});

// Store a card securely
const token = await tychee.storeCard({
  number: '4242424242424242',
  expMonth: 12,
  expYear: 2025,
  cvc: '123',
});

// Retrieve card data when needed
const card = await tychee.retrieveCard(token);

// Revoke access when done
await tychee.revokeCard(token);`}
      />

      <DocsH3 id="architecture">Architecture</DocsH3>
      <DocsP>
        Tychee uses a hybrid architecture that combines the security of client-side encryption 
        with the reliability of decentralized storage:
      </DocsP>

      <DocsCallout type="tip" title="Best Practice">
        Always initialize the SDK on the client side to ensure card data never passes through 
        your servers unencrypted.
      </DocsCallout>

      <DocsH2 id="supported-chains">Supported Chains</DocsH2>
      <DocsP>
        Tychee currently supports the following networks:
      </DocsP>

      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Network</DocsTh>
            <DocsTh>Chain ID</DocsTh>
            <DocsTh>Status</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd>Ethereum Mainnet</DocsTd>
            <DocsTd><DocsInlineCode>1</DocsInlineCode></DocsTd>
            <DocsTd><span className="text-green-500">✓ Live</span></DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Polygon</DocsTd>
            <DocsTd><DocsInlineCode>137</DocsInlineCode></DocsTd>
            <DocsTd><span className="text-green-500">✓ Live</span></DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Arbitrum One</DocsTd>
            <DocsTd><DocsInlineCode>42161</DocsInlineCode></DocsTd>
            <DocsTd><span className="text-green-500">✓ Live</span></DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Base</DocsTd>
            <DocsTd><DocsInlineCode>8453</DocsInlineCode></DocsTd>
            <DocsTd><span className="text-yellow-500">Coming Soon</span></DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsCallout type="warning" title="Testnet Usage">
        For development, we recommend using Sepolia or Polygon Mumbai testnets. 
        See our <a href="/docs/guides/testnet-mainnet" className="text-primary hover:underline">Testnet to Mainnet guide</a> for migration steps.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
