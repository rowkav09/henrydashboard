'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketIndices() {
  const indices = [
    { name: 'S&P 500', value: '4,783.45', change: 23.87, changePercent: 0.50 },
    { name: 'Dow Jones', value: '37,695.73', change: -45.22, changePercent: -0.12 },
    { name: 'NASDAQ', value: '14,972.76', change: 98.55, changePercent: 0.66 },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <h2 className="text-sm font-semibold mb-3 text-gray-200">Market Indices</h2>
      <div className="space-y-2">
        {indices.map((index) => (
          <div key={index.name} className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/50 transition-all">
            <div>
              <div className="text-xs font-medium text-gray-400">{index.name}</div>
              <div className="text-base font-bold text-white">{index.value}</div>
            </div>
            <div className="text-right">
              <div className={`flex items-center gap-1 ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {index.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="text-sm font-semibold">{index.change >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
