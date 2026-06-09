import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "DK Holidays offers tourist bus rental, corporate transport, airport pickup, family trips, school tours and wedding transportation in Coimbatore.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
