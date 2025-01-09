"use client";

import { deleteTransaction } from "@lib/actions";
import { type Transaction } from "@lib/definitions";

import { Button } from "@components/ui/button";
import { TrashIcon } from "@components/ui/icons";
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

export function DeleteTransactionWrapper({
  transaction,
}: {
  transaction: Transaction;
}) {
  // on click handler
  const onClickHandler = async () => {
    await deleteTransaction(transaction);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size="icon" className="rounded-full p-2 hover:text-white hover:bg-destructive/95">
            <CircleX size={20} strokeWidth={1.5} />
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
              onClick={onClickHandler}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
