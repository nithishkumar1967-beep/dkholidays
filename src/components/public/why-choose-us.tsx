"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Headphones, MapPin } from "lucide-react";
import { getSiteSettings } from "@/lib/supabase-admin";

const ICON_MAP: Record<string, typeof ShieldCheck> = {
  ShieldCheck, Sparkles, Headphones, MapPin,
};

const DEFAULT_ITEMS = [
  { icon: "ShieldCheck", title: "Professional Drivers", desc: "Trained, verified and courteous drivers on every trip. Background-checked for your safety." },
  { icon: "Sparkles", title: "Clean Vehicles", desc: "Sanitised, well-maintained fleet — inside and out. Every vehicle checked before each trip." },
  { icon: "Headphones", title: "24/7 Support", desc: "We pick up at any hour. Real people, real fast. Call or WhatsApp anytime." },
  { icon: "MapPin", title: "GPS Tracked", desc: "All vehicles are GPS-tracked with complete route planning for maximum safety." },
];

export function WhyChooseUs() {
  const [heading, setHeading] = useState("Why DK Holidays — Best Travel Agency in Coimbatore");
  const [items, setItems] = useState(DEFAULT_ITEMS);

  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (settings) {
        if (settings.why_choose_us_heading) setHeading(settings.why_choose_us_heading);
        const raw = settings.why_choose_us_items as unknown;
        if (typeof raw === "string") { try { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) setItems(p); } catch {} }
        else if (Array.isArray(raw) && raw.length) setItems(raw);
      }
    });
  }, []);

  return (
    <section className="py-20" id="why-choose-us">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-bold text-accent mb-3">Tours and Travels in Coimbatore — Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">{heading}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((reason: { icon: string; title: string; desc: string }, idx: number) => {
            const Icon = ICON_MAP[reason.icon as keyof typeof ICON_MAP] || ShieldCheck;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-white p-6 text-center transition-all hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{reason.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
