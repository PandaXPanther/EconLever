import type { PolicyLevers, SimulationResult } from "@/lib/engine";
import { generateAnalysis } from "@/lib/engine";

export function AnalysisPanel({
  levers,
  result,
}: {
  levers: PolicyLevers;
  result: SimulationResult;
}) {
  const { headline, body, tags } = generateAnalysis(levers, result);

  return (
    <div className="rounded-lg border border-card-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center rounded-sm border border-foreground/20 bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground"
        >
          Regime · {result.regime}
        </span>
      </div>
      <h3 className="text-[15px] sm:text-base font-semibold leading-snug text-foreground mb-2.5">
        {headline}
      </h3>
      <p className="text-[13px] leading-[1.65] text-muted-foreground max-w-[68ch]">
        {body}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[10px] tracking-tight text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
