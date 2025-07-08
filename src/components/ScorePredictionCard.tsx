import { useState } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Match, Prediction } from '@/types/match';
import { format } from 'date-fns';

interface ScorePredictionCardProps {
  match: Match;
  userPrediction?: Prediction;
  onPredict: (matchId: number, homeScore: number, awayScore: number) => void;
}

export const ScorePredictionCard = ({ match, userPrediction, onPredict }: ScorePredictionCardProps) => {
  const [homeScore, setHomeScore] = useState<string>(userPrediction?.homeScore.toString() || '');
  const [awayScore, setAwayScore] = useState<string>(userPrediction?.awayScore.toString() || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const home = parseInt(homeScore);
    const away = parseInt(awayScore);
    
    if (isNaN(home) || isNaN(away) || home < 0 || away < 0) {
      alert('Please enter valid scores (0 or higher)');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onPredict(match.id, home, away);
      setIsSubmitting(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEE, MMM d');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm');
  };

  const isMatchStarted = new Date(match.fixture.date) <= new Date();

  return (
    <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Match Header */}
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img 
              src={match.league.logo} 
              alt={match.league.name}
              className="w-6 h-6"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/24x24/10b981/ffffff?text=${match.league.name.charAt(0)}`;
              }}
            />
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {match.league.name}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(match.fixture.date)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(match.fixture.date)}
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          {match.fixture.venue.name}, {match.fixture.venue.city}
        </div>
      </CardHeader>

      {/* Teams and Score Prediction */}
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center flex-1">
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name}
              className="w-16 h-16 mb-3"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/64x64/10b981/ffffff?text=${match.homeTeam.name.charAt(0)}`;
              }}
            />
            <h3 className="font-semibold text-gray-800 text-lg">{match.homeTeam.name}</h3>
            <p className="text-sm text-gray-500">{match.homeTeam.country}</p>
          </div>

          {/* Score Input */}
          <div className="px-6">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <span className="font-bold text-green-600">VS</span>
            </div>
            {!isMatchStarted && !userPrediction && (
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  className="w-16 text-center text-lg font-bold"
                  placeholder="0"
                />
                <span className="text-2xl font-bold text-gray-400">-</span>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  className="w-16 text-center text-lg font-bold"
                  placeholder="0"
                />
              </div>
            )}
            {userPrediction && (
              <div className="flex items-center space-x-2">
                <div className="w-16 h-12 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">{userPrediction.homeScore}</span>
                </div>
                <span className="text-2xl font-bold text-gray-400">-</span>
                <div className="w-16 h-12 bg-green-50 border-2 border-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">{userPrediction.awayScore}</span>
                </div>
              </div>
            )}
            {isMatchStarted && !userPrediction && (
              <div className="text-center">
                <p className="text-sm text-gray-500">Match Started</p>
                <p className="text-xs text-gray-400">Predictions closed</p>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center text-center flex-1">
            <img 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name}
              className="w-16 h-16 mb-3"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/64x64/10b981/ffffff?text=${match.awayTeam.name.charAt(0)}`;
              }}
            />
            <h3 className="font-semibold text-gray-800 text-lg">{match.awayTeam.name}</h3>
            <p className="text-sm text-gray-500">{match.awayTeam.country}</p>
          </div>
        </div>

        {/* Prediction Section */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Score Prediction</h4>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <DollarSign className="w-4 h-4 mr-1" />
              Win $1 for exact score
            </div>
          </div>

          {userPrediction ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    Prediction Submitted: {userPrediction.homeScore} - {userPrediction.awayScore}
                  </span>
                </div>
                {userPrediction.isCorrect !== undefined && (
                  <Badge variant={userPrediction.isCorrect ? 'default' : 'destructive'}>
                    {userPrediction.isCorrect ? `✓ Correct (+$${userPrediction.points})` : '✗ Incorrect'}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-green-700 mt-2">
                Predicted on {format(new Date(userPrediction.createdAt), 'MMM d, HH:mm')}
              </p>
            </div>
          ) : isMatchStarted ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-gray-600">Predictions are closed for this match</p>
              <p className="text-sm text-gray-500 mt-1">Match has already started</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Predict the exact final score to win $1
              </p>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !homeScore || !awayScore}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Prediction'}
              </Button>
            </div>
          )}
        </div>

        {/* Match Status */}
        {match.score && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-blue-600 font-medium">Final Result</p>
              <p className="text-2xl font-bold text-blue-800 mt-1">
                {match.score.fulltime.home} - {match.score.fulltime.away}
              </p>
              <p className="text-sm text-blue-600 mt-1">{match.status.long}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};