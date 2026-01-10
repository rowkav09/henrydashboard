import { Stock, PortfolioData, SectorAllocation, UserProfile, NewsItem } from '@/types';

export const mockStocks: Stock[] = [
  { symbol: 'AAPL', change: 12.3 },
  { symbol: 'AMZN', change: 3.1 },
  { symbol: 'TSLA', change: 8.2 },
  { symbol: 'NVDA', change: 11.7 },
  { symbol: 'GONY', change: 16.2 },
  { symbol: 'TACO', change: 14.5 },
  { symbol: 'ESPN', change: -0.4 },
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
  { name: 'Tech', percentage: 20, color: '#22c55e' },
  { name: 'Entertainment', percentage: 4, color: '#ef4444' },
  { name: 'Retail', percentage: 5, color: '#22c55e' },
  { name: 'Energy', percentage: 12, color: '#22c55e' },
  { name: 'Finance', percentage: 2, color: '#22c55e' },
  { name: 'Oil', percentage: 44, color: '#22c55e' },
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
  { title: 'Annual Target Met: Tech', impact: 'positive' },
  { title: 'New Results: Retail', impact: 'positive' },
  { title: 'Pricing Alert: Wheat', impact: 'negative' },
  { title: 'Geopolitical News', impact: 'negative' },
];
