import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@components/ui/button";
import type { User } from "@lib/definitions";
import { SetCashflowsForm } from "@components/cashflows/SetCashflowsForm";

export function CashflowsOnboarding({ user }: { user: User }) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="lg">Let&apos;s go!</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Welcome to your cashflows!</SheetTitle>
            <SheetDescription>
              We need your current income and savings to get you started.
            </SheetDescription>
          </SheetHeader>
          <SetCashflowsForm user={user} />
        </SheetContent>
      </Sheet>
    </>
  );
}
