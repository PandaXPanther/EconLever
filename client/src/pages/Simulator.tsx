import { useMemo, useRef, useState } from "react";
import {
  simulate,
  PRESETS,
  BASELINE,
  type PolicyLevers,
} from "@/lib/engine";
import { PolicySlider } from "@/components/PolicySlider";
import { GiniChart } from "@/components/charts/GiniChart";
import { GdpDeficitChart } from "@/components/charts/GdpDeficitChart";
import { StatTile } from "@/components/StatTile";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { PolicyBriefDocument } from "@/components/PolicyBriefDocument";
import { exportPolicyBriefAsPdf } from "@/lib/exportPdf";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";
import { Download, RotateCcw, Loader2 } from "lucide-react";

const DEFAULT_LEVERS: PolicyLevers = {
  topMarginalTax: BASELINE.neutral.topMarginalTax,
  corporateTax: BASELINE.neutral.corporateTax,
  welfareSpending: BASELINE.neutral.welfareSpending,
  fedFundsRate: BASELINE.neutral.fedFundsRate,
};

export default function SimulatorPage() {
  useSeo({
    title: "EconLever Simulator · Project U.S. GDP, Deficit & Inequality (2026–2036)",
    description:
      "Move four policy levers (top marginal tax, corporate tax, welfare spending, federal funds rate) and watch a 10-year projection of U.S. GDP growth, the federal deficit, and the Gini coefficient. Export a one-page Policy Brief.",
    canonical: "https://econlever.org/#/",
    keywords:
      "fiscal policy simulator, monetary policy simulator, GDP projection, federal deficit, Gini coefficient, top marginal tax, corporate tax, welfare spending, federal funds rate, policy debate",
  });
  const [levers, setLevers] = useState<PolicyLevers>(DEFAULT_LEVERS);
  const [activePreset, setActivePreset] = useState<string>("current");
  const [exporting, setExporting] = useState(false);
  const briefRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const result = useMemo(() => simulate(levers), [levers]);

  function update<K extends keyof PolicyLevers>(key: K, value: number) {
    setLevers((prev) => ({ ...prev, [key]: value }));
    setActivePreset("custom");
  }

  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setLevers(p.levers);
    setActivePreset(id);
  }

  function reset() {
    setLevers(DEFAULT_LEVERS);
    setActivePreset("current");
  }

  async function handleExport() {
    if (!briefRef.current || exporting) return;
    setExporting(true);
    try {
      await exportPolicyBriefAsPdf(briefRef.current);
      toast({
        title: "Policy Brief exported",
        description: "Your 1-page PDF has been downloaded.",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Export failed",
        description: "Try refreshing the page and exporting again.",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  }

  const giniDeltaTone = result.giniDelta > 0.003 ? "deficit" : result.giniDelta < -0.003 ? "growth" : "neutral";

  const activeScenario =
    activePreset === "custom"
      ? { label: "Custom Scenario", description: "Your own lever mix. Adjust freely." }
      : PRESETS.find((x) => x.id === activePreset) ?? PRESETS[0];

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6 sm:py-8">
      {/* Hero / page title */}
      <section className="mb-6">
        <h1 className="text-xl sm:text-[28px] font-semibold tracking-tight text-foreground leading-tight max-w-3xl">
          Four policy levers. Ten years of U.S. growth, deficit, and inequality.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Move a slider, watch the projection redraw. The model is intentionally simple:
          additive coefficients calibrated to peer-reviewed macro studies, applied to a
          2025 U.S. baseline. Export a one-page brief when you find a scenario worth defending.
        </p>
      </section>

      {/* Active scenario banner + Export CTA */}
      <section
        className="mb-5 rounded-lg border border-card-border bg-card p-4 sm:p-5"
        aria-labelledby="active-scenario-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <h2
              id="active-scenario-heading"
              className="text-base sm:text-lg font-semibold tracking-tight text-foreground"
              data-testid="text-active-scenario"
            >
              {activeScenario.label}
            </h2>
            <p className="mt-1 text-[12px] text-muted-foreground leading-snug max-w-2xl">
              {activeScenario.description}
            </p>
          </div>
          {/*
            On mobile (full-width row): split 50/50 and let the longer label
            wrap or truncate so the Export button never overflows the card.
            On sm+ both buttons size to content.
          */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2 w-full sm:w-auto shrink-0">
            <Button
              onClick={reset}
              variant="outline"
              size="sm"
              className="gap-1.5 h-9 w-full sm:w-auto justify-center px-3"
              data-testid="button-reset"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">Reset to baseline</span>
            </Button>
            <Button
              onClick={handleExport}
              disabled={exporting}
              size="sm"
              className="gap-1.5 h-9 w-full sm:w-auto justify-center px-3"
              data-testid="button-export-brief"
            >
              {exporting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
                  <span className="truncate">Generating…</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {/* Short label on mobile, full label on sm+ */}
                  <span className="truncate sm:hidden">Export PDF</span>
                  <span className="hidden sm:inline truncate">Export Policy Brief (PDF)</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Preset chips */}
      <div className="mb-5 flex flex-wrap items-center gap-2" role="tablist" aria-label="Scenario presets">
        <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-muted-foreground mr-1">
          Scenarios
        </span>
        {PRESETS.map((p) => {
          const isActive = activePreset === p.id;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "true" : undefined}
              onClick={() => applyPreset(p.id)}
              data-testid={`button-preset-${p.id}`}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors hover-elevate active-elevate-2 ${
                isActive
                  ? "border-foreground bg-foreground text-background shadow-sm"
                  : "border-border bg-card text-foreground"
              }`}
              title={p.description}
            >
              {p.label}
            </button>
          );
        })}
        {activePreset === "custom" && (
          <span
            className="inline-flex items-center rounded-full border border-foreground bg-foreground text-background px-3 py-1 text-xs font-medium shadow-sm"
            data-testid="chip-custom-active"
          >
            Custom
          </span>
        )}
      </div>

      {/* Main grid: left controls, right viz */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Control panel */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-lg border border-card-border bg-card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight">Policy Levers</h2>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Drag a slider or type a value. The thin vertical line is the U.S. baseline.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <PolicySlider
                label="Top Marginal Income Tax"
                description="Personal income tax on top bracket"
                definition="Federal tax rate on the top slice of personal income. 2025 U.S. baseline: 37%."
                value={levers.topMarginalTax}
                min={10}
                max={70}
                step={0.5}
                baseline={BASELINE.neutral.topMarginalTax}
                onChange={(v) => update("topMarginalTax", v)}
                testId="slider-top-tax"
              />
              <PolicySlider
                label="Corporate Income Tax"
                description="Statutory federal corporate rate"
                definition="Statutory federal tax rate on corporate profits. 2025 baseline: 21% (post-TCJA)."
                value={levers.corporateTax}
                min={10}
                max={40}
                step={0.5}
                baseline={BASELINE.neutral.corporateTax}
                onChange={(v) => update("corporateTax", v)}
                testId="slider-corporate-tax"
              />
              <PolicySlider
                label="Social Welfare Spending"
                description="Federal transfers as % of GDP"
                definition="Federal transfer payments (Social Security, Medicare, Medicaid, SNAP) as a share of GDP. 2025 baseline: ~15%."
                value={levers.welfareSpending}
                min={5}
                max={30}
                step={0.5}
                baseline={BASELINE.neutral.welfareSpending}
                onChange={(v) => update("welfareSpending", v)}
                testId="slider-welfare"
              />
              <PolicySlider
                label="Federal Funds Rate"
                description="Fed target overnight rate"
                definition="The Fed's target overnight rate. Main tool of monetary policy. 2025 baseline: 4.50%."
                value={levers.fedFundsRate}
                min={0}
                max={10}
                step={0.25}
                baseline={BASELINE.neutral.fedFundsRate}
                onChange={(v) => update("fedFundsRate", v)}
                testId="slider-fed-rate"
              />
            </div>
          </div>
        </aside>

        {/* Visualization area */}
        <section className="lg:col-span-8 space-y-4">
          {/* Stat tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <StatTile
              label="Avg GDP Growth"
              value={result.avgGdpGrowth.toFixed(2)}
              unit="%"
              delta={result.avgGdpGrowth - BASELINE.potentialGdpGrowth}
              deltaLabel={`${(result.avgGdpGrowth - BASELINE.potentialGdpGrowth >= 0 ? "+" : "")}${(result.avgGdpGrowth - BASELINE.potentialGdpGrowth).toFixed(2)} pp`}
              tone="growth"
              hint="vs. potential"
              definition="Average annual real GDP growth across the projection. Compared against U.S. potential growth (~1.8%)."
            />
            <StatTile
              label="Cumul. Deficit"
              value={result.cumulativeDeficit.toFixed(1)}
              unit="% GDP"
              tone="deficit"
              hint="10-yr sum"
              definition="Federal deficit summed over 10 years (% of GDP). Positive means the government spent more than it collected."
            />
            <StatTile
              label="Final Gini"
              value={result.finalGini.toFixed(3)}
              delta={result.giniDelta}
              deltaLabel={`${result.giniDelta >= 0 ? "+" : ""}${result.giniDelta.toFixed(3)}`}
              tone={giniDeltaTone}
              hint="Δ vs. baseline"
              definition="Income Gini coefficient at the end of the projection. 0 = perfect equality, 1 = one household earns everything. 2025 baseline: 0.415."
            />
            <StatTile
              label="Regime"
              value={result.regime.split(" ")[0]}
              hint={result.regime}
              definition="How the engine labels the current lever mix (supply-side, Keynesian, austerity, redistributive, or centrist)."
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <ChartCard
              title="Gini Coefficient · 10-Year Trajectory"
              subtitle="Higher = more income inequality"
              accent="deficit"
            >
              <GiniChart data={result.series} />
            </ChartCard>
            <ChartCard
              title="GDP Growth vs. Federal Deficit"
              subtitle="Real growth (dashed line) vs. deficit % GDP (hatched bars)"
              accent="growth"
            >
              <GdpDeficitChart data={result.series} />
            </ChartCard>
          </div>

          {/* Dynamic analysis */}
          <AnalysisPanel levers={levers} result={result} />
        </section>
      </div>

      {/* Off-screen brief for PDF export */}
      <PolicyBriefDocument ref={briefRef} levers={levers} result={result} />
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  accent?: "growth" | "deficit" | "neutral";
  children: React.ReactNode;
}) {
  const accentClass =
    accent === "growth"
      ? "bg-[hsl(var(--growth))]"
      : accent === "deficit"
      ? "bg-[hsl(var(--deficit))]"
      : "bg-foreground";
  return (
    <div className="rounded-lg border border-card-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${accentClass}`} />
            <h3 className="text-[13px] font-semibold tracking-tight text-foreground">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5 ml-3.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
