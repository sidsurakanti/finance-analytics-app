"use client";

import { IncomeSources } from "@/lib/definitions";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteIncomeSource } from "@/lib/actions";
import EditIncomeSource from "@/components/cashflows/income/EditIncomeSourceForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function IncomeSourceActions({
  incomeSource,
}: {
  incomeSource: IncomeSources;
}) {
  return (
    <div>
      <Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size="icon" className="">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg w-20">
            <DropdownMenuItem>
              <SheetTrigger asChild>
                <Button variant={"ghost"} size="sm" className="w-full h-6 flex">
                  edit
                </Button>
              </SheetTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant={"ghost"}
                size="sm"
                className="w-full flex justify-center h-6"
                onClick={() => {
                  deleteIncomeSource(incomeSource);
                }}
              >
                delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Edit Income</SheetTitle>
            <SheetDescription>
              Edit your income source here Bruv! iNiit!
            </SheetDescription>
          </SheetHeader>

          <EditIncomeSource incomeSource={incomeSource} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
