import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "derivation-process", text: "Derivation Process", level: 2 },
  { id: "salt-generation", text: "Salt Generation", level: 2 },
  { id: "iteration-count", text: "Iteration Count", level: 2 },
  { id: "key-rotation", text: "Key Rotation", level: 2 },
];

export const KeyDerivationContent = () => {
  const { previous, next } = getNavLinks("/docs/key-derivation");
  
  return (
    <DocsPageTemplate
      title="Key Derivation"
      description="Learn how Tychee derives encryption keys from wallet signatures using PBKDF2."
      badge="Security"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        Key derivation is the process of generating cryptographic keys from a user's 
        wallet signature. This ensures that only the wallet owner can encrypt and decrypt 
        their card data.
      </DocsP>

      <DocsUl>
        <DocsLi>Keys are never stored—they're derived on-demand</DocsLi>
        <DocsLi>Each card uses a unique salt for independent keys</DocsLi>
        <DocsLi>PBKDF2 with 100,000 iterations prevents brute-force attacks</DocsLi>
      </DocsUl>

      <DocsH2 id="derivation-process">Derivation Process</DocsH2>
      <DocsP>
        The key derivation follows this flow:
      </DocsP>
      <DocsCodeBlock
        filename="derivation.ts"
        language="typescript"
        code={`import { pbkdf2 } from '@noble/hashes/pbkdf2';
import { sha256 } from '@noble/hashes/sha256';

function deriveEncryptionKey(
  walletSignature: Uint8Array,
  salt: Uint8Array,
  iterations: number = 100000
): Uint8Array {
  // PBKDF2-SHA256 with configurable iterations
  return pbkdf2(sha256, walletSignature, salt, {
    c: iterations,
    dkLen: 32, // 256 bits
  });
}

// Usage in the SDK
const signature = await wallet.signMessage('Tychee Key Derivation v1');
const salt = crypto.getRandomValues(new Uint8Array(16));
const encryptionKey = deriveEncryptionKey(
  hexToBytes(signature),
  salt
);`}
      />

      <DocsCallout type="note">
        The signature message is versioned (<DocsInlineCode>v1</DocsInlineCode>) to allow 
        future upgrades without breaking existing keys.
      </DocsCallout>

      <DocsH2 id="salt-generation">Salt Generation</DocsH2>
      <DocsP>
        Each card token uses a unique cryptographically random salt:
      </DocsP>
      <DocsCodeBlock
        filename="salt.ts"
        language="typescript"
        code={`// Generate a unique 16-byte salt for each card
function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16));
}

// Salt is stored alongside the encrypted data
interface StoredToken {
  cipher: Uint8Array;
  nonce: Uint8Array;
  salt: Uint8Array; // Used for key derivation
}

// Different salts = different keys = isolated encryption
const salt1 = generateSalt(); // Card 1
const salt2 = generateSalt(); // Card 2
// key1 !== key2, even with the same wallet signature`}
      />

      <DocsH2 id="iteration-count">Iteration Count</DocsH2>
      <DocsP>
        The iteration count directly affects security vs. performance:
      </DocsP>
      <DocsCodeBlock
        filename="iterations.ts"
        language="typescript"
        code={`// Default: 100,000 iterations
// Can be configured per-project in the dashboard

const tychee = new TycheeSDK({
  projectId: 'your-project-id',
  chain: 'ethereum',
  security: {
    // Higher = more secure, slower derivation
    // Lower = less secure, faster derivation
    pbkdf2Iterations: 100000, // default
  },
});

// Benchmark on typical devices:
// 100,000 iterations: ~150ms
// 200,000 iterations: ~300ms
// 500,000 iterations: ~750ms`}
      />

      <DocsCallout type="warning" title="Security Tradeoff">
        Reducing iterations below 100,000 is not recommended. It significantly weakens 
        protection against brute-force attacks on stolen encrypted data.
      </DocsCallout>

      <DocsH2 id="key-rotation">Key Rotation</DocsH2>
      <DocsP>
        While keys are derived on-demand, you can force re-encryption with new keys:
      </DocsP>
      <DocsCodeBlock
        filename="rotation.ts"
        language="typescript"
        code={`// Rotate keys for all cards owned by a wallet
await tychee.rotateKeys({
  reason: 'wallet_compromised',
});

// This will:
// 1. Derive new keys with fresh salts
// 2. Re-encrypt all stored cards
// 3. Invalidate old encrypted data
// 4. Log the rotation in the audit trail

// Check rotation status
const status = await tychee.getRotationStatus();
console.log(status);
// { pending: 0, completed: 5, lastRotation: 1699900000 }`}
      />

      <DocsCallout type="tip" title="When to Rotate">
        Rotate keys if you suspect a wallet's private key may have been exposed, or as 
        part of regular security hygiene (e.g., annually).
      </DocsCallout>
    </DocsPageTemplate>
  );
};
