import axios from 'axios';
import { Match, League } from '@/types/match';

// Using API-Football (RapidAPI) - Free tier available
const API_KEY = 'your-api-key-here'; // Replace with actual API key
const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
});

// Mock data for development (replace with real API calls)
const mockMatches: Match[] = [
  {
    id: 1,
    homeTeam: {
      id: 33,
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png',
      country: 'England'
    },
    awayTeam: {
      id: 40,
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png',
      country: 'England'
    },
    fixture: {
      date: '2025-01-15T15:00:00Z',
      timestamp: 1737298800,
      timezone: 'UTC',
      venue: {
        id: 556,
        name: 'Old Trafford',
        city: 'Manchester'
      }
    },
    league: {
      id: 39,
      name: 'Premier League',
      country: 'England',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
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
      logo: 'https://media.api-sports.io/football/teams/529.png',
      country: 'Spain'
    },
    awayTeam: {
      id: 541,
      name: 'Real Madrid',
      logo: 'https://media.api-sports.io/football/teams/541.png',
      country: 'Spain'
    },
    fixture: {
      date: '2025-01-16T20:00:00Z',
      timestamp: 1737403200,
      timezone: 'UTC',
      venue: {
        id: 1456,
        name: 'Camp Nou',
        city: 'Barcelona'
      }
    },
    league: {
      id: 140,
      name: 'La Liga',
      country: 'Spain',
      logo: 'https://media.api-sports.io/football/leagues/140.png',
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
      logo: 'https://media.api-sports.io/football/teams/157.png',
      country: 'Germany'
    },
    awayTeam: {
      id: 165,
      name: 'Borussia Dortmund',
      logo: 'https://media.api-sports.io/football/teams/165.png',
      country: 'Germany'
    },
    fixture: {
      date: '2025-01-17T18:30:00Z',
      timestamp: 1737484200,
      timezone: 'UTC',
      venue: {
        id: 700,
        name: 'Allianz Arena',
        city: 'Munich'
      }
    },
    league: {
      id: 78,
      name: 'Bundesliga',
      country: 'Germany',
      logo: 'https://media.api-sports.io/football/leagues/78.png',
      season: 2024
    },
    status: {
      long: 'Not Started',
      short: 'NS',
      elapsed: null
    }
  },
  {
    id: 4,
    homeTeam: {
      id: 496,
      name: 'Juventus',
      logo: 'https://media.api-sports.io/football/teams/496.png',
      country: 'Italy'
    },
    awayTeam: {
      id: 489,
      name: 'AC Milan',
      logo: 'https://media.api-sports.io/football/teams/489.png',
      country: 'Italy'
    },
    fixture: {
      date: '2025-01-18T19:45:00Z',
      timestamp: 1737575100,
      timezone: 'UTC',
      venue: {
        id: 1662,
        name: 'Allianz Stadium',
        city: 'Turin'
      }
    },
    league: {
      id: 135,
      name: 'Serie A',
      country: 'Italy',
      logo: 'https://media.api-sports.io/football/leagues/135.png',
      season: 2024
    },
    status: {
      long: 'Not Started',
      short: 'NS',
      elapsed: null
    }
  },
  {
    id: 5,
    homeTeam: {
      id: 85,
      name: 'Paris Saint Germain',
      logo: 'https://media.api-sports.io/football/teams/85.png',
      country: 'France'
    },
    awayTeam: {
      id: 79,
      name: 'Lille',
      logo: 'https://media.api-sports.io/football/teams/79.png',
      country: 'France'
    },
    fixture: {
      date: '2025-01-19T20:00:00Z',
      timestamp: 1737662400,
      timezone: 'UTC',
      venue: {
        id: 671,
        name: 'Parc des Princes',
        city: 'Paris'
      }
    },
    league: {
      id: 61,
      name: 'Ligue 1',
      country: 'France',
      logo: 'https://media.api-sports.io/football/leagues/61.png',
      season: 2024
    },
    status: {
      long: 'Not Started',
      short: 'NS',
      elapsed: null
    }
  }
];

const mockLeagues: League[] = [
  {
    id: 39,
    name: 'Premier League',
    country: 'England',
    logo: 'https://media.api-sports.io/football/leagues/39.png',
    season: 2024
  },
  {
    id: 140,
    name: 'La Liga',
    country: 'Spain',
    logo: 'https://media.api-sports.io/football/leagues/140.png',
    season: 2024
  },
  {
    id: 78,
    name: 'Bundesliga',
    country: 'Germany',
    logo: 'https://media.api-sports.io/football/leagues/78.png',
    season: 2024
  },
  {
    id: 135,
    name: 'Serie A',
    country: 'Italy',
    logo: 'https://media.api-sports.io/football/leagues/135.png',
    season: 2024
  },
  {
    id: 61,
    name: 'Ligue 1',
    country: 'France',
    logo: 'https://media.api-sports.io/football/leagues/61.png',
    season: 2024
  }
];

export const footballApi = {
  // Get upcoming fixtures
  async getFixtures(leagueId?: number, date?: string): Promise<Match[]> {
    try {
      // For development, return mock data
      if (leagueId) {
        return mockMatches.filter(match => match.league.id === leagueId);
      }
      return mockMatches;
      
      // Real API call (uncomment when you have API key)
      /*
      const response = await api.get('/fixtures', {
        params: {
          league: leagueId,
          date: date,
          status: 'NS', // Not Started
          timezone: 'UTC'
        }
      });
      return response.data.response;
      */
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      return mockMatches;
    }
  },

  // Get leagues
  async getLeagues(): Promise<League[]> {
    try {
      return mockLeagues;
      
      // Real API call (uncomment when you have API key)
      /*
      const response = await api.get('/leagues', {
        params: {
          current: true
        }
      });
      return response.data.response.map((item: any) => item.league);
      */
    } catch (error) {
      console.error('Error fetching leagues:', error);
      return mockLeagues;
    }
  },

  // Get match results
  async getMatchResult(matchId: number): Promise<Match | null> {
    try {
      // For development, return mock result
      const match = mockMatches.find(m => m.id === matchId);
      if (match) {
        return {
          ...match,
          status: {
            long: 'Match Finished',
            short: 'FT',
            elapsed: 90
          },
          score: {
            halftime: { home: 1, away: 0 },
            fulltime: { home: 2, away: 1 }
          }
        };
      }
      return null;
      
      // Real API call (uncomment when you have API key)
      /*
      const response = await api.get('/fixtures', {
        params: {
          id: matchId
        }
      });
      return response.data.response[0];
      */
    } catch (error) {
      console.error('Error fetching match result:', error);
      return null;
    }
  }
};