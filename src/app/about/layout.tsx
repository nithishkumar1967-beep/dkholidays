import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about DK Holidays - Coimbatore's trusted travel & transportation brand since 2016. Founded by Dinesh Kumar, powered by Team Black Panther.",
  openGraph: { title: "About DK Holidays", description: "Coimbatore's trusted travel brand since 2016." },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
