import { DocsPageTemplate, DocsH2, DocsP, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "signature", text: "Signature", level: 2 },
  { id: "parameters", text: "Parameters", level: 2 },
  { id: "returns", text: "Returns", level: 2 },
  { id: "example", text: "Example", level: 2 },
  { id: "batch-revocation", text: "Batch Revocation", level: 2 },
  { id: "errors", text: "Errors", level: 2 },
];

export const RevokeCardContent = () => {
  const { previous, next } = getNavLinks("/docs/api/revoke-card");
  
  return (
    <DocsPageTemplate
      title="revokeCard"
      description="Permanently delete a card from the Token Vault."
      badge="API Reference"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="signature">Signature</DocsH2>
      <DocsCodeBlock
        filename="signature.ts"
        language="typescript"
        code={`async revokeCard(tokenId: string, options?: RevokeOptions): Promise<void>`}
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
            <DocsTd>The token ID to revoke</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>options.reason</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>string</DocsInlineCode></DocsTd>
            <DocsTd>No</DocsTd>
            <DocsTd>Revocation reason for audit trail</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>options.audit</DocsInlineCode></DocsTd>
            <DocsTd><DocsInlineCode>boolean</DocsInlineCode></DocsTd>
            <DocsTd>No</DocsTd>
            <DocsTd>Log to immutable audit trail (default: true)</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsH2 id="returns">Returns</DocsH2>
      <DocsP>
        Returns <DocsInlineCode>void</DocsInlineCode> on success. The token is 
        permanently deleted and cannot be recovered.
      </DocsP>

      <DocsCallout type="warning" title="Irreversible">
        Revocation is permanent. Once a card is revoked, it cannot be restored. 
        The encrypted data is deleted from all storage backends.
      </DocsCallout>

      <DocsH2 id="example">Example</DocsH2>
      <DocsCodeBlock
        filename="example.ts"
        language="typescript"
        code={`// Basic revocation
await tychee.revokeCard('tok_abc123...');

// With audit trail
await tychee.revokeCard('tok_abc123...', {
  reason: 'user_requested',
  audit: true,
});

// Revocation reasons (recommended values):
// - 'user_requested': User initiated deletion
// - 'card_expired': Card reached expiration date
// - 'fraud_detected': Suspicious activity
// - 'account_closed': User account terminated
// - 'gdpr_request': Data deletion request`}
      />

      <DocsH2 id="batch-revocation">Batch Revocation</DocsH2>
      <DocsP>
        Revoke multiple cards or all cards for a wallet:
      </DocsP>
      <DocsCodeBlock
        filename="batch.ts"
        language="typescript"
        code={`// Revoke multiple specific tokens
await tychee.revokeCards(['tok_abc123...', 'tok_def456...'], {
  reason: 'bulk_cleanup',
});

// Revoke all cards for a wallet
await tychee.revokeAllCards({
  owner: '0x123...',
  reason: 'account_closed',
});

// Check revocation status
const status = await tychee.getRevocationStatus('tok_abc123...');
console.log(status);
// { revoked: true, revokedAt: 1699900000, reason: 'user_requested' }`}
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
            <DocsTd>Token doesn't exist or was already revoked</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>UNAUTHORIZED</DocsInlineCode></DocsTd>
            <DocsTd>Wallet doesn't own this token</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd><DocsInlineCode>REVOCATION_FAILED</DocsInlineCode></DocsTd>
            <DocsTd>Failed to delete from storage backend</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsCallout type="tip" title="Compliance">
        For GDPR or PCI DSS compliance, always provide a <DocsInlineCode>reason</DocsInlineCode> 
        and enable <DocsInlineCode>audit: true</DocsInlineCode> to maintain an immutable deletion record.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
