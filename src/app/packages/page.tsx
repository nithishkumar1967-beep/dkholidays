"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { getPublishedPackages, getSiteSettings } from "@/lib/supabase-admin";
import type { Package } from "@/lib/types";

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [heroTitle, setHeroTitle] = useState("Curated Tour<br/>Packages");
  const [heroSubtitle, setHeroSubtitle] = useState("Handpicked travel experiences designed for every kind of traveler.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getPublishedPackages(),
      getSiteSettings(),
    ]).then(([pkgs, settings]) => {
      setPackages(pkgs);
      if (settings) {
        if (settings.packages_hero_title) setHeroTitle(settings.packages_hero_title);
        if (settings.packages_hero_subtitle) setHeroSubtitle(settings.packages_hero_subtitle);
      }
      setLoading(false);
    });
  }, []);

  return (
    <PublicLayout>
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-sm font-bold text-accent mb-3">Tour Packages</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: heroTitle }} />
          <p className="text-white/70 max-w-2xl mx-auto">{heroSubtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-bg-light">
        <div className="container-custom">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-80" />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-400 mb-2">No Packages Yet</h2>
              <p className="text-gray-500">Check back soon for exciting tour packages.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <Link key={pkg.id} href={`/packages/${pkg.slug}`} className="group block">
                  <div className="rounded-2xl border border-border bg-white overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-[16/10] bg-gradient-to-br from-accent/10 to-primary/10 overflow-hidden relative">
                      {pkg.image_url ? (
                        <img src={pkg.image_url} alt={pkg.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-primary/20">
                          <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h8m-8 4h8m-8 4h8M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                          </svg>
                        </div>
                      )}
                      {pkg.price && (
                        <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold text-white">
                          {pkg.price}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-primary mb-2">{pkg.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted mb-3">
                        {pkg.duration && <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration}</span>}
                        {pkg.places && <span className="flex items-center gap-1"><MapPin size={14} /> {String(pkg.places).split(",").length} places</span>}
                      </div>
                      {pkg.description && (
                        <p className="text-xs text-muted line-clamp-2 mb-4">{pkg.description}</p>
                      )}
                      {pkg.included && String(pkg.included).split(",").slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-muted list-none">
                          <CheckCircle size={11} className="text-accent shrink-0" />
                          {feat.trim()}
                        </li>
                      ))}
                      <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-accent group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
