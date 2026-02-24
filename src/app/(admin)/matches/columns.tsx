"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/shared/status-badge";
import { MMRDelta } from "@/components/shared/mmr-delta";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { cn } from "@/lib/utils";
import type { Match } from "@/lib/mock-data/matches";

const typeStyles: Record<string, string> = {
  RATED: "bg-[rgba(210,248,2,0.15)] text-[#D2F802]",
  UNRATED: "bg-[rgba(142,142,147,0.15)] text-[#8E8E93]",
  LIGA: "bg-[rgba(10,132,255,0.15)] text-[#0A84FF]",
};

export const matchColumns: ColumnDef<Match>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Match ID" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-[#A1A1A6]">
        #MTC-{row.original.id.split("-")[1]}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const d = new Date(row.original.date);
      return (
        <span className="text-sm text-[#A1A1A6]">
          {d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const t = row.original.type;
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            typeStyles[t] ?? "bg-white/10 text-[#A1A1A6]"
          )}
        >
          {t}
        </span>
      );
    },
  },
  {
    id: "teams",
    header: "Teams",
    cell: ({ row }) => {
      const m = row.original;
      const t1 = m.team1.players.map((p) => p.name.split(" ")[0]).join("/");
      const t2 = m.team2.players.map((p) => p.name.split(" ")[0]).join("/");
      return (
        <span className="text-sm text-[#F5F5F7] truncate block max-w-[200px]">
          {t1} <span className="text-[#A1A1A6]">vs</span> {t2}
        </span>
      );
    },
  },
  {
    id: "score",
    header: "Score",
    cell: ({ row }) => {
      const m = row.original;
      return (
        <span className="font-mono text-sm text-[#F5F5F7] tabular-nums">
          {m.team1.score.map((s, i) => `${s}-${m.team2.score[i]}`).join(", ")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "mmr_delta",
    header: ({ column }) => <DataTableColumnHeader column={column} title="MMR Δ" />,
    cell: ({ row }) => <MMRDelta delta={row.original.mmr_delta} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const m = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-[#A1A1A6] hover:text-[#F5F5F7]">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#1C1C1E] border-white/[0.08] text-[#F5F5F7]"
          >
            <DropdownMenuItem
              className="hover:bg-[#2C2C2E] focus:bg-[#2C2C2E] cursor-pointer"
              asChild
            >
              <a href={`/matches/${m.id}`}>View</a>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#2C2C2E] focus:bg-[#2C2C2E] cursor-pointer text-[#EF4444] focus:text-[#EF4444]">
              Void
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
