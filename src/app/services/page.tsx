"use client";

import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Bus, Briefcase, Plane, Users, BookOpen, Heart, CheckCircle } from "lucide-react";
import { getActiveServices, getSiteSettings } from "@/lib/supabase-admin";
import type { Service } from "@/lib/types";

const ICON_MAP: Record<string, typeof Bus> = {
  Bus, Briefcase, Plane, Users, BookOpen, Heart,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [heroTitle, setHeroTitle] = useState("Travel Services in<br/>Coimbatore");
  const [heroSubtitle, setHeroSubtitle] = useState("DK Holidays is the best travel agency in Coimbatore offering tours and travels, tourist bus rental, corporate transport, airport pickup, family tours, school trips, wedding transport & holiday packages.");

  useEffect(() => {
    getActiveServices().then(setServices);
    getSiteSettings().then((settings) => {
      if (settings) {
        if (settings.services_hero_title) setHeroTitle(settings.services_hero_title);
        if (settings.services_hero_subtitle) setHeroSubtitle(settings.services_hero_subtitle);
      }
    });
  }, []);

  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Travel Agency Coimbatore — Our Services</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: heroTitle }} />
          <p className="text-white/70 max-w-2xl mx-auto">{heroSubtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom space-y-16">
          {services.map((service, idx) => {
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP] || Bus;
            let features: string[] = [];
            if (Array.isArray(service.features)) features = service.features;
            else try { features = JSON.parse(String(service.features || "[]")); } catch {}
            return (
              <div
                key={service.id}
                className={`grid gap-8 lg:grid-cols-2 items-center ${
                  idx % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon size={28} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4">{service.title}</h2>
                  <p className="text-muted leading-relaxed mb-6">{service.description}</p>
                  {features.length > 0 && (
                    <ul className="space-y-2">
                      {features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted">
                          <CheckCircle size={16} className="text-accent shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="tel:+919944890203"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-white hover:bg-accent-light transition-all"
                    >
                      Call to Book
                    </a>
                    <a
                      href={`https://wa.me/919944890203?text=Hi%20DK%20Holidays%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(service.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-xs font-bold text-white hover:bg-whatsapp-dark transition-all"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 overflow-hidden">
                  {service.image_url ? (
                    <img src={service.image_url} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-primary/20">
                      <Icon size={64} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
