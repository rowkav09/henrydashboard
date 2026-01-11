'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PortfolioData } from '@/types';

interface PortfolioChartProps {
  data: PortfolioData[];
  chartKey?: string;
}

export default function PortfolioChart({ data, chartKey }: PortfolioChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[280px] text-gray-400">
        No data available
      </div>
    );
  }

  // Calculate Y-axis with exactly 6 ticks for consistent grid
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;
  const padding = range * 0.15;
  
  const targetTicks = 6;
  const rawMin = minValue - padding;
  const rawMax = maxValue + padding;
  const rawRange = rawMax - rawMin;
  const roughInterval = rawRange / (targetTicks - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughInterval)));
  const normalized = roughInterval / magnitude;
  
  let niceInterval;
  if (normalized < 1.5) niceInterval = magnitude;
  else if (normalized < 3) niceInterval = 2 * magnitude;
  else if (normalized < 7) niceInterval = 5 * magnitude;
  else niceInterval = 10 * magnitude;
  
  const domainMin = Math.floor(rawMin / niceInterval) * niceInterval;
  const domainMax = domainMin + (niceInterval * (targetTicks - 1));
  
  const ticks = [];
  for (let i = 0; i < targetTicks; i++) {
    ticks.push(domainMin + (i * niceInterval));
  }

  return (
    <ResponsiveContainer width="100%" height={280} key={chartKey}>
      <LineChart data={data} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="month" 
          stroke="#9ca3af"
          style={{ fontSize: '11px' }}
        />
        <YAxis 
          stroke="#9ca3af"
          style={{ fontSize: '11px' }}
          domain={[domainMin, domainMax]}
          ticks={ticks}
          tickFormatter={(value) => {
            if (value >= 1000000) return `$${Math.round(value / 1000000)}M`;
            return `$${Math.round(value / 1000)}k`;
          }}
          width={70}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '12px'
          }}
          formatter={(value: any) => {
            if (typeof value !== 'number') return ['N/A', 'Value'];
            return [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Value'];
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#10b981" 
          strokeWidth={2}
          dot={{ fill: '#10b981', r: 3 }}
          activeDot={{ r: 5 }}
          fill="url(#colorValue)"
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
