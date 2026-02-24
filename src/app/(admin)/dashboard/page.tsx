import {
  IconUsers,
  IconTrophy,
  IconAlertTriangle,
  IconClock,
  IconChartLine,
  IconCalendar,
  IconBuilding,
} from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";
import { MatchesChart } from "@/components/dashboard/matches-chart";
import { TierChart } from "@/components/dashboard/tier-chart";
import { StatusBadge } from "@/components/shared/status-badge";
import { getDashboardStats } from "@/lib/data/users";
import { getChartData, getTierDistribution, getMatches } from "@/lib/data/matches";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: number;
  alert?: boolean;
}

function StatCard({ icon, label, value, trend, alert }: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-[16px] flex flex-col gap-3 transition-all",
        alert && "border-[#EF4444]/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5">
          {icon}
        </div>
        {trend !== undefined && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              trend >= 0
                ? "bg-[rgba(48,209,88,0.15)] text-[#30D158]"
                : "bg-[rgba(239,68,68,0.15)] text-[#EF4444]"
            )}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <span className="text-4xl font-bold font-mono tabular-nums text-[#F5F5F7]">
        {typeof value === "number" ? value.toLocaleString() : value}
      </span>
      <span className="text-sm text-[#A1A1A6]">{label}</span>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default async function DashboardPage() {
  const [stats, chartData, tierData, recentMatches] = await Promise.all([
    getDashboardStats(),
    getChartData(),
    getTierDistribution(),
    getMatches(),
  ]);

  const last5 = recentMatches.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Dashboard" description="RNKD Operations Overview" />

      {/* Row 1 — Stat cards */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard
          icon={<IconUsers className="w-5 h-5 text-[#0A84FF]" />}
          label="Total Users"
          value={stats.totalUsers}
          trend={stats.userTrend}
        />
        <StatCard
          icon={<IconTrophy className="w-5 h-5 text-[#D2F802]" />}
          label="Matches This Week"
          value={stats.matchesThisWeek}
          trend={stats.matchesTrend}
        />
        <StatCard
          icon={<IconAlertTriangle className="w-5 h-5 text-[#EF4444]" />}
          label="Active Disputes"
          value={stats.activeDisputes}
          alert={stats.activeDisputes > 0}
        />
        <StatCard
          icon={<IconClock className="w-5 h-5 text-[#FF9F0A]" />}
          label="Pending Verifications"
          value={stats.pendingVerifications}
        />
        <StatCard
          icon={<IconChartLine className="w-5 h-5 text-[#BF5AF2]" />}
          label="Average MMR"
          value={stats.averageMMR}
          trend={stats.mmrTrend}
        />
      </div>

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 glass-card p-6 rounded-[16px]">
          <h2 className="text-lg font-semibold text-[#F5F5F7] mb-4">Matches Over Time</h2>
          <MatchesChart data={chartData} />
        </div>
        <div className="glass-card p-6 rounded-[16px]">
          <h2 className="text-lg font-semibold text-[#F5F5F7] mb-4">Tier Distribution</h2>
          <TierChart data={tierData} />
        </div>
      </div>

      {/* Row 3 — Recent Matches + Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 glass-card p-6 rounded-[16px]">
          <h2 className="text-lg font-semibold text-[#F5F5F7] mb-4">Recent Matches</h2>
          <div className="space-y-3">
            {last5.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 border border-white/[0.04]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#F5F5F7] truncate">
                    {m.team1.players.map((p) => p.name).join(" / ")}{" "}
                    <span className="text-[#A1A1A6]">vs</span>{" "}
                    {m.team2.players.map((p) => p.name).join(" / ")}
                  </p>
                  <p className="text-xs text-[#A1A1A6] mt-0.5">{m.venue}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="font-mono text-sm text-[#F5F5F7] tabular-nums">
                    {m.team1.score.map((s, i) => `${s}-${m.team2.score[i]}`).join(", ")}
                  </span>
                  <StatusBadge status={m.status} />
                  <span className="text-xs text-[#A1A1A6] w-16 text-right">
                    {formatDate(m.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6 rounded-[16px] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5">
                <IconCalendar className="w-5 h-5 text-[#D2F802]" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-[#F5F5F7]">
                  {stats.activeSeasons}
                </p>
                <p className="text-sm text-[#A1A1A6]">Active Seasons</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 rounded-[16px] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5">
                <IconBuilding className="w-5 h-5 text-[#0A84FF]" />
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-[#F5F5F7]">
                  {stats.totalClubs}
                </p>
                <p className="text-sm text-[#A1A1A6]">Total Clubs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
