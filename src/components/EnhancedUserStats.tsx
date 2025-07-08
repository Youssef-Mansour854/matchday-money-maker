import { TrendingUp, Target, DollarSign, Trophy, Calendar, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePredictions } from '@/hooks/usePredictions';
import { format } from 'date-fns';

export const EnhancedUserStats = () => {
  const { getAllPredictions, getStats } = usePredictions();
  const stats = getStats();
  const recentPredictions = getAllPredictions()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const achievements = [
    { 
      name: 'First Prediction', 
      description: 'Made your first match prediction', 
      icon: '🎯', 
      unlocked: stats.totalPredictions >= 1,
      requirement: 1,
      current: stats.totalPredictions
    },
    { 
      name: 'Perfect Score', 
      description: 'Got your first exact score prediction right', 
      icon: '🎪', 
      unlocked: stats.correctPredictions >= 1,
      requirement: 1,
      current: stats.correctPredictions
    },
    { 
      name: 'Prediction Master', 
      description: 'Made 10 correct predictions', 
      icon: '🏆', 
      unlocked: stats.correctPredictions >= 10,
      requirement: 10,
      current: stats.correctPredictions
    },
    { 
      name: 'Big Earner', 
      description: 'Earned $25 in total', 
      icon: '💰', 
      unlocked: stats.totalEarnings >= 25,
      requirement: 25,
      current: stats.totalEarnings
    },
    { 
      name: 'Prediction Addict', 
      description: 'Made 50 predictions', 
      icon: '🔥', 
      unlocked: stats.totalPredictions >= 50,
      requirement: 50,
      current: stats.totalPredictions
    },
    { 
      name: 'Fortune Teller', 
      description: 'Achieved 70% win rate (min 20 predictions)', 
      icon: '🔮', 
      unlocked: stats.completedPredictions >= 20 && stats.winRate >= 70,
      requirement: 70,
      current: Math.round(stats.winRate)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Prediction Stats</h2>
        <p className="text-gray-600">Track your performance and earnings</p>
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
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.completedPredictions > 0 ? `${stats.winRate.toFixed(1)}%` : '0%'}
            </div>
            <p className="text-sm text-green-700">
              {stats.correctPredictions}/{stats.completedPredictions} correct
            </p>
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
            <div className="text-3xl font-bold text-blue-600 mb-2">${stats.totalEarnings}</div>
            <p className="text-sm text-blue-700">From {stats.correctPredictions} correct predictions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-800 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Total Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.totalPredictions}</div>
            <p className="text-sm text-orange-700">{stats.pendingPredictions} pending results</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-800 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.completedPredictions}</div>
            <p className="text-sm text-purple-700">Matches with results</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Predictions */}
      {recentPredictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPredictions.map((prediction) => (
                <div key={prediction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      prediction.isCorrect === undefined ? 'bg-yellow-500' :
                      prediction.isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-800">Match #{prediction.matchId}</p>
                      <p className="text-sm text-gray-600">
                        Predicted: {prediction.homeScore} - {prediction.awayScore}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(prediction.createdAt), 'MMM d, HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      prediction.isCorrect === undefined ? 'secondary' :
                      prediction.isCorrect ? 'default' : 'destructive'
                    }>
                      {prediction.isCorrect === undefined ? 'Pending' :
                       prediction.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">
                      {prediction.isCorrect ? `+$${prediction.points || 1}` : 
                       prediction.isCorrect === false ? '$0' : 'TBD'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
            {achievements.map((achievement, index) => (
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
                    {!achievement.unlocked && (
                      <p className="text-xs text-gray-400 mt-1">
                        Progress: {achievement.current}/{achievement.requirement}
                      </p>
                    )}
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

      {/* Progress to Next Achievement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Progress to Next Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.filter(a => !a.unlocked).slice(0, 3).map((achievement, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-2">
                <span>{achievement.name}</span>
                <span>{achievement.current}/{achievement.requirement}</span>
              </div>
              <Progress 
                value={(achievement.current / achievement.requirement) * 100} 
                className="h-2" 
              />
            </div>
          ))}
          {achievements.every(a => a.unlocked) && (
            <div className="text-center py-4">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <p className="text-lg font-semibold text-gray-800">All Achievements Unlocked!</p>
              <p className="text-sm text-gray-600">You're a prediction master! 🎉</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};