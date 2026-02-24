"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface TierData {
  tier: string;
  count: number;
  percentage: number;
}

const tierColors: Record<string, string> = {
  ROOKIE: "#8E8E93",
  CHALLENGER: "#30D158",
  CONTENDER: "#0A84FF",
  ELITE: "#BF5AF2",
  MASTERS: "#FF9F0A",
  ICONS: "#D2F802",
};

export function TierChart({ data }: { data: TierData[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
        <XAxis
          type="number"
          tick={{ fill: "#A1A1A6", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="tier"
          tick={{ fill: "#A1A1A6", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={90}
        />
        <Tooltip
          contentStyle={{
            background: "#1C1C1E",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            color: "#F5F5F7",
            fontSize: 12,
          }}
          formatter={(value: number, _name: string, entry: { payload?: TierData }) => [
            `${value} (${entry.payload?.percentage ?? 0}%)`,
            "Players",
          ]}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
          {data.map((entry) => (
            <Cell key={entry.tier} fill={tierColors[entry.tier] ?? "#A1A1A6"} fillOpacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
