"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Target, Eye, ShieldCheck } from "lucide-react";
import { getSiteSettings } from "@/lib/supabase-admin";

interface AboutData {
  title: string;
  description: string;
  mission_title: string;
  mission_desc: string;
  vision_title: string;
  vision_desc: string;
  image: string;
}

const DEFAULTS: AboutData = {
  title: "Built on Trust. Powered by <span class=\"text-accent\">Team Black Panther.</span>",
  description: "DK Holidays is the best travel agency in Coimbatore, founded by Mr. Dinesh Kumar. We offer tours and travels, tourist bus rental, holiday packages, and transportation services across Tamil Nadu and South India. With a modern fleet, professional drivers, and a no-surprises booking experience, we are the most trusted travel company in Coimbatore.",
  mission_title: "Our Mission",
  mission_desc: "Safe, comfortable, affordable travel — every trip.",
  vision_title: "Our Vision",
  vision_desc: "South India's most trusted tourist transport name.",
  image: "/images/about-img.jpg",
};

export function AboutSection() {
  const [data, setData] = useState<AboutData>(DEFAULTS);

  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (settings) {
        setData({
          title: settings.about_title || DEFAULTS.title,
          description: settings.about_description || DEFAULTS.description,
          mission_title: settings.about_mission_title || DEFAULTS.mission_title,
          mission_desc: settings.about_mission_desc || DEFAULTS.mission_desc,
          vision_title: settings.about_vision_title || DEFAULTS.vision_title,
          vision_desc: settings.about_vision_desc || DEFAULTS.vision_desc,
          image: settings.about_image || DEFAULTS.image,
        });
      }
    });
  }, []);

  return (
    <section className="py-20" id="about">
      <div className="container-custom grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="inline-block text-sm font-bold text-accent mb-3">About DK Holidays Coimbatore</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: data.title }} />
          <p className="text-muted leading-relaxed mb-4">{data.description}</p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Target size={20} />
              </div>
              <div>
                <strong className="text-sm text-primary">{data.mission_title}</strong>
                <p className="text-xs text-muted">{data.mission_desc}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Eye size={20} />
              </div>
              <div>
                <strong className="text-sm text-primary">{data.vision_title}</strong>
                <p className="text-xs text-muted">{data.vision_desc}</p>
              </div>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-light"
          >
            Discover Our Story
          </Link>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
            <img
              src={data.image}
              alt="DK Holidays fleet and team in Coimbatore"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg">
            <ShieldCheck size={20} className="text-accent" />
            <span className="text-sm font-bold text-primary">Trusted Since 2016</span>
          </div>
        </div>
      </div>
    </section>
  );
}
