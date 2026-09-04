"use client";

import { usePathname } from "next/navigation";
import type { LegalDocumentsSectionContent } from "@/lib/page-content";

interface LegalDocumentsSectionProps {
  content: LegalDocumentsSectionContent;
}

export default function LegalDocumentsSection({
  content,
}: LegalDocumentsSectionProps) {
  const pathname = usePathname();
  const isTerms = pathname === "/terms-of-use";
  const title = isTerms ? "Terms of Use" : "Privacy Policy";
  const body = isTerms ? content.termsOfUse : content.privacyPolicy;

  return (
    <section style={{ padding: "132px 56px 96px", background: "var(--stone)" }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        <h1 style={{ color: "var(--mineral)", margin: 0 }}>{title}</h1>
        <div
          style={{
            marginTop: "22px",
            color: "var(--marl)",
            lineHeight: 1.8,
            fontSize: "18px",
            whiteSpace: "pre-wrap",
          }}
        >
          {body}
        </div>
      </div>
    </section>
  );
}
