import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "what-is-aa", text: "What is Account Abstraction?", level: 2 },
  { id: "enabling-aa", text: "Enabling Account Abstraction", level: 2 },
  { id: "gasless-transactions", text: "Gasless Transactions", level: 2 },
  { id: "session-keys", text: "Session Keys", level: 2 },
  { id: "paymaster-setup", text: "Paymaster Setup", level: 2 },
];

export const AccountAbstractionContent = () => {
  const { previous, next } = getNavLinks("/docs/account-abstraction");
  
  return (
    <DocsPageTemplate
      title="Account Abstraction"
      description="Enable gasless transactions and improved UX with ERC-4337 account abstraction integration."
      badge="Core Concepts"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="what-is-aa">What is Account Abstraction?</DocsH2>
      <DocsP>
        Account Abstraction (ERC-4337) allows users to interact with Tychee without 
        holding ETH for gas fees. Transactions are sponsored by a paymaster, creating 
        a seamless Web2-like experience.
      </DocsP>
      <DocsUl>
        <DocsLi><strong>Gasless UX</strong> — Users don't need ETH to store or retrieve cards</DocsLi>
        <DocsLi><strong>Session Keys</strong> — Temporary keys for repeated operations</DocsLi>
        <DocsLi><strong>Batched Operations</strong> — Multiple operations in a single transaction</DocsLi>
      </DocsUl>

      <DocsCallout type="note">
        Account Abstraction is optional. Standard EOA wallets work without any additional setup.
      </DocsCallout>

      <DocsH2 id="enabling-aa">Enabling Account Abstraction</DocsH2>
      <DocsP>
        Enable AA when initializing the SDK:
      </DocsP>
      <DocsCodeBlock
        filename="config.ts"
        language="typescript"
        code={`import { TycheeSDK } from '@tychee/sdk';

const tychee = new TycheeSDK({
  projectId: 'your-project-id',
  chain: 'ethereum',
  accountAbstraction: {
    enabled: true,
    bundlerUrl: 'https://bundler.tychee.io',
    paymasterUrl: 'https://paymaster.tychee.io',
  },
});`}
      />

      <DocsH2 id="gasless-transactions">Gasless Transactions</DocsH2>
      <DocsP>
        With AA enabled, all SDK operations become gasless automatically:
      </DocsP>
      <DocsCodeBlock
        filename="gasless.ts"
        language="typescript"
        code={`// User doesn't need ETH for this operation
const token = await tychee.storeCard({
  number: '4242424242424242',
  expMonth: 12,
  expYear: 2025,
  cvc: '123',
});

// Gas is sponsored by Tychee's paymaster
console.log('Card stored without gas fees!');`}
      />

      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Operation</DocsTh>
            <DocsTh>Estimated Gas (EOA)</DocsTh>
            <DocsTh>Cost with AA</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd>storeCard</DocsTd>
            <DocsTd>~80,000 gas</DocsTd>
            <DocsTd>Free (sponsored)</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>retrieveCard</DocsTd>
            <DocsTd>~50,000 gas</DocsTd>
            <DocsTd>Free (sponsored)</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>revokeCard</DocsTd>
            <DocsTd>~30,000 gas</DocsTd>
            <DocsTd>Free (sponsored)</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsH2 id="session-keys">Session Keys</DocsH2>
      <DocsP>
        Session keys allow temporary, scoped access without repeated signatures:
      </DocsP>
      <DocsCodeBlock
        filename="session.ts"
        language="typescript"
        code={`// Create a session key for 1 hour
const session = await tychee.createSession({
  permissions: ['retrieve'],
  expiresIn: 3600, // seconds
  maxOperations: 10,
});

// Use session for subsequent operations
const card = await tychee.retrieveCard(tokenId, {
  sessionKey: session.key,
});

// No signature popup for the user!`}
      />

      <DocsCallout type="tip" title="Best Practice">
        Use session keys for checkout flows where users may retrieve cards multiple times 
        without wanting to sign each request.
      </DocsCallout>

      <DocsH2 id="paymaster-setup">Paymaster Setup</DocsH2>
      <DocsP>
        Bring your own paymaster for custom gas sponsorship rules:
      </DocsP>
      <DocsCodeBlock
        filename="paymaster.ts"
        language="typescript"
        code={`const tychee = new TycheeSDK({
  projectId: 'your-project-id',
  chain: 'ethereum',
  accountAbstraction: {
    enabled: true,
    bundlerUrl: 'https://bundler.tychee.io',
    // Custom paymaster
    paymaster: {
      type: 'custom',
      url: 'https://your-paymaster.com/api',
      context: {
        sponsorPolicy: 'premium_users_only',
      },
    },
  },
});`}
      />

      <DocsCallout type="warning" title="Rate Limits">
        Tychee's default paymaster has usage limits. For high-volume applications, 
        consider setting up your own paymaster or contact us for enterprise limits.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
