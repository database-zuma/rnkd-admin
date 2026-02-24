// Mock Data Store for Matches

export interface MatchPlayer {
  id: string;
  name: string;
}

export interface MatchTeam {
  players: MatchPlayer[];
  score: number[];
}

export interface Match {
  id: string;
  date: string;
  type: 'RATED' | 'UNRATED' | 'LIGA';
  status: 'VERIFIED' | 'PENDING' | 'DISPUTED' | 'COMPLETED';
  team1: MatchTeam;
  team2: MatchTeam;
  mmr_delta: number;
  venue: string;
  duration_minutes: number;
}

const venues = [
  'Padel Haus Bali', 'Jakarta Padel Club', 'Denpasar Sports Center',
  'Seminyak Padel Arena', 'Canggu Padel Hub', 'BSD Padel Court',
  'PIK Padel Zone', 'Ubud Padel Lounge', 'Sanur Beach Padel',
  'Kemang Padel Center',
];

const playerNames = [
  'Steven CEO', 'Bobby CPO', 'Wayan Tech', 'Nisa Ops', 'Agus Padel',
  'Kadek Smash', 'Made Volley', 'Putu Rally', 'Komang Net', 'Gede Serve',
  'Ari Drop', 'Budi Lob', 'Citra Spin', 'Dewa Power', 'Eka Slice',
  'Fajar Drive', 'Gita Ace', 'Hendra Chop', 'Indra Wall', 'Joko Flat',
];

function makeDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

function pickPlayers(usedIds: Set<string>, count: number): MatchPlayer[] {
  const result: MatchPlayer[] = [];
  const available = playerNames.filter((_, i) => !usedIds.has(`user-${i + 1}`));
  for (let i = 0; i < count && i < available.length; i++) {
    const idx = playerNames.indexOf(available[i]);
    const id = `user-${idx + 1}`;
    usedIds.add(id);
    result.push({ id, name: available[i] });
  }
  return result;
}

function generateMatches(): Match[] {
  const matches: Match[] = [];
  const types: Match['type'][] = ['RATED', 'UNRATED', 'LIGA'];
  const statuses: Match['status'][] = ['VERIFIED', 'PENDING', 'DISPUTED', 'COMPLETED'];

  const scoreLines: number[][][] = [
    [[6, 4, 6], [4, 6, 3]],
    [[6, 3, 7], [3, 6, 5]],
    [[7, 6, 6], [5, 4, 2]],
    [[6, 6, 0], [4, 3, 0]],
    [[6, 7, 6], [3, 5, 4]],
    [[7, 4, 7], [6, 6, 5]],
    [[6, 2, 6], [4, 6, 1]],
    [[6, 6, 0], [1, 2, 0]],
    [[4, 6, 7], [6, 3, 5]],
    [[6, 3, 6], [2, 6, 4]],
  ];

  for (let i = 0; i < 30; i++) {
    const usedIds = new Set<string>();
    const team1Players = pickPlayers(usedIds, 2);
    const team2Players = pickPlayers(usedIds, 2);
    const scoreIdx = i % scoreLines.length;
    const typeIdx = i % 3;
    const statusIdx = i < 3 ? 1 : i === 5 ? 2 : i < 8 ? 3 : 0;

    matches.push({
      id: `match-${String(i + 1).padStart(3, '0')}`,
      date: makeDate(Math.floor(i * 2) + Math.floor(Math.random() * 2)),
      type: types[typeIdx],
      status: statuses[statusIdx],
      team1: {
        players: team1Players,
        score: scoreLines[scoreIdx][0],
      },
      team2: {
        players: team2Players,
        score: scoreLines[scoreIdx][1],
      },
      mmr_delta: [24, 18, 22, 16, 28, 20, 14, 26, 19, 21][i % 10],
      venue: venues[i % venues.length],
      duration_minutes: 45 + (i % 8) * 5,
    });
  }

  return matches;
}

export const mockMatches: Match[] = generateMatches();

// 30-day chart data
export const mockChartData = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    date: d.toISOString().slice(0, 10),
    matches: Math.floor(Math.random() * 12) + 2,
    users: Math.floor(Math.random() * 30) + 10,
  };
});

// Tier distribution
export const mockTierDistribution = [
  { tier: 'ROOKIE', count: 412, percentage: 33.1 },
  { tier: 'CHALLENGER', count: 318, percentage: 25.5 },
  { tier: 'CONTENDER', count: 245, percentage: 19.7 },
  { tier: 'ELITE', count: 156, percentage: 12.5 },
  { tier: 'MASTERS', count: 89, percentage: 7.1 },
  { tier: 'ICONS', count: 25, percentage: 2.0 },
];
