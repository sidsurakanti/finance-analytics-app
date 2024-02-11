"use client";

import Link from "next/link";

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="ease-in-out delay-150"
    >
      <Link href="/cashflows/edit">Edit cashflows</Link>
      {children}
    </div>
  );
}
