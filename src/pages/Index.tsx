
import { useState } from 'react';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { Leaderboard } from '@/components/Leaderboard';
import { UserStats } from '@/components/UserStats';
import { Calendar, Trophy, Target, Zap } from 'lucide-react';

// Mock data for upcoming matches
const upcomingMatches = [
  {
    id: 1,
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeTeamLogo: '🔴',
    awayTeamLogo: '🔴',
    date: '2025-07-10',
    time: '15:00',
    league: 'Premier League',
    odds: { home: 2.5, draw: 3.2, away: 2.8 },
    status: 'upcoming'
  },
  {
    id: 2,
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    homeTeamLogo: '🔵',
    awayTeamLogo: '⚪',
    date: '2025-07-11',
    time: '20:00',
    league: 'La Liga',
    odds: { home: 2.1, draw: 3.5, away: 3.0 },
    status: 'upcoming'
  },
  {
    id: 3,
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeTeamLogo: '🔴',
    awayTeamLogo: '🟡',
    date: '2025-07-12',
    time: '18:30',
    league: 'Bundesliga',
    odds: { home: 1.8, draw: 3.8, away: 4.2 },
    status: 'upcoming'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [userPredictions, setUserPredictions] = useState<Record<number, string>>({});

  const handlePrediction = (matchId: number, prediction: string) => {
    setUserPredictions(prev => ({
      ...prev,
      [matchId]: prediction
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-12 h-12 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold">Match Predictor</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Predict football matches and win rewards! 🏆
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Trophy className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Win $1 Per Correct Prediction</h3>
              <p className="text-sm opacity-80">Get rewarded for your football knowledge</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Daily Matches</h3>
              <p className="text-sm opacity-80">New matches to predict every day</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Compete & Climb</h3>
              <p className="text-sm opacity-80">Rise up the leaderboard rankings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 max-w-md mx-auto">
          <div className="flex space-x-1">
            {[
              { id: 'matches', label: 'Matches', icon: Target },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
              { id: 'stats', label: 'My Stats', icon: Zap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {activeTab === 'matches' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Upcoming Matches</h2>
              <p className="text-gray-600">Make your predictions and win rewards!</p>
            </div>
            <div className="grid gap-6 max-w-4xl mx-auto">
              {upcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  userPrediction={userPredictions[match.id]}
                  onPredict={handlePrediction}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'stats' && <UserStats />}
      </div>
    </div>
  );
};

export default Index;
