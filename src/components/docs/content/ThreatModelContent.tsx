import { DocsPageTemplate, DocsH2, DocsH3, DocsP, DocsUl, DocsLi, DocsInlineCode, DocsTable, DocsThead, DocsTr, DocsTh, DocsTd } from "@/components/docs/DocsPageTemplate";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { DocsCallout } from "@/components/docs/DocsCallout";
import { getNavLinks } from "@/lib/docs-navigation";

const headings = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "threat-actors", text: "Threat Actors", level: 2 },
  { id: "attack-vectors", text: "Attack Vectors", level: 2 },
  { id: "mitigations", text: "Mitigations", level: 2 },
  { id: "trust-assumptions", text: "Trust Assumptions", level: 2 },
];

export const ThreatModelContent = () => {
  const { previous, next } = getNavLinks("/docs/threat-model");
  
  return (
    <DocsPageTemplate
      title="Threat Model"
      description="Understand the security boundaries, potential attack vectors, and how Tychee mitigates risks."
      badge="Security"
      headings={headings}
      previous={previous}
      next={next}
    >
      <DocsH2 id="overview">Overview</DocsH2>
      <DocsP>
        Tychee's threat model assumes that attackers may have access to encrypted data, 
        network traffic, and even parts of our infrastructure. Our security design ensures 
        that even in these scenarios, card data remains protected.
      </DocsP>

      <DocsCallout type="note">
        This document is reviewed and updated quarterly to address new threats and 
        vulnerabilities in the ecosystem.
      </DocsCallout>

      <DocsH2 id="threat-actors">Threat Actors</DocsH2>
      <DocsP>
        We consider the following threat actors in our security model:
      </DocsP>
      <DocsTable>
        <DocsThead>
          <DocsTr>
            <DocsTh>Actor</DocsTh>
            <DocsTh>Capability</DocsTh>
            <DocsTh>Motivation</DocsTh>
          </DocsTr>
        </DocsThead>
        <tbody>
          <DocsTr>
            <DocsTd>External Attackers</DocsTd>
            <DocsTd>Network access, phishing</DocsTd>
            <DocsTd>Financial gain</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Malicious Insiders</DocsTd>
            <DocsTd>Infrastructure access</DocsTd>
            <DocsTd>Data theft</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Compromised Dependencies</DocsTd>
            <DocsTd>Supply chain attacks</DocsTd>
            <DocsTd>Mass exploitation</DocsTd>
          </DocsTr>
          <DocsTr>
            <DocsTd>Nation States</DocsTd>
            <DocsTd>Advanced persistent threats</DocsTd>
            <DocsTd>Surveillance, espionage</DocsTd>
          </DocsTr>
        </tbody>
      </DocsTable>

      <DocsH2 id="attack-vectors">Attack Vectors</DocsH2>
      <DocsP>
        Known attack vectors and their risk assessment:
      </DocsP>
      <DocsUl>
        <DocsLi>
          <strong>Data Breach</strong> — Encrypted data is stolen from storage. 
          <span className="text-green-500 ml-2">Low Risk</span> (data is encrypted, keys are not stored)
        </DocsLi>
        <DocsLi>
          <strong>Man-in-the-Middle</strong> — Network traffic intercepted. 
          <span className="text-green-500 ml-2">Low Risk</span> (TLS + client-side encryption)
        </DocsLi>
        <DocsLi>
          <strong>Wallet Compromise</strong> — User's private key stolen. 
          <span className="text-yellow-500 ml-2">Medium Risk</span> (attacker can decrypt user's data)
        </DocsLi>
        <DocsLi>
          <strong>XSS/Injection</strong> — Malicious code in the browser. 
          <span className="text-yellow-500 ml-2">Medium Risk</span> (CSP and sanitization help)
        </DocsLi>
      </DocsUl>

      <DocsH2 id="mitigations">Mitigations</DocsH2>
      <DocsP>
        Security controls we implement:
      </DocsP>
      <DocsCodeBlock
        filename="security-controls.ts"
        language="typescript"
        code={`// SDK Security Features
const tychee = new TycheeSDK({
  projectId: 'your-project-id',
  chain: 'ethereum',
  security: {
    // Content Security Policy enforcement
    csp: true,
    
    // Subresource Integrity for SDK bundle
    sri: true,
    
    // Rate limiting on all operations
    rateLimit: { maxRequests: 100, windowMs: 60000 },
    
    // Require signature for all operations
    requireSignature: true,
    
    // Log all access attempts
    auditLogging: true,
  },
});

// Additional protections
// - No eval() or Function() usage
// - All dependencies audited with npm audit
// - Reproducible builds with lockfile`}
      />

      <DocsCallout type="tip" title="Defense in Depth">
        Our security model uses multiple layers of protection. Even if one layer is 
        bypassed, others remain to protect the data.
      </DocsCallout>

      <DocsH2 id="trust-assumptions">Trust Assumptions</DocsH2>
      <DocsP>
        Our security model makes the following trust assumptions:
      </DocsP>
      <DocsUl>
        <DocsLi>
          <strong>User's device is secure</strong> — The browser and OS are not compromised. 
          We cannot protect against keyloggers or browser extensions with full access.
        </DocsLi>
        <DocsLi>
          <strong>Cryptographic primitives are sound</strong> — AES-256-GCM and PBKDF2 have 
          no practical weaknesses.
        </DocsLi>
        <DocsLi>
          <strong>Wallet signature is authentic</strong> — The signature comes from the 
          legitimate wallet owner.
        </DocsLi>
        <DocsLi>
          <strong>Blockchain is immutable</strong> — Access control records on-chain cannot 
          be altered without consensus.
        </DocsLi>
      </DocsUl>

      <DocsCallout type="warning" title="Reporting Vulnerabilities">
        If you discover a security issue, please report it responsibly to{" "}
        <a href="mailto:security@tychee.io" className="text-primary hover:underline">
          security@tychee.io
        </a>. We offer a bug bounty program for qualifying reports.
      </DocsCallout>
    </DocsPageTemplate>
  );
};
