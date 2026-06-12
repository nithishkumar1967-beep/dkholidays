"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/95 backdrop-blur-md safe-top">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white">
            DK
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold text-primary">DK Holidays</div>
            <div className="text-[10px] font-medium text-muted">Team Black Panther</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-accent",
                pathname === link.href
                  ? "text-accent"
                  : "text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:+919944890203"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-accent-light min-h-[40px]"
          >
            <Phone size={15} /> Call Now
          </a>
          <a
            href="https://wa.me/919944890203?text=Hi%20DK%20Holidays%2C%20I%27d%20like%20to%20book%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-whatsapp-dark min-h-[40px]"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>

        <button
          className="md:hidden p-3 text-primary min-w-[48px] min-h-[48px] flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-white md:hidden">
          <div className="container-custom py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block text-sm font-semibold transition-colors",
                  pathname === link.href ? "text-accent" : "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-border">
              <a href="tel:+919944890203" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-3 text-xs font-bold text-white min-h-[44px]">
                <Phone size={16} /> Call Now
              </a>
              <a href="https://wa.me/919944890203" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-whatsapp px-4 py-3 text-xs font-bold text-white min-h-[44px]">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
