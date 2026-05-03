import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [path] = useLocation();
  const { theme, toggle } = useTheme();

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground hover-elevate active-elevate-2 -ml-2 rounded-md px-2 py-1.5"
          data-testid="link-home-logo"
        >
          <Logo className="h-6 w-6 text-foreground" />
          <span className="font-semibold tracking-tight text-[15px]">
            EconLever
          </span>
          <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase tracking-[0.06em] text-muted-foreground/60">
            beta
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`${navLinkClass(path === "/")} nav-underline rounded-md px-3 py-1.5`}
            data-active={path === "/" ? "true" : "false"}
            data-testid="link-nav-simulator"
          >
            Simulator
          </Link>
          <Link
            href="/about"
            className={`${navLinkClass(path === "/about")} nav-underline rounded-md px-3 py-1.5`}
            data-active={path === "/about" ? "true" : "false"}
            data-testid="link-nav-about"
          >
            Methodology
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </nav>
      </div>
    </header>
  );
}
