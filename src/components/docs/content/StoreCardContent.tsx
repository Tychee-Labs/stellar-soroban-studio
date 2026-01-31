import { DocsPageTemplate, DocsH2, DocsP, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "signature", text: "Signature", level: 2 },
  { id: "parameters", text: "Parameters", level: 2 },
  { id: "returns", text: "Returns", level: 2 },
  { id: "example", text: "Example", level: 2 },
  { id: "errors", text: "Errors", level: 2 },
];

export const StoreCardContent = () => {
  const { previous, next } = getNavLinks("/docs/api/store-card");
  
  return (
    <DocsPageTemplate
      title="storeCard"
      description="Encrypt and securely store a payment card in the Token Vault."
      badge="API Reference"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="signature">Signature</DocsH2>
      <DocsCodeBlock
        filename="signature.ts"
        language="typescript"
        code={`async storeCard(input: StoreCardInput): Promise<CardToken>`}
      />

      <DocsH2 id="parameters">Parameters</DocsH2>
      <DocsP>
        The <DocsInlineCode>StoreCardInput</DocsInlineCode> object:
      </DocsP>
      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Property</DocsTh>
            <DocsTh>Type</DocsTh>
            <DocsTh>Required</DocsTh>
            <DocsTh>Description</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd><DocsInlineCode>number</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>string</DocsInlineCode></DocsTd>
            <DocsTd>Yes</DocsTd>
            <DocsTd>Card number (13-19 digits)</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>expMonth</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>number</DocsInlineCode></DocsTd>
            <DocsTd>Yes</DocsTd>
            <DocsTd>Expiration month (1-12)</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>expYear</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>number</DocsInlineCode></DocsTd>
            <DocsTd>Yes</DocsTd>
            <DocsTd>Expiration year (4 digits)</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>cvc</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>string</DocsInlineCode></DocsTd>
            <DocsTd>Yes</DocsTd>
            <DocsTd>Card verification code (3-4 digits)</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>billingAddress</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>Address</DocsInlineCode></DocsTd>
            <DocsTd>No</DocsTd>
            <DocsTd>Billing address for AVS</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsH2 id="returns">Returns</DocsH2>
      <DocsP>
        Returns a <DocsInlineCode>CardToken</DocsInlineCode> object:
      </DocsP>
      <DocsCodeBlock
        filename="return.ts"
        language="typescript"
        code={`interface CardToken {
  id: string;           // Unique token ID (e.g., 'tok_abc123...')
  lastFour: string;     // Last 4 digits for display
  brand: CardBrand;     // 'visa' | 'mastercard' | 'amex' | 'discover'
  fingerprint: string;  // Unique card fingerprint
  createdAt: number;    // Unix timestamp
  expiresAt?: number;   // Optional expiration
}`}
      />

      <DocsH2 id="example">Example</DocsH2>
      <DocsCodeBlock
        filename="example.ts"
        language="typescript"
        code={`const token = await tychee.storeCard({
  number: '4242424242424242',
  expMonth: 12,
  expYear: 2025,
  cvc: '123',
  billingAddress: {
    line1: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94102',
    country: 'US',
  },
});

console.log(token.id);       // 'tok_abc123...'
console.log(token.lastFour); // '4242'
console.log(token.brand);    // 'visa'`}
      />

      <DocsCallout type="note">
        Card data is encrypted in the browser before transmission. Raw card numbers 
        never leave the user's device unencrypted.
      </DocsCallout>

      <DocsH2 id="errors">Errors</DocsH2>
      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Error Code</DocsTh>
            <DocsTh>Description</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd><DocsInlineCode>INVALID_CARD_NUMBER</DocsInlineCode></DocsTd>
            <DocsTd>Card number fails Luhn check or is invalid</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>EXPIRED_CARD</DocsInlineCode></DocsTd>
            <DocsTd>Card expiration date is in the past</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>WALLET_NOT_CONNECTED</DocsInlineCode></DocsTd>
            <DocsTd>No wallet connected for signing</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>ENCRYPTION_FAILED</DocsInlineCode></DocsTd>
            <DocsTd>Client-side encryption error</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>
    </DocsPageTemplate>
  );
};
