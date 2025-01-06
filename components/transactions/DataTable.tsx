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
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  children,
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
      <div className="w-full flex justify-between mb-1">
        <div className="flex gap-x-4">
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
            <ToggleGroupItem value="reoccuring">reoccuring</ToggleGroupItem>
            <ToggleGroupItem value="expense">expenses</ToggleGroupItem>
            <ToggleGroupItem value="paycheck">paychecks</ToggleGroupItem>
            <ToggleGroupItem value="deposit">deposit</ToggleGroupItem>
            <ToggleGroupItem value="withdrawl">withdrawl</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {children}
      </div>

      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="w-full flex items-center justify-end gap-4">
        <span className="text-base">
          Page {table.getState().pagination.pageIndex + 1}
        </span>
        <div className="flex items-center gap-x-1">
          <Button
            variant={"outline"}
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant={"outline"}
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
