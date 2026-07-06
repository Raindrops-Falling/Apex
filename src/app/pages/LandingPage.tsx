import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { AlignSection } from '../components/AlignSection';
import { IntelligentSection } from '../components/IntelligentSection';
import { GallerySection } from '../components/GallerySection';
import { MetricsSection } from '../components/MetricsSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';
import { FooterSection } from '../components/FooterSection';

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f0e8' }}>
      <Navbar />
      <HeroSection />
      <AlignSection />
      <IntelligentSection />
      <GallerySection />
      <MetricsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
