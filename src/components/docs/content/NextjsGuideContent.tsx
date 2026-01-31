import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "installation", text: "Installation", level: 2 },
  { id: "environment-setup", text: "Environment Setup", level: 2 },
  { id: "client-component", text: "Client Component", level: 2 },
  { id: "server-actions", text: "Server Actions", level: 2 },
  { id: "api-routes", text: "API Routes", level: 2 },
];

export const NextjsGuideContent = () => {
  const { previous, next } = getNavLinks("/docs/guides/nextjs");
  
  return (
    <DocsPageTemplate
      title="Next.js Integration"
      description="A complete guide to integrating Tychee SDK with Next.js 14+ App Router."
      badge="Guides"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        This guide covers integrating Tychee with Next.js 14 using the App Router. 
        Since Tychee's encryption happens client-side, we'll use React Client Components 
        for the card form.
      </DocsP>

      <DocsH2 id="installation">Installation</DocsH2>
      <DocsCodeBlock
        filename="terminal"
        language="bash"
        code={`npm install @tychee/sdk @tychee/react`}
      />

      <DocsH2 id="environment-setup">Environment Setup</DocsH2>
      <DocsP>
        Add your Tychee credentials to <DocsInlineCode>.env.local</DocsInlineCode>:
      </DocsP>
      <DocsCodeBlock
        filename=".env.local"
        language="bash"
        code={`NEXT_PUBLIC_TYCHEE_PROJECT_ID=proj_abc123
NEXT_PUBLIC_TYCHEE_CHAIN=ethereum
NEXT_PUBLIC_TYCHEE_ENV=testnet`}
      />

      <DocsCallout type="note">
        Use <DocsInlineCode>NEXT_PUBLIC_</DocsInlineCode> prefix for variables that 
        need to be available in the browser for client-side encryption.
      </DocsCallout>

      <DocsH2 id="client-component">Client Component</DocsH2>
      <DocsP>
        Create a client-side card form component:
      </DocsP>
      <DocsCodeBlock
        filename="app/components/CardForm.tsx"
        language="typescript"
        code={`'use client';

import { TycheeProvider, useStoreCard } from '@tychee/react';
import { useState } from 'react';

function CardFormInner() {
  const { storeCard, isLoading, error } = useStoreCard();
  const [cardData, setCardData] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = await storeCard({
      number: cardData.number,
      expMonth: parseInt(cardData.expMonth),
      expYear: parseInt(cardData.expYear),
      cvc: cardData.cvc,
    });

    // Send token to your backend
    await fetch('/api/save-card', {
      method: 'POST',
      body: JSON.stringify({ tokenId: token.id }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Card inputs */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Card'}
      </button>
      {error && <p className="error">{error.message}</p>}
    </form>
  );
}

export function CardForm() {
  return (
    <TycheeProvider
      projectId={process.env.NEXT_PUBLIC_TYCHEE_PROJECT_ID!}
      chain={process.env.NEXT_PUBLIC_TYCHEE_CHAIN as 'ethereum'}
    >
      <CardFormInner />
    </TycheeProvider>
  );
}`}
      />

      <DocsH2 id="server-actions">Server Actions</DocsH2>
      <DocsP>
        Use Server Actions to securely store token IDs:
      </DocsP>
      <DocsCodeBlock
        filename="app/actions/cards.ts"
        language="typescript"
        code={`'use server';

import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function saveCardToken(tokenId: string) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  // Store the token ID (not the card data!)
  await db.card.create({
    data: {
      tokenId,
      userId: session.user.id,
      createdAt: new Date(),
    },
  });

  return { success: true };
}`}
      />

      <DocsCallout type="warning" title="Security">
        Never log or store raw card data on your server. Only store the token ID 
        returned by <DocsInlineCode>storeCard()</DocsInlineCode>.
      </DocsCallout>

      <DocsH2 id="api-routes">API Routes</DocsH2>
      <DocsP>
        Create API routes for card operations:
      </DocsP>
      <DocsCodeBlock
        filename="app/api/cards/route.ts"
        language="typescript"
        code={`import { NextRequest, NextResponse } from 'next/server';
import { TycheeServer } from '@tychee/sdk/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

const tychee = new TycheeServer({
  projectId: process.env.TYCHEE_PROJECT_ID!,
  secretKey: process.env.TYCHEE_SECRET_KEY!,
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user's saved cards (metadata only)
  const cards = await db.card.findMany({
    where: { userId: session.user.id },
    select: { tokenId: true, createdAt: true },
  });

  // Fetch card metadata from Tychee
  const cardDetails = await Promise.all(
    cards.map(async (card) => {
      const meta = await tychee.getTokenMetadata(card.tokenId);
      return { ...card, lastFour: meta.lastFour, brand: meta.brand };
    })
  );

  return NextResponse.json(cardDetails);
}`}
      />

      <DocsCallout type="tip" title="Best Practice">
        Use <DocsInlineCode>TycheeServer</DocsInlineCode> on the backend with your 
        secret key for operations that don't require user signatures.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
