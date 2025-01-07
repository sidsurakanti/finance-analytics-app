"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Reoccuring, Transaction } from "@/lib/definitions";
import { DeleteTransactionWrapper } from "@components/transactions/DeleteTransactionWrapper";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { cn, cashFormatter, dateFormatter } from "@lib/utils";
import { transactionTypeColors } from "@lib/colors";
import { Badge } from "@components/ui/badge";


export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <span>
          Amount
          <Button
            variant={"ghost"}
            className="rounded-full hover:bg-transparent"
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown size={12} />
          </Button>
        </span>
      );
    },
    cell: ({ row }) => {
      const amount: string = row.getValue("amount");
      const formatted = cashFormatter(Number(amount));

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const type: Transaction["type"] = row.getValue("type");
      return <Badge className={cn(transactionTypeColors[type])}>{type}</Badge>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <span>
          Date
          <Button
            variant={"ghost"}
            className="rounded-full hover:bg-transparent"
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown size={12} />
          </Button>
        </span>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("created_at");
      const formatted = dateFormatter(date, true);

      return <span>{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction: Transaction = row.original;
      return (
        <span className="opacity-0 group-hover:opacity-100">
          <DeleteTransactionWrapper transaction={transaction} />
        </span>
      );
    },
  },
];
