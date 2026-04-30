import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { YearProjection } from "@/lib/engine";

export function GdpDeficitChart({ data }: { data: YearProjection[] }) {
  const avgGrowth = data.reduce((s, y) => s + y.gdpGrowth, 0) / data.length;
  const avgDeficit = data.reduce((s, y) => s + y.deficit, 0) / data.length;
  const summary =
    `Average real GDP growth of ${avgGrowth.toFixed(2)}% per year and an average ` +
    `federal deficit of ${avgDeficit.toFixed(1)}% of GDP across ` +
    `${data[0]?.year}\u2013${data[data.length - 1]?.year}. ` +
    `Bars show deficit, the line shows GDP growth.`;

  return (
    <>
      <p className="sr-only" data-testid="text-gdp-deficit-summary">{summary}</p>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          barCategoryGap={6}
          role="img"
          aria-label={summary}
        >
          {/* Diagonal-line pattern so deficit bars are distinguishable
              without relying on color alone. */}
          <defs>
            <pattern
              id="deficit-hatch"
              patternUnits="userSpaceOnUse"
              width="6"
              height="6"
              patternTransform="rotate(45)"
            >
              <rect width="6" height="6" fill="hsl(var(--deficit))" />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="hsl(var(--card))"
                strokeOpacity="0.55"
                strokeWidth="2"
              />
            </pattern>
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
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
            tickLine={false}
            axisLine={false}
            width={42}
            tickFormatter={(v) => `${Math.round(v * 10) / 10}%`}
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
            formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}
          />
          <Legend
            wrapperStyle={{
              fontSize: 11,
              fontFamily: "var(--font-sans)",
              paddingTop: 6,
            }}
            iconType="square"
            iconSize={10}
          />
          <Bar
            dataKey="deficit"
            name="Deficit, hatched (% GDP)"
            fill="url(#deficit-hatch)"
            stroke="hsl(var(--deficit))"
            strokeWidth={1}
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="gdpGrowth"
            name="Real GDP growth (line, dashed)"
            stroke="hsl(var(--growth))"
            strokeWidth={2.5}
            strokeDasharray="6 3"
            dot={{ r: 3.5, fill: "hsl(var(--growth))", stroke: "hsl(var(--card))", strokeWidth: 1.5 }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
}
