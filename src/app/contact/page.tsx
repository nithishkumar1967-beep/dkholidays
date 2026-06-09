import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/public-layout";
import { ContactSection } from "@/components/public/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with DK Holidays, Coimbatore. Call +91 9944890203, WhatsApp, or visit us for tourist bus rental, airport pickup and more.",
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Call us, message on WhatsApp, or visit — we typically respond within 10 minutes.
          </p>
        </div>
      </section>
      <ContactSection />
    </PublicLayout>
  );
}
