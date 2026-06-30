import Link from "next/link";
import { Phone, MessageCircle, MapPin } from "lucide-react";

function InstagramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-extrabold text-white">
                DK
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold">DK Holidays</div>
                <div className="text-[10px] font-medium text-white/60">Team Black Panther</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Coimbatore&apos;s trusted travel &amp; transportation partner — buses, vans, SUVs and luxury coaches for every journey.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {["About", "Services", "Fleet", "Gallery", "Packages", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm text-white/70 hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                "Tourist Bus Rental",
                "Corporate Transport",
                "Airport Pickup",
                "Family Trips",
                "School Tours",
                "Wedding Transportation",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4">Book Instantly</h4>
            <p className="text-sm text-white/70 mb-4">
              Tap to call or message us on WhatsApp — bookings confirmed in minutes.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+919944890203"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-accent-light"
              >
                <Phone size={14} /> Call +91 99448 90203
              </a>
              <a
                href="https://wa.me/919944890203"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-xs font-bold text-white"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={14} /> Coimbatore, Tamil Nadu, India
              </div>
              <a
                href="https://www.instagram.com/dk_holidays_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <InstagramIcon size={14} /> @dk_holidays_official
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 py-4 text-xs text-white/50">
          <div className="flex items-center gap-3">
            <Link href="/admin/login" className="hover:text-accent transition-colors">
              Admin Panel
            </Link>
          </div>
          <span>&copy; 2026 DK Holidays. All rights reserved. Coimbatore, Tamil Nadu.</span>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/919944890203?text=Hi%20DK%20Holidays%2C%20I%27d%20like%20to%20book%20a%20trip."
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle size={26} />
        </a>
        <a
          href="tel:+919944890203"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Call"
        >
          <Phone size={26} />
        </a>
      </div>
    </footer>
  );
}
