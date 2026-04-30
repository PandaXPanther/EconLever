export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          EconLever is an educational simulator. Outputs are illustrative and{" "}
          <span className="whitespace-nowrap">not investment advice.</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/saras-totey-64a777334/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
            data-testid="link-creator"
          >
            Saras Totey
          </a>
        </p>
      </div>
    </footer>
  );
}
