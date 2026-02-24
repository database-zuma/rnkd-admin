import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";
import { TierBadge } from "@/components/shared/tier-badge";
import { MMRDisplay } from "@/components/shared/mmr-display";
import { StatusBadge } from "@/components/shared/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserById } from "@/lib/data/users";
import { getMatches } from "@/lib/data/matches";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return (
      <div className="p-6">
        <Link href="/users" className="inline-flex items-center gap-1.5 text-sm text-[#A1A1A6] hover:text-[#F5F5F7] mb-6">
          <IconArrowLeft className="w-4 h-4" /> Back to Users
        </Link>
        <div className="glass-card p-12 text-center">
          <p className="text-lg text-[#A1A1A6]">User not found</p>
          <Link href="/users" className="text-sm text-[#D2F802] hover:underline mt-2 inline-block">
            Return to users
          </Link>
        </div>
      </div>
    );
  }

  const allMatches = await getMatches();
  const userMatches = allMatches
    .filter(
      (m) =>
        m.team1.players.some((p) => p.id === user.id) ||
        m.team2.players.some((p) => p.id === user.id)
    )
    .slice(0, 5);

  const p = user.profile;

  return (
    <div className="p-6 space-y-6">
      <Link href="/users" className="inline-flex items-center gap-1.5 text-sm text-[#A1A1A6] hover:text-[#F5F5F7] transition-colors">
        <IconArrowLeft className="w-4 h-4" /> Back to Users
      </Link>

      <PageHeader title={user.name} description={user.email} />

      {/* Profile header card */}
      <div className="glass-card p-6 rounded-[16px]">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20 bg-[#2C2C2E] border border-white/[0.08] text-xl">
            <AvatarFallback className="bg-[#2C2C2E] text-[#A1A1A6] text-lg font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-[#F5F5F7]">{user.name}</h2>
              <TierBadge tier={p.tier} />
              {user.role === "admin" && (
                <span className="px-2 py-0.5 rounded-full bg-[rgba(210,248,2,0.15)] text-[#D2F802] text-xs font-semibold">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-sm text-[#A1A1A6]">{user.email} &middot; {user.phone}</p>
            <p className="text-sm text-[#A1A1A6]">{user.city}, {user.province}</p>
            <p className="text-xs text-[#A1A1A6] mt-1">
              Joined {new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-[#A1A1A6] mb-1">MMR Rating</p>
            <MMRDisplay value={p.mmr} size="lg" />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Wins", value: p.wins, color: "text-[#30D158]" },
          { label: "Losses", value: p.losses, color: "text-[#EF4444]" },
          {
            label: "Win Rate",
            value: `${p.win_rate}%`,
            color: p.win_rate >= 50 ? "text-[#30D158]" : "text-[#EF4444]",
          },
          { label: "PBPI Grading", value: p.pbpi_grading, color: "text-[#D2F802]" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-5 rounded-[16px] text-center">
            <p className={cn("text-3xl font-bold font-mono tabular-nums", stat.color)}>
              {stat.value}
            </p>
            <p className="text-sm text-[#A1A1A6] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Matches */}
      <div className="glass-card p-6 rounded-[16px]">
        <h3 className="text-lg font-semibold text-[#F5F5F7] mb-4">Recent Matches</h3>
        {userMatches.length === 0 ? (
          <p className="text-sm text-[#A1A1A6]">No matches found for this player.</p>
        ) : (
          <div className="space-y-3">
            {userMatches.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 border border-white/[0.04]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#F5F5F7] truncate">
                    {m.team1.players.map((pl) => pl.name).join(" / ")}{" "}
                    <span className="text-[#A1A1A6]">vs</span>{" "}
                    {m.team2.players.map((pl) => pl.name).join(" / ")}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="font-mono text-sm text-[#F5F5F7] tabular-nums">
                    {m.team1.score.map((s, i) => `${s}-${m.team2.score[i]}`).join(", ")}
                  </span>
                  <StatusBadge status={m.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
