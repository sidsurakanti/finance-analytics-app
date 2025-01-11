import type { Savings } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddSavings from "@/components/cashflows/savings/AddSavingsForm";
import ManageSavingsForm from "@/components/cashflows/savings/ManageSavingsForm";

export default function UpdateSavingsButton({
  savings,
  className,
}: {
  savings: Savings;
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
          manage
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[425px] bg-accent">
        <DialogHeader>
          <DialogTitle>Manage savings</DialogTitle>
          <DialogDescription>Let&apos;s edit your savings!</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="add" className="mt-2">
          <TabsList className="flex justify-center bg-transparent">
            <div className="w-fit rounded-lg bg-secondary p-1">
              <TabsTrigger value="add">add</TabsTrigger>
              <TabsTrigger value="manage">manage</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="add">
            <AddSavings savings={savings} />
          </TabsContent>
          <TabsContent value="manage">
            <ManageSavingsForm savings={savings} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
