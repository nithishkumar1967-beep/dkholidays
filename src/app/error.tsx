"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-extrabold text-accent mb-4">500</div>
      <h1 className="text-2xl font-bold text-primary mb-2">Something went wrong</h1>
      <p className="text-muted mb-8 max-w-md">
        An unexpected error occurred. Please try again later.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-light"
      >
        Try Again
      </button>
    </div>
  );
}
