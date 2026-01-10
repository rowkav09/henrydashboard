'use client';

import { UserProfile } from '@/types';

interface UserHeaderProps {
  profile: UserProfile;
}

export default function UserHeader({ profile }: UserHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xl">
          👤
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">{profile.name}</h1>
          <p className="text-xs text-gray-400">
            Net Worth: <span className="text-green-400 font-semibold">${profile.netWorth.toLocaleString()}</span> | 
            Age: {profile.age} | {profile.path}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Salary</p>
          <p className="text-base font-semibold text-green-400">${profile.salary.toLocaleString()}</p>
          <p className="text-xs text-gray-500">{profile.company}</p>
        </div>
      </div>
    </div>
  );
}
