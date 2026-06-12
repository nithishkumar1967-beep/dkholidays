"use client";

import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { FleetSection } from "@/components/public/fleet-section";
import { getSiteSettings } from "@/lib/supabase-admin";

export default function FleetPage() {
  const [heroTitle, setHeroTitle] = useState("The Right Vehicle<br/>for Every Trip");
  const [heroSubtitle, setHeroSubtitle] = useState("DK Holidays Coimbatore — modern, well-maintained fleet of tourist buses, SUVs, vans and luxury coaches for tours, corporate trips, weddings and airport transfers.");

  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (settings) {
        if (settings.fleet_hero_title) setHeroTitle(settings.fleet_hero_title);
        if (settings.fleet_hero_subtitle) setHeroSubtitle(settings.fleet_hero_subtitle);
      }
    });
  }, []);

  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Tours and Travels in Coimbatore — Our Fleet</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: heroTitle }} />
          <p className="text-white/70 max-w-2xl mx-auto">{heroSubtitle}</p>
        </div>
      </section>
      <FleetSection hideViewAll />
    </PublicLayout>
  );
}
