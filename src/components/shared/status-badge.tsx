import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  VERIFIED: "bg-[#0D3D2E] text-[#30D158]",
  PENDING: "bg-[rgba(255,159,10,0.15)] text-[#FF9F0A]",
  DISPUTED: "bg-[#4D1F1F] text-[#EF4444]",
  COMPLETED: "bg-[rgba(142,142,147,0.15)] text-[#8E8E93]",
  ACTIVE: "bg-[rgba(210,248,2,0.15)] text-[#D2F802]",
  SCHEDULED: "bg-[rgba(255,159,10,0.15)] text-[#FF9F0A]",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        statusStyles[status] ?? "bg-white/10 text-[#A1A1A6]"
      )}
    >
      {status}
    </span>
  );
}
