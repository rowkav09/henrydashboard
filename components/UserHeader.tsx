'use client';

import { UserProfile } from '@/types';

interface UserHeaderProps {
  profile: UserProfile;
}

export default function UserHeader({ profile }: UserHeaderProps) {
  const name = profile.name || 'User';
  const netWorth = typeof profile.netWorth === 'number' ? Math.max(0, profile.netWorth) : 0;
  const salary = typeof profile.salary === 'number' ? Math.max(0, profile.salary) : 0;
  const age = typeof profile.age === 'number' ? Math.max(0, profile.age) : undefined;
  const path = (profile.path || '').trim();
  const company = (profile.company || '').trim();

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xl">
          👤
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">{name}</h1>
          <div className="text-xs text-gray-400 flex flex-wrap items-center gap-x-2">
            {netWorth > 0 && (
              <span>
                Net Worth: <span className="text-green-400 font-semibold">${netWorth.toLocaleString()}</span>
              </span>
            )}
            {typeof age === 'number' && age > 0 && (
              <span>• Age: {age}</span>
            )}
            {path && (
              <span>• {path}</span>
            )}
          </div>
        </div>
        <div className="text-right">
          {(salary > 0 || company) && (
            <>
              {salary > 0 && (
                <>
                  <p className="text-xs text-gray-400">Salary</p>
                  <p className="text-base font-semibold text-green-400">${salary.toLocaleString()}</p>
                </>
              )}
              {company && (
                <p className="text-xs text-gray-500">{company}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
