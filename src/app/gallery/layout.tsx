import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our gallery of trips, tours, and events from DK Holidays in Coimbatore.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
