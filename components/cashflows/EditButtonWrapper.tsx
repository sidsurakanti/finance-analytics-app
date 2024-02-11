"use client";

import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";
import Link from "next/link";

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
    // className="ease-in-out delay-150"
    >
      <Link href="/cashflows/edit" className="flex justify-end">
        <Button className="flex flex-row gap-2" variant="link">
          <EditIcon />
          <p>Edit</p>
        </Button>
      </Link>
      {children}
    </div>
  );
}
