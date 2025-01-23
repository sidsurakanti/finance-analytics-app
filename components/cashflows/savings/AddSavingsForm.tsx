"use client";

import { useState } from "react";
import type { Balance, Savings } from "@/lib/definitions";
import { Input } from "@/components/ui/input";
import { updateBalance, updateSavings } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function AddSavings({
  savings,
  balance,
}: {
  savings: Savings;
  balance: Balance;
}) {
  const [newSavings, setNewSavings] = useState<string>("");
  const [fromBalance, setFromBalance] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = () => {
    if (newSavings == "") {
      return;
    } else if (Number(newSavings) < 0 && fromBalance) {
      setErrorMessage("You can't transfer negative amounts.");
      return;
    }

    if (fromBalance && Number(newSavings) > Number(balance.amount)) {
      setErrorMessage("You can't transfer more money than exists in checking.");
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
              onChange={(event) => {
                setNewSavings(event.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              className="pl-6"
            />
          </div>
        </span>

        <span className="flex items-center justify-between gap-2 px-2 py-3 border border-border shadow-sm rounded-md">
          <span className="flex flex-col justify-between gap-0.5">
            <Label htmlFor="from-balance" className="font-medium">
              Transfer from checking
            </Label>
            <h3 className="text-xs text-neutral-600">
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
        <Button
          onClick={() => handleSubmit()}
          variant={"ghost"}
          className="bg-lime-200 hover:bg-lime-400 border border-lime-400 text-lime-900"
        >
          make changes
        </Button>
        <DialogClose asChild>
          <Button
            variant={"ghost"}
            className="hover:bg-neutral-300 border border-neutral-300"
          >
            close
          </Button>
        </DialogClose>
      </div>

      {errorMessage && (
        <span className="p-2 rounded-full text-xs flex justify-center bg-red-200 text-red-900">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
