import { Coffee } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          EconLever is an educational simulator. Outputs are illustrative and{" "}
          <span className="whitespace-nowrap">not investment advice.</span>
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <a
            href="https://www.buymeacoffee.com/sarast1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-card-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover-elevate active-elevate-2"
            data-testid="link-buymeacoffee-footer"
            aria-label="Leave a tip on Buy Me a Coffee"
          >
            <Coffee className="h-3 w-3" aria-hidden />
            Leave a tip
          </a>
          <p className="text-xs text-muted-foreground">
            Part of{" "}
            <a
              href="https://econ.mom"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
              data-testid="link-econ-mom"
            >
              econ.mom
            </a>
            {" "}· built by{" "}
            <a
              href="https://www.linkedin.com/in/saras-totey-64a777334/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
              data-testid="link-creator"
            >
              Saras Totey
            </a>
            {" "}@{" "}
            <a
              href="https://attagency.co"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
              data-testid="link-att-agency-footer"
            >
              ATT Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
