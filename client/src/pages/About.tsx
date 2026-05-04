import { COEFFICIENTS, BASELINE } from "@/lib/engine";
import { ArrowUpRight, Coffee } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

export default function AboutPage() {
  useSeo({
    title: "Methodology & Citations · EconLever",
    description:
      "How EconLever works: the 2025 U.S. baseline, lever-to-channel coefficients, and the peer-reviewed literature behind every parameter (Mertens & Ravn 2013, Ramey 2011, Auerbach & Gorodnichenko 2012, Coibion et al. 2017, Bernanke & Blinder 1992).",
    canonical: "https://econlever.org/#/about",
    keywords:
      "econlever methodology, fiscal multiplier coefficients, Mertens Ravn 2013, Ramey 2011, Coibion 2017, Auerbach Gorodnichenko, Bernanke Blinder, Gini coefficient model, macroeconomic simulator citations",
    jsonLdId: "about-breadcrumb",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Simulator", item: "https://econlever.org/" },
        { "@type": "ListItem", position: 2, name: "Methodology", item: "https://econlever.org/#/about" },
      ],
    },
  });
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight leading-[1.15] text-foreground">
          About &amp; Methodology
        </h1>
        <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-[60ch]">
          EconLever was built so debaters and AP Econ students can sketch a fiscal or
          monetary scenario in 30 seconds and walk away with something they can actually
          cite. This page lays out what is under the hood: the theory, the engine, and
          the papers behind each coefficient.
        </p>
      </div>

      {/* econ.mom hub callout */}
      <a
        href="https://econ.mom"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="card-econ-mom"
        className="group relative mb-12 block overflow-hidden rounded-xl border border-card-border bg-card p-5 sm:p-6 hover-elevate active-elevate-2"
      >
        <div className="absolute inset-y-0 left-0 w-[3px] tri-strip" aria-hidden />
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden />
              Project hub
            </div>
            <h2 className="mt-2 text-base font-semibold tracking-tight text-foreground">
              EconLever now lives under <span className="font-editorial text-[hsl(var(--inequality))]">econ.mom</span>
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground max-w-[60ch]">
              <span className="font-medium text-foreground">econ.mom</span> is the new main page for all of Saras Totey&apos;s economics projects — EconLever, ongoing Reaganomics research, and future tools all live there.
            </p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </a>

      <Section heading="Purpose">
        <p>
          High-school and college extemporaneous speakers, AP Economics students,
          and policy debaters routinely need to cite the directional consequences
          of fiscal and monetary policy in under 30 seconds of speaking time.
          Existing tools are either too academic (DSGE/VAR models behind paywalls)
          or too superficial (single-issue calculators). EconLever sits in
          between: <strong className="text-foreground">simple enough to manipulate
          live, transparent enough to defend in cross-examination.</strong>
        </p>
      </Section>

      <Section heading="Theoretical Frame">
        <p>
          Four policy levers are treated as additive deviations from a calibrated
          2025 U.S. baseline. Each lever moves three channels:
        </p>
        <ul className="mt-3 space-y-2 list-none">
          <li className="flex gap-3">
            <span className="font-mono text-[11px] text-muted-foreground pt-0.5 w-20 shrink-0 uppercase tracking-wider">Growth</span>
            <span>Capital and labor-supply elasticities on the supply side, plus aggregate-demand multipliers on the Keynesian side.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[11px] text-muted-foreground pt-0.5 w-20 shrink-0 uppercase tracking-wider">Deficit</span>
            <span>Static revenue effects, attenuated by dynamic feedback (the Laffer curve) and pulled higher by debt-service costs when policy rates rise.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-[11px] text-muted-foreground pt-0.5 w-20 shrink-0 uppercase tracking-wider">Gini</span>
            <span>Direct redistribution from transfers and progressive taxation, plus second-order inequality effects from monetary policy and corporate-tax incidence.</span>
          </li>
        </ul>
        <p className="mt-4">
          The Gini index is mean-reverting. Without sustained policy pressure it drifts
          back toward baseline at <strong className="text-foreground">8% per year</strong>.
          This keeps a one-time tax change from compounding forever and matches the
          empirical stickiness of the U.S. income distribution.
        </p>
      </Section>

      <Section heading="Calibration Baseline (2025)">
        <p className="mb-4">
          The 2025 baseline anchors every projection. It captures the U.S. policy
          stance entering the simulation window, drawn from official long-run forecasts
          and statutory rates. Each lever’s neutral point matches the baseline value below.
        </p>
        <table className="w-full font-mono text-[12px] tabular-nums">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <Th>Variable</Th>
              <Th align="right">Baseline</Th>
              <Th align="right">Source</Th>
            </tr>
          </thead>
          <tbody>
            <Tr label="Potential real GDP growth" value={`${BASELINE.potentialGdpGrowth.toFixed(1)}%`} source="CBO Long-Run Outlook" />
            <Tr label="Federal deficit (% GDP)" value={`${BASELINE.deficit.toFixed(1)}%`} source="OMB / CBO 2025" />
            <Tr label="Gini coefficient (income)" value={BASELINE.gini.toFixed(3)} source="Census ACS, 2023" />
            <Tr label="Top marginal tax rate" value={`${BASELINE.neutral.topMarginalTax}%`} source="IRC §1, post-TCJA" />
            <Tr label="Corporate tax rate" value={`${BASELINE.neutral.corporateTax}%`} source="IRC §11, post-TCJA" />
            <Tr label="Welfare spending (% GDP)" value={`${BASELINE.neutral.welfareSpending}%`} source="CBO Mandatory Outlays" />
            <Tr label="Federal funds rate" value={`${BASELINE.neutral.fedFundsRate}%`} source="FOMC neutral estimate" />
          </tbody>
        </table>
        <p className="mt-4 text-[12px]">
          <strong className="text-foreground">Data sources at a glance:</strong>{" "}
          long-run growth and deficit anchors come from the Congressional Budget
          Office and Office of Management and Budget; statutory tax rates come
          from the Internal Revenue Code as amended by the Tax Cuts and Jobs Act
          (TCJA); the income Gini coefficient is reported by the U.S. Census
          Bureau (ACS); the federal funds rate is the FOMC’s neutral estimate.
        </p>
      </Section>

      <Section heading="Coefficient Table">
        <p className="mb-4">
          Each lever moves the three output channels by the per-percentage-point
          coefficients below. <strong className="text-foreground">Each value is
          calibrated to a specific peer-reviewed source</strong> documented in
          the citations that follow.
        </p>
        <table className="w-full font-mono text-[11px] tabular-nums">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <Th>Lever</Th>
              <Th align="right">GDP / pp</Th>
              <Th align="right">Deficit / pp</Th>
              <Th align="right">Gini / pp</Th>
            </tr>
          </thead>
          <tbody>
            <CoefRow label="Top Marginal Tax" c={COEFFICIENTS.topMarginalTax} />
            <CoefRow label="Corporate Tax" c={COEFFICIENTS.corporateTax} />
            <CoefRow label="Welfare Spending" c={COEFFICIENTS.welfareSpending} />
            <CoefRow label="Federal Funds Rate" c={COEFFICIENTS.fedFundsRate} />
          </tbody>
        </table>
      </Section>

      {/* Citations section */}
      <Section heading="Citations &amp; Economic Engine">
        <p className="mb-5">
          Coefficients are calibrated to the following peer-reviewed work. Each
          citation maps to a specific lever → channel value in the engine.
        </p>

        <CitationGroup title="Supply-side and marginal-tax effects">
          <CitationItem
            id="supply-side-1"
            authors="Mertens, K. &amp; Ravn, M.O. (2013)."
            title="The Dynamic Effects of Personal and Corporate Income Tax Changes in the United States."
            venue="American Economic Review"
            note="Calibrates the robust GDP response to corporate rate adjustments."
          />
          <CitationItem
            id="supply-side-2"
            authors="Piketty, T., Saez, E., &amp; Stantcheva, S. (2014)."
            title="Optimal Taxation of Top Labor Incomes: A Tale of Three Elasticities."
            venue="American Economic Journal: Economic Policy"
            note="Validates the inverse relationship between top marginal rates and wealth concentration at the top centile."
          />
        </CitationGroup>

        <CitationGroup title="Fiscal multipliers and welfare spending">
          <CitationItem
            id="multiplier-1"
            authors="Ramey, V.A. (2011)."
            title="Can Government Purchases Stimulate the Economy?"
            venue="Journal of Economic Literature"
            note="Establishes the baseline transfer multiplier used for welfare-spending coefficients."
          />
          <CitationItem
            id="multiplier-2"
            authors="Auerbach, A. &amp; Gorodnichenko, Y. (2012)."
            title="Measuring the Output Responses to Fiscal Policy."
            venue="American Economic Journal: Macroeconomics"
          />
        </CitationGroup>

        <CitationGroup title="Monetary policy and distributional effects">
          <CitationItem
            id="monetary-1"
            authors="Coibion, O., Gorodnichenko, Y., Kueng, L., &amp; Silvia, J. (2017)."
            title="Innocent Bystanders? Monetary Policy and Inequality."
            venue="Journal of Monetary Economics"
            note="Provides the empirical basis for contractionary monetary policy expanding the Gini coefficient."
          />
          <CitationItem
            id="monetary-2"
            authors="Bernanke, B.S. &amp; Blinder, A.S. (1992)."
            title="The Federal Funds Rate and the Channels of Monetary Transmission."
            venue="American Economic Review"
          />
        </CitationGroup>
      </Section>

      <Section heading="Limitations">
        <ul className="space-y-2 list-disc list-outside pl-5">
          <li>
            <strong className="text-foreground">Closed-loop, no shocks.</strong>{" "}
            The model does not capture exogenous events (recessions, wars,
            supply shocks) or international spillovers.
          </li>
          <li>
            <strong className="text-foreground">Linear additive coefficients.</strong>{" "}
            Real-world fiscal and monetary policy interact nonlinearly; results
            will overstate effects at the extreme ends of slider ranges.
          </li>
          <li>
            <strong className="text-foreground">No micro-foundations.</strong>{" "}
            This is not a DSGE or VAR model. It is an illustrative mapping
            calibrated to mainstream literature, not a forecasting tool.
          </li>
          <li>
            <strong className="text-foreground">Gini ≠ wealth inequality.</strong>{" "}
            The simulator uses the income Gini. Wealth Gini is structurally
            higher (about 0.85 in the U.S.) and responds differently to
            monetary policy.
          </li>
        </ul>
      </Section>

      <Section heading="About the Creator">
        <div className="rounded-lg border border-card-border bg-card p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              Saras Totey
            </h3>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              High School Student &amp; Research Analyst Assistant
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            Saras Totey is a student at Fairview High School and a Research
            Analyst Assistant at Northeastern University, where he assists with
            research on the socioeconomic legacy of Reaganomics—specifically
            analyzing how the 1981–1989 reduction in top marginal rates and
            welfare retrenchment shaped post-tax income disparity. He also
            serves as Head Economics Researcher at{" "}
            <a
              href="https://thedividendcollective.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
              data-testid="link-creator-dividend-collective"
            >
              The Dividend Collective
            </a>
            , a youth-led economics and policy research organization.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            A 2x National Economics Challenge (NEC) Qualifier and an
            International Economics Olympiad (IEO) Winter Challenge Bronze
            Medalist, Saras is also a competitive extemporaneous speaker and a
            social-impact founder. He built and maintains{" "}
            <a
              href="https://econ.mom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
              data-testid="link-creator-econ-mom"
            >
              econ.mom
            </a>
            , the home for all of his economics projects — EconLever included.
            He is dedicated to building tools that translate dense economic
            research into accessible, decision-ready interfaces for students,
            debaters, and civic audiences.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="https://econ.mom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              data-testid="link-creator-econ-mom-cta"
            >
              econ.mom
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/saras-totey-64a777334/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              data-testid="link-creator-linkedin"
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://thedividendcollective.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              data-testid="link-creator-dividend-collective-cta"
            >
              The Dividend Collective
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-5 pt-5 border-t border-card-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              EconLever is free and ad-free. If it has helped you in a round
              or a class, you can chip in to keep new tools coming.
            </p>
            <a
              href="https://www.buymeacoffee.com/sarast1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-md border border-card-border bg-background px-3 py-1.5 text-[13px] font-medium text-foreground hover-elevate active-elevate-2 whitespace-nowrap"
              data-testid="link-buymeacoffee-about"
            >
              <Coffee className="h-3.5 w-3.5" aria-hidden />
              Buy me a coffee
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ── primitives ──────────────────────────────────────────────────────────────

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 sm:mb-12">
      <h2 className="text-[15px] font-semibold tracking-tight text-foreground mb-3 pb-2 border-b border-border">
        <span className="text-muted-foreground font-mono text-xs mr-2">§</span>
        <span dangerouslySetInnerHTML={{ __html: heading }} />
      </h2>
      <div className="text-[14px] leading-relaxed text-muted-foreground space-y-3">
        {children}
      </div>
    </section>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`py-2 text-[10px] uppercase tracking-[0.06em] font-semibold ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function Tr({ label, value, source }: { label: string; value: string; source: string }) {
  return (
    <tr className="border-b border-border/60">
      <td className="py-2 text-foreground">{label}</td>
      <td className="py-2 text-right font-semibold text-foreground">{value}</td>
      <td className="py-2 text-right text-muted-foreground">{source}</td>
    </tr>
  );
}

function CoefRow({
  label,
  c,
}: {
  label: string;
  c: { gdpPerPoint: number; deficitPerPoint: number; giniPerPoint: number };
}) {
  return (
    <tr className="border-b border-border/60">
      <td className="py-2 text-foreground">{label}</td>
      <td className="py-2 text-right">
        <span className={c.gdpPerPoint >= 0 ? "text-[hsl(var(--growth))]" : "text-[hsl(var(--deficit))]"}>
          {c.gdpPerPoint >= 0 ? "+" : ""}
          {c.gdpPerPoint.toFixed(3)}
        </span>
      </td>
      <td className="py-2 text-right">
        <span className={c.deficitPerPoint >= 0 ? "text-[hsl(var(--deficit))]" : "text-[hsl(var(--growth))]"}>
          {c.deficitPerPoint >= 0 ? "+" : ""}
          {c.deficitPerPoint.toFixed(3)}
        </span>
      </td>
      <td className="py-2 text-right">
        <span className={c.giniPerPoint >= 0 ? "text-[hsl(var(--inequality))]" : "text-[hsl(var(--growth))]"}>
          {c.giniPerPoint >= 0 ? "+" : ""}
          {c.giniPerPoint.toFixed(4)}
        </span>
      </td>
    </tr>
  );
}

function CitationGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3
        className="text-[12px] font-semibold tracking-tight text-foreground mb-2"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <ol className="space-y-1.5 list-none">{children}</ol>
    </div>
  );
}

function CitationItem({
  id,
  authors,
  title,
  venue,
  note,
  highlight = false,
}: {
  id: string;
  authors: string;
  title: string;
  venue: string;
  note?: string;
  highlight?: boolean;
}) {
  return (
    <li
      id={`cite-${id}`}
      className={`text-[12px] leading-relaxed pl-3 border-l-2 ${
        highlight
          ? "border-[hsl(var(--growth))] text-foreground"
          : "border-border text-muted-foreground"
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-2">
        [{id}]
      </span>
      <span
        className="font-semibold text-foreground"
        dangerouslySetInnerHTML={{ __html: authors }}
      />
      {" "}
      <span dangerouslySetInnerHTML={{ __html: `“${title}”` }} />
      {" "}
      <em className="not-italic text-muted-foreground">{venue}</em>.
      {note ? (
        <span className="text-muted-foreground"> {note}</span>
      ) : null}
    </li>
  );
}
