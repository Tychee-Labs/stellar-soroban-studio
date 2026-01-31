import { useParams, Navigate } from "react-router-dom";
import { DocsLayout } from "@/components/docs/DocsLayout";
import {
  IntroductionContent,
  InstallationContent,
  QuickstartContent,
  TokenVaultContent,
  CardLifecycleContent,
  AccountAbstractionContent,
  EncryptionModelContent,
  KeyDerivationContent,
  ThreatModelContent,
  TycheeSDKContent,
  StoreCardContent,
  RetrieveCardContent,
  RevokeCardContent,
  NextjsGuideContent,
  TestnetMainnetContent,
} from "@/components/docs/content";

// Map slugs to content components
const contentMap: Record<string, React.ComponentType> = {
  'introduction': IntroductionContent,
  'installation': InstallationContent,
  'quickstart': QuickstartContent,
  'token-vault': TokenVaultContent,
  'card-lifecycle': CardLifecycleContent,
  'account-abstraction': AccountAbstractionContent,
  'encryption-model': EncryptionModelContent,
  'key-derivation': KeyDerivationContent,
  'threat-model': ThreatModelContent,
  'api/tychee-sdk': TycheeSDKContent,
  'api/store-card': StoreCardContent,
  'api/retrieve-card': RetrieveCardContent,
  'api/revoke-card': RevokeCardContent,
  'guides/nextjs': NextjsGuideContent,
  'guides/testnet-mainnet': TestnetMainnetContent,
};

const Docs = () => {
  const params = useParams();
  
  // Get the full slug from the catch-all route
  const slug = params['*'] || 'introduction';
  
  // If no slug, redirect to introduction
  if (!slug || slug === '') {
    return <Navigate to="/docs/introduction" replace />;
  }
  
  // Get the content component for this slug
  const ContentComponent = contentMap[slug];
  
  // If no content found, show the introduction (or could show 404)
  if (!ContentComponent) {
    return <Navigate to="/docs/introduction" replace />;
  }
  
  return (
    <DocsLayout activeSlug={`/docs/${slug}`}>
      <ContentComponent />
    </DocsLayout>
  );
};

export default Docs;
