import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fleet – DK Holidays Tourist Bus Rental Coimbatore",
  description: "Browse DK Holidays Coimbatore's modern fleet of tourist buses, mini buses, SUVs, luxury coaches and vans. 50+ vehicles for tours, corporate trips, weddings & airport transfers.",
  keywords: [
    "best travels in coimbatore",
    "tours and travels in coimbatore",
    "tourist bus rental coimbatore",
    "travel company coimbatore",
    "DK Holidays Coimbatore",
    "bus booking coimbatore",
    "coimbatore travels",
  ],
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
