import { PublicLayout } from "@/components/layout/public-layout";
import { Hero } from "@/components/public/hero";
import { ServicesSection } from "@/components/public/services-section";
import { AboutSection } from "@/components/public/about-section";
import { FleetSection } from "@/components/public/fleet-section";
import { GallerySection } from "@/components/public/gallery-section";
import { WhyChooseUs } from "@/components/public/why-choose-us";
import { Testimonials } from "@/components/public/testimonials";
import { ContactSection } from "@/components/public/contact-section";
import { ReviewModal } from "@/components/public/review-modal";

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <FleetSection limit={3} />
      <GallerySection />
      <WhyChooseUs />
      <Testimonials />
      <ReviewModal />
      <ContactSection />
    </PublicLayout>
  );
}
