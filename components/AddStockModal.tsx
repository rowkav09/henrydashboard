'use client';

import { useState } from 'react';
import { PortfolioHolding } from '@/types';

interface AddStockModalProps {
  onAdd: (holding: Omit<PortfolioHolding, 'id'>) => void;
  onClose: () => void;
}

const VALID_STOCKS = [
  'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA', 'BRK.B', 'BRK.A',
  'V', 'UNH', 'JNJ', 'WMT', 'JPM', 'XOM', 'MA', 'PG', 'LLY', 'CVX',
  'HD', 'MRK', 'ABBV', 'KO', 'PEP', 'AVGO', 'COST', 'TMO', 'MCD', 'CSCO',
  'ACN', 'ABT', 'ADBE', 'CRM', 'NKE', 'DHR', 'TXN', 'NEE', 'WFC', 'VZ',
  'DIS', 'ORCL', 'PM', 'BMY', 'UPS', 'RTX', 'INTC', 'QCOM', 'HON', 'LOW',
  'INTU', 'AMGN', 'T', 'AMAT', 'BA', 'SBUX', 'ELV', 'LMT', 'SPGI', 'AMD',
  'CAT', 'PLD', 'MDT', 'GE', 'DE', 'AXP', 'BLK', 'ADI', 'GILD', 'TJX'
];

export default function AddStockModal({ onAdd, onClose }: AddStockModalProps) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSymbolChange = (value: string) => {
    const upper = value.toUpperCase();
    setSymbol(upper);
    setError('');
    
    if (upper.length > 0) {
      const matches = VALID_STOCKS.filter(s => s.startsWith(upper));
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (stock: string) => {
    setSymbol(stock);
    setSuggestions([]);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol || !quantity || !purchasePrice) return;
    
    if (!VALID_STOCKS.includes(symbol.toUpperCase())) {
      setError(`Invalid stock symbol. Please select from suggestions.`);
      return;
    }

    onAdd({
      symbol: symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice),
      purchaseDate,
    });

    setSymbol('');
    setQuantity('');
    setPurchasePrice('');
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-xl p-6 max-w-md w-full border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Add Stock to Portfolio</h2>
        <p className="text-sm text-gray-400 mb-4">
          Enter the stock symbol, quantity, price you paid, and purchase date. 
          Live prices will be fetched automatically to track your performance.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Stock Symbol</label>
            <div className="relative">
              <input
                type="text"
                value={symbol}
                onChange={(e) => handleSymbolChange(e.target.value)}
                placeholder="e.g., AAPL"
                className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
                required
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {suggestions.map((stock) => (
                    <div
                      key={stock}
                      onClick={() => selectSuggestion(stock)}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                    >
                      {stock}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Quantity (shares)</label>
            <input
              type="number"
              step="1"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 10"
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Purchase Price ($)
              <span className="text-gray-500 text-xs ml-2">Price per share you paid</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="e.g., 150.00"
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg border border-green-500/30"
            >
              Add to Portfolio
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg border border-gray-600/30"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
