import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { TierBadge } from "@/components/shared/tier-badge";
import { MMRDelta } from "@/components/shared/mmr-delta";
import { Button } from "@/components/ui/button";
import { getMatchById } from "@/lib/data/matches";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  RATED: "bg-[rgba(210,248,2,0.15)] text-[#D2F802]",
  UNRATED: "bg-[rgba(142,142,147,0.15)] text-[#8E8E93]",
  LIGA: "bg-[rgba(10,132,255,0.15)] text-[#0A84FF]",
};

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await getMatchById(id);

  if (!match) {
    return (
      <div className="p-6">
        <Link href="/matches" className="inline-flex items-center gap-1.5 text-sm text-[#A1A1A6] hover:text-[#F5F5F7] mb-6">
          <IconArrowLeft className="w-4 h-4" /> Back to Matches
        </Link>
        <div className="glass-card p-12 text-center">
          <p className="text-lg text-[#A1A1A6]">Match not found</p>
          <Link href="/matches" className="text-sm text-[#D2F802] hover:underline mt-2 inline-block">
            Return to matches
          </Link>
        </div>
      </div>
    );
  }

  const t1Won =
    match.team1.score.reduce((a, b) => a + b, 0) >
    match.team2.score.reduce((a, b) => a + b, 0);

  const allPlayers = [
    ...match.team1.players.map((p) => ({ ...p, team: 1, won: t1Won })),
    ...match.team2.players.map((p) => ({ ...p, team: 2, won: !t1Won })),
  ];

  return (
    <div className="p-6 space-y-6">
      <Link href="/matches" className="inline-flex items-center gap-1.5 text-sm text-[#A1A1A6] hover:text-[#D2F802] transition-colors duration-200">
        <IconArrowLeft className="w-4 h-4" /> Back to Matches
      </Link>

      <PageHeader
        title={`Match #MTC-${match.id.split("-")[1]}`}
        description={`${match.venue} · ${match.duration_minutes} min`}
      />

      {/* Match header */}
      <div className="glass-card p-6 rounded-[16px]">
        <div className="flex items-center gap-3 mb-6">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              typeStyles[match.type] ?? "bg-white/10 text-[#A1A1A6]"
            )}
          >
            {match.type}
          </span>
          <StatusBadge status={match.status} />
          <span className="text-sm text-[#A1A1A6]">
            {new Date(match.date).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="ml-auto">
            <MMRDelta delta={match.mmr_delta} />
          </span>
        </div>

        {/* Score display */}
        <div className="text-center py-10">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className={cn("text-right flex-1", t1Won && "opacity-100")}>
              <p className={cn("text-lg font-semibold", t1Won ? "text-[#D2F802]" : "text-[#F5F5F7]")}>
                {match.team1.players.map((p) => p.name).join(" / ")}
              </p>
              {t1Won && <p className="text-xs text-[#D2F802] mt-0.5">WINNER</p>}
            </div>
            <span className="text-[#A1A1A6]/60 text-xs font-bold tracking-[0.2em] uppercase shrink-0">VS</span>
            <div className={cn("text-left flex-1", !t1Won && "opacity-100")}>
              <p className={cn("text-lg font-semibold", !t1Won ? "text-[#D2F802]" : "text-[#F5F5F7]")}>
                {match.team2.players.map((p) => p.name).join(" / ")}
              </p>
              {!t1Won && <p className="text-xs text-[#D2F802] mt-0.5">WINNER</p>}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8">
            {match.team1.score.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-mono text-4xl font-bold tabular-nums tracking-tight",
                    s > match.team2.score[i] ? "text-[#D2F802]" : "text-[#A1A1A6]"
                  )}
                >
                  {s}
                </span>
                <span className="text-[#A1A1A6] text-lg">-</span>
                <span
                  className={cn(
                    "font-mono text-4xl font-bold tabular-nums tracking-tight",
                    match.team2.score[i] > s ? "text-[#D2F802]" : "text-[#A1A1A6]"
                  )}
                >
                  {match.team2.score[i]}
                </span>
                {i < match.team1.score.length - 1 && (
                  <span className="text-white/[0.08] text-2xl ml-3">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player cards */}
      <div className="grid grid-cols-4 gap-5">
        {allPlayers.map((player) => (
          <div key={player.id} className="glass-card p-5 rounded-[16px] text-center transition-all duration-200 hover:bg-white/[0.04]">
            <div className="w-12 h-12 rounded-full bg-[#2C2C2E] border border-white/[0.08] flex items-center justify-center mx-auto mb-3 ring-2 ring-white/[0.04]">
              <span className="text-sm font-medium text-[#A1A1A6]">
                {player.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
              </span>
            </div>
            <p className="text-sm font-medium text-[#F5F5F7] mb-1">{player.name}</p>
            <TierBadge tier="CONTENDER" />
            <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1">
              <p className="text-xs text-[#A1A1A6] mb-1">MMR Change</p>
              <MMRDelta delta={player.won ? match.mmr_delta : -match.mmr_delta} />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-[#EF4444]"
        >
          Void Match
        </Button>
      </div>
    </div>
  );
}
