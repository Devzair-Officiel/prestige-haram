import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import WhatsAppFloat from '../../components/ui/WhatsAppFloat';
import Hero from './sections/Hero';
import QuoteForm from './sections/QuoteForm';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import Hotels from './sections/Hotels';
import Testimonials from './sections/Testimonials';
import Faq from './sections/Faq';
import ContactCta from './sections/ContactCta';

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuoteForm />
        <Services />
        <HowItWorks />
        <Hotels />
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
