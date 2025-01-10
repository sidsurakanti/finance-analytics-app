"use client";

import { useState } from "react";
import { cashFormatter, cn } from "@/lib/utils";
import { inter } from "@/styles/fonts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

export default function IncomeTotals({ totalIncome }: { totalIncome: number }) {
  const [toggleSalaryTimeframe, setToggleSalaryTimeframe] = useState<number>(0);
  const togglerST = ["per month", "per year"];

  return (
    <span className="flex items-end gap-2.5">
      <p
        className={cn(
          inter.className,
          "text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5 font-medium",
        )}
      >
        {cashFormatter(
          [Number(totalIncome), Number(totalIncome) * 12][
            toggleSalaryTimeframe
          ],
        )}
      </p>
      {/* <button
        className="bg-neutral-500 w-fit h-fit font-medium rounded-lg text-white px-3 py-1.5 text-xs"
        onClick={() => {
          toggleSalaryTimeframe > 0
            ? setToggleSalaryTimeframe(0)
            : setToggleSalaryTimeframe(1);
        }}
      >
        {togglerST[toggleSalaryTimeframe]}
      </button> */}

      <ToggleGroup
        type="single"
        defaultValue="month"
        className="bg-neutral-200/30 rounded-lg p-0.5 border border-separate"
      >
        <ToggleGroupItem
          size={"sm"}
          value="month"
          className="data-[state=on]:bg-neutral-200 px-2 py-1 h-6 text-xs rounded-md"
          onClick={() => setToggleSalaryTimeframe(0)}
        >
          month
        </ToggleGroupItem>
        <ToggleGroupItem
          value="year"
          size={"sm"}
          className="data-[state=on]:bg-neutral-200 px-2 py-1 h-6 text-xs rounded-md"
          onClick={() => setToggleSalaryTimeframe(1)}
        >
          year
        </ToggleGroupItem>
      </ToggleGroup>
    </span>
  );
}
