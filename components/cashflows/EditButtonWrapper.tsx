"use client";

import { useState } from "react";
import Link from "next/link";

export function Wrapper({ children }: { children: React.ReactNode }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && <Link href="/cashflows/edit">Edit cashflows</Link>}
      {children}
    </div>
  );
}
