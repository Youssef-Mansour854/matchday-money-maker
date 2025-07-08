
import { useState } from 'react';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  time: string;
  league: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  status: string;
}

interface MatchCardProps {
  match: Match;
  userPrediction?: string;
  onPredict: (matchId: number, prediction: string) => void;
}

export const MatchCard = ({ match, userPrediction, onPredict }: MatchCardProps) => {
  const [selectedPrediction, setSelectedPrediction] = useState<string>(userPrediction || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePredictionSubmit = async (prediction: string) => {
    setIsSubmitting(true);
    setSelectedPrediction(prediction);
    
    // Simulate API call
    setTimeout(() => {
      onPredict(match.id, prediction);
      setIsSubmitting(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const predictionOptions = [
    { id: 'home', label: match.homeTeam, odds: match.odds.home },
    { id: 'draw', label: 'Draw', odds: match.odds.draw },
    { id: 'away', label: match.awayTeam, odds: match.odds.away }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Match Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {match.league}
          </Badge>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(match.date)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {match.time}
            </div>
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {/* Home Team */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-3">
              {match.homeTeamLogo}
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">{match.homeTeam}</h3>
          </div>

          {/* VS */}
          <div className="px-6">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="font-bold text-green-600">VS</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-3">
              {match.awayTeamLogo}
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">{match.awayTeam}</h3>
          </div>
        </div>

        {/* Prediction Section */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Make Your Prediction</h4>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <DollarSign className="w-4 h-4 mr-1" />
              Win $1
            </div>
          </div>

          {userPrediction ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-green-800 font-medium">
                  ✅ Prediction: {userPrediction === 'home' ? match.homeTeam : userPrediction === 'away' ? match.awayTeam : 'Draw'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPrediction('');
                    onPredict(match.id, '');
                  }}
                  className="text-green-600 border-green-300 hover:bg-green-50"
                >
                  Change
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {predictionOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedPrediction === option.id ? "default" : "outline"}
                  className={`p-4 h-auto flex flex-col space-y-1 ${
                    selectedPrediction === option.id 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'hover:border-green-300 hover:bg-green-50'
                  }`}
                  onClick={() => handlePredictionSubmit(option.id)}
                  disabled={isSubmitting}
                >
                  <span className="font-medium text-sm">
                    {option.id === 'home' ? match.homeTeam.split(' ')[0] : 
                     option.id === 'away' ? match.awayTeam.split(' ')[0] : 'Draw'}
                  </span>
                  <span className="text-xs opacity-75">
                    {option.odds.toFixed(1)}x
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
