"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, CheckCircle } from "lucide-react";
import { getActiveFleet } from "@/lib/supabase-admin";
import type { Fleet } from "@/lib/types";

export function FleetSection({ hideViewAll, limit }: { hideViewAll?: boolean; limit?: number }) {
  const [fleet, setFleet] = useState<Fleet[]>([]);

  useEffect(() => {
    getActiveFleet().then(setFleet);
  }, []);

  const displayFleet = limit ? fleet.slice(0, limit) : fleet;
  const fallback = displayFleet.length
    ? displayFleet
    : [
        {
          id: "1",
          title: "AC Tourist Bus",
          description: "Full AC, reclining seats, GPS tracked",
          image_url: "",
          capacity: "40-52 Seats",
          vehicle_type: "bus",
          display_order: 1,
          active: true,
          created_at: "",
        },
        {
          id: "2",
          title: "Mini Bus",
          description: "AC Available, luggage space, GPS tracked",
          image_url: "",
          capacity: "20-30 Seats",
          vehicle_type: "minibus",
          display_order: 2,
          active: true,
          created_at: "",
        },
        {
          id: "3",
          title: "SUV / Innova",
          description: "Premium AC, leather seats, airport transfers",
          image_url: "",
          capacity: "6-8 Seats",
          vehicle_type: "suv",
          display_order: 3,
          active: true,
          created_at: "",
        },
      ];

  return (
    <section className="py-20 bg-bg-light" id="fleet">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-bold text-accent mb-3">Our Fleet</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
            The Right Vehicle for Every Trip
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Modern, well-maintained, and ready when you are — our fleet covers every occasion.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fallback.map((vehicle, idx) => (
            <div
              key={vehicle.id}
              className="group rounded-2xl border border-border bg-white overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-accent/10 to-primary/10 overflow-hidden">
                {vehicle.image_url ? (
                  <img
                    src={vehicle.image_url}
                    alt={vehicle.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-primary/20">
                    <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h8m-8 4h8m-8 4h8M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                  </div>
                )}
                {idx === 0 && (
                  <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold text-white">
                    Most Popular
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-primary mb-2">{vehicle.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted mb-3">
                  <Users size={15} /> {vehicle.capacity}
                </div>
                <ul className="space-y-1 mb-4">
                  {vehicle.description.split(",").map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-muted">
                      <CheckCircle size={12} className="text-accent shrink-0" />
                      {feat.trim()}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/919944890203?text=Hi%20DK%20Holidays%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(vehicle.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent-light transition-all"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {!hideViewAll && (
          <div className="text-center mt-10">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
            >
              View Full Fleet
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
