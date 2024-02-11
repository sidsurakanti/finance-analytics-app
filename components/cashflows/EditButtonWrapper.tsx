"use client";

import { cn } from "@/lib/utils";
import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";
import { useTheme } from "next-themes";
import Link from "next/link";

interface WrapperProps {
  children: React.ReactNode;
  editText?: boolean;
}

export function Wrapper({ children, editText }: WrapperProps) {
  const { theme } = useTheme();

  return (
    <>
      <Link href="/cashflows/edit" className="flex justify-start pb-2">
        <Button
          className={cn(
            "flex flex-row gap-2",
            theme == "dark" ? "hover:bg-primary" : "hover:bg-accent/75",
          )}
          variant="link"
        >
          <EditIcon
            className={cn(theme == "light" && "text-black")}
            width={20}
            height={20}
          />
          {editText && <p className="text-lg hidden md:block">Edit</p>}
        </Button>
      </Link>
      {children}
    </>
  );
}
