import { DocsPageTemplate, DocsH2, DocsP, DocsUl, DocsLi, DocsInlineCode } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "before-migration", text: "Before Migration", level: 2 },
  { id: "migration-steps", text: "Migration Steps", level: 2 },
  { id: "configuration-changes", text: "Configuration Changes", level: 2 },
  { id: "verification", text: "Verification", level: 2 },
  { id: "rollback-plan", text: "Rollback Plan", level: 2 },
];

export const TestnetMainnetContent = () => {
  const { previous, next } = getNavLinks("/docs/guides/testnet-mainnet");
  
  return (
    <DocsPageTemplate
      title="Testnet to Mainnet Checklist"
      description="A comprehensive checklist for migrating your Tychee integration from testnet to mainnet."
      badge="Guides"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        This guide walks you through the steps to safely migrate your Tychee 
        integration from testnet to mainnet. Follow each step carefully to 
        ensure a smooth transition.
      </DocsP>

      <DocsCallout type="warning" title="Important">
        Testnet tokens cannot be migrated to mainnet. Users will need to re-add 
        their cards on the production environment.
      </DocsCallout>

      <DocsH2 id="before-migration">Before Migration</DocsH2>
      <DocsP>
        Complete these prerequisites before starting the migration:
      </DocsP>
      <DocsUl>
        <DocsLi>✅ Complete end-to-end testing on testnet</DocsLi>
        <DocsLi>✅ Pass PCI DSS compliance audit (if applicable)</DocsLi>
        <DocsLi>✅ Set up production monitoring and alerting</DocsLi>
        <DocsLi>✅ Configure production error tracking (Sentry, etc.)</DocsLi>
        <DocsLi>✅ Upgrade to a paid Tychee plan</DocsLi>
        <DocsLi>✅ Fund your paymaster (if using Account Abstraction)</DocsLi>
      </DocsUl>

      <DocsH2 id="migration-steps">Migration Steps</DocsH2>
      
      <DocsP>
        <strong>Step 1:</strong> Create a mainnet project in the Tychee dashboard:
      </DocsP>
      <DocsCodeBlock
        filename="dashboard"
        language="bash"
        code={`# In the Tychee Dashboard:
# 1. Go to Settings → Projects
# 2. Click "Create Production Project"
# 3. Copy your new mainnet projectId`}
      />

      <DocsP>
        <strong>Step 2:</strong> Update your environment variables:
      </DocsP>
      <DocsCodeBlock
        filename=".env.production"
        language="bash"
        code={`# Production environment
NEXT_PUBLIC_TYCHEE_PROJECT_ID=proj_mainnet_abc123
NEXT_PUBLIC_TYCHEE_CHAIN=ethereum
NEXT_PUBLIC_TYCHEE_ENV=mainnet

# Server-side (keep secret!)
TYCHEE_SECRET_KEY=sk_live_xyz789`}
      />

      <DocsP>
        <strong>Step 3:</strong> Update SDK configuration:
      </DocsP>
      <DocsCodeBlock
        filename="lib/tychee.ts"
        language="typescript"
        code={`import { TycheeSDK } from '@tychee/sdk';

export const tychee = new TycheeSDK({
  projectId: process.env.NEXT_PUBLIC_TYCHEE_PROJECT_ID!,
  chain: process.env.NEXT_PUBLIC_TYCHEE_CHAIN as 'ethereum',
  environment: 'mainnet', // Changed from 'testnet'
});`}
      />

      <DocsH2 id="configuration-changes">Configuration Changes</DocsH2>
      <DocsP>
        Key differences between testnet and mainnet:
      </DocsP>
      <DocsUl>
        <DocsLi>
          <strong>API Endpoints</strong> — SDK automatically switches to production endpoints
        </DocsLi>
        <DocsLi>
          <strong>Rate Limits</strong> — Production has higher limits (100→1000 requests/min)
        </DocsLi>
        <DocsLi>
          <strong>SLA</strong> — 99.9% uptime guarantee on mainnet
        </DocsLi>
        <DocsLi>
          <strong>Support</strong> — Priority support channel for production issues
        </DocsLi>
      </DocsUl>

      <DocsCallout type="tip" title="Gradual Rollout">
        Consider using feature flags to gradually roll out mainnet to a subset of 
        users before full deployment.
      </DocsCallout>

      <DocsH2 id="verification">Verification</DocsH2>
      <DocsP>
        Verify your mainnet integration is working:
      </DocsP>
      <DocsCodeBlock
        filename="verify.ts"
        language="typescript"
        code={`// Run this after deployment
async function verifyMainnet() {
  // 1. Check SDK is configured for mainnet
  console.log('Environment:', tychee.getEnvironment());
  // Should output: 'mainnet'

  // 2. Verify connection
  const health = await tychee.healthCheck();
  console.log('Health:', health);
  // Should output: { status: 'ok', network: 'ethereum-mainnet' }

  // 3. Test with a real transaction (small amount)
  // ... your verification logic
}

verifyMainnet().catch(console.error);`}
      />

      <DocsH2 id="rollback-plan">Rollback Plan</DocsH2>
      <DocsP>
        If issues occur, quickly rollback to testnet:
      </DocsP>
      <DocsCodeBlock
        filename="rollback.ts"
        language="typescript"
        code={`// Option 1: Environment variable
// Set NEXT_PUBLIC_TYCHEE_ENV=testnet in your deployment

// Option 2: Feature flag
const tychee = new TycheeSDK({
  projectId: process.env.NEXT_PUBLIC_TYCHEE_PROJECT_ID!,
  chain: 'ethereum',
  environment: featureFlags.useMainnet ? 'mainnet' : 'testnet',
});

// Option 3: Deploy previous version
// $ vercel rollback  (or equivalent for your platform)`}
      />

      <DocsCallout type="note">
        Keep your testnet project active for at least 30 days after migration 
        for debugging and comparison purposes.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
