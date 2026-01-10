'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '@/types';

interface TopMoversProps {
  stocks: Stock[];
}

export default function TopMovers({ stocks }: TopMoversProps) {
  if (!stocks || stocks.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
        <h2 className="text-sm font-semibold mb-3 text-gray-200">Top Movers</h2>
        <p className="text-xs text-gray-400 text-center">Loading...</p>
      </div>
    );
  }
  
  const sortedByChange = [...stocks].sort((a, b) => b.change - a.change);
  const gainers = sortedByChange.filter(s => s.change > 0).slice(0, 3);
  const losers = sortedByChange.filter(s => s.change < 0).slice(-2);

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <h2 className="text-sm font-semibold mb-3 text-gray-200">Top Movers</h2>
      
      <div className="space-y-2">
        {gainers.length > 0 && (
          <>
            <div className="text-xs font-semibold text-green-400 mb-1">Gainers</div>
            {gainers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-2 bg-green-500/5 border border-green-500/20 rounded-lg hover:bg-green-500/10 transition-all">
                <div>
                  <div className="font-semibold text-white text-sm">{stock.symbol}</div>
                  <div className="text-xs text-gray-400">${stock.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-1 text-green-400 font-semibold text-sm">
                  <TrendingUp size={14} />
                  +{stock.change.toFixed(2)}%
                </div>
              </div>
            ))}
          </>
        )}

        {losers.length > 0 && (
          <>
            <div className="text-xs font-semibold text-red-400 mb-1 mt-3">Losers</div>
            {losers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-2 bg-red-500/5 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-all">
                <div>
                  <div className="font-semibold text-white text-sm">{stock.symbol}</div>
                  <div className="text-xs text-gray-400">${stock.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-1 text-red-400 font-semibold text-sm">
                  <TrendingDown size={14} />
                  {stock.change.toFixed(2)}%
                </div>
              </div>
            ))}
          </>
        )}
        
        {gainers.length === 0 && losers.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-2">No movers available</p>
        )}
      </div>
    </div>
  );
}
