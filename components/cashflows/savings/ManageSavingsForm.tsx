"use client";

import { useState } from "react";
import type { Savings } from "@/lib/definitions";
import { Input } from "@/components/ui/input";
import { updateSavings } from "@/lib/actions";
import { Label } from "@/components/ui/label";

export default function ManageSavingsForm({ savings }: { savings: Savings }) {
  const [newSavings, setNewSavings] = useState<Savings>(savings);
  const [fromBalance, setFromBalance] = useState<boolean>(true);

  return (
    <div>
      <span className="flex flex-col gap-2">
        <Label>Amount</Label>
        <Input
          type="number"
          value={newSavings.amount}
          onChange={(event) =>
            setNewSavings({
              ...savings,
              amount: event.target.value,
            })
          }
        />
      </span>
    </div>
  );
}
