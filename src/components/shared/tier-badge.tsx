import { cn } from "@/lib/utils";

const tierStyles: Record<string, string> = {
  ROOKIE: "bg-[rgba(142,142,147,0.15)] text-[#8E8E93]",
  CHALLENGER: "bg-[rgba(48,209,88,0.15)] text-[#30D158]",
  CONTENDER: "bg-[rgba(10,132,255,0.15)] text-[#0A84FF]",
  ELITE: "bg-[rgba(191,90,242,0.15)] text-[#BF5AF2]",
  MASTERS: "bg-[rgba(255,159,10,0.15)] text-[#FF9F0A]",
  ICONS: "bg-[rgba(210,248,2,0.15)] text-[#D2F802]",
};

export function TierBadge({ tier }: { tier: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        tierStyles[tier] ?? "bg-white/10 text-[#A1A1A6]"
      )}
    >
      {tier}
    </span>
  );
}
