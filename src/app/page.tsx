import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import CTAForm from '@/components/CTAForm';
import Team from '@/components/Team';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <WhyUs />
        <Stats />
        <CTAForm />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
