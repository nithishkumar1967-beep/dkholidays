import Link from "next/link";
import { PublicLayout } from "@/components/layout/public-layout";

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-20">
        <div className="text-8xl font-extrabold text-accent mb-4">404</div>
        <h1 className="text-2xl font-bold text-primary mb-2">Page Not Found</h1>
        <p className="text-muted mb-8 max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-light"
        >
          Back to Home
        </Link>
      </div>
    </PublicLayout>
  );
}
