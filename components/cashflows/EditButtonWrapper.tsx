"use client";

import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";
import Link from "next/link";

interface WrapperProps {
  children: React.ReactNode;
  editText?: boolean;
}

export function Wrapper({ children, editText }: WrapperProps) {
  return (
    <>
      <Link href="/cashflows/edit" className="flex justify-end pb-2">
        <Button className="flex flex-row gap-2" variant="link">
          <EditIcon width={20} height={20} />
          {editText && <p className="text-lg hidden md:block">Edit</p>}
        </Button>
      </Link>
      {children}
    </>
  );
}
