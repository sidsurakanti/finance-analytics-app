"use client";

import { cn } from "@/lib/utils";
import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ViewMore } from "@components/ui/icons";

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
            variant="ghost"
          >
            <EditIcon
              className={cn(theme == "light" && "text-black")}
              width={20}
              height={20}
            />
            {editText && (
              <p className="text-lg text-foreground/70 hidden md:block">
                change
              </p>
            )}
          </Button>
        </Link>
        {viewMore && (
          <Link href="/cashflows" className="flex justify-start pb-2 ">
            <Button
              className={cn(
                "flex flex-row gap-2",
                theme == "dark" ? "hover:bg-primary" : "hover:bg-accent/75",
              )}
              variant="ghost"
            >
              <ViewMore height={17} width={17} className="hidden md:block xl:hidden"/>
              <p className="text-foreground/50 md:hidden xl:block">view more</p>
            </Button>
          </Link>
        )}
      </div>
      {children}
    </>
  );
}
