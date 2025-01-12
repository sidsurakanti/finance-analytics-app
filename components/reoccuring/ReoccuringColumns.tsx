"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Reoccuring } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@lib/utils";
import {
  reoccuringCategoryColors,
  reoccuringFrequencyColors,
} from "@lib/colors";
import { Badge } from "@components/ui/badge";
import { EditRecurring } from "@/components/reoccuring/EditRecurringDialog";
import { DeleteReoccuringButton } from "@/components/reoccuring/DeleteRecurringWrapper";

export const columns: ColumnDef<Reoccuring>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="text-center">
          type
          <Button
            variant={"ghost"}
            className="rounded-full hover:bg-transparent"
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown size={12} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const cate: Reoccuring["category"] = row.getValue("category");
      return (
        <div className="text-center">
          <Badge className={cn(reoccuringCategoryColors[cate])}>{cate}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "timeperiod",
    header: ({ column }) => {
      return (
        <div className="text-center">
          frequency
          <Button
            variant={"ghost"}
            className="rounded-full hover:bg-transparent"
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown size={12} />
          </Button>
        </div>
      );
    },
    filterFn: "equals",
    cell: ({ row }) => {
      const freq: Reoccuring["timeperiod"] = row.getValue("timeperiod");
      return (
        <div className="text-center">
          <Badge className={cn(reoccuringFrequencyColors[freq])}>{freq}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction: Reoccuring = row.original;

      return (
        <div className="flex opacity-0 group-hover:opacity-100 gap-0.5 justify-end pr-4">
          <EditRecurring reoccuring={transaction} />
          <DeleteReoccuringButton reoccuringId={transaction.id as Number} />
        </div>
      );
    },
  },
];
