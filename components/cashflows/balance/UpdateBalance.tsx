import type { Balance } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import EditBalanceForm from "@/components/cashflows/balance/EditBalanceForm";

export default function UpdateBalanceButton({
  balance,
  className,
}: {
  balance: Balance;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          // onClick={() =>
          //   updateSavings(Number(savings.amount) + 300, savings.user_id)
          // }
          className={className}
        >
          update
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px] bg-accent">
        <DialogHeader>
          <DialogTitle>Update balance</DialogTitle>
          <DialogDescription>Let&apos;s update your checking balance!</DialogDescription>
        </DialogHeader>

        <EditBalanceForm balance={balance}/>
      </DialogContent>
    </Dialog>
  );
}
