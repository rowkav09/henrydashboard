'use client';

import { useState, useEffect } from 'react';
import StockTicker from './StockTicker';
import PortfolioChart from './PortfolioChart';
import SectorAllocation from './SectorAllocation';
import UserHeader from './UserHeader';
import AddStockModal from './AddStockModal';
import PortfolioList from './PortfolioList';
import NewsPanel from './NewsPanel';
import MarketIndices from './MarketIndices';
import RecentActivity from './RecentActivity';
import PortfolioMetrics from './PortfolioMetrics';
import TopMovers from './TopMovers';
import EditProfileModal from './EditProfileModal';
import { Stock, PortfolioData, PortfolioHolding } from '@/types';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sectors, setSectors] = useState<any[]>([]);
  const [selectedChart, setSelectedChart] = useState<string>('portfolio');
  const [news, setNews] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>({
    name: 'User',
    netWorth: 0,
    yearsExperience: 0,
    browseMarket: 'NYSE, NASDAQ',
    age: 0,
    path: 'Finance',
    salary: 0,
    company: ''
  });
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Load portfolio from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio');
    if (saved) {
      setHoldings(JSON.parse(saved));
    }
  }, []);

  // Load user profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try { setUserProfile(JSON.parse(savedProfile)); } catch {}
    }
  }, []);

  // Save portfolio to localStorage
  useEffect(() => {
    if (holdings.length > 0) {
      localStorage.setItem('portfolio', JSON.stringify(holdings));
    }
  }, [holdings]);

  // Calculate sector allocation from holdings
  useEffect(() => {
    const calculateSectors = async () => {
      if (holdings.length === 0) {
        setSectors([]);
        return;
      }

      const sectorMap: { [key: string]: number } = {};
      const totalValue = holdings.reduce((sum, h) => {
        return sum + (h.currentPrice || h.purchasePrice) * h.quantity;
      }, 0);

      // Fetch sector for each holding
      const sectorPromises = holdings.map(async (holding) => {
        try {
          const response = await fetch(`/api/sector?symbol=${holding.symbol}`);
          const data = await response.json();
          return { symbol: holding.symbol, sector: data.sector, value: (holding.currentPrice || holding.purchasePrice) * holding.quantity };
        } catch (error) {
          return { symbol: holding.symbol, sector: 'Unknown', value: (holding.currentPrice || holding.purchasePrice) * holding.quantity };
        }
      });

      const sectorsData = await Promise.all(sectorPromises);
      
      sectorsData.forEach(({ sector, value }) => {
        sectorMap[sector] = (sectorMap[sector] || 0) + value;
      });

      const sectorColors: { [key: string]: string } = {
        'Technology': '#3b82f6',
        'Financial Services': '#22c55e',
        'Healthcare': '#ef4444',
        'Consumer Cyclical': '#f59e0b',
        'Communication Services': '#8b5cf6',
        'Industrials': '#06b6d4',
        'Consumer Defensive': '#10b981',
        'Energy': '#eab308',
        'Basic Materials': '#f97316',
        'Real Estate': '#ec4899',
        'Utilities': '#14b8a6',
        'Unknown': '#6b7280'
      };

      const sectorArray = Object.entries(sectorMap)
        .map(([name, value]) => ({
          name,
          percentage: parseFloat(((value / totalValue) * 100).toFixed(1)),
          color: sectorColors[name] || '#6b7280'
        }))
        .sort((a, b) => b.percentage - a.percentage);

      setSectors(sectorArray);
    };

    calculateSectors();
  }, [holdings]);

  useEffect(() => {
    // Fetch live stock data
    const fetchStocks = async () => {
      try {
        // Get unique symbols from holdings and default stocks
        const holdingSymbols = holdings.map(h => h.symbol);
        const defaultSymbols = ['AAPL', 'AMZN', 'TSLA', 'NVDA', 'GOOG', 'MSFT', 'META'];
        const allSymbols = Array.from(new Set([...holdingSymbols, ...defaultSymbols]));
        
        const response = await fetch(`/api/stocks?symbols=${allSymbols.join(',')}`);
        const data = await response.json();
        if (data.quotes) {
          const stocksData = data.quotes.map((q: any) => ({
            symbol: q.symbol,
            change: q.change,
            price: q.price,
          }));
          setStocks(stocksData);
          
          // Update current prices in holdings
          setHoldings(prev => prev.map(holding => {
            const quote = data.quotes.find((q: any) => q.symbol === holding.symbol);
            return {
              ...holding,
              currentPrice: quote?.price || holding.purchasePrice,
            };
          }));
        }
      } catch (error) {
        // Silently handle error
      }
    };

    // Fetch historical data for portfolio or selected stock
    const fetchChartData = async () => {
      try {
        // If showing portfolio view, calculate total portfolio value over time
        if (selectedChart === 'portfolio' && holdings.length > 0) {
          // Calculate current total portfolio value
          const totalValue = holdings.reduce((sum, h) => {
            return sum + (h.currentPrice || h.purchasePrice) * h.quantity;
          }, 0);
          
          // Generate 12 months of data showing portfolio growth
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const currentMonth = new Date().getMonth();
          const portfolioHistory = [];
          
          // Calculate historical values based on current value and average gains
          const totalCost = holdings.reduce((sum, h) => sum + h.purchasePrice * h.quantity, 0);
          const totalGain = totalValue - totalCost;
          
          for (let i = 11; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            // Simulate gradual growth from cost to current value
            const progress = (12 - i) / 12;
            const value = totalCost + (totalGain * progress);
            portfolioHistory.push({
              month: months[monthIndex],
              value: Math.round(value * 100) / 100,
            });
          }
          
          setPortfolioData(portfolioHistory);
        } else if (selectedChart === 'portfolio') {
          // No holdings, show flat line
          setPortfolioData([]);
        } else {
          // Individual stock selected
          const response = await fetch(`/api/historical?symbol=${selectedChart}&period=1y`);
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            // Sample monthly data from daily data
            const monthly: { [key: string]: { value: number; date: Date } } = {};
            
            data.data.forEach((item: any) => {
              const date = new Date(item.date);
              const monthKey = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
              
              if (!monthly[monthKey] || date > monthly[monthKey].date) {
                monthly[monthKey] = { value: item.value, date };
              }
            });
            
            const sortedMonthly = Object.values(monthly)
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(-12)
              .map(item => ({
                month: item.date.toLocaleString('default', { month: 'short' }),
                value: Math.round(item.value * 100) / 100,
              }));
            
            setPortfolioData(sortedMonthly);
          }
        }
      } catch (error) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
    fetchChartData();

    // Refresh every hour
    const interval = setInterval(() => {
      fetchStocks();
    }, 3600000);

    return () => clearInterval(interval);
  }, [holdings, selectedChart]);

  // Fetch news on load and whenever holdings change (falls back when empty)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const holdingSymbols = holdings.map(h => h.symbol).join(',');
        const symbolsParam = holdingSymbols || 'AAPL,MSFT,GOOG';
        const response = await fetch(`/api/news?symbols=${symbolsParam}`);
        const data = await response.json();
        if (data.news) setNews(data.news);
      } catch (error) {
        // Silently handle error
      }
    };

    fetchNews();
  }, [holdings]);

  const handleAddStock = (holding: Omit<PortfolioHolding, 'id'>) => {
    const newHolding: PortfolioHolding = {
      ...holding,
      id: Date.now().toString(),
    };
    setHoldings(prev => [...prev, newHolding]);
  };

  const handleDeleteStock = (id: string) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
    localStorage.setItem('portfolio', JSON.stringify(holdings.filter(h => h.id !== id)));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <UserHeader profile={userProfile} />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg border border-indigo-500/30 text-sm whitespace-nowrap"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg border border-green-500/30 text-sm whitespace-nowrap"
          >
            <Plus size={16} />
            Add Stock
          </button>
        </div>
      </div>

      {/* Main Grid - 4 columns, fits on screen */}
      <div className="grid grid-cols-4 gap-2 flex-1 overflow-hidden">
        {/* Left Column - Portfolio & Stocks */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-1">
          <PortfolioMetrics 
            totalValue={holdings.reduce((sum, h) => sum + (h.currentPrice || h.purchasePrice) * h.quantity, 0)}
            costBasis={holdings.reduce((sum, h) => sum + h.purchasePrice * h.quantity, 0)}
            todayChange={holdings.reduce((sum, h) => {
              const stock = stocks.find(s => s.symbol === h.symbol);
              return sum + (stock ? stock.change * h.quantity : 0);
            }, 0)}
            todayChangePercent={holdings.length > 0 ? (
              (holdings.reduce((sum, h) => {
                const stock = stocks.find(s => s.symbol === h.symbol);
                return sum + (stock ? stock.change : 0);
              }, 0) / holdings.length)
            ) : 0}
          />

          <PortfolioList holdings={holdings} onDelete={handleDeleteStock} />
          
          <TopMovers stocks={stocks} />
        </div>

        {/* Middle Columns (2 wide) - Chart & Sector */}
        <div className="col-span-2 flex flex-col gap-2 overflow-y-auto px-1">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-gray-200">Performance</h2>
                <select
                  value={selectedChart}
                  onChange={(e) => setSelectedChart(e.target.value)}
                  className="bg-gray-800/80 text-white px-3 py-1.5 rounded-lg border border-gray-700/50 text-xs focus:border-green-500/50 focus:outline-none transition-all"
                >
                  <option value="portfolio">Total Portfolio</option>
                  {holdings.map((holding) => (
                    <option key={holding.id} value={holding.symbol}>
                      {holding.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 text-xs">
                {portfolioData.length > 0 && (
                  <>
                    <div>
                      <span className="text-gray-400">HIGH: </span>
                      <span className="text-red-400">
                        ${Math.max(...portfolioData.map(d => d.value)).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Current: </span>
                      <span className="text-green-400">
                        ${portfolioData[portfolioData.length - 1]?.value.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {portfolioData.length > 0 ? (
              <PortfolioChart data={portfolioData} chartKey={selectedChart} />
            ) : (
              <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">
                Loading chart data...
              </div>
            )}
            
            <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
              <span className="font-semibold">YEARS EXP: {userProfile.yearsExperience || 0}</span>
              <span>Browse in Market: {userProfile.browseMarket || 'NYSE, NASDAQ'}</span>
            </div>
          </div>

          <SectorAllocation sectors={sectors} />

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-lg">
            <h2 className="text-sm font-semibold mb-2 text-gray-200">
              Market Stocks {loading && <span className="text-xs text-gray-400">...</span>}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {stocks.length > 0 ? (
                stocks.slice(0, 6).map((stock) => (
                  <StockTicker key={stock.symbol} stock={stock} />
                ))
              ) : (
                <p className="text-gray-400 text-xs">Loading...</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - News & Activity */}
        <div className="flex flex-col gap-2 overflow-y-auto pl-1">
          <MarketIndices />
          <NewsPanel news={news} />
          <RecentActivity activities={holdings.slice(0, 3).map(h => ({
            type: 'buy',
            symbol: h.symbol,
            quantity: h.quantity,
            price: h.purchasePrice,
            date: h.purchaseDate
          }))} />
        </div>
      </div>

      {showAddModal && (
        <AddStockModal onAdd={handleAddStock} onClose={() => setShowAddModal(false)} />
      )}
      {showProfileModal && (
        <EditProfileModal
          initial={userProfile}
          onSave={(p) => {
            setUserProfile(p);
            try { localStorage.setItem('userProfile', JSON.stringify(p)); } catch {}
          }}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}
