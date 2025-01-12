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
import { User } from "@/lib/definitions";
import { ReoccuringSheet } from "@/components/reoccuring/create/AddReoccuring";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  user: User;
}

export function DataTable<TData, TValue>({
  columns,
  data,
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
  });

  return (
    <div className="flex flex-col gap-2 items-start rounded-md">
      <div className="w-full flex justify-between items-end mb-1">
        <div className="flex gap-x-4 items-end">
          <Input
            placeholder="Search recurring transactions"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-64 max-w-sm"
          />

          <ToggleGroup
            type="multiple"
            onValueChange={(value) => {
              table.getColumn("timeperiod")?.setFilterValue(value);
            }}
          >
            <ToggleGroupItem
              value="weekly"
              size={"sm"}
              className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-900 px-2.5 rounded-lg"
            >
              weekly
            </ToggleGroupItem>
            <ToggleGroupItem
              value="yearly"
              size={"sm"}
              className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-900 px-2.5 rounded-lg"
            >
              yearly
            </ToggleGroupItem>
            <ToggleGroupItem
              value="monthly"
              size={"sm"}
              className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-900 px-2.5 rounded-lg"
            >
              monthly
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bi-anually"
              size={"sm"}
              className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-900 px-2.5 rounded-lg"
            >
              bi-anually
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ReoccuringSheet user={user} />
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
          {table.getPageCount()}
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
