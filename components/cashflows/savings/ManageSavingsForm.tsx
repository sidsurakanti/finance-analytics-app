"use client";

import { Dispatch, SetStateAction, useState } from "react";
import type { Balance, Savings } from "@/lib/definitions";
import { Input } from "@/components/ui/input";
import { updateBalance, updateSavings } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

export default function ManageSavingsForm({
  savings,
  balance,
  handleSheetOpen,
}: {
  savings: Savings;
  balance: Balance;
  handleSheetOpen: Dispatch<SetStateAction<boolean | undefined>>;
}) {
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [transferPercent, setTransferPercent] = useState<string>("10");
  const [toChecking, setToChecking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const update = () => {
    const isCustom = transferPercent === "custom";
    const amount = isCustom
      ? Number(transferAmount)
      : Math.floor(
          Number(toChecking ? savings.amount : balance.amount) *
            (Number(transferPercent) / 100),
        );

    if (amount < 0)
      return setErrorMessage("You can't transfer negative amounts.");

    // SAVINGS -> CHECKINGS
    if (toChecking) {
      if (amount > Number(savings.amount))
        return setErrorMessage(
          "You can't transfer more amount than exists in savings.",
        );

      updateBalance(amount, balance.user_id);
      updateSavings(Number(savings.amount) - amount, savings.user_id);
    }

    // CHECKING -> SAVINGS
    else {
      if (amount > Number(balance.amount))
        return setErrorMessage(
          "You can't transfer more amount than exists in balance.",
        );

      updateSavings(Number(savings.amount) + amount, savings.user_id);
      updateBalance(-amount, balance.user_id);
    }

    handleSheetOpen(false);
  };

  return (
    <div className="justify-between space-y-8 pt-4">
      <div className="space-y-3">
        <span className="flex justify-center items-center gap-3.5">
          <p className="font-medium">CHECKING</p>
          <Button
            variant={"outline"}
            size="sm"
            className="bg-neutral-200 hover:bg-neutral-200 hover:scale-105 border border-neutral-400 h-6"
            onClick={() => setToChecking(!toChecking)}
          >
            {toChecking ? (
              <MoveLeft size={18} strokeWidth={1.5} />
            ) : (
              <MoveRight size={18} strokeWidth={1.5} />
            )}
          </Button>
          <p className="font-medium">SAVINGS</p>
        </span>

        <span className="flex flex-col gap-2">
          <ToggleGroup
            type="single"
            onValueChange={(value) => setTransferPercent(value)}
            value={transferPercent}
            className="justify-center"
          >
            <ToggleGroupItem
              value="10"
              className="data-[state=on]:bg-neutral-200 data-[state=on]:text-neutral-900 px-2.5 rounded-lg data-[state=on]:border border-neutral-400"
            >
              10%
            </ToggleGroupItem>
            <ToggleGroupItem
              value="50"
              className="data-[state=on]:bg-neutral-200 data-[state=on]:text-neutral-900 px-2.5 rounded-lg data-[state=on]:border border-neutral-400"
            >
              50%
            </ToggleGroupItem>
            <ToggleGroupItem
              value="75"
              className="data-[state=on]:bg-neutral-200 data-[state=on]:text-neutral-900 px-2.5 rounded-lg data-[state=on]:border border-neutral-400"
            >
              75%
            </ToggleGroupItem>
            <ToggleGroupItem
              value="custom"
              className="data-[state=on]:bg-neutral-200 data-[state=on]:text-neutral-900 px-2.5 rounded-lg border border-border data-[state=on]:border-neutral-400"
            >
              custom
            </ToggleGroupItem>
          </ToggleGroup>

          {transferPercent === "custom" && (
            <>
              <span className="flex flex-col gap-2">
                <Label>Amount</Label>
                <div className="relative w-full rounded-md shadow-sm">
                  {/* attach a dollar sign to input */}
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 font-light text-sm">
                    <p className="">$</p>
                  </span>

                  <Input
                    type="number"
                    placeholder="enter transfer amount"
                    value={transferAmount}
                    maxLength={10}
                    onChange={(event) => {
                      setTransferAmount(event.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    className="pl-6"
                  />
                </div>
              </span>
            </>
          )}
        </span>
      </div>

      <div className="w-full flex justify-center gap-2 mt-2">
        <Button
          onClick={() => update()}
          variant={"ghost"}
          className="bg-rose-200 hover:bg-rose-400 border border-rose-400 text-rose-900"
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
