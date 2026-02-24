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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TierBadge } from "@/components/shared/tier-badge";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { cn } from "@/lib/utils";

interface UserRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
  province: string;
  city: string;
  role: string;
  created_at: string;
  profile: {
    mmr: number;
    tier: string;
    pbpi_grading: string;
    matches_played: number;
    wins: number;
    losses: number;
    win_rate: number;
  };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const userColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Player" />,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 bg-[#2C2C2E] border border-white/[0.08]">
            <AvatarFallback className="bg-[#2C2C2E] text-[#A1A1A6] text-xs font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#F5F5F7] truncate">{user.name}</p>
            <p className="text-xs text-[#A1A1A6] truncate">{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-[#A1A1A6]">{row.original.phone}</span>
    ),
  },
  {
    id: "tier",
    accessorFn: (row) => row.profile.tier,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tier" />,
    cell: ({ row }) => <TierBadge tier={row.original.profile.tier} />,
  },
  {
    id: "mmr",
    accessorFn: (row) => row.profile.mmr,
    header: ({ column }) => <DataTableColumnHeader column={column} title="MMR" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm font-semibold text-[#F5F5F7] tabular-nums">
        {row.original.profile.mmr}
      </span>
    ),
  },
  {
    accessorKey: "province",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Province" />,
    cell: ({ row }) => (
      <span className="text-sm text-[#A1A1A6]">{row.original.province}</span>
    ),
  },
  {
    id: "matches",
    accessorFn: (row) => row.profile.matches_played,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Matches" />,
    cell: ({ row }) => (
      <span className="font-mono text-sm tabular-nums text-[#F5F5F7]">
        {row.original.profile.matches_played}
      </span>
    ),
  },
  {
    id: "win_rate",
    accessorFn: (row) => row.profile.win_rate,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Win%" />,
    cell: ({ row }) => {
      const wr = row.original.profile.win_rate;
      return (
        <span
          className={cn(
            "font-mono text-sm font-semibold tabular-nums",
            wr >= 50 ? "text-[#30D158]" : "text-[#EF4444]"
          )}
        >
          {wr}%
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joined" />,
    cell: ({ row }) => {
      const d = new Date(row.original.created_at);
      return (
        <span className="text-sm text-[#A1A1A6]">
          {d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
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
              <a href={`/users/${user.id}`}>View</a>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#2C2C2E] focus:bg-[#2C2C2E] cursor-pointer">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#2C2C2E] focus:bg-[#2C2C2E] cursor-pointer text-[#EF4444] focus:text-[#EF4444]">
              Suspend
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
