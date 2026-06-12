import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/public-layout";
import { ContactSection } from "@/components/public/contact-section";

export const metadata: Metadata = {
  title: "Contact DK Holidays Coimbatore – Best Travel Agency | Tours & Travels",
  description: "Contact DK Holidays — the best travel agency in Coimbatore. Call +91 9944890203, WhatsApp, or visit us for tours, holiday packages, bus rental, airport pickup & travel services.",
  keywords: [
    "DK Holidays Contact Number",
    "travel agency coimbatore",
    "best travel agency in coimbatore",
    "tours and travels in coimbatore",
    "DK Holidays Coimbatore",
    "travel agency near me coimbatore",
    "coimbatore holiday planner",
  ],
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Contact DK Holidays Coimbatore</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            DK Holidays — best travel agency in Coimbatore. Call +91 9944890203, message on WhatsApp, or visit us for tours, holiday packages, bus rental and travel services.
          </p>
        </div>
      </section>
      <ContactSection />
    </PublicLayout>
  );
}
