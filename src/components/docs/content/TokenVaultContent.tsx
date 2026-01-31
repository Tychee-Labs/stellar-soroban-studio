import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "token-structure", text: "Token Structure", level: 2 },
  { id: "storage-backends", text: "Storage Backends", level: 2 },
  { id: "token-metadata", text: "Token Metadata", level: 2 },
  { id: "access-control", text: "Access Control", level: 2 },
];

export const TokenVaultContent = () => {
  const { previous, next } = getNavLinks("/docs/token-vault");
  
  return (
    <DocsPageTemplate
      title="Token Vault"
      description="The Token Vault is the core storage layer for encrypted card data. Learn how tokens are structured, stored, and secured."
      badge="Core Concepts"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        The Token Vault is a decentralized storage system that holds encrypted card tokens. 
        Each token represents a unique card and contains the encrypted data plus metadata 
        for access control.
      </DocsP>

      <DocsCallout type="note">
        The vault never stores raw card data. All sensitive information is encrypted 
        client-side before transmission.
      </DocsCallout>

      <DocsH2 id="token-structure">Token Structure</DocsH2>
      <DocsP>
        Each token in the vault has the following structure:
      </DocsP>
      <DocsCodeBlock
        filename="types.ts"
        language="typescript"
        code={`interface VaultToken {
  id: string;           // Unique token identifier
  cipher: string;       // Encrypted card data (AES-256-GCM)
  nonce: string;        // Encryption nonce
  salt: string;         // Key derivation salt
  version: number;      // Encryption version
  chainId: number;      // Blockchain network ID
  owner: string;        // Wallet address of the owner
  createdAt: number;    // Unix timestamp
  expiresAt?: number;   // Optional expiration
  metadata: {
    lastFour: string;   // Last 4 digits (for display)
    brand: string;      // Card brand (visa, mastercard, etc.)
    fingerprint: string; // Unique card fingerprint
  };
}`}
      />

      <DocsH2 id="storage-backends">Storage Backends</DocsH2>
      <DocsP>
        Tychee supports multiple storage backends for different use cases:
      </DocsP>
      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Backend</DocsTh>
            <DocsTh>Description</DocsTh>
            <DocsTh>Best For</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd><DocsInlineCode>ipfs</DocsInlineCode></DocsTd>
            <DocsTd>Distributed IPFS storage</DocsTd>
            <DocsTd>Maximum decentralization</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>arweave</DocsInlineCode></DocsTd>
            <DocsTd>Permanent Arweave storage</DocsTd>
            <DocsTd>Long-term archival</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>hybrid</DocsInlineCode></DocsTd>
            <DocsTd>IPFS + cloud backup</DocsTd>
            <DocsTd>Balance of speed & decentralization</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsCodeBlock
        filename="config.ts"
        language="typescript"
        code={`const tychee = new TycheeSDK({
  projectId: 'your-project-id',
  chain: 'ethereum',
  storage: {
    backend: 'hybrid',
    ipfsGateway: 'https://gateway.pinata.cloud',
  },
});`}
      />

      <DocsH2 id="token-metadata">Token Metadata</DocsH2>
      <DocsP>
        Each token stores non-sensitive metadata for display and verification:
      </DocsP>
      <DocsUl>
        <DocsLi><strong>lastFour</strong> — Last 4 digits of the card number for UI display</DocsLi>
        <DocsLi><strong>brand</strong> — Detected card brand (Visa, Mastercard, Amex, etc.)</DocsLi>
        <DocsLi><strong>fingerprint</strong> — A unique hash to detect duplicate cards</DocsLi>
      </DocsUl>

      <DocsCallout type="tip" title="Duplicate Detection">
        Use the <DocsInlineCode>fingerprint</DocsInlineCode> field to check if a user 
        has already stored the same card, preventing duplicates in your system.
      </DocsCallout>

      <DocsH2 id="access-control">Access Control</DocsH2>
      <DocsP>
        Token access is controlled by wallet ownership. Only the wallet that stored the 
        card can retrieve or revoke it:
      </DocsP>
      <DocsCodeBlock
        filename="access.ts"
        language="typescript"
        code={`// Only the token owner can access
const card = await tychee.retrieveCard(tokenId);

// Attempting access from a different wallet throws
// Error: "Unauthorized: wallet does not own this token"

// Delegate access to another wallet (optional)
await tychee.delegateAccess(tokenId, {
  wallet: '0x123...',
  permissions: ['retrieve'],
  expiresAt: Date.now() + 86400000, // 24 hours
});`}
      />
    </DocsPageTemplate>
  );
};
