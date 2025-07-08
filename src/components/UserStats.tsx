
import { TrendingUp, Target, DollarSign, Trophy, Calendar, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const userStats = {
  totalPredictions: 89,
  correctPredictions: 62,
  winRate: 69.7,
  totalEarnings: 62,
  currentStreak: 5,
  bestStreak: 12,
  rank: 15,
  points: 1247,
  recentMatches: [
    { match: 'Man City vs Arsenal', prediction: 'Man City', result: 'correct', earnings: 1 },
    { match: 'Liverpool vs Chelsea', prediction: 'Draw', result: 'correct', earnings: 1 },
    { match: 'Barcelona vs Atletico', prediction: 'Barcelona', result: 'correct', earnings: 1 },
    { match: 'Bayern vs Dortmund', prediction: 'Bayern', result: 'incorrect', earnings: 0 },
    { match: 'PSG vs Marseille', prediction: 'PSG', result: 'correct', earnings: 1 },
  ],
  achievements: [
    { name: 'First Win', description: 'Made your first correct prediction', icon: '🎯', unlocked: true },
    { name: 'Hot Streak', description: 'Got 5 predictions right in a row', icon: '🔥', unlocked: true },
    { name: 'Century Club', description: 'Made 100 predictions', icon: '💯', unlocked: false },
    { name: 'Big Earner', description: 'Earned $100 in total', icon: '💰', unlocked: false },
  ]
};

export const UserStats = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Stats</h2>
        <p className="text-gray-600">Track your prediction performance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-800 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{userStats.winRate}%</div>
            <p className="text-sm text-green-700">{userStats.correctPredictions}/{userStats.totalPredictions} correct</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-800 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">${userStats.totalEarnings}</div>
            <p className="text-sm text-blue-700">From {userStats.correctPredictions} wins</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-800 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-2">{userStats.currentStreak}</div>
            <p className="text-sm text-orange-700">Best: {userStats.bestStreak}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-800 flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">#{userStats.rank}</div>
            <p className="text-sm text-purple-700">{userStats.points} points</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Matches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Recent Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userStats.recentMatches.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${match.result === 'correct' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium text-gray-800">{match.match}</p>
                    <p className="text-sm text-gray-600">Predicted: {match.prediction}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={match.result === 'correct' ? 'default' : 'destructive'}>
                    {match.result === 'correct' ? '✓ Correct' : '✗ Incorrect'}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    {match.result === 'correct' ? `+$${match.earnings}` : '$0'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userStats.achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                achievement.unlocked 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-green-600">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Progress to Next Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Century Club (100 predictions)</span>
              <span>{userStats.totalPredictions}/100</span>
            </div>
            <Progress value={(userStats.totalPredictions / 100) * 100} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Big Earner ($100 total)</span>
              <span>${userStats.totalEarnings}/100</span>
            </div>
            <Progress value={(userStats.totalEarnings / 100) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
