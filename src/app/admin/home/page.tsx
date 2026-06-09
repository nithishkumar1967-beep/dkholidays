"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getSiteSettings, updateSiteSettings } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import type { SiteSettings } from "@/lib/types";

interface StatItem { num: string; label: string }
interface WhyChooseItem { icon: string; title: string; desc: string }

const STAT_ICONS = ["ShieldCheck", "Sparkles", "Headphones", "MapPin", "Bus", "Briefcase", "Plane", "Users", "BookOpen", "Heart", "Award", "Clock", "Eye", "Target", "HeartHandshake"];

export default function AdminHomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [heroTitle, setHeroTitle] = useState("Reliable Travel Services<br/>For Every Journey");
  const [heroSubtitle, setHeroSubtitle] = useState("Tourist buses, corporate transport, airport pickups, family trips and wedding transportation — booked in minutes.");
  const [heroStats, setHeroStats] = useState<StatItem[]>([
    { num: "10,000+", label: "Happy Travelers" },
    { num: "50+", label: "Vehicles" },
    { num: "8+", label: "Years Experience" },
    { num: "24/7", label: "Support" },
  ]);
  const [aboutTitle, setAboutTitle] = useState("Built on Trust. Powered by Team Black Panther.");
  const [aboutDesc, setAboutDesc] = useState("DK Holidays is Coimbatore's trusted travel & transportation brand.");
  const [missionTitle, setMissionTitle] = useState("Our Mission");
  const [missionDesc, setMissionDesc] = useState("Safe, comfortable, affordable travel — every trip.");
  const [visionTitle, setVisionTitle] = useState("Our Vision");
  const [visionDesc, setVisionDesc] = useState("South India's most trusted tourist transport name.");
  const [whyHeading, setWhyHeading] = useState("Travel with People Who Care");
  const [whyItems, setWhyItems] = useState<WhyChooseItem[]>([
    { icon: "ShieldCheck", title: "Professional Drivers", desc: "Trained, verified and courteous drivers on every trip." },
    { icon: "Sparkles", title: "Clean Vehicles", desc: "Sanitised, well-maintained fleet — inside and out." },
    { icon: "Headphones", title: "24/7 Support", desc: "We pick up at any hour. Real people, real fast." },
    { icon: "MapPin", title: "GPS Tracked", desc: "All vehicles are GPS-tracked for maximum safety." },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [aboutFile, setAboutFile] = useState<File | null>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) {
        setSettings(data);
        if (data.hero_title) setHeroTitle(data.hero_title);
        if (data.hero_subtitle) setHeroSubtitle(data.hero_subtitle);
        if (data.about_title) setAboutTitle(data.about_title);
        if (data.about_description) setAboutDesc(data.about_description);
        if (data.about_mission_title) setMissionTitle(data.about_mission_title);
        if (data.about_mission_desc) setMissionDesc(data.about_mission_desc);
        if (data.about_vision_title) setVisionTitle(data.about_vision_title);
        if (data.about_vision_desc) setVisionDesc(data.about_vision_desc);
        if (data.why_choose_us_heading) setWhyHeading(data.why_choose_us_heading);
        if (data.hero_stats) {
          const val = typeof data.hero_stats === "string" ? JSON.parse(data.hero_stats) : data.hero_stats;
          if (Array.isArray(val) && val.length) setHeroStats(val);
        }
        if (data.why_choose_us_items) {
          const val = typeof data.why_choose_us_items === "string" ? JSON.parse(data.why_choose_us_items) : data.why_choose_us_items;
          if (Array.isArray(val) && val.length) setWhyItems(val);
        }
      }
      setLoading(false);
    });
  }, []);

  const updateStat = (idx: number, field: keyof StatItem, value: string) => {
    setHeroStats(heroStats.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const updateWhy = (idx: number, field: keyof WhyChooseItem, value: string) => {
    setWhyItems(whyItems.map((w, i) => i === idx ? { ...w, [field]: value } : w));
  };

  const handleSave = async () => {
    setSaving(true);
    let heroUrl: string | undefined;
    let aboutUrl: string | undefined;
    if (heroFile) heroUrl = (await uploadImage("hero-images", heroFile, "hero")) || undefined;
    if (aboutFile) aboutUrl = (await uploadImage("company-assets", aboutFile, "about")) || undefined;

    const updates: Record<string, unknown> = {
      hero_title: heroTitle,
      hero_subtitle: heroSubtitle,
      hero_stats: heroStats,
      about_title: aboutTitle,
      about_description: aboutDesc,
      about_mission_title: missionTitle,
      about_mission_desc: missionDesc,
      about_vision_title: visionTitle,
      about_vision_desc: visionDesc,
      why_choose_us_heading: whyHeading,
      why_choose_us_items: whyItems,
    };
    if (heroUrl) updates.hero_image = heroUrl;
    if (aboutUrl) updates.about_image = aboutUrl;

    const { error } = await updateSiteSettings(settings?.id || null, updates);
    if (error) toast.error("Failed to save: " + error.message);
    else toast.success("Home page saved!");
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-64 bg-gray-200 rounded" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Home Page</h1>
        <p className="text-sm text-muted">Edit all home page content.</p>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Hero Section</h2>
        <div className="space-y-4">
          <Input label="Hero Title (HTML allowed)" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
          <TextArea label="Hero Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Hero Background Image</label>
            <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm font-semibold text-primary mb-3">Stats (shown below the hero)</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {heroStats.map((stat, i) => (
                <div key={i} className="flex gap-2 items-end border border-border rounded-lg p-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted block mb-1">Number</label>
                    <input value={stat.num} onChange={(e) => updateStat(i, "num", e.target.value)} className="w-full text-sm" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted block mb-1">Label</label>
                    <input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} className="w-full text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">About Section</h2>
        <div className="space-y-4">
          <Input label="About Title (HTML allowed)" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
          <TextArea label="About Description" value={aboutDesc} onChange={(e) => setAboutDesc(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Mission Title" value={missionTitle} onChange={(e) => setMissionTitle(e.target.value)} />
            <TextArea label="Mission Description" value={missionDesc} onChange={(e) => setMissionDesc(e.target.value)} />
            <Input label="Vision Title" value={visionTitle} onChange={(e) => setVisionTitle(e.target.value)} />
            <TextArea label="Vision Description" value={visionDesc} onChange={(e) => setVisionDesc(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">About Section Image</label>
            <input type="file" accept="image/*" onChange={(e) => setAboutFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Why Choose Us</h2>
        <div className="space-y-4">
          <Input label="Section Heading" value={whyHeading} onChange={(e) => setWhyHeading(e.target.value)} />
          {whyItems.map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-muted">Item {i + 1}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-xs text-muted block mb-1">Icon</label>
                  <select value={item.icon} onChange={(e) => updateWhy(i, "icon", e.target.value)} className="w-full text-sm">
                    {STAT_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">Title</label>
                  <input value={item.title} onChange={(e) => updateWhy(i, "title", e.target.value)} className="w-full text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Description</label>
                <textarea value={item.desc} onChange={(e) => updateWhy(i, "desc", e.target.value)} className="w-full text-sm" rows={2} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} loading={saving}>Save Home Page</Button>
      </div>
    </div>
  );
}
