'use client';

export default function RecentActivity({ activities }: { activities: any[] }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
      <h2 className="text-sm font-semibold mb-3 text-gray-200">Recent Activity</h2>
      <div className="space-y-2">
        {activities.length > 0 ? (
          activities.slice(0, 3).map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-gray-800/30 rounded-lg text-sm border border-gray-700/30 hover:bg-gray-800/50 transition-all">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    BUY
                  </span>
                  <span className="font-semibold text-white">{activity.symbol}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {activity.quantity} shares @ ${activity.price.toFixed(2)}
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(activity.date).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-xs py-4 text-center">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
}
