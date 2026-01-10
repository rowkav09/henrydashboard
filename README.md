# Investment Dashboard

A modern investment portfolio dashboard built with Next.js, React, and TailwindCSS.

## Features

- User profile with net worth tracking
- Real-time stock ticker display
- Interactive portfolio performance chart
- Sector allocation breakdown
````markdown
# Investment Dashboard

A modern investment portfolio dashboard built with Next.js, React, and TailwindCSS.

## Features

- User profile with net worth tracking
- Real-time stock ticker display
- Interactive portfolio performance chart
- Sector allocation breakdown
- News feed for market updates

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build and start production locally:
```bash
npm run build
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Vercel

This repo is Vercel-ready. Deploy by importing the GitHub repo in Vercel with defaults:

- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`

Or via CLI:
```bash
npm i -g vercel
vercel
```

No env vars are required. API routes gracefully fall back to mock data if the external provider fails.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Node.js** - Backend runtime

## Project Structure

```
henrydashboard/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── UserHeader.tsx
│   ├── StockTicker.tsx
│   ├── PortfolioChart.tsx
│   ├── SectorAllocation.tsx
│   └── NewsPanel.tsx
├── data/               # Mock data
│   └── mockData.ts
├── types/              # TypeScript types
│   └── index.ts
└── package.json
```

## Customization

Edit the mock data in `data/mockData.ts` to customize:
- Stock tickers and performance
- Portfolio values
- Sector allocations
- User profile information
- News items

## Next Steps

- Connect to real stock APIs (Alpha Vantage, Finnhub, Yahoo Finance)
- Add authentication
- Implement data persistence with a database
- Add more interactive features

````
