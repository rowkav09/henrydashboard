'use client';

import { NewsItem } from '@/types';

interface NewsPanelProps {
  news: NewsItem[];
}

export default function NewsPanel({ news }: NewsPanelProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-sm font-semibold text-gray-200">Market News</h2>
      </div>
      <div className="space-y-2">
        {news.map((item, index) => (
          <div
            key={index}
            className={`p-2.5 rounded-lg transition-all hover:scale-[1.02] cursor-pointer ${
              item.impact === 'positive' 
                ? 'bg-green-500/5 border border-green-500/20 hover:bg-green-500/10' 
                : 'bg-red-500/5 border border-red-500/20 hover:bg-red-500/10'
            }`}
          >
            <p className="text-xs leading-relaxed">
              <span className={`font-bold ${item.impact === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                {item.impact === 'positive' ? '▲' : '▼'}
              </span>{' '}
              {item.title}
            </p>
            {item.source && (
              <p className="text-xs text-gray-500 mt-1">{item.source}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
