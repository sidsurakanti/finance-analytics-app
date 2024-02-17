"use client";

import { deleteTransaction } from "@/lib/actions";
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
import { Transaction } from "@/lib/definitions";

export function DeleteButtonWrapper({
  transaction,
}: {
  transaction: Transaction;
}) {
  const onClickHandler = async () => {
    await deleteTransaction(transaction);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:bg-destructive">
            <TrashIcon width={20} height={20} />
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
