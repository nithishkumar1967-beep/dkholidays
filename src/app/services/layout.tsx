import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Services Coimbatore – DK Holidays Tours & Travels",
  description: "DK Holidays offers the best travel services in Coimbatore — tourist bus rental, corporate transport, airport pickup, family tours, school trips, wedding transport & holiday packages. Call +91 9944890203.",
  keywords: [
    "travel services coimbatore",
    "tour operator coimbatore",
    "best travels in coimbatore",
    "travel agency coimbatore",
    "coimbatore tour booking services",
    "DK Holidays Travel Services",
    "tours and travels in coimbatore",
    "coimbatore tourist services",
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
