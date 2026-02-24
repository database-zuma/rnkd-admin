import { IconTable } from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/page-header";

export default function StandingsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Standings" description="Liga standings and rankings" />
      <div className="glass-card p-16 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.06] mx-auto mb-5">
          <IconTable className="w-7 h-7 text-[#A1A1A6]" />
        </div>
        <p className="text-lg font-semibold text-[#F5F5F7] mb-1">Coming Soon</p>
        <p className="text-sm text-[#8E8E93] max-w-xs mx-auto">Liga standings and ranking tables are currently in development.</p>
      </div>
    </div>
  );
}
