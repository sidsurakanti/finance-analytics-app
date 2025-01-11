"use client";

import { useState } from "react";
import type { Balance } from "@/lib/definitions";
import { Input } from "@/components/ui/input";
import { updateBalance } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function EditBalanceForm({ balance }: { balance: Balance }) {
  const [newBalance, setNewBalance] = useState<string>(
    Number(balance.amount).toFixed(2).toString(),
  );

  const handleSubmit = () => {
    updateBalance(Number(newBalance) - Number(balance.amount), balance.user_id);
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
              value={newBalance}
              onChange={(event) => setNewBalance(event.target.value)}
              className="pl-6"
            />
          </div>
        </span>
      </div>
      <div className="w-full flex justify-center gap-2 mt-2">
        <DialogClose asChild>
          <Button
            onClick={() => handleSubmit()}
            variant={"ghost"}
            className="bg-lime-200 hover:bg-lime-400 border border-lime-400 text-lime-900"
          >
            make changes
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant={"ghost"}
            className="hover:bg-neutral-300 border border-neutral-300"
          >
            close
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
