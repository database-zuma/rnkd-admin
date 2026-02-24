import { cn } from "@/lib/utils";

export function MMRDelta({ delta }: { delta: number }) {
  const isPositive = delta >= 0;
  return (
    <span
      className={cn(
        "font-mono text-sm font-semibold tabular-nums",
        isPositive ? "text-[#30D158]" : "text-[#EF4444]"
      )}
    >
      {isPositive ? "+" : ""}
      {delta}
    </span>
  );
}
