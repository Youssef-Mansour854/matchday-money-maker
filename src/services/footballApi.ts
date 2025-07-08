import { Match, League } from '@/types/match';

// Using Supabase Edge Function as proxy to Football-Data.org API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const PROXY_URL = `${SUPABASE_URL}/functions/v1/football-proxy`;

// League ID mappings for Football-Data.org
const LEAGUE_MAPPINGS = {
  'PL': { id: 2021, name: 'Premier League', country: 'England' },
  'PD': { id: 2014, name: 'La Liga', country: 'Spain' },
  'BL1': { id: 2002, name: 'Bundesliga', country: 'Germany' },
  'SA': { id: 2019, name: 'Serie A', country: 'Italy' },
  'FL1': { id: 2015, name: 'Ligue 1', country: 'France' },
  'CL': { id: 2001, name: 'Champions League', country: 'Europe' }
};

// Helper function to make API requests through the proxy
const makeProxyRequest = async (endpoint: string, params?: Record<string, any>) => {
  const url = new URL(PROXY_URL);
  url.searchParams.set('endpoint', endpoint);
  
  if (params) {
    url.searchParams.set('params', JSON.stringify(params));
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Proxy request failed: ${response.status}`);
  }
  
  return response.json();
};

// Transform Football-Data.org response to our Match interface
const transformMatch = (match: any): Match => {
  return {
    id: match.id,
    homeTeam: {
      id: match.homeTeam.id,
      name: match.homeTeam.name,
      logo: match.homeTeam.crest || `https://via.placeholder.com/64x64/10b981/ffffff?text=${match.homeTeam.name.charAt(0)}`,
      country: match.competition.area?.name || 'Unknown'
    },
    awayTeam: {
      id: match.awayTeam.id,
      name: match.awayTeam.name,
      logo: match.awayTeam.crest || `https://via.placeholder.com/64x64/10b981/ffffff?text=${match.awayTeam.name.charAt(0)}`,
      country: match.competition.area?.name || 'Unknown'
    },
    fixture: {
      date: match.utcDate,
      timestamp: new Date(match.utcDate).getTime() / 1000,
      timezone: 'UTC',
      venue: {
        id: 1,
        name: 'Stadium',
        city: match.homeTeam.name
      }
    },
    league: {
      id: match.competition.id,
      name: match.competition.name,
      country: match.competition.area?.name || 'Unknown',
      logo: match.competition.emblem || `https://via.placeholder.com/64x64/10b981/ffffff?text=${match.competition.name.charAt(0)}`,
      season: new Date(match.season.startDate).getFullYear()
    },
    status: {
      long: getStatusLong(match.status),
      short: getStatusShort(match.status),
      elapsed: match.minute || null
    },
    score: match.score?.fullTime ? {
      halftime: {
        home: match.score.halfTime?.home || null,
        away: match.score.halfTime?.away || null
      },
      fulltime: {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away
      }
    } : undefined
  };
};

// Transform status from Football-Data.org to our format
const getStatusLong = (status: string): string => {
  switch (status) {
    case 'SCHEDULED': return 'Not Started';
    case 'TIMED': return 'Not Started';
    case 'IN_PLAY': return 'In Play';
    case 'PAUSED': return 'Halftime';
    case 'FINISHED': return 'Match Finished';
    case 'POSTPONED': return 'Postponed';
    case 'CANCELLED': return 'Cancelled';
    default: return status;
  }
};

const getStatusShort = (status: string): string => {
  switch (status) {
    case 'SCHEDULED': return 'NS';
    case 'TIMED': return 'NS';
    case 'IN_PLAY': return 'LIVE';
    case 'PAUSED': return 'HT';
    case 'FINISHED': return 'FT';
    case 'POSTPONED': return 'PP';
    case 'CANCELLED': return 'CANC';
    default: return 'NS';
  }
};

// Transform league data
const transformLeague = (competition: any): League => {
  return {
    id: competition.id,
    name: competition.name,
    country: competition.area?.name || 'Unknown',
    logo: competition.emblem || `https://via.placeholder.com/64x64/10b981/ffffff?text=${competition.name.charAt(0)}`,
    season: new Date().getFullYear()
  };
};

