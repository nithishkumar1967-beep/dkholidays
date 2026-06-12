"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input, TextArea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getSiteSettings, updateSiteSettings } from "@/lib/supabase-admin";
import { uploadImage } from "@/lib/supabase-storage";
import type { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState({
    company_name: "DK Holidays",
    phone: "+919944890203",
    whatsapp: "919944890203",
    email: "info@dkholidays.in",
    address: "Coimbatore, Tamil Nadu, India",
    hero_title: "Reliable Travel Services<br/>For Every Journey",
    hero_subtitle: "Tourist buses, corporate transport, airport pickups, family trips and wedding transportation — booked in minutes.",
    meta_title: "DK Holidays – Best Travels in Coimbatore | Tours & Travel Agency",
    meta_description: "DK Holidays is the best travel agency in Coimbatore offering tours and travels, tourist bus rental, holiday packages, family tours, corporate transport, airport pickup & wedding transport. Call +91 9944890203.",
    favicon_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) {
        setSettings(data);
        setForm({
          company_name: data.company_name || form.company_name,
          phone: data.phone || form.phone,
          whatsapp: data.whatsapp || form.whatsapp,
          email: data.email || form.email,
          address: data.address || form.address,
          hero_title: data.hero_title || form.hero_title,
          hero_subtitle: data.hero_subtitle || form.hero_subtitle,
          meta_title: data.meta_title || form.meta_title,
          meta_description: data.meta_description || form.meta_description,
          favicon_url: data.favicon_url || "",
        });
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    if (heroFile) {
      await uploadImage("hero-images", heroFile, "hero");
    }
    if (faviconFile) {
      const url = await uploadImage("company-assets", faviconFile, "favicon");
      if (url) form.favicon_url = url;
    }
    if (settings?.id) {
      await updateSiteSettings(settings.id, form);
    }
    toast.success("Settings saved!");
    setSaving(false);
  };

  if (loading) return <div className="animate-pulse space-y-4"><div className="h-8 w-48 bg-gray-200 rounded" /><div className="h-64 bg-gray-200 rounded" /></div>;

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-primary">Website Settings</h1>
        <p className="text-sm text-muted">Manage your website content and SEO settings.</p>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Company Information</h2>
        <div className="space-y-4">
          <Input label="Company Name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="WhatsApp Number" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
          <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextArea label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Hero Section</h2>
        <div className="space-y-4">
          <Input label="Hero Title (HTML allowed)" value={form.hero_title} onChange={(e) => setForm({ ...form, hero_title: e.target.value })} />
          <TextArea label="Hero Subtitle" value={form.hero_subtitle} onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })} />
          <div>
            <label>Hero Background Image</label>
            <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} className="w-full text-sm" />
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">Favicon</h2>
        <div className="space-y-4">
          <div>
            <label>Favicon Image (ICO, PNG, or SVG)</label>
            <input type="file" accept="image/*" onChange={(e) => setFaviconFile(e.target.files?.[0] || null)} className="w-full text-sm" />
            {form.favicon_url && (
              <div className="mt-2 flex items-center gap-2">
                <img src={form.favicon_url} alt="Favicon preview" className="h-8 w-8 rounded border" />
                <span className="text-xs text-muted">{form.favicon_url}</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="font-bold text-primary mb-4">SEO Settings</h2>
        <div className="space-y-4">
          <Input label="Meta Title" value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} />
          <TextArea label="Meta Description" value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
        </div>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} loading={saving}>Save All Settings</Button>
      </div>
    </div>
  );
}
