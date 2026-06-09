"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bus, Briefcase, Plane, Users, BookOpen, Heart } from "lucide-react";
import { getActiveServices } from "@/lib/supabase-admin";
import type { Service } from "@/lib/types";

const ICON_MAP: Record<string, React.ReactNode> = {
  bus: <Bus size={28} />,
  briefcase: <Briefcase size={28} />,
  plane: <Plane size={28} />,
  users: <Users size={28} />,
  school: <BookOpen size={28} />,
  heart: <Heart size={28} />,
};

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getActiveServices().then(setServices);
  }, []);

  const displayServices = services.length
    ? services
    : [
        {
          id: "1",
          title: "Tourist Bus Rental",
          description: "Comfortable AC buses for sightseeing & long-distance group trips across South India.",
          image_url: "",
          display_order: 1,
          active: true,
          created_at: "",
        },
        {
          id: "2",
          title: "Corporate Transport",
          description: "Daily staff transport & corporate event mobility solutions, on-time every time.",
          image_url: "",
          display_order: 2,
          active: true,
          created_at: "",
        },
        {
          id: "3",
          title: "Airport Pickup",
          description: "On-time, professional airport drop-offs and pickups at Coimbatore Airport, 24/7.",
          image_url: "",
          display_order: 3,
          active: true,
          created_at: "",
        },
        {
          id: "4",
          title: "Family Trips",
          description: "Hassle-free family vacations across South India with comfortable, safe vehicles.",
          image_url: "",
          display_order: 4,
          active: true,
          created_at: "",
        },
        {
          id: "5",
          title: "School Tours",
          description: "Safe, supervised transportation for school excursions with trained, verified drivers.",
          image_url: "",
          display_order: 5,
          active: true,
          created_at: "",
        },
        {
          id: "6",
          title: "Wedding Transportation",
          description: "Premium fleet for wedding parties and guest transfers — arrive in style.",
          image_url: "",
          display_order: 6,
          active: true,
          created_at: "",
        },
      ];

  const icons = [Bus, Briefcase, Plane, Users, BookOpen, Heart];

  return (
    <section className="py-20 bg-bg-light" id="services">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-bold text-accent mb-3">Our Services</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
            Travel Solutions for Every Occasion
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            From corporate fleets to family vacations — we&apos;ve got the right ride for every journey.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.map((service, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{service.description}</p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:gap-2 transition-all"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
