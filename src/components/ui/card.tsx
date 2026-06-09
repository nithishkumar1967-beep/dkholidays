import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-white p-6", className)}>
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 mb-3" />
      <div className="h-3 w-full animate-pulse rounded bg-gray-200 mb-2" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
    </div>
  );
}
