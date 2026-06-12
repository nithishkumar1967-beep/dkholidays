"use client";

import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Target, Eye, ShieldCheck, Award, Users, Clock, HeartHandshake } from "lucide-react";
import { getSiteSettings } from "@/lib/supabase-admin";

const ICON_MAP: Record<string, typeof ShieldCheck> = {
  ShieldCheck, Award, Users, Clock, HeartHandshake, Target, Eye,
};

interface PageData {
  hero_title: string;
  hero_subtitle: string;
  story_heading: string;
  story_paragraphs: string[];
  image: string;
  stats: { value: string; label: string; icon: string }[];
  values: { icon: string; title: string; desc: string }[];
}

const DEFAULTS: PageData = {
  hero_title: "Built on Trust. Powered by <span class=\"text-accent\">Team Black Panther.</span>",
  hero_subtitle: "DK Holidays Coimbatore — trusted travel agency, tour operator and transportation partner since 2016. Best travels in Coimbatore for tours, bus rental and holiday packages.",
  story_heading: "Our Story",
  story_paragraphs: [
    "DK Holidays was founded by Mr. Dinesh Kumar with a simple vision — to provide safe, comfortable, and reliable transportation services to the people of Coimbatore and beyond.",
    "What started as a small fleet has grown into one of Coimbatore's most trusted travel brands, with 50+ vehicles serving thousands of happy customers every year.",
    "From corporate fleets to family vacations, school excursions to wedding parties, airport transfers to long-distance tours — we've moved people across South India with care, professionalism, and a smile. As a leading tour operator in Coimbatore, we offer customized tour packages, holiday packages, and travel services across Tamil Nadu and beyond.",
  ],
  image: "/images/about-img.jpg",
  stats: [
    { value: "8+", label: "Years Experience", icon: "Award" },
    { value: "10,000+", label: "Happy Travelers", icon: "Users" },
    { value: "24/7", label: "Support", icon: "Clock" },
    { value: "4.9", label: "Rating", icon: "HeartHandshake" },
  ],
  values: [
    { icon: "ShieldCheck", title: "Safety First", desc: "Every vehicle undergoes rigorous safety checks before each trip. Your safety is our top priority." },
    { icon: "Target", title: "Reliability", desc: "We value your time. Our fleet operates with military precision — on-time, every time." },
    { icon: "Eye", title: "Transparency", desc: "No hidden charges. No surprises. What we quote is what you pay." },
    { icon: "HeartHandshake", title: "Customer First", desc: "We treat every traveler like family. From booking to drop-off, we've got your back." },
  ],
};

export default function AboutPage() {
  const [data, setData] = useState<PageData>(DEFAULTS);

  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (!settings) return;
      const parseArr = (val: unknown, fallback: unknown[]) => {
        if (typeof val === "string") { try { const p = JSON.parse(val); if (Array.isArray(p) && p.length) return p; } catch {} }
        else if (Array.isArray(val) && val.length) return val;
        return fallback;
      };
      let paragraphs = parseArr(settings.about_story_paragraphs, DEFAULTS.story_paragraphs);
      let stats = parseArr(settings.about_stats, DEFAULTS.stats);
      let values = parseArr(settings.about_values, DEFAULTS.values);
      setData({
        hero_title: settings.about_hero_title || DEFAULTS.hero_title,
        hero_subtitle: settings.about_hero_subtitle || DEFAULTS.hero_subtitle,
        story_heading: settings.about_story_heading || DEFAULTS.story_heading,
        story_paragraphs: paragraphs,
        image: settings.about_image || DEFAULTS.image,
        stats,
        values,
      });
    });
  }, []);

  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Best Travel Agency in Coimbatore</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: data.hero_title }} />
          <p className="text-white/70 max-w-2xl mx-auto">{data.hero_subtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-primary mb-6">{data.story_heading}</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              {data.story_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
            <img src={data.image} alt="DK Holidays Story" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {data.stats.length > 0 && (
        <section className="py-16 bg-bg-light">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {data.stats.map((stat) => {
                const Icon = ICON_MAP[stat.icon] || Award;
                return (
                  <div key={stat.label} className="text-center rounded-2xl bg-white border border-border p-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={24} />
                    </div>
                    <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {data.values.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-primary mb-4">What We Stand For</h2>
              <p className="text-muted max-w-2xl mx-auto">Our core values drive everything we do.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {data.values.map((v) => {
                const Icon = ICON_MAP[v.icon] || ShieldCheck;
                return (
                  <div key={v.title} className="flex gap-4 rounded-2xl border border-border bg-white p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">{v.title}</h3>
                      <p className="text-sm text-muted">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
