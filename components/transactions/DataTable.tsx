"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, Suspense } from "react";
import { Skeleton } from "@components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Reoccuring, Transaction, User } from "@/lib/definitions";

import { CreateTransactionSheet } from "@/components/transactions/create/CreateTransaction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reoccuring: Reoccuring[];
  user: User;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  reoccuring,
  user,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const dateRangeFilterFn = (
    row: Row<Transaction>,
    columnId: string,
    filterValue: number | string,
    addMeta: (meta: any) => void,
  ): boolean => {
    const date = new Date(row.getValue(columnId));
    console.log(date);
    return true;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    filterFns: {
      dateRange: dateRangeFilterFn,
    },
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    meta: {
      reoccuring: reoccuring,
    },
  });

  return (
    <div className="flex flex-col gap-2 items-start rounded-md">
      <div className="w-full flex justify-between items-start lg:items-end mb-1">
        <div className="flex flex-col w-5/6 space-y-1 lg:flex-wrap lg:flex-row gap-x-3 items-start lg:items-baseline">
          <Input
            placeholder="search transactions"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-48 max-w-sm"
          />

          <ToggleGroup
            type="multiple"
            onValueChange={(value) => {
              table.getColumn("type")?.setFilterValue(value);
            }}
          >
            <ToggleGroupItem
              value="reoccuring"
              size={"sm"}
              className="data-[state=on]:bg-rose-100 data-[state=on]:text-rose-900 px-2.5 rounded-lg"
            >
              reoccuring
            </ToggleGroupItem>
            <ToggleGroupItem
              value="expense"
              size={"sm"}
              className="data-[state=on]:bg-rose-100 data-[state=on]:text-rose-900 px-2.5 rounded-lg"
            >
              expenses
            </ToggleGroupItem>
            <ToggleGroupItem
              value="paycheck"
              size={"sm"}
              className="data-[state=on]:bg-rose-100 data-[state=on]:text-rose-900 px-2.5 rounded-lg"
            >
              paychecks
            </ToggleGroupItem>
            <ToggleGroupItem
              value="deposit"
              size={"sm"}
              className="data-[state=on]:bg-rose-100 data-[state=on]:text-rose-900 px-2.5x rounded-lg"
            >
              deposit
            </ToggleGroupItem>
            <ToggleGroupItem
              value="withdrawl"
              size={"sm"}
              className="data-[state=on]:bg-rose-100 data-[state=on]:text-rose-900 px-2.5 rounded-lg"
            >
              withdrawl
            </ToggleGroupItem>
          </ToggleGroup>

          <Select
            onValueChange={(value) => {
              table.getColumn("created_at")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="max-w-fit space-x-2">
              <SelectValue placeholder="select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">last week</SelectItem>
              <SelectItem value="30">last month</SelectItem>
              <SelectItem value="90">last 3 months</SelectItem>
              <SelectItem value="max">all</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CreateTransactionSheet user={user} reoccuring={reoccuring} />
      </div>

      <div className="w-full rounded-lg border">
        <Suspense fallback={<Skeleton className="h-96 rounded-lg w-full" />}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="first:rounded-tl-lg last:rounded-tr-lg bg-transparent"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Suspense>
      </div>

      <div className="w-full flex items-center justify-end gap-4">
        <span className="text-sm">
          page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() > 0 ? table.getPageCount() : 1}
        </span>
        <div className="flex items-center gap-x-1">
          <Button
            variant={"outline"}
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </Button>
          <Button
            variant={"outline"}
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
