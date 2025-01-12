import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import type { Reoccuring } from "@lib/definitions";
import { Pencil } from "lucide-react";
import { EditReoccuringForm } from "@/components/reoccuring/EditReoccuringForm";

export function EditRecurring({ reoccuring }: { reoccuring: Reoccuring }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-full hover:bg-neutral-400 hover:text-white"
          variant={"ghost"}
          size={"icon"}
        >
          <Pencil size={17} strokeWidth={1.5} />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="tracking-medium">Edit recurring</DialogTitle>
          <DialogDescription>
            Make changes to this recurring transaction here. Don&apos;t forget
            to click save once you&apos;ve finished!
          </DialogDescription>
        </DialogHeader>

        <EditReoccuringForm reoccuring={reoccuring} />
      </DialogContent>
    </Dialog>
  );
}
