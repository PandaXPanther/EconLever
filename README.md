# EconLever

A transparent, closed-loop simulator that maps four U.S. policy levers (top marginal tax, corporate tax, social welfare spending, federal funds rate) to a 10-year projection of GDP growth, the federal deficit, and the Gini coefficient. Built for debaters, students, and policy researchers.

Live: https://econlever.pplx.app

## Tech stack

- **Vite 7** + **React 18** + **TypeScript**
- **Tailwind CSS v3** + **shadcn/ui** + **Radix primitives**
- **Recharts** for visualizations
- **jsPDF** + **html2canvas** for one-page Policy Brief export
- **Express** dev server (only used locally — see Deployment notes)
- **wouter** with hash-based routing

## Local development

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5000. Vite handles the React app; Express serves it through a thin wrapper.

## Build

```bash
npm run build
```

Output:
- `dist/public/` — static frontend bundle (HTML/CSS/JS)
- `dist/index.cjs` — bundled Node server (only needed if deploying with the Express wrapper)

## Project structure

```
client/
  index.html              # HTML entry, sets <title> and meta tags
  src/
    main.tsx              # React mount point
    App.tsx               # Router + theme provider
    index.css             # Tailwind base + design tokens
    pages/
      Simulator.tsx       # Main dashboard (sliders, charts, stat tiles)
      About.tsx           # Methodology, citations, calibration baseline
    components/
      Logo.tsx            # SVG lever-and-fulcrum mark
      SiteHeader.tsx      # Top nav with logo + theme toggle
      SiteFooter.tsx
      PolicySlider.tsx    # Slider with numeric input + tooltip
      StatTile.tsx        # KPI tile with delta arrow + definition tooltip
      AnalysisPanel.tsx
      PolicyBriefDocument.tsx  # Off-screen template for PDF export
      charts/
        GiniChart.tsx
        GdpDeficitChart.tsx
      ui/                 # shadcn/ui primitives
    lib/
      engine.ts           # Core economic engine — simulate(), PRESETS, BASELINE
      exportPdf.ts        # html2canvas + jsPDF Policy Brief generator
      queryClient.ts
      utils.ts
server/                   # Express dev server — NOT used on Vercel
shared/
  schema.ts               # Zod schemas (currently unused; ready for backend)
script/
  build.ts                # Custom build orchestrator (Vite + esbuild server bundle)
```

## Deploying to Vercel

This project ships with an Express dev wrapper that is NOT needed in production — the entire app is a static client-side React SPA. For Vercel, deploy the static build:

1. Push this repo to GitHub.
2. Import it on Vercel.
3. Configure the project:
   - **Framework preset:** Other (or Vite)
   - **Build command:** `npm run build`
   - **Output directory:** `dist/public`
   - **Install command:** `npm install`
4. Deploy.

Because routing is **hash-based** (`/#/`, `/#/about`), no `vercel.json` rewrites are needed — every navigation stays on `index.html`.

### Optional: lighter Vite-only build

If you want to drop the Express bundle entirely, you can replace `npm run build` with a direct Vite build by editing `package.json`:

```json
"build": "vite build --config vite.config.ts"
```

Then the `dist/index.cjs` server bundle is no longer produced. The static output in `dist/public/` is identical.

## License

Educational simulator. Outputs are illustrative and not investment advice.
