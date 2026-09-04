import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PolicyEditor from "@/components/legal/PolicyEditor";

export const metadata: Metadata = {
  title: "Legal Center | Canary Waves",
  description: "Unified Privacy Policy and Terms of Use editor for Canary Waves.",
};

const privacyPolicyDefault = `Privacy Policy
Effective Date: June the 1st 2025

1. Information We Collect
2. How We Use Your Information
3. Sharing of Information
4. Cookies and Tracking
5. Data Retention
6. Your Rights
7. Third-Party Links
8. Security
9. Children's Privacy
10. Changes to This Policy
11. Cookies Policy
12. Contact Us`;

const termsOfUseDefault = `Terms of Use
Effective Date: June the 1st 2025

1. Website Purpose
2. Permitted Use
3. Intellectual Property
4. No Warranties
5. Links to Other Websites
6. No Professional Relationship
7. Changes to the Site
8. Limitation of Liability
9. Governing Law
10. Contact Us`;

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main className="site-main">
        <section style={{ padding: "132px 56px 96px", background: "var(--stone)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <h1 style={{ color: "var(--mineral)", margin: 0 }}>Legal Center</h1>
            <p style={{ margin: "14px 0 0", color: "var(--marl)", fontSize: "18px" }}>
              Unified editor for Privacy Policy and Terms of Use.
            </p>
            <PolicyEditor
              privacyPolicy={privacyPolicyDefault}
              termsOfUse={termsOfUseDefault}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
