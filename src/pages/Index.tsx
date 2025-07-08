
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ScorePredictionCard } from '@/components/ScorePredictionCard';
import { LeagueFilter } from '@/components/LeagueFilter';
import { Leaderboard } from '@/components/Leaderboard';
import { EnhancedUserStats } from '@/components/EnhancedUserStats';
import { usePredictions } from '@/hooks/usePredictions';
import { footballApi } from '@/services/footballApi';
import { Match } from '@/types/match';
import { Calendar, Trophy, Target, Zap } from 'lucide-react';
import { useEffect } from 'react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  const { addPrediction, getPrediction } = usePredictions();

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const data = await footballApi.getFixtures(selectedLeague || undefined);
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedLeague]);

  const handlePrediction = (matchId: number, homeScore: number, awayScore: number) => {
    addPrediction(matchId, homeScore, awayScore);
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
              <h3 className="font-semibold mb-2">Win $1 for Exact Score</h3>
              <p className="text-sm opacity-80">Predict the exact final score to win</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Multiple Leagues</h3>
              <p className="text-sm opacity-80">Premier League, La Liga, Bundesliga & more</p>
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
              <p className="text-gray-600">Predict exact scores and win $1 for each correct prediction!</p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <LeagueFilter 
                selectedLeague={selectedLeague}
                onLeagueChange={setSelectedLeague}
              />
              
              {loading ? (
                <div className="grid gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : matches.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches found</h3>
                  <p className="text-gray-500">
                    {selectedLeague ? 'No upcoming matches for this league' : 'No upcoming matches available'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {matches.map((match) => (
                    <ScorePredictionCard
                      key={match.id}
                      match={match}
                      userPrediction={getPrediction(match.id)}
                      onPredict={handlePrediction}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'stats' && <EnhancedUserStats />}
      </div>
    </div>
  );
};

export default Index;
