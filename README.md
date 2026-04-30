<p align="center">
  <img src="./public/econlever-logo.png" alt="EconLever" width="160" />
</p>

# EconLever

![EconLever Dashboard](./public/dashboard-preview.png)
*(Note: Upload a screenshot of your dashboard to your public folder and update this link, or delete this line)*

**Live Application:** [econlever.org](https://econlever.org)

An interactive macroeconomic simulator visualizing the 10-year impact of fiscal and monetary policy on U.S. GDP, federal deficits, and income disparity. Calibrated to peer-reviewed economic literature and designed to generate ready-to-cite policy briefs for competitive debaters and AP Economics students.

## About the Creator

**Saras Totey** | *High School Student & Research Analyst Assistant*

Saras is a student at Fairview High School and a Research Analyst Assistant at Northeastern University, where he assists with research on the socioeconomic legacy of Reaganomics. A 2x National Economics Challenge (NEC) Qualifier and an International Economics Olympiad (IEO) Winter Challenge Bronze Medalist, Saras is dedicated to building tools that translate dense economic research into accessible, decision-ready interfaces for students, debaters, and civic audiences.

---

## Key Features

* **Interactive Policy Levers:** Adjust top marginal tax rates, corporate tax rates, social welfare spending, and the federal funds rate.
* **Real-Time Data Visualization:** Instant, responsive 10-year projections of the Gini coefficient, real GDP growth, and the federal deficit.
* **Dynamic Analysis Engine:** Generates rule-based economic summaries based on user inputs and policy quadrants.
* **Policy Brief Export:** Client-side PDF generation that formats charts, slider states, and analysis into a clean, one-page brief for use in debate rounds.

## The Economic Engine & Methodology

The simulator engine treats four policy levers as additive deviations from a calibrated 2025 U.S. baseline. The coefficients driving the simulator are calibrated to mainstream macroeconomic literature, including Mertens & Ravn (2013) for supply-side dynamics, Ramey (2011) for fiscal multipliers, and Coibion et al. (2017) for the distributional effects of monetary policy.

*(For full methodology and citations, visit the About section in the live application).*

## Tech Stack

* **Frontend:** Vite 7 + React 18 + TypeScript
* **Styling:** Tailwind CSS v3 + shadcn/ui
* **Data Visualization:** Recharts
* **PDF Generation:** jsPDF + html2canvas
* **Routing:** wouter (hash-based routing)

## Local Development

Clone the repository and install dependencies:

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5000. Vite handles the React app; Express serves it through a thin wrapper.

## Build Process & Deployment

To create a production build:

```bash
npm run build
```

Output: `dist/public/` — static frontend bundle (HTML/CSS/JS).

**Vercel Deployment:** This project is deployed as a static client-side React SPA.

1. Import the repository on Vercel.
2. Set **Framework preset** to Vite.
3. Set **Build command** to `npm run build` and **Output directory** to `dist/public`.

## License

Educational simulator. Outputs are illustrative and not investment advice.
