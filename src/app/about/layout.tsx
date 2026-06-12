import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DK Holidays – Best Travel Agency in Coimbatore | Tours & Travels",
  description: "Learn about DK Holidays Coimbatore — a trusted travel agency and tour operator since 2016. Founded by Dinesh Kumar, we offer tours, bus rental, holiday packages & travel services across Tamil Nadu & South India.",
  keywords: [
    "DK Holidays Coimbatore",
    "best travel agency in coimbatore",
    "tours and travels in coimbatore",
    "travel company coimbatore",
    "coimbatore travel experts",
    "trusted travel agency coimbatore",
    "DK Holidays Tamil Nadu",
    "DK Holidays Tours and Travels",
  ],
  openGraph: { title: "About DK Holidays – Best Travel Agency in Coimbatore", description: "Coimbatore's trusted travel brand since 2016 — tours, bus rental & holiday packages." },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
