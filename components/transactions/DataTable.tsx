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
import { Reoccuring, User } from "@/lib/definitions";

import { CreateTransactionSheet } from "@/components/transactions/create/CreateTransaction";

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
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
      <div className="w-full flex justify-between items-end mb-1">
        <div className="flex gap-x-4 items-end">
          <Input
            placeholder="Search transactions"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-64 max-w-sm"
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
                        className="first:rounded-tl-lg last:rounded-tr-lg rounded-lg bg-transparent"
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
