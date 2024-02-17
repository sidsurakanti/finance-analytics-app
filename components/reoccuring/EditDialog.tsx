import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { EditIcon } from "@components/ui/icons";
import { EditReoccuringForm } from "@components/reoccuring/EditReoccuringForm";
import { Reoccuring } from "@lib/definitions";

export async function EditDialog({ reoccuring }: { reoccuring: Reoccuring }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <EditIcon width={20} height={20} />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="tracking-medium">Edit reoccuring</DialogTitle>
          <DialogDescription>
            Make changes to this transaction here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <EditReoccuringForm reoccuring={reoccuring} />
      </DialogContent>
    </Dialog>
  );
}
