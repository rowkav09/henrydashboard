import { Stock, PortfolioData, SectorAllocation, UserProfile, NewsItem } from '@/types';

export const mockStocks: Stock[] = [
  { symbol: 'AAPL', change: 2.5 },
  { symbol: 'MSFT', change: 1.8 },
  { symbol: 'NVDA', change: 3.2 },
  { symbol: 'GOOGL', change: 1.2 },
  { symbol: 'AMZN', change: 2.1 },
  { symbol: 'TSLA', change: -1.5 },
  { symbol: 'META', change: 2.8 },
];

export const mockPortfolioData: PortfolioData[] = [
  { month: 'Jan', value: 240000 },
  { month: 'Feb', value: 245000 },
  { month: 'Mar', value: 235000 },
  { month: 'Apr', value: 250000 },
  { month: 'May', value: 248000 },
  { month: 'Jun', value: 260000 },
  { month: 'Jul', value: 255000 },
  { month: 'Aug', value: 268000 },
  { month: 'Sep', value: 270000 },
  { month: 'Oct', value: 265000 },
  { month: 'Nov', value: 272000 },
  { month: 'Dec', value: 275000 },
];

export const mockSectorAllocation: SectorAllocation[] = [
  { name: 'Technology', percentage: 45, color: '#3b82f6' },
  { name: 'Healthcare', percentage: 20, color: '#ef4444' },
  { name: 'Financial Services', percentage: 15, color: '#22c55e' },
  { name: 'Industrials', percentage: 12, color: '#06b6d4' },
  { name: 'Consumer Cyclical', percentage: 5, color: '#f59e0b' },
  { name: 'Communication Services', percentage: 3, color: '#8b5cf6' },
];

export const mockUserProfile: UserProfile = {
  name: 'Henry Miller Evans',
  netWorth: 275000,
  age: 22,
  path: 'Finance',
  salary: 180000,
  company: 'GS, Sons & Bridgerton',
  yearsExperience: 1.2,
  browseMarket: 'NYSE, NASDAQ',
};

export const mockNews: NewsItem[] = [
  { title: 'AI boom drives chip stocks higher', impact: 'positive', source: 'Reuters' },
  { title: 'Fed signals potential rate cuts ahead', impact: 'positive', source: 'Bloomberg' },
  { title: 'Tech sector outperforms market', impact: 'positive', source: 'MarketWatch' },
  { title: 'Bond yields rise on inflation data', impact: 'negative', source: 'CNBC' },
];
