'use client';

import { Stock } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockTickerProps {
  stock: Stock;
}

export default function StockTicker({ stock }: StockTickerProps) {
  const isPositive = stock.change >= 0;
  
  return (
    <div className={`bg-gradient-to-br ${isPositive ? 'from-green-500/10 to-green-600/5 border-green-500/20 hover:border-green-500/40' : 'from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40'} backdrop-blur-sm rounded-xl p-3 transition-all cursor-pointer border shadow-lg`}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-white text-sm">{stock.symbol}</span>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp size={14} className="text-green-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}
          <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{stock.change}%
          </span>
        </div>
      </div>
    </div>
  );
}
