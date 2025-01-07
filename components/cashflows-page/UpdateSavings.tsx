"use client";

import { updateSavings } from "@/lib/actions";
import { Savings } from "@/lib/definitions";
import { Button } from "@/components/ui/button";

export default function UpdateSavingsButton({ savings, className }: { savings: Savings, className?: string}) {
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      onClick={() =>
        updateSavings(Number(savings.amount) + 300, savings.user_id)
      }
      className={className}
    >
      add more
    </Button>
  );
}
