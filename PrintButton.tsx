"use client";

export function PrintButton({ className = "btn-secondary" }: { className?: string }) {
  return (
    <button className={className} type="button" onClick={() => window.print()}>
      Print
    </button>
  );
}

