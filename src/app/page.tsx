import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import CTAForm from '@/components/CTAForm';
import Team from '@/components/Team';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import RequestDemoModal from '@/components/RequestDemoModal';
import { getLandingPageContent } from '@/lib/strapi';

export const revalidate = 60;

export default async function Home() {
  const content = await getLandingPageContent();

  return (
    <>
      <Navbar />
      <main className="site-main">
        <Hero content={content.hero} />
        <About content={content.about} />
        <Features content={content.features} />
        <HowItWorks content={content.workflow} />
        <WhyUs content={content.whyUs} />
        <Team content={content.team} />
        <CTAForm />
        <FAQ content={content.faq} />
      </main>
      <Footer />
      <RequestDemoModal />
    </>
  );
}
