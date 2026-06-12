import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery – DK Holidays Coimbatore Tours & Travels",
  description: "View real trip photos and event gallery from DK Holidays Coimbatore — the best travel agency for tours, bus rental, family holidays & wedding transport in Tamil Nadu.",
  keywords: [
    "DK Holidays Coimbatore",
    "best travel agency in coimbatore",
    "coimbatore tourist services",
    "tours and travels in coimbatore",
    "DK Holidays Tours and Travels",
  ],
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