export const footballApi = {
  // Get upcoming fixtures
  async getFixtures(leagueId?: number, date?: string): Promise<Match[]> {
    try {
      let endpoint = '/matches';
      const params: any = {
        status: 'SCHEDULED,TIMED',
        dateFrom: new Date().toISOString().split('T')[0],
        dateTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Next 7 days
      };

      if (leagueId) {
        endpoint = `/competitions/${leagueId}/matches`;
      }

      if (date) {
        params.dateFrom = date;
        params.dateTo = date;
      }

      const data = await makeProxyRequest(endpoint, params);
      
      if (data && data.matches) {
        return data.matches.map(transformMatch);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      
      // Fallback to mock data if API fails
      return getMockMatches(leagueId);
    }
  },

  // Get leagues/competitions
  async getLeagues(): Promise<League[]> {
    try {
      const data = await makeProxyRequest('/competitions', {
        plan: 'TIER_ONE' // Free tier competitions
      });
      
      if (data && data.competitions) {
        // Filter to major European leagues
        const majorLeagues = data.competitions.filter((comp: any) => 
          ['PL', 'PD', 'BL1', 'SA', 'FL1', 'CL'].includes(comp.code)
        );
        
        return majorLeagues.map(transformLeague);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching leagues:', error);
      
      // Fallback to mock data
      return getMockLeagues();
    }
  },

  // Get match results
  async getMatchResult(matchId: number): Promise<Match | null> {
    try {
      const data = await makeProxyRequest(`/matches/${matchId}`);
      
      if (data && data.match) {
        return transformMatch(data.match);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching match result:', error);
      return null;
    }
  }
};

// Mock data fallback functions
const getMockMatches = (leagueId?: number): Match[] => {
  const mockMatches: Match[] = [
    {
      id: 1,
      homeTeam: {
        id: 33,
        name: 'Manchester United',
        logo: 'https://crests.football-data.org/66.png',
        country: 'England'
      },
      awayTeam: {
        id: 40,
        name: 'Liverpool',
        logo: 'https://crests.football-data.org/64.png',
        country: 'England'
      },
      fixture: {
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timestamp: Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000),
        timezone: 'UTC',
        venue: {
          id: 556,
          name: 'Old Trafford',
          city: 'Manchester'
        }
      },
      league: {
        id: 2021,
        name: 'Premier League',
        country: 'England',
        logo: 'https://crests.football-data.org/PL.png',
        season: 2024
      },
      status: {
        long: 'Not Started',
        short: 'NS',
        elapsed: null
      }
    },
    {
      id: 2,
      homeTeam: {
        id: 529,
        name: 'Barcelona',
        logo: 'https://crests.football-data.org/81.png',
        country: 'Spain'
      },
      awayTeam: {
        id: 541,
        name: 'Real Madrid',
        logo: 'https://crests.football-data.org/86.png',
        country: 'Spain'
      },
      fixture: {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: Math.floor((Date.now() + 2 * 24 * 60 * 60 * 1000) / 1000),
        timezone: 'UTC',
        venue: {
          id: 1456,
          name: 'Camp Nou',
          city: 'Barcelona'
        }
      },
      league: {
        id: 2014,
        name: 'La Liga',
        country: 'Spain',
        logo: 'https://crests.football-data.org/PD.png',
        season: 2024
      },
      status: {
        long: 'Not Started',
        short: 'NS',
        elapsed: null
      }
    },
    {
      id: 3,
      homeTeam: {
        id: 157,
        name: 'Bayern Munich',
        logo: 'https://crests.football-data.org/5.png',
        country: 'Germany'
      },
      awayTeam: {
        id: 165,
        name: 'Borussia Dortmund',
        logo: 'https://crests.football-data.org/4.png',
        country: 'Germany'
      },
      fixture: {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        timestamp: Math.floor((Date.now() + 3 * 24 * 60 * 60 * 1000) / 1000),
        timezone: 'UTC',
        venue: {
          id: 700,
          name: 'Allianz Arena',
          city: 'Munich'
        }
      },
      league: {
        id: 2002,
        name: 'Bundesliga',
        country: 'Germany',
        logo: 'https://crests.football-data.org/BL1.png',
        season: 2024
      },
      status: {
        long: 'Not Started',
        short: 'NS',
        elapsed: null
      }
    }
  ];

  if (leagueId) {
    return mockMatches.filter(match => match.league.id === leagueId);
  }
  return mockMatches;
};

const getMockLeagues = (): League[] => {
  return [
    {
      id: 2021,
      name: 'Premier League',
      country: 'England',
      logo: 'https://crests.football-data.org/PL.png',
      season: 2024
    },
    {
      id: 2014,
      name: 'La Liga',
      country: 'Spain',
      logo: 'https://crests.football-data.org/PD.png',
      season: 2024
    },
    {
      id: 2002,
      name: 'Bundesliga',
      country: 'Germany',
      logo: 'https://crests.football-data.org/BL1.png',
      season: 2024
    },
    {
      id: 2019,
      name: 'Serie A',
      country: 'Italy',
      logo: 'https://crests.football-data.org/SA.png',
      season: 2024
    },
    {
      id: 2015,
      name: 'Ligue 1',
      country: 'France',
      logo: 'https://crests.football-data.org/FL1.png',
      season: 2024
    }
  ];
};