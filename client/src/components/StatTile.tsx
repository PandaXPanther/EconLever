import { ArrowUp, ArrowDown, Minus, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: string;
  unit?: string;
  delta?: number;
  deltaLabel?: string;
  tone?: "neutral" | "growth" | "deficit" | "inequality";
  hint?: string;
  /** Plain-language definition shown on hover/focus of the help icon. */
  definition?: string;
}

export function StatTile({ label, value, unit, delta, deltaLabel, tone = "neutral", hint, definition }: StatTileProps) {
  const direction =
    delta === undefined || Math.abs(delta) < 1e-9 ? "flat" : delta > 0 ? "up" : "down";
  const Icon = direction === "flat" ? Minus : direction === "up" ? ArrowUp : ArrowDown;
  const directionWord = direction === "flat" ? "no change" : direction === "up" ? "up" : "down";

  const toneClasses = {
    neutral: "text-muted-foreground",
    growth: "text-[hsl(var(--growth))]",
    deficit: "text-[hsl(var(--deficit))]",
    inequality: "text-[hsl(var(--inequality))]",
  };

  return (
    <div className="rounded-md border border-card-border bg-card p-3 sm:p-4">
      <div className="flex items-center gap-1 mb-1.5">
        <span className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground font-mono">
          {label}
        </span>
        {definition && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`What does ${label} mean?`}
                className="inline-flex items-center justify-center rounded-full text-muted-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <HelpCircle className="h-3 w-3" aria-hidden />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[260px] text-[11px] leading-snug">
              {definition}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-[22px] sm:text-2xl font-semibold tabular-nums tracking-tight text-foreground">
          {value}
        </span>
        {unit && <span className="text-xs text-muted-foreground font-mono">{unit}</span>}
      </div>
      {(deltaLabel || hint) && (
        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-mono">
          {deltaLabel && (
            <span
              className={cn("inline-flex items-center gap-0.5", toneClasses[tone])}
              aria-label={`${directionWord} ${deltaLabel}`}
            >
              <Icon className="h-3 w-3" aria-hidden />
              {deltaLabel}
            </span>
          )}
          {hint && !deltaLabel && (
            <span className="text-muted-foreground">{hint}</span>
          )}
          {hint && deltaLabel && (
            <span className="text-muted-foreground ml-auto">{hint}</span>
          )}
        </div>
      )}
    </div>
  );
}
