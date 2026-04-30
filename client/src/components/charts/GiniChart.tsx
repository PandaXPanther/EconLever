import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import type { YearProjection } from "@/lib/engine";
import { BASELINE } from "@/lib/engine";

export function GiniChart({ data }: { data: YearProjection[] }) {
  const first = data[0]?.gini ?? BASELINE.gini;
  const last = data[data.length - 1]?.gini ?? BASELINE.gini;
  const delta = last - first;
  const direction =
    Math.abs(delta) < 0.005 ? "remains roughly flat" : delta > 0 ? "rises" : "falls";
  const summary =
    `Gini coefficient ${direction} from ${first.toFixed(3)} in ${data[0]?.year} ` +
    `to ${last.toFixed(3)} in ${data[data.length - 1]?.year}, ` +
    `a change of ${delta >= 0 ? "+" : ""}${delta.toFixed(3)} versus the 0.415 U.S. baseline. ` +
    `Higher values indicate greater income inequality.`;

  return (
    <>
      <p className="sr-only" data-testid="text-gini-summary">{summary}</p>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 56, left: 0, bottom: 0 }}
          role="img"
          aria-label={summary}
        >
          <defs>
            <linearGradient id="giniArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--deficit))" stopOpacity={0.18} />
              <stop offset="100%" stopColor="hsl(var(--deficit))" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            domain={[0.34, 0.52]}
            tickCount={5}
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickLine={false}
            axisLine={false}
            width={42}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 6,
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              boxShadow: "var(--shadow-md)",
            }}
            labelStyle={{ color: "hsl(var(--muted-foreground))", fontWeight: 600 }}
            formatter={(v: number) => [v.toFixed(3), "Gini"]}
          />
          <ReferenceLine
            y={BASELINE.gini}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="3 3"
            label={{
              value: `Baseline ${BASELINE.gini.toFixed(3)}`,
              position: "right",
              fill: "hsl(var(--muted-foreground))",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
            }}
          />
          <Area
            type="monotone"
            dataKey="gini"
            stroke="none"
            fill="url(#giniArea)"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="gini"
            stroke="hsl(var(--deficit))"
            strokeWidth={2.25}
            dot={{ r: 3.5, fill: "hsl(var(--deficit))", stroke: "hsl(var(--card))", strokeWidth: 1.5 }}
            activeDot={{ r: 4.5 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}
