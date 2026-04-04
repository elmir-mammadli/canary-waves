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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="site-main">
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <WhyUs />
        <Team />
        <CTAForm />
        <FAQ />
      </main>
      <Footer />
      <RequestDemoModal />
    </>
  );
}
