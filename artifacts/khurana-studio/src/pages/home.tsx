import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProcessSection } from "@/components/sections/process";
import { PricingSection } from "@/components/sections/pricing";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq";
import { InstagramSection } from "@/components/sections/instagram";
import { ContactCtaSection } from "@/components/sections/contact-cta";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { LoadingScreen } from "@/components/loading-screen";
import { useLenis } from "@/hooks/use-lenis";

export const Home = () => {
  useLenis();

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main className="min-h-[100dvh] bg-background">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <PortfolioPreview />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <InstagramSection />
        <ContactCtaSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
