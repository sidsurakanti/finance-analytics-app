"use client";

import { cn } from "@/lib/utils";
import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";
import { useTheme } from "next-themes";
import Link from "next/link";

interface WrapperProps {
  children: React.ReactNode;
  editText?: boolean;
  viewMore?: boolean;
}

export function Wrapper({ children, editText, viewMore }: WrapperProps) {
  const { theme } = useTheme();

  return (
    <>
      <div className="flex flex-row md:flex-col xl:flex-row justify-between">
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
        {viewMore && (
          // TODO: add icon for mediums screens
          <Link
            href="/cashflows"
            className="flex justify-start pb-2 md:hidden xl:block"
          >
            <Button
              className={cn(
                "flex flex-row gap-2",
                theme == "dark" ? "hover:bg-primary" : "hover:bg-accent/75",
              )}
              variant="ghost"
            >
              <p className="text-primary-foreground/50">view more</p>
            </Button>
          </Link>
        )}
      </div>
      {children}
    </>
  );
}
