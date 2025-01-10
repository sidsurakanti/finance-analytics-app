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
    if (newSavings == "") {
      return;
    }

    const newSavingsTotal = Number(savings.amount) + Number(newSavings);
    updateSavings(newSavingsTotal, savings.user_id);
    if (fromBalance) {
      updateBalance(-Number(newSavings), savings.user_id.toString());
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="flex flex-col gap-2">
          <Label>Amount</Label>
          <div className="relative w-full rounded-md shadow-sm">
            {/* attach a dollar sign to input */}
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 font-light text-sm">
              <p className="">$</p>
            </span>

            <Input
              type="number"
              placeholder="0.00"
              onChange={(event) => setNewSavings(event.target.value)}
              className="pl-6"
            />
          </div>
        </span>

        <span className="flex items-center justify-between gap-2 p-2 border border-b shadow-sm   rounded-md">
          <span>
            <Label htmlFor="from-balance" className="font-medium">
              Transfer from checking
            </Label>
            <h3 className="text-xs text-gray-700">
              Move money from checking balance to savings.
            </h3>
          </span>
          <Switch
            checked={fromBalance}
            onCheckedChange={() => setFromBalance(!fromBalance)}
            id="from-balance"
          />
        </span>
      </div>

      <div className="w-full flex justify-center gap-2 mt-2">
        <DialogClose asChild>
          <Button
            onClick={() => handleSubmit()}
            className="bg-primary hover:bg-neutral-500"
          >
            make changes
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant={"outline"} className="hover:bg-gray-400">
            close
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
