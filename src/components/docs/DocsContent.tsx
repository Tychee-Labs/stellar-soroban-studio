import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Copy, Check, Terminal, Code, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="bg-[#0d0d0d] border border-border rounded-xl p-4 overflow-x-auto">
        <code className="text-sm text-muted-foreground font-mono">{code}</code>
      </pre>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <div className="bg-secondary/20 border border-border rounded-xl p-6 my-6">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h4 className="font-semibold text-foreground">{title}</h4>
    </div>
    <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
  </div>
);

export const DocsContent = () => {
  return (
    <article className="prose prose-invert max-w-none">
      {/* Introduction */}
      <AnimatedSection>
        <section id="introduction" className="mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Tychee SDK Documentation
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Build seamless Web3 experiences with account abstraction, gas sponsorship, and 
            social logins. The Tychee SDK provides everything you need to create user-friendly 
            decentralized applications.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 my-8">
            {[
              { icon: Terminal, title: "Quick Setup", desc: "Get started in under 5 minutes" },
              { icon: Code, title: "TypeScript First", desc: "Full type safety and IntelliSense" },
              { icon: Zap, title: "Zero Gas UX", desc: "Sponsor transactions for users" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary/20 border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
              >
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Installation */}
      <AnimatedSection delay={0.1}>
        <section id="installation" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
            Installation
          </h2>
          <p className="text-muted-foreground mb-4">
            Install the Tychee SDK using your preferred package manager:
          </p>
          
          <CodeBlock code="npm install @tychee/sdk" />
          
          <p className="text-sm text-muted-foreground mt-4">
            Or using yarn or pnpm:
          </p>
          
          <CodeBlock code="yarn add @tychee/sdk" />
          <CodeBlock code="pnpm add @tychee/sdk" />
        </section>
      </AnimatedSection>

      {/* Quick Start */}
      <AnimatedSection delay={0.15}>
        <section id="quick-start" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
            Quick Start
          </h2>
          <p className="text-muted-foreground mb-4">
            Wrap your application with the TycheeProvider and start building:
          </p>
          
          <CodeBlock 
            language="tsx"
            code={`import { TycheeProvider } from '@tychee/sdk';

function App() {
  return (
    <TycheeProvider
      projectId="your-project-id"
      chains={['ethereum', 'polygon', 'arbitrum']}
    >
      <YourApp />
    </TycheeProvider>
  );
}`} 
          />

          <InfoCard icon={Zap} title="Pro Tip">
            Enable gas sponsorship by adding the <code className="text-primary">sponsorGas</code> prop 
            to cover transaction fees for your users.
          </InfoCard>
        </section>
      </AnimatedSection>

      {/* Configuration */}
      <AnimatedSection delay={0.2}>
        <section id="configuration" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
            Configuration
          </h2>
          <p className="text-muted-foreground mb-4">
            Configure the SDK with your project settings:
          </p>
          
          <CodeBlock 
            language="tsx"
            code={`const config = {
  projectId: process.env.TYCHEE_PROJECT_ID,
  chains: ['ethereum', 'polygon', 'arbitrum'],
  
  // Account Abstraction settings
  accountAbstraction: {
    enabled: true,
    bundlerUrl: 'https://bundler.tychee.io',
    paymasterUrl: 'https://paymaster.tychee.io',
  },
  
  // Social login providers
  socialLogins: {
    google: true,
    twitter: true,
    discord: true,
  },
  
  // UI customization
  theme: {
    primaryColor: '#f2572b',
    borderRadius: 12,
  },
};`} 
          />
        </section>
      </AnimatedSection>

      {/* Wallet Connection */}
      <AnimatedSection delay={0.25}>
        <section id="wallet-connection" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Wallet Connection</h2>
          <p className="text-muted-foreground mb-4">
            Connect wallets seamlessly with built-in support for WalletConnect, Coinbase Wallet, 
            and social logins:
          </p>
          
          <CodeBlock 
            language="tsx"
            code={`import { useWallet } from '@tychee/sdk';

function ConnectButton() {
  const { connect, disconnect, address, isConnected } = useWallet();
  
  if (isConnected) {
    return (
      <button onClick={disconnect}>
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }
  
  return <button onClick={connect}>Connect Wallet</button>;
}`} 
          />
        </section>
      </AnimatedSection>

      {/* Account Abstraction */}
      <AnimatedSection delay={0.3}>
        <section id="account-abstraction" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Account Abstraction</h2>
          <p className="text-muted-foreground mb-4">
            Leverage ERC-4337 account abstraction for enhanced user experience. Smart accounts 
            enable features like batch transactions, session keys, and gas sponsorship.
          </p>
          
          <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-xl p-6 my-6">
            <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span>No seed phrases - social recovery and passkeys support</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span>Batch multiple transactions into a single user operation</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span>Pay gas in any ERC-20 token or sponsor for users</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                <span>Session keys for seamless gaming and DeFi experiences</span>
              </li>
            </ul>
          </div>
        </section>
      </AnimatedSection>

      {/* Gas Sponsorship */}
      <AnimatedSection delay={0.35}>
        <section id="gas-sponsorship" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Gas Sponsorship</h2>
          <p className="text-muted-foreground mb-4">
            Remove the friction of gas fees by sponsoring transactions for your users:
          </p>
          
          <CodeBlock 
            language="tsx"
            code={`import { useSponsor } from '@tychee/sdk';

function SponsoredTransaction() {
  const { sponsorTransaction, balance } = useSponsor();
  
  const handleMint = async () => {
    await sponsorTransaction({
      to: NFT_CONTRACT,
      data: encodeFunctionData({
        abi: nftAbi,
        functionName: 'mint',
        args: [address],
      }),
    });
  };
  
  return (
    <div>
      <p>Sponsor balance: {balance} ETH</p>
      <button onClick={handleMint}>Mint NFT (Gas Free!)</button>
    </div>
  );
}`} 
          />
        </section>
      </AnimatedSection>

      {/* Session Keys */}
      <AnimatedSection delay={0.4}>
        <section id="session-keys" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Session Keys</h2>
          <p className="text-muted-foreground mb-4">
            Create temporary keys with limited permissions for seamless UX in gaming, 
            trading, and other high-frequency use cases.
          </p>
          
          <CodeBlock 
            language="tsx"
            code={`import { useSessionKey } from '@tychee/sdk';

function GameSession() {
  const { createSession, session } = useSessionKey();
  
  const startGame = async () => {
    await createSession({
      permissions: [
        {
          contract: GAME_CONTRACT,
          functions: ['move', 'attack', 'collect'],
        },
      ],
      expiry: Date.now() + 60 * 60 * 1000, // 1 hour
      gasLimit: parseEther('0.01'),
    });
  };
  
  return <button onClick={startGame}>Start Playing</button>;
}`} 
          />
        </section>
      </AnimatedSection>

      {/* More sections... */}
      <AnimatedSection delay={0.45}>
        <section id="tychee-provider" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">TycheeProvider</h2>
          <p className="text-muted-foreground mb-4">
            The root provider component that initializes the SDK and provides context to all child components.
          </p>
          
          <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">projectId</code></td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">Your Tychee project ID</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">chains</code></td>
                  <td className="py-3 px-4">string[]</td>
                  <td className="py-3 px-4">Array of supported chain names</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4"><code className="text-primary">sponsorGas</code></td>
                  <td className="py-3 px-4">boolean</td>
                  <td className="py-3 px-4">Enable gas sponsorship</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </AnimatedSection>

      {/* Continue with more documentation sections as needed */}
      <AnimatedSection delay={0.5}>
        <section id="use-wallet" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">useWallet Hook</h2>
          <p className="text-muted-foreground mb-4">
            The primary hook for wallet connection and management.
          </p>
          
          <CodeBlock 
            language="tsx"
            code={`const {
  // Connection
  connect,      // () => Promise<void>
  disconnect,   // () => void
  
  // State
  address,      // string | undefined
  isConnected,  // boolean
  isConnecting, // boolean
  
  // Chain
  chainId,      // number
  switchChain,  // (chainId: number) => Promise<void>
  
  // Signing
  signMessage,  // (message: string) => Promise<string>
  signTypedData, // (data: TypedData) => Promise<string>
} = useWallet();`} 
          />
        </section>
      </AnimatedSection>
    </article>
  );
};
