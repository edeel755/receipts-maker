import clsx from "clsx";
import type React from "react";

export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline",
        className
      )}
      {...props}
    />
  );
}

