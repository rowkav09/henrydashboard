'use client';

import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

interface PortfolioMetricsProps {
  totalValue: number;
  costBasis: number;
  todayChange: number;
  todayChangePercent: number;
}

export default function PortfolioMetrics({ totalValue, costBasis, todayChange, todayChangePercent }: PortfolioMetricsProps) {
  const totalGain = totalValue - costBasis;
  const totalGainPercent = costBasis > 0 ? (totalGain / costBasis) * 100 : 0;
  const isTodayPositive = todayChange >= 0;
  const isTotalPositive = totalGain >= 0;
  
  // Handle empty portfolio
  if (totalValue === 0 && costBasis === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
        <p className="text-xs text-gray-400 text-center">Add stocks to see metrics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-3 hover:border-blue-500/40 transition-all">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign size={14} className="text-blue-400" />
          <span className="text-xs text-gray-400">Total Value</span>
        </div>
        <div className="text-xl font-bold text-white">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>

      <div className={`bg-gradient-to-br ${isTotalPositive ? 'from-green-500/10 to-green-600/5 border-green-500/20' : 'from-red-500/10 to-red-600/5 border-red-500/20'} border rounded-xl p-3 hover:border-opacity-40 transition-all`}>
        <div className="flex items-center gap-2 mb-1">
          {isTotalPositive ? <TrendingUp size={14} className="text-green-400" /> : <TrendingDown size={14} className="text-red-400" />}
          <span className="text-xs text-gray-400">Total Gain/Loss</span>
        </div>
        <div className={`text-xl font-bold ${isTotalPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isTotalPositive ? '+' : ''}${Math.abs(totalGain).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`text-xs ${isTotalPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isTotalPositive ? '+' : ''}{totalGainPercent.toFixed(2)}%
        </div>
      </div>

      <div className={`bg-gradient-to-br ${isTodayPositive ? 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20' : 'from-orange-500/10 to-orange-600/5 border-orange-500/20'} border rounded-xl p-3 hover:border-opacity-40 transition-all`}>
        <div className="flex items-center gap-2 mb-1">
          <Percent size={14} className={isTodayPositive ? 'text-emerald-400' : 'text-orange-400'} />
          <span className="text-xs text-gray-400">Today</span>
        </div>
        <div className={`text-lg font-bold ${isTodayPositive ? 'text-emerald-400' : 'text-orange-400'}`}>
          {isTodayPositive ? '+' : ''}${Math.abs(todayChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className={`text-xs ${isTodayPositive ? 'text-emerald-400' : 'text-orange-400'}`}>
          {isTodayPositive ? '+' : ''}{todayChangePercent.toFixed(2)}%
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-3 hover:border-purple-500/40 transition-all">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign size={14} className="text-purple-400" />
          <span className="text-xs text-gray-400">Cost Basis</span>
        </div>
        <div className="text-xl font-bold text-white">${costBasis.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>
    </div>
  );
}
