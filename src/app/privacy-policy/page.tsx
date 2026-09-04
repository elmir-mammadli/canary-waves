import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionRenderer from "@/components/SectionRenderer";
import { getPageBySlug } from "@/lib/strapi";

export const revalidate = 300;

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy-policy");
  if (page.slug !== "privacy-policy") notFound();

  return (
    <>
      <Navbar />
      <main className="site-main">
        <SectionRenderer sections={page.sections} />
      </main>
      <Footer />
    </>
  );
}
