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

export const RetrieveCardContent = () => {
  const { previous, next } = getNavLinks("/docs/api/retrieve-card");
  
  return (
    <DocsPageTemplate
      title="retrieveCard"
      description="Decrypt and retrieve stored card data from the Token Vault."
      badge="API Reference"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="signature">Signature</DocsH2>
      <DocsCodeBlock
        filename="signature.ts"
        language="typescript"
        code={`async retrieveCard(tokenId: string, options?: RetrieveOptions): Promise<CardData>`}
      />

      <DocsH2 id="parameters">Parameters</DocsH2>
      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Parameter</DocsTh>
            <DocsTh>Type</DocsTh>
            <DocsTh>Required</DocsTh>
            <DocsTh>Description</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd><DocsInlineCode>tokenId</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>string</DocsInlineCode></DocsTd>
            <DocsTd>Yes</DocsTd>
            <DocsTd>The token ID returned from storeCard</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>options.sessionKey</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>string</DocsInlineCode></DocsTd>
            <DocsTd>No</DocsTd>
            <DocsTd>Session key for signature-less retrieval</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>options.includeCvc</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>boolean</DocsInlineCode></DocsTd>
            <DocsTd>No</DocsTd>
            <DocsTd>Request CVC if still within TTL (default: true)</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsH2 id="returns">Returns</DocsH2>
      <DocsP>
        Returns a <DocsInlineCode>CardData</DocsInlineCode> object:
      </DocsP>
      <DocsCodeBlock
        filename="return.ts"
        language="typescript"
        code={`interface CardData {
  number: string;       // Full card number
  expMonth: number;     // Expiration month
  expYear: number;      // Expiration year
  cvc?: string;         // CVC (if within TTL)
  billingAddress?: {    // Billing address (if stored)
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}`}
      />

      <DocsCallout type="warning" title="CVC Availability">
        CVC is only available within 15 minutes of storing the card. After that, 
        you'll need to request the CVC from the user again.
      </DocsCallout>

      <DocsH2 id="example">Example</DocsH2>
      <DocsCodeBlock
        filename="example.ts"
        language="typescript"
        code={`// Basic retrieval
const card = await tychee.retrieveCard('tok_abc123...');

console.log(card.number);   // '4242424242424242'
console.log(card.expMonth); // 12
console.log(card.cvc);      // '123' or undefined

// With session key (no signature popup)
const card2 = await tychee.retrieveCard('tok_abc123...', {
  sessionKey: 'sess_xyz789...',
});

// Without CVC (for display purposes only)
const card3 = await tychee.retrieveCard('tok_abc123...', {
  includeCvc: false,
});`}
      />

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
            <DocsTd><DocsInlineCode>TOKEN_NOT_FOUND</DocsInlineCode></DocsTd>
            <DocsTd>Token doesn't exist or was revoked</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>UNAUTHORIZED</DocsInlineCode></DocsTd>
            <DocsTd>Wallet doesn't own this token</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>RATE_LIMITED</DocsInlineCode></DocsTd>
            <DocsTd>Too many retrieval attempts</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>SESSION_EXPIRED</DocsInlineCode></DocsTd>
            <DocsTd>Session key has expired</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>DECRYPTION_FAILED</DocsInlineCode></DocsTd>
            <DocsTd>Failed to decrypt card data</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsCallout type="tip" title="Rate Limiting">
        Retrieve operations are limited to 100 per token per day by default. 
        Contact support for higher limits.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
