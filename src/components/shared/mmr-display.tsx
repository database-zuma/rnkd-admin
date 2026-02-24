import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export function MMRDisplay({
  value,
  size = "md",
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "font-mono font-bold text-[#F5F5F7] tabular-nums",
        sizes[size]
      )}
    >
      {value.toLocaleString()}
    </span>
  );
}
