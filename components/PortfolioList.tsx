'use client';

import { PortfolioHolding } from '@/types';
import { Trash2 } from 'lucide-react';

interface PortfolioListProps {
  holdings: PortfolioHolding[];
  onDelete: (id: string) => void;
}

export default function PortfolioList({ holdings, onDelete }: PortfolioListProps) {
  if (holdings.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
        <h2 className="text-sm font-semibold mb-3 text-gray-200">My Portfolio</h2>
        <p className="text-gray-400 text-xs">No holdings yet. Add your first stock!</p>
      </div>
    );
  }

  const totalValue = holdings.reduce((sum, h) => {
    const currentValue = (h.currentPrice || h.purchasePrice) * h.quantity;
    return sum + currentValue;
  }, 0);

  const totalCost = holdings.reduce((sum, h) => sum + (h.purchasePrice * h.quantity), 0);
  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = ((totalGainLoss / totalCost) * 100).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-sm font-semibold text-gray-200">My Portfolio</h2>
        <div className="text-right">
          <div className="text-lg font-bold text-white">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className={`text-xs font-semibold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalGainLoss >= 0 ? '+' : ''}${Math.abs(totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent}%)
          </div>
        </div>
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {holdings.map((holding) => {
          const currentValue = (holding.currentPrice || holding.purchasePrice) * holding.quantity;
          const costBasis = holding.purchasePrice * holding.quantity;
          const gainLoss = currentValue - costBasis;
          const gainLossPercent = ((gainLoss / costBasis) * 100).toFixed(2);

          return (
            <div key={holding.id} className="bg-gray-800/30 rounded-lg p-2.5 hover:bg-gray-800/50 transition-all border border-gray-700/30">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-white">{holding.symbol}</h3>
                    <span className="text-xs text-gray-400">{holding.quantity} shares</span>
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    <div>
                      <span className="text-gray-500">Cost: </span>
                      <span className="text-gray-300">${costBasis.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Value: </span>
                      <span className="text-white font-semibold">${currentValue.toFixed(2)}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">P&L: </span>
                      <span className={`font-semibold ${gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {gainLoss >= 0 ? '+' : ''}${Math.abs(gainLoss).toFixed(2)} ({gainLoss >= 0 ? '+' : ''}{gainLossPercent}%)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(holding.id)}
                  className="text-red-400 hover:text-red-300 p-1 transition-colors"
                  title="Remove from portfolio"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
