import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "requirements", text: "Requirements", level: 2 },
  { id: "package-managers", text: "Package Managers", level: 2 },
  { id: "npm", text: "npm", level: 3 },
  { id: "yarn", text: "yarn", level: 3 },
  { id: "pnpm", text: "pnpm", level: 3 },
  { id: "cdn-usage", text: "CDN Usage", level: 2 },
  { id: "typescript-support", text: "TypeScript Support", level: 2 },
];

export const InstallationContent = () => {
  const { previous, next } = getNavLinks("/docs/installation");
  
  return (
    <DocsPageTemplate
      title="Installation"
      description="Install the Tychee SDK in your project using your preferred package manager."
      badge="Getting Started"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="requirements">Requirements</DocsH2>
      <DocsP>
        Before installing Tychee, ensure your project meets the following requirements:
      </DocsP>
      <DocsUl>
        <DocsLi><DocsInlineCode>Node.js 16.0</DocsInlineCode> or higher</DocsLi>
        <DocsLi><DocsInlineCode>React 18.0+</DocsInlineCode> (for React bindings)</DocsLi>
        <DocsLi>A Web3 wallet provider (ethers.js, wagmi, or viem)</DocsLi>
      </DocsUl>

      <DocsH2 id="package-managers">Package Managers</DocsH2>
      <DocsP>
        Choose your preferred package manager to install the SDK:
      </DocsP>

      <DocsH3 id="npm">npm</DocsH3>
      <DocsCodeBlock
        filename="terminal"
        language="bash"
        code={`npm install @tychee/sdk`}
      />

      <DocsH3 id="yarn">yarn</DocsH3>
      <DocsCodeBlock
        filename="terminal"
        language="bash"
        code={`yarn add @tychee/sdk`}
      />

      <DocsH3 id="pnpm">pnpm</DocsH3>
      <DocsCodeBlock
        filename="terminal"
        language="bash"
        code={`pnpm add @tychee/sdk`}
      />

      <DocsCallout type="tip" title="Recommended">
        We recommend using <DocsInlineCode>pnpm</DocsInlineCode> for faster installation 
        and better disk space efficiency.
      </DocsCallout>

      <DocsH2 id="cdn-usage">CDN Usage</DocsH2>
      <DocsP>
        For quick prototyping, you can include Tychee directly via CDN:
      </DocsP>
      <DocsCodeBlock
        filename="index.html"
        language="html"
        code={`<script src="https://unpkg.com/@tychee/sdk@latest/dist/tychee.umd.js"></script>
<script>
  const tychee = new Tychee.TycheeSDK({
    projectId: 'your-project-id',
    chain: 'ethereum',
  });
</script>`}
      />

      <DocsCallout type="warning" title="Production Note">
        CDN usage is not recommended for production. Always bundle the SDK with your 
        application for better performance and security.
      </DocsCallout>

      <DocsH2 id="typescript-support">TypeScript Support</DocsH2>
      <DocsP>
        Tychee is written in TypeScript and includes full type definitions out of the box. 
        No additional <DocsInlineCode>@types</DocsInlineCode> packages are required.
      </DocsP>
      <DocsCodeBlock
        filename="tsconfig.json"
        language="json"
        code={`{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler"
  }
}`}
      />
    </DocsPageTemplate>
  );
};
