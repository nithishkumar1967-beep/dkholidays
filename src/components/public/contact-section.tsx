"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Send } from "lucide-react";

function InstagramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import toast from "react-hot-toast";
import { createEnquiry } from "@/lib/supabase-admin";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setLoading(true);
    try {
      await createEnquiry(form);
      toast.success("Enquiry sent! We will call you back shortly.");
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    } catch {
      toast.error("Could not send. Please call us at +91 9944890203");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-bg-light" id="contact">
      <div className="container-custom grid gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-block text-sm font-bold text-accent mb-3">Contact</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4 leading-tight">
            Plan Your Next Trip<br />with DK Holidays
          </h2>
          <p className="text-muted mb-8">
            Call us, message on WhatsApp, or fill the form — we typically respond within 10 minutes.
          </p>

          <div className="space-y-4">
            {[
              { icon: Phone, title: "Call Directly", subtitle: "+91 99448 90203", href: "tel:+919944890203" },
              { icon: MessageCircle, title: "WhatsApp", subtitle: "Chat for instant booking", href: "https://wa.me/919944890203", isWhatsApp: true },
              { icon: MapPin, title: "Location", subtitle: "Coimbatore, Tamil Nadu, India" },
              { icon: InstagramIcon, title: "Instagram", subtitle: "@dk_holidays_official", href: "https://www.instagram.com/dk_holidays_official" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    "isWhatsApp" in item && item.isWhatsApp
                      ? "bg-whatsapp/10 text-whatsapp"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <item.icon size={22} />
                </div>
                <div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-primary hover:text-accent transition-colors"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <strong className="text-sm text-primary">{item.title}</strong>
                  )}
                  <p className="text-xs text-muted">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-primary mb-6">Request a Callback</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Your Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <label>Phone Number *</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label>Service Required</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full"
              >
                <option value="">Select a service</option>
                <option>Tourist Bus Rental</option>
                <option>Corporate Transport</option>
                <option>Airport Pickup</option>
                <option>Family Trip</option>
                <option>School Tour</option>
                <option>Wedding Transportation</option>
              </select>
            </div>
            <div>
              <label>Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your trip..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-all hover:bg-accent-light disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Send size={16} />
              )}
              Send Enquiry
            </button>
            <p className="text-center text-xs text-muted">
              Or call directly:{" "}
              <a href="tel:+919944890203" className="text-accent font-semibold">
                +91 99448 90203
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
