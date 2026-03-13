import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import AboutSection from './components/AboutSection';
import CoreValues from './components/CoreValues';
import TeamSection from './components/TeamSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import UIExtras from './components/UIExtras';

export default function Home() {
  return (
    <main className="relative">
      <UIExtras />
      <Navbar />
      <Hero />
      <PracticeAreas />
      <AboutSection />
      <CoreValues />
      <TeamSection />
      <Testimonials />
      <FAQ />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
