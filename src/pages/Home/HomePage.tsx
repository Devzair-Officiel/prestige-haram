import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import { usePageMetadata } from '../../hooks/usePageMetadata';
import Hero from './sections/Hero';
import QuoteForm from './sections/QuoteForm';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import Hotels from './sections/Hotels';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Faq from './sections/Faq';
import ContactCta from './sections/ContactCta';

function HomePage() {
  usePageMetadata({
    title: "Haramain Prestige – Réservation d'hôtels à Makkah & Madinah",
    description:
      "Haramain Prestige — réservation d'hôtels et accompagnement à Makkah & Madinah.",
    path: '/',
  });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuoteForm />
        <Services />
        <HowItWorks />
        <Hotels />
        <About />
        <Testimonials />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default HomePage;
