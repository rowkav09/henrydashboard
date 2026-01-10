'use client';

import { SectorAllocation as SectorAllocationType } from '@/types';

interface SectorAllocationProps {
  sectors: SectorAllocationType[];
}

export default function SectorAllocation({ sectors }: SectorAllocationProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <h2 className="text-base font-semibold mb-3 text-gray-200">Sector Allocation</h2>
      <div className="space-y-2.5">
        {sectors.map((sector) => (
          <div key={sector.name}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-300">{sector.name}</span>
              <span className="text-xs font-semibold text-white">{sector.percentage}%</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-2 border border-gray-700/30">
              <div
                className="h-full rounded-full transition-all shadow-lg"
                style={{
                  width: `${sector.percentage}%`,
                  backgroundColor: sector.color,
                  boxShadow: `0 0 8px ${sector.color}40`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
