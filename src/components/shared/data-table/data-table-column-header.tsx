import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
} from "lucide-react"
import { type Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-rnkd-bg-active hover:bg-rnkd-bg-elevated hover:text-rnkd-text-primary text-rnkd-text-secondary transition-colors"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-rnkd-bg-surface border-rnkd-border-light text-rnkd-text-primary">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="hover:bg-rnkd-bg-elevated focus:bg-rnkd-bg-elevated cursor-pointer">
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-rnkd-text-secondary" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="hover:bg-rnkd-bg-elevated focus:bg-rnkd-bg-elevated cursor-pointer">
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-rnkd-text-secondary" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-rnkd-border-medium" />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)} className="hover:bg-rnkd-bg-elevated focus:bg-rnkd-bg-elevated cursor-pointer">
            <EyeOff className="mr-2 h-3.5 w-3.5 text-rnkd-text-secondary" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}