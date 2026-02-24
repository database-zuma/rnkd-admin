"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartDataPoint {
  date: string;
  matches: number;
  users: number;
}

export function MatchesChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="voltGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D2F802" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#D2F802" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="mintGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#30D158" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#30D158" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#A1A1A6", fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: string) => {
            const d = new Date(v);
            return `${d.getDate()}/${d.getMonth() + 1}`;
          }}
          interval={4}
        />
        <YAxis tick={{ fill: "#A1A1A6", fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: "#1C1C1E",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            color: "#F5F5F7",
            fontSize: 12,
          }}
          labelFormatter={(v: string) => {
            const d = new Date(v);
            return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: "#A1A1A6" }}
        />
        <Area
          type="monotone"
          dataKey="matches"
          stroke="#D2F802"
          strokeWidth={2}
          fill="url(#voltGrad)"
          name="Matches"
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#30D158"
          strokeWidth={2}
          fill="url(#mintGrad)"
          name="New Users"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
