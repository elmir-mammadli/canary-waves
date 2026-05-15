import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionRenderer from '@/components/SectionRenderer';
import RequestDemoModal from '@/components/RequestDemoModal';
import { getPageBySlug } from '@/lib/strapi';

export const revalidate = 300;

export default async function Home() {
  const page = await getPageBySlug('home');

  return (
    <>
      <Navbar />
      <main className="site-main">
        <SectionRenderer sections={page.sections} />
      </main>
      <Footer />
      <RequestDemoModal />
    </>
  );
}
