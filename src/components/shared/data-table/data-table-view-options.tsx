"use client"

import { type Table } from "@tanstack/react-table"
import { Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto hidden h-9 lg:flex bg-rnkd-bg-surface border-rnkd-border-light text-rnkd-text-secondary hover:bg-rnkd-bg-elevated hover:text-rnkd-text-primary transition-colors">
          <Settings2 className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px] bg-rnkd-bg-surface border-rnkd-border-light text-rnkd-text-primary">
        <DropdownMenuLabel className="text-rnkd-text-secondary font-medium">Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-rnkd-border-medium" />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize hover:bg-rnkd-bg-elevated focus:bg-rnkd-bg-elevated cursor-pointer data-[state=checked]:text-rnkd-volt data-[state=checked]:font-medium"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}