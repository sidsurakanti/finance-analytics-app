"use client";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { ViewMore } from "@components/ui/icons";
import { useTheme } from "next-themes";
import Link from "next/link";

// client component bc of useTheme hook
export function ViewMoreButton() {
  const { theme } = useTheme();

  return (
    <>
      <Button
        className={cn(
          theme == "dark" ? "hover:bg-primary" : "hover:bg-accent/75",
          "gap-2",
        )}
        variant="ghost"
      >
        <Link href="/cashflows" className="w-full">
          <ViewMore
            height={20}
            width={20}
            className="hidden md:block xl:hidden"
          />
          <p className="text-foreground/50 md:hidden xl:block">view more</p>
        </Link>
      </Button>
    </>
  );
}
