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

3. Open [http://localhost:3000](http://localhost:3000) in your browser

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
