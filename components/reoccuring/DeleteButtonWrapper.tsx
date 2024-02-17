"use client";

import { deleteReoccuringById } from "@/lib/actions";
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

export function DeleteButtonWrapper({
  reoccuringId,
}: {
  reoccuringId: Number;
}) {
  const deleteReoccuring = async () => {
    await deleteReoccuringById(reoccuringId);
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
              delete this reoccuring transaction?
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              type="submit"
              className="bg-destructive"
              onClick={deleteReoccuring}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
