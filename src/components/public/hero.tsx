"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, MapPin, ChevronDown } from "lucide-react";
import { getSiteSettings } from "@/lib/supabase-admin";

export function Hero() {
  const [data, setData] = useState<{
    hero_title: string;
    hero_subtitle: string;
    hero_image: string;
    hero_stats: { num: string; label: string }[];
  }>({
    hero_title: "Reliable Travel Services<br/>For Every Journey",
    hero_subtitle: "Tourist buses, corporate transport, airport pickups, family trips and wedding transportation — booked in minutes over a simple call or WhatsApp.",
    hero_image: "/images/hero-bg.jpg",
    hero_stats: [],
  });

  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (!settings) return;
      let stats: { num: string; label: string }[] = [];
      const raw = settings.hero_stats as unknown;
      if (typeof raw === "string") { try { const p = JSON.parse(raw); if (Array.isArray(p)) stats = p; } catch {} }
      else if (Array.isArray(raw)) stats = raw;
      setData({
        hero_title: settings.hero_title || data.hero_title,
        hero_subtitle: settings.hero_subtitle || data.hero_subtitle,
        hero_image: settings.hero_image || data.hero_image,
        hero_stats: stats.length ? stats : [],
      });
    });
  }, []);

  const statsArr = data.hero_stats.length ? data.hero_stats : [
    { num: "10,000+", label: "Happy Travelers" },
    { num: "50+", label: "Vehicles" },
    { num: "8+", label: "Years Experience" },
    { num: "24/7", label: "Support" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary opacity-90" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('${data.hero_image}')` }}
      />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent mb-6">
            <MapPin size={14} />
            Coimbatore&apos;s Trusted Travel Brand
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: data.hero_title }}
          />
          <p className="text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
            {data.hero_subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+919944890203"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-all hover:bg-accent-light shadow-lg"
            >
              <Phone size={18} /> Call +91 99448 90203
            </a>
            <a
              href="https://wa.me/919944890203?text=Hi%20DK%20Holidays%2C%20I%27d%20like%20to%20book%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white transition-all hover:bg-whatsapp-dark shadow-lg"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>

        {statsArr.length > 0 && (
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {statsArr.map((stat: { num: string; label: string }, i: number) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-accent">
                  {stat.num}
                </div>
                <div className="text-xs text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
        <span className="text-xs">Scroll to explore</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
