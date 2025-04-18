"use client";

import { deleteTransaction } from "@lib/actions";
import type { Transaction } from "@lib/definitions";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@components/ui/dialog";
import { CircleX } from "lucide-react";

export function DeleteTransactionButton({
  transaction,
}: {
  transaction: Transaction;
}) {
  // on click handler
  const deleteTransactionHandler = async () => {
    await deleteTransaction(transaction);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            size="icon"
            className="rounded-full p-1 hover:text-white hover:bg-rose-600/95"
          >
            <CircleX size={20} strokeWidth={1.2} />
          </Button>
        </DialogTrigger>

        <DialogContent className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this transaction?
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              type="submit"
              className="bg-destructive"
              onClick={deleteTransactionHandler}
            >
              confirm
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
