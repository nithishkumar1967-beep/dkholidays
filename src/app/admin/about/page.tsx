"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getSiteSettings, updateSiteSettings } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import type { SiteSettings } from "@/lib/types";

interface StatItem { value: string; label: string; icon: string }
interface ValueItem { icon: string; title: string; desc: string }

const STAT_ICONS = ["Award", "Users", "Clock", "HeartHandshake", "ShieldCheck", "Target", "Eye", "Bus", "Briefcase", "Plane", "BookOpen", "Headphones", "MapPin", "Sparkles", "Star"];

export default function AdminAboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [heroTitle, setHeroTitle] = useState("Built on Trust. Powered by Team Black Panther.");
  const [heroSubtitle, setHeroSubtitle] = useState("Coimbatore's trusted travel & transportation partner since 2016.");
  const [storyHeading, setStoryHeading] = useState("Our Story");
  const [storyParagraphs, setStoryParagraphs] = useState([
    "DK Holidays was founded by Mr. Dinesh Kumar with a simple vision — to provide safe, comfortable, and reliable transportation services to the people of Coimbatore and beyond.",
    "What started as a small fleet has grown into one of Coimbatore's most trusted travel brands, with 50+ vehicles serving thousands of happy customers every year.",
    "From corporate fleets to family vacations, school excursions to wedding parties, airport transfers to long-distance tours — we've moved people across South India with care, professionalism, and a smile.",
  ]);
  const [stats, setStats] = useState<StatItem[]>([
    { value: "8+", label: "Years Experience", icon: "Award" },
    { value: "10,000+", label: "Happy Travelers", icon: "Users" },
    { value: "24/7", label: "Support", icon: "Clock" },
    { value: "4.9", label: "Rating", icon: "HeartHandshake" },
  ]);
  const [values, setValues] = useState<ValueItem[]>([
    { icon: "ShieldCheck", title: "Safety First", desc: "Every vehicle undergoes rigorous safety checks before each trip." },
    { icon: "Target", title: "Reliability", desc: "We value your time. Our fleet operates with military precision — on-time, every time." },
    { icon: "Eye", title: "Transparency", desc: "No hidden charges. No surprises. What we quote is what you pay." },
    { icon: "HeartHandshake", title: "Customer First", desc: "We treat every traveler like family." },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) {
        setSettings(data);
        if (data.about_hero_title) setHeroTitle(data.about_hero_title);
        if (data.about_hero_subtitle) setHeroSubtitle(data.about_hero_subtitle);
        if (data.about_story_heading) setStoryHeading(data.about_story_heading);
        const parseArray = (v: unknown) => (typeof v === "string" ? JSON.parse(v) : v);
        if (data.about_story_paragraphs) {
          const p = parseArray(data.about_story_paragraphs);
          if (Array.isArray(p) && p.length) setStoryParagraphs(p);
        }
        if (data.about_stats) {
          const p = parseArray(data.about_stats);
          if (Array.isArray(p) && p.length) setStats(p);
        }
        if (data.about_values) {
          const p = parseArray(data.about_values);
          if (Array.isArray(p) && p.length) setValues(p);
        }
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const updates: Record<string, unknown> = {
      about_hero_title: heroTitle,
      about_hero_subtitle: heroSubtitle,
      about_story_heading: storyHeading,
      about_story_paragraphs: JSON.stringify(storyParagraphs),
      about_stats: stats,
      about_values: values,
    };
    if (imageFile) {
      const url = await uploadImage("company-assets", imageFile, "about");
      if (url) updates.about_image = url;
    }
    const { error } = await updateSiteSettings(settings?.id || null, updates);
    if (error) toast.error("Failed to save: " + error.message);
    else toast.success("About page saved!");
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-64 bg-gray-200 rounded" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">About Page</h1>
        <p className="text-sm text-muted">Edit all about page content.</p>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Hero Section</h2>
        <div className="space-y-4">
          <Input label="Hero Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
          <Input label="Hero Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Story Section</h2>
        <div className="space-y-4">
          <Input label="Story Heading" value={storyHeading} onChange={(e) => setStoryHeading(e.target.value)} />
          {storyParagraphs.map((p, i) => (
            <div key={i}>
              <label className="text-xs text-muted block mb-1">Paragraph {i + 1}</label>
              <textarea value={p} onChange={(e) => setStoryParagraphs(storyParagraphs.map((par, j) => j === i ? e.target.value : par))} className="w-full text-sm" rows={3} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">About Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Stats</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-muted">Stat {i + 1}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className="text-xs text-muted block mb-1">Value</label>
                  <input value={stat.value} onChange={(e) => setStats(stats.map((s, j) => j === i ? { ...s, value: e.target.value } : s))} className="w-full text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">Label</label>
                  <input value={stat.label} onChange={(e) => setStats(stats.map((s, j) => j === i ? { ...s, label: e.target.value } : s))} className="w-full text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">Icon</label>
                  <select value={stat.icon} onChange={(e) => setStats(stats.map((s, j) => j === i ? { ...s, icon: e.target.value } : s))} className="w-full text-sm">
                    {STAT_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">What We Stand For</h2>
        <div className="space-y-4">
          {values.map((v, i) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2">
              <p className="text-xs font-semibold text-muted">Value {i + 1}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-xs text-muted block mb-1">Icon</label>
                  <select value={v.icon} onChange={(e) => setValues(values.map((val, j) => j === i ? { ...val, icon: e.target.value } : val))} className="w-full text-sm">
                    {STAT_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">Title</label>
                  <input value={v.title} onChange={(e) => setValues(values.map((val, j) => j === i ? { ...val, title: e.target.value } : val))} className="w-full text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Description</label>
                <textarea value={v.desc} onChange={(e) => setValues(values.map((val, j) => j === i ? { ...val, desc: e.target.value } : val))} className="w-full text-sm" rows={2} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} loading={saving}>Save About Page</Button>
      </div>
    </div>
  );
}
