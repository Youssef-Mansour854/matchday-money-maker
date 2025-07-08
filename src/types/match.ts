export interface Match {
  id: number;
  homeTeam: {
    id: number;
    name: string;
    logo: string;
    country: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
    country: string;
  };
  fixture: {
    date: string;
    timestamp: number;
    timezone: string;
    venue: {
      id: number;
      name: string;
      city: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    season: number;
  };
  status: {
    long: string;
    short: string;
    elapsed: number | null;
  };
  score?: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
  };
}

export interface Prediction {
  id: string;
  matchId: number;
  userId: string;
  homeScore: number;
  awayScore: number;
  createdAt: string;
  isCorrect?: boolean;
  points?: number;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  season: number;
}