import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { League } from '@/types/match';
import { footballApi } from '@/services/footballApi';

interface LeagueFilterProps {
  selectedLeague: number | null;
  onLeagueChange: (leagueId: number | null) => void;
}

export const LeagueFilter = ({ selectedLeague, onLeagueChange }: LeagueFilterProps) => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await footballApi.getLeagues();
        setLeagues(data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  if (loading) {
    return (
      <div className="flex space-x-2 mb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Filter by League</h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedLeague === null ? "default" : "outline"}
          className={`cursor-pointer transition-all ${
            selectedLeague === null 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'hover:bg-green-50 hover:border-green-300'
          }`}
          onClick={() => onLeagueChange(null)}
        >
          All Leagues
        </Badge>
        {leagues.map((league) => (
          <Badge
            key={league.id}
            variant={selectedLeague === league.id ? "default" : "outline"}
            className={`cursor-pointer transition-all flex items-center space-x-1 ${
              selectedLeague === league.id 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'hover:bg-green-50 hover:border-green-300'
            }`}
            onClick={() => onLeagueChange(league.id)}
          >
            <img 
              src={league.logo} 
              alt={league.name}
              className="w-4 h-4"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/16x16/10b981/ffffff?text=${league.name.charAt(0)}`;
              }}
            />
            <span>{league.name}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};