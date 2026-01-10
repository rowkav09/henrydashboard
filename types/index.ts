export interface Stock {
  symbol: string;
  change: number;
  price?: number;
}

export interface PortfolioData {
  month: string;
  value: number;
}

export interface SectorAllocation {
  name: string;
  percentage: number;
  color: string;
}

export interface UserProfile {
  name: string;
  netWorth: number;
  age: number;
  path: string;
  salary: number;
  company: string;
  yearsExperience: number;
  browseMarket: string;
}

export interface NewsItem {
  title: string;
  impact: 'positive' | 'negative';
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice?: number;
}
