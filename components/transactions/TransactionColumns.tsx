"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Reoccuring, Transaction } from "@/lib/definitions";
import { DeleteTransactionWrapper } from "@/components/transactions/delete/DeleteTransactionButton";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { cn, cashFormatter, dateFormatter } from "@lib/utils";
import { transactionTypeColors } from "@lib/colors";
import { Badge } from "@components/ui/badge";
import { EditTransaction } from "@/components/transactions/edit/EditTransaction";
import { mono } from "@/styles/fonts";
import { differenceInDays } from "date-fns";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right pr-4">
          amount
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
      const amount: string = row.getValue("amount");
      let formatted = cashFormatter(Number(amount));
      // let isNeg = false;
      // if (Number(amount) < 0) {
      //   isNeg = true;
      //   formatted = formatted.slice(1,);
      // }

      return (
        <div
          className={cn(
            mono.className,
            "text-right text-base tracking-wider pr-8",
          )}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => <div className="text-center">type</div>,
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const type: Transaction["type"] = row.getValue("type");
      return (
        <div className="text-center">
          <Badge className={cn(transactionTypeColors[type])}>{type}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    filterFn: (
      row: Row<Transaction>,
      columnId: string,
      filterValue: number | string,
      addMeta: (meta: any) => void,
    ): boolean => {
      const date = new Date(row.getValue(columnId));
      // console.log(date);
      if (filterValue == "max") return true;
      if (differenceInDays(new Date(), date) < Number(filterValue)) return true;
      return false;
    },
    header: ({ column }) => {
      return (
        <div className="text-center">
          date
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
      const date: Date = row.getValue("created_at");
      const formatted = dateFormatter(date, true);

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const transaction: Transaction = row.original;
      const meta = table.options.meta as { reoccuring: Reoccuring[] };
      const reoccuring = meta.reoccuring;

      return (
        <div className="flex opacity-0 group-hover:opacity-100 gap-0.5 justify-end pr-4">
          <EditTransaction transaction={transaction} reoccuring={reoccuring} />
          <DeleteTransactionWrapper transaction={transaction} />
        </div>
      );
    },
  },
];
