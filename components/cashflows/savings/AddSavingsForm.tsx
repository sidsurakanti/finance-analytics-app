"use client";

import { ChangeEvent, useState } from "react";
import type { Savings } from "@/lib/definitions";
import { Input } from "@/components/ui/input";
import { updateBalance, updateSavings } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function AddSavings({ savings }: { savings: Savings }) {
  const [newSavings, setNewSavings] = useState<string>("");
  const [fromBalance, setFromBalance] = useState<boolean>(true);

  const handleSubmit = () => {
    const newSavingsTotal = Number(savings.amount) + Number(newSavings);
    updateSavings(newSavingsTotal, savings.user_id);
    if (fromBalance) {
      updateBalance(-Number(newSavings), savings.user_id.toString());
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <span className="flex flex-col gap-2">
        <Label>Amount</Label>
        <Input
          type="number"
          placeholder="99.2"
          onChange={(event) => setNewSavings(event.target.value)}
        />
      </span>

      <span className="flex items-center gap-2">
        <Switch
          checked={fromBalance}
          onCheckedChange={() => setFromBalance(!fromBalance)}
          id="from-balance"
        />
        <Label htmlFor="from-balance">move from checking</Label>
      </span>

      <div className="w-full flex justify-center gap-2">
        <Button
          onClick={() => handleSubmit()}
          className="bg-sky-500 hover:bg-sky-600"
        >
          make changes
        </Button>
        <DialogClose asChild>
          <Button variant={"outline"} className="hover:bg-red-400">close</Button>
        </DialogClose>
      </div>
    </div>
  );
}
