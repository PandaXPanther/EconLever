import * as SliderPrimitive from "@radix-ui/react-slider";
import { useEffect, useId, useState } from "react";
import { ArrowDown, ArrowUp, Minus, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PolicySliderProps {
  label: string;
  shortLabel?: string;
  unit?: string;
  description?: string;
  /** Plain-language definition shown in a tooltip on hover/focus. */
  definition?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  baseline?: number;
  baselineLabel?: string;
  onChange: (v: number) => void;
  testId?: string;
}

export function PolicySlider({
  label,
  shortLabel,
  unit = "%",
  description,
  definition,
  value,
  min,
  max,
  step = 0.5,
  baseline,
  baselineLabel,
  onChange,
  testId,
}: PolicySliderProps) {
  const inputId = useId();
  const [draft, setDraft] = useState<string>(value.toFixed(1));

  // Keep local input in sync when value updates externally (e.g., presets, reset)
  useEffect(() => {
    setDraft(value.toFixed(1));
  }, [value]);

  const baselinePct =
    baseline !== undefined ? ((baseline - min) / (max - min)) * 100 : null;
  const deviation = baseline !== undefined ? value - baseline : 0;
  const deviationLabel =
    baseline !== undefined
      ? deviation === 0
        ? "at baseline"
        : `${deviation > 0 ? "+" : ""}${deviation.toFixed(1)} pp vs. baseline`
      : "";

  const DeltaIcon = deviation === 0 ? Minus : deviation > 0 ? ArrowUp : ArrowDown;
  const deltaToneClass =
    deviation === 0
      ? "text-muted-foreground"
      : "text-foreground";

  function commitInput(raw: string) {
    const num = Number(raw);
    if (Number.isFinite(num)) {
      const clamped = Math.min(Math.max(num, min), max);
      const stepped = Math.round(clamped / step) * step;
      onChange(Number(stepped.toFixed(2)));
    } else {
      // revert if not a number
      setDraft(value.toFixed(1));
    }
  }

  return (
    <div className="group">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <label
              htmlFor={inputId}
              className="block text-[13px] font-medium text-foreground leading-tight cursor-pointer"
            >
              {label}
            </label>
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
          {description && (
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
              {description}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-baseline justify-end gap-0.5">
            <input
              id={inputId}
              type="number"
              inputMode="decimal"
              min={min}
              max={max}
              step={step}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => commitInput(draft)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              aria-label={`${label} value`}
              data-testid={testId ? `${testId}-input` : undefined}
              className={cn(
                "w-14 bg-transparent text-right font-mono tabular-nums text-base font-semibold text-foreground",
                "border-b border-transparent hover:border-border focus:border-foreground",
                "focus:outline-none transition-colors",
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              )}
            />
            <span className="text-muted-foreground text-xs font-normal">{unit}</span>
          </div>
          {baseline !== undefined && (
            <div className={cn("inline-flex items-center justify-end gap-1 text-[10px] font-mono tabular-nums leading-none mt-1", deltaToneClass)}>
              <DeltaIcon className="h-2.5 w-2.5" aria-hidden />
              <span>{deviationLabel}</span>
            </div>
          )}
        </div>
      </div>

      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center h-5"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        data-testid={testId}
        aria-label={shortLabel ?? label}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-foreground/85" />
        </SliderPrimitive.Track>
        {baselinePct !== null && (
          <span
            className="absolute top-0 bottom-0 w-px bg-muted-foreground/60 pointer-events-none"
            style={{ left: `${baselinePct}%` }}
            aria-hidden
            title={baselineLabel ?? "Baseline"}
          />
        )}
        <SliderPrimitive.Thumb
          className={cn(
            "block h-4 w-4 rounded-full border-2 border-foreground bg-background shadow-sm",
            "ring-offset-background transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "cursor-grab active:cursor-grabbing"
          )}
        />
      </SliderPrimitive.Root>

      <div className="flex justify-between mt-1.5 text-[10px] font-mono text-muted-foreground tabular-nums">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
