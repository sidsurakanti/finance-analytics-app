import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { SetCashflowsForm } from "@components/dashboard/SetCashflowsForm";

import { type User } from "@lib/definitions";

export function CashflowsOnboarding({ user }: { user: User }) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          {/* there's some bug where we can't just put an apostrophe in the button so we use &apos; */}
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
