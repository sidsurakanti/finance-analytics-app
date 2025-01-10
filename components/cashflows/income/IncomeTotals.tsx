"use client";

import { useState } from "react";
import { cashFormatter, cn } from "@/lib/utils";
import { inter, mono } from "@/styles/fonts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function IncomeTotals({ totalIncome }: { totalIncome: number }) {
  const [toggleSalaryTimeframe, setToggleSalaryTimeframe] = useState<number>(0);

  return (
    <span className="flex items-end gap-4">
      <p
        className={cn(
          mono.className,
          "tracking-[-0.06em] text-3xl md:text-4xl xl:text-[42px] 2xl:text-[55px] flex items-end gap-0.5 font-regular",
        )}
      >
        {cashFormatter(
          [Number(totalIncome), Number(totalIncome) * 12][
            toggleSalaryTimeframe
          ],
          true,
          0,
        )}
      </p>

      <ToggleGroup
        type="single"
        defaultValue="month"
        className="bg-transparent dark:bg-indigo-100 rounded-lg p-0.5 border border-indigo-200 dark:border-indigo-300 text-indigo-900"
      >
        <ToggleGroupItem
          size={"sm"}
          value="month"
          className="data-[state=on]:bg-indigo-100 data-[state=on]:dark:bg-indigo-300 data-[state=on]:text-indigo-950 px-2 py-1 h-6 text-xs rounded-md"
          onClick={() => setToggleSalaryTimeframe(0)}
        >
          monthly
        </ToggleGroupItem>
        <ToggleGroupItem
          value="year"
          size={"sm"}
          className="data-[state=on]:bg-indigo-200 data-[state=on]:dark:bg-indigo-300 data-[state=on]:text-indigo-950 px-2 py-1 h-6 text-xs rounded-md"
          onClick={() => setToggleSalaryTimeframe(1)}
        >
          yearly
        </ToggleGroupItem>
      </ToggleGroup>
    </span>
  );
}
