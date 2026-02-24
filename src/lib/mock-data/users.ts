// Mock Data Store for Users
export const mockUsers = [
  {
    id: 'user-1',
    name: 'Steven CEO',
    email: 'steven@rnkd.com',
    phone: '+6281234567890',
    avatar_url: null,
    province: 'Bali',
    city: 'Denpasar',
    role: 'admin',
    created_at: '2025-01-01T00:00:00Z',
    profile: {
      mmr: 1542,
      tier: 'ELITE',
      pbpi_grading: 'A',
      matches_played: 14,
      wins: 10,
      losses: 4,
      win_rate: 71.4,
    }
  },
  {
    id: 'user-2',
    name: 'Bobby CPO',
    email: 'bobby@rnkd.com',
    phone: '+6281234567891',
    avatar_url: null,
    province: 'Jakarta',
    city: 'South Jakarta',
    role: 'admin',
    created_at: '2025-01-02T00:00:00Z',
    profile: {
      mmr: 1320,
      tier: 'CONTENDER',
      pbpi_grading: 'B',
      matches_played: 22,
      wins: 12,
      losses: 10,
      win_rate: 54.5,
    }
  },
  {
    id: 'user-3',
    name: 'Wayan Tech',
    email: 'wayan@rnkd.com',
    phone: '+6281234567892',
    avatar_url: null,
    province: 'Bali',
    city: 'Badung',
    role: 'admin',
    created_at: '2025-01-05T00:00:00Z',
    profile: {
      mmr: 1050,
      tier: 'CHALLENGER',
      pbpi_grading: 'C',
      matches_played: 8,
      wins: 3,
      losses: 5,
      win_rate: 37.5,
    }
  },
  {
    id: 'user-4',
    name: 'Nisa Ops',
    email: 'nisa@rnkd.com',
    phone: '+6281234567893',
    avatar_url: null,
    province: 'Jakarta',
    city: 'Central Jakarta',
    role: 'user',
    created_at: '2025-01-10T00:00:00Z',
    profile: {
      mmr: 850,
      tier: 'ROOKIE',
      pbpi_grading: 'D',
      matches_played: 2,
      wins: 0,
      losses: 2,
      win_rate: 0,
    }
  },
  {
    id: 'user-5',
    name: 'Agus Padel',
    email: 'agus@gmail.com',
    phone: '+6281234567894',
    avatar_url: null,
    province: 'Bali',
    city: 'Gianyar',
    role: 'user',
    created_at: '2025-02-01T00:00:00Z',
    profile: {
      mmr: 1850,
      tier: 'MASTERS',
      pbpi_grading: 'A+',
      matches_played: 45,
      wins: 38,
      losses: 7,
      win_rate: 84.4,
    }
  }
];

export const mockDashboardStats = {
  totalUsers: 1245,
  userTrend: 12,
  matchesThisWeek: 84,
  pendingVerifications: 5,
  activeDisputes: 2,
  averageMMR: 1050,
  activeSeasons: 2,
  totalClubs: 24
};