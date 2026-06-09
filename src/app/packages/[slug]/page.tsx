"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, IndianRupee, MapPin, Check, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPackageBySlug } from "@/lib/supabase-admin";
import type { Package } from "@/lib/types";

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPackageBySlug(slug).then(setPkg).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="animate-pulse h-screen bg-gray-50" />;

  if (!pkg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-3xl font-bold text-gray-300">Package Not Found</h1>
        <Link href="/packages"><Button variant="accent">View All Packages</Button></Link>
      </div>
    );
  }

  const placesList = String(pkg.places || "").split(",").filter(Boolean);
  const includedList = (pkg.included || "").split(",").filter(Boolean);
  const notIncludedList = (pkg.not_included || "").split(",").filter(Boolean);

  return (
    <main>
      <section className="relative h-[50vh] flex items-center justify-center">
        {pkg.image_url ? (
          <img src={pkg.image_url} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B3B2C] to-[#1A6B4C]" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{pkg.title}</h1>
          <div className="flex items-center justify-center gap-6 text-white/90 text-sm md:text-base">
            {pkg.duration && <span className="flex items-center gap-2"><Clock size={18} /> {pkg.duration}</span>}
            {pkg.price && <span className="flex items-center gap-2">{pkg.price}</span>}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/packages" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={16} /> Back to Packages
        </Link>

        {pkg.description && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-primary mb-3">About This Package</h2>
            <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
          </div>
        )}

        {placesList.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-primary mb-3">Places Covered</h2>
            <div className="flex flex-wrap gap-3">
              {placesList.map((place, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <MapPin size={14} /> {place.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {includedList.length > 0 && (
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2"><CheckCircle size={20} /> Included</h3>
              <ul className="space-y-2">
                {includedList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                    <Check size={16} className="mt-0.5 shrink-0" /> {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {notIncludedList.length > 0 && (
            <div className="bg-red-50 rounded-2xl p-6">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2"><X size={20} /> Not Included</h3>
              <ul className="space-y-2">
                {notIncludedList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <X size={16} className="mt-0.5 shrink-0" /> {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/contact"><Button variant="accent" size="lg">Book This Package</Button></Link>
        </div>
      </div>
    </main>
  );
}
