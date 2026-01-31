import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "encryption-algorithm", text: "Encryption Algorithm", level: 2 },
  { id: "client-side-encryption", text: "Client-Side Encryption", level: 2 },
  { id: "key-management", text: "Key Management", level: 2 },
  { id: "audit-logging", text: "Audit Logging", level: 2 },
];

export const EncryptionModelContent = () => {
  const { previous, next } = getNavLinks("/docs/encryption-model");
  
  return (
    <DocsPageTemplate
      title="Encryption Model"
      description="Deep dive into Tychee's encryption architecture and how card data is protected at every layer."
      badge="Security"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        Tychee uses a zero-knowledge encryption model where sensitive data is encrypted 
        on the client before it ever reaches our infrastructure. This ensures that even 
        Tychee cannot access raw card data.
      </DocsP>

      <DocsCallout type="note">
        Our encryption model is audited annually by third-party security firms and 
        complies with PCI DSS Level 1 requirements.
      </DocsCallout>

      <DocsH2 id="encryption-algorithm">Encryption Algorithm</DocsH2>
      <DocsP>
        We use industry-standard algorithms for maximum security:
      </DocsP>
      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Component</DocsTh>
            <DocsTh>Algorithm</DocsTh>
            <DocsTh>Key Size</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd>Symmetric Encryption</DocsTd>
            <DocsTd>AES-256-GCM</DocsTd>
            <DocsTd>256 bits</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Key Derivation</DocsTd>
            <DocsTd>PBKDF2-SHA256</DocsTd>
            <DocsTd>256 bits</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Key Exchange</DocsTd>
            <DocsTd>X25519</DocsTd>
            <DocsTd>256 bits</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Signatures</DocsTd>
            <DocsTd>Ed25519</DocsTd>
            <DocsTd>256 bits</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsH2 id="client-side-encryption">Client-Side Encryption</DocsH2>
      <DocsP>
        The encryption flow happens entirely in the user's browser:
      </DocsP>
      <DocsCodeBlock
        filename="encryption-flow.ts"
        language="typescript"
        code={`// Simplified encryption flow (handled by SDK)
async function encryptCard(cardData: CardInput): Promise<EncryptedPayload> {
  // 1. Generate random nonce (12 bytes)
  const nonce = crypto.getRandomValues(new Uint8Array(12));

  // 2. Derive encryption key from wallet signature
  const key = await deriveKey(walletSignature, salt);

  // 3. Encrypt card data with AES-256-GCM
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce },
    key,
    encode(cardData)
  );

  // 4. Return encrypted payload (never touches our servers in plaintext)
  return { cipher, nonce, salt };
}`}
      />

      <DocsCallout type="tip" title="Web Crypto API">
        We use the native Web Crypto API for all cryptographic operations, ensuring 
        hardware-accelerated encryption on supported devices.
      </DocsCallout>

      <DocsH2 id="key-management">Key Management</DocsH2>
      <DocsP>
        Encryption keys are derived from the user's wallet signature, meaning:
      </DocsP>
      <DocsUl>
        <DocsLi>Tychee never stores or has access to decryption keys</DocsLi>
        <DocsLi>Only the wallet owner can decrypt their data</DocsLi>
        <DocsLi>Keys are regenerated on each session for forward secrecy</DocsLi>
      </DocsUl>

      <DocsCodeBlock
        filename="key-derivation.ts"
        language="typescript"
        code={`// Key derivation from wallet signature
async function deriveKey(signature: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    hexToBytes(signature),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}`}
      />

      <DocsH2 id="audit-logging">Audit Logging</DocsH2>
      <DocsP>
        All encryption and decryption operations are logged for compliance:
      </DocsP>
      <DocsCodeBlock
        filename="audit.ts"
        language="typescript"
        code={`// Access the audit log for a token
const auditLog = await tychee.getAuditLog('tok_abc123...');

console.log(auditLog);
// [
//   { action: 'store', timestamp: 1699900000, wallet: '0x...' },
//   { action: 'retrieve', timestamp: 1699900500, wallet: '0x...' },
//   { action: 'retrieve', timestamp: 1699901000, wallet: '0x...' },
// ]`}
      />

      <DocsCallout type="warning" title="Data Retention">
        Audit logs are retained for 7 years to meet regulatory requirements. 
        They cannot be deleted or modified.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
