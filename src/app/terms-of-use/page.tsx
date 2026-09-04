import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionRenderer from "@/components/SectionRenderer";
import { getPageBySlug } from "@/lib/strapi";

export const revalidate = 300;

export default async function TermsOfUsePage() {
  const page = await getPageBySlug("terms-of-use");
  if (page.slug !== "terms-of-use") notFound();

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
