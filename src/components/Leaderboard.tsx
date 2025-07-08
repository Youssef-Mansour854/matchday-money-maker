
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const leaderboardData = [
  {
    rank: 1,
    name: 'Alex Rodriguez',
    points: 2847,
    correctPredictions: 156,
    totalPredictions: 203,
    winRate: 76.8,
    earnings: 156,
    avatar: '🏆'
  },
  {
    rank: 2,
    name: 'Sarah Chen',
    points: 2651,
    correctPredictions: 142,
    totalPredictions: 190,
    winRate: 74.7,
    earnings: 142,
    avatar: '🥈'
  },
  {
    rank: 3,
    name: 'Michael Johnson',
    points: 2435,
    correctPredictions: 134,
    totalPredictions: 185,
    winRate: 72.4,
    earnings: 134,
    avatar: '🥉'
  },
  {
    rank: 4,
    name: 'Emma Davis',
    points: 2289,
    correctPredictions: 127,
    totalPredictions: 178,
    winRate: 71.3,
    earnings: 127,
    avatar: '⭐'
  },
  {
    rank: 5,
    name: 'John Smith',
    points: 2156,
    correctPredictions: 119,
    totalPredictions: 172,
    winRate: 69.2,
    earnings: 119,
    avatar: '🎯'
  },
  {
    rank: 6,
    name: 'Lisa Wang',
    points: 2034,
    correctPredictions: 112,
    totalPredictions: 165,
    winRate: 67.9,
    earnings: 112,
    avatar: '⚡'
  },
  {
    rank: 7,
    name: 'David Brown',
    points: 1923,
    correctPredictions: 105,
    totalPredictions: 158,
    winRate: 66.5,
    earnings: 105,
    avatar: '🔥'
  },
  {
    rank: 8,
    name: 'Maria Garcia',
    points: 1847,
    correctPredictions: 98,
    totalPredictions: 151,
    winRate: 64.9,
    earnings: 98,
    avatar: '💫'
  }
];

export const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</div>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "Champion";
    if (rank <= 3) return "Top 3";
    if (rank <= 10) return "Top 10";
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Leaderboard</h2>
        <p className="text-gray-600">Top predictors this season</p>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <div
              key={user.rank}
              className={`text-center ${index === 0 ? 'order-2 transform scale-110' : index === 1 ? 'order-1' : 'order-3'}`}
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 ${
                index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                'bg-gradient-to-r from-orange-400 to-orange-500'
              }`}>
                {user.avatar}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{user.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{user.points} pts</p>
              <Badge variant="outline" className={`text-xs ${
                index === 0 ? 'border-yellow-300 text-yellow-700' :
                index === 1 ? 'border-gray-300 text-gray-700' :
                'border-orange-300 text-orange-700'
              }`}>
                ${user.earnings}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
          <h3 className="font-bold text-lg">Full Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((user) => (
            <div key={user.rank} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Rank */}
                  <div className="flex items-center space-x-3">
                    {getRankIcon(user.rank)}
                    <span className="font-bold text-gray-800">#{user.rank}</span>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-lg">
                      {user.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{user.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{user.correctPredictions}/{user.totalPredictions} correct</span>
                        <span className="flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {user.winRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right space-y-1">
                  <div className="font-bold text-lg text-gray-800">{user.points}</div>
                  <div className="text-sm text-gray-600">points</div>
                  <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                    ${user.earnings}
                  </Badge>
                </div>
              </div>

              {getRankBadge(user.rank) && (
                <div className="mt-2">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    {getRankBadge(user.rank)}
                  </Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
