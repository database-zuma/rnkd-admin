// Mock Data Store for Liga Fixtures
// Phase 0: Static mock data. Phase 11: Replaced by Supabase queries.

export interface Season {
  id: string;
  name: string;
  slug: string;
  liga: 'liga1' | 'liga1_women' | 'liga2';
  status: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface Fixture {
  id: string;
  season_id: string;
  home_club_id: string;
  away_club_id: string;
  gameweek: number;
  scheduled_date: string;
  scheduled_time: string;
  venue_name: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  home_matches_won: number | null;
  away_matches_won: number | null;
  home_club: Organization;
  away_club: Organization;
}

export interface LigaMatch {
  id: string;
  fixture_id: string;
  match_number: number;
  status: 'pending' | 'assigned' | 'completed';
  home_player1_id: string | null;
  home_player2_id: string | null;
  away_player1_id: string | null;
  away_player2_id: string | null;
  home_sets_won: number | null;
  away_sets_won: number | null;
  set1_home_games: number | null;
  set1_away_games: number | null;
  set2_home_games: number | null;
  set2_away_games: number | null;
  set3_home_games: number | null;
  set3_away_games: number | null;
}

export interface Player {
  id: string;
  name: string;
}

// --- Mock Clubs ---
export const mockClubs: Organization[] = [
  { id: 'club-1', name: 'Bali Padel Club' },
  { id: 'club-2', name: 'Jakarta Smash FC' },
  { id: 'club-3', name: 'Surabaya Spin' },
  { id: 'club-4', name: 'Bandung Volley' },
  { id: 'club-5', name: 'Denpasar Dragons' },
  { id: 'club-6', name: 'Medan United Padel' },
];

// --- Mock Seasons ---
export const mockSeasons: Season[] = [
  { id: 'season-1', name: 'Liga 1 Season 1 2025', slug: 'liga1-s1-2025', liga: 'liga1', status: 'active' },
  { id: 'season-2', name: 'Liga 1 Season 2 2025', slug: 'liga1-s2-2025', liga: 'liga1', status: 'upcoming' },
  { id: 'season-3', name: 'Liga 1 Women S1', slug: 'liga1w-s1-2025', liga: 'liga1_women', status: 'active' },
  { id: 'season-4', name: 'Liga 2 Season 1', slug: 'liga2-s1-2025', liga: 'liga2', status: 'active' },
];

// --- Mock Fixtures ---
export const mockFixtures: Fixture[] = [
  {
    id: 'fix-1',
    season_id: 'season-1',
    home_club_id: 'club-1',
    away_club_id: 'club-2',
    gameweek: 1,
    scheduled_date: '2025-03-15',
    scheduled_time: '14:00',
    venue_name: 'Bali Padel Arena',
    status: 'completed',
    home_matches_won: 3,
    away_matches_won: 1,
    home_club: { id: 'club-1', name: 'Bali Padel Club' },
    away_club: { id: 'club-2', name: 'Jakarta Smash FC' },
  },
  {
    id: 'fix-2',
    season_id: 'season-1',
    home_club_id: 'club-3',
    away_club_id: 'club-4',
    gameweek: 1,
    scheduled_date: '2025-03-15',
    scheduled_time: '16:00',
    venue_name: 'Surabaya Sports Center',
    status: 'in_progress',
    home_matches_won: null,
    away_matches_won: null,
    home_club: { id: 'club-3', name: 'Surabaya Spin' },
    away_club: { id: 'club-4', name: 'Bandung Volley' },
  },
  {
    id: 'fix-3',
    season_id: 'season-1',
    home_club_id: 'club-5',
    away_club_id: 'club-6',
    gameweek: 2,
    scheduled_date: '2025-03-22',
    scheduled_time: '10:00',
    venue_name: 'Denpasar Court A',
    status: 'scheduled',
    home_matches_won: null,
    away_matches_won: null,
    home_club: { id: 'club-5', name: 'Denpasar Dragons' },
    away_club: { id: 'club-6', name: 'Medan United Padel' },
  },
  {
    id: 'fix-4',
    season_id: 'season-1',
    home_club_id: 'club-2',
    away_club_id: 'club-5',
    gameweek: 2,
    scheduled_date: '2025-03-22',
    scheduled_time: '14:00',
    venue_name: 'Jakarta Indoor Arena',
    status: 'scheduled',
    home_matches_won: null,
    away_matches_won: null,
    home_club: { id: 'club-2', name: 'Jakarta Smash FC' },
    away_club: { id: 'club-5', name: 'Denpasar Dragons' },
  },
];

// --- Mock Players per Club ---
export const mockClubMembers: Record<string, Player[]> = {
  'club-1': [
    { id: 'p-1a', name: 'Wayan Sudirman' },
    { id: 'p-1b', name: 'Made Putra' },
    { id: 'p-1c', name: 'Nyoman Ardi' },
    { id: 'p-1d', name: 'Ketut Baskara' },
    { id: 'p-1e', name: 'Gede Wirawan' },
  ],
  'club-2': [
    { id: 'p-2a', name: 'Budi Hartono' },
    { id: 'p-2b', name: 'Reza Pratama' },
    { id: 'p-2c', name: 'Andi Setiawan' },
    { id: 'p-2d', name: 'Dimas Saputra' },
    { id: 'p-2e', name: 'Fajar Nugroho' },
  ],
  'club-3': [
    { id: 'p-3a', name: 'Agung Surya' },
    { id: 'p-3b', name: 'Dwi Prasetyo' },
    { id: 'p-3c', name: 'Eko Yulianto' },
    { id: 'p-3d', name: 'Hendra Wijaya' },
  ],
  'club-4': [
    { id: 'p-4a', name: 'Ivan Gunawan' },
    { id: 'p-4b', name: 'Joko Susilo' },
    { id: 'p-4c', name: 'Kevin Chandra' },
    { id: 'p-4d', name: 'Leo Tan' },
  ],
  'club-5': [
    { id: 'p-5a', name: 'Mangku Dewa' },
    { id: 'p-5b', name: 'Putu Arya' },
    { id: 'p-5c', name: 'Rai Sukanada' },
    { id: 'p-5d', name: 'Surya Dharma' },
  ],
  'club-6': [
    { id: 'p-6a', name: 'Taufik Hidayat' },
    { id: 'p-6b', name: 'Umar Bakrie' },
    { id: 'p-6c', name: 'Vino Bastian' },
    { id: 'p-6d', name: 'Wahyu Slamet' },
  ],
};

// --- Mock Liga Matches (for completed fixture fix-1) ---
export const mockLigaMatches: LigaMatch[] = [
  // fix-1 matches (completed)
  {
    id: 'lm-1', fixture_id: 'fix-1', match_number: 1, status: 'completed',
    home_player1_id: 'p-1a', home_player2_id: 'p-1b',
    away_player1_id: 'p-2a', away_player2_id: 'p-2b',
    home_sets_won: 2, away_sets_won: 0,
    set1_home_games: 6, set1_away_games: 3,
    set2_home_games: 6, set2_away_games: 4,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-2', fixture_id: 'fix-1', match_number: 2, status: 'completed',
    home_player1_id: 'p-1c', home_player2_id: 'p-1d',
    away_player1_id: 'p-2c', away_player2_id: 'p-2d',
    home_sets_won: 2, away_sets_won: 1,
    set1_home_games: 4, set1_away_games: 6,
    set2_home_games: 6, set2_away_games: 2,
    set3_home_games: 6, set3_away_games: 4,
  },
  {
    id: 'lm-3', fixture_id: 'fix-1', match_number: 3, status: 'completed',
    home_player1_id: 'p-1a', home_player2_id: 'p-1e',
    away_player1_id: 'p-2a', away_player2_id: 'p-2e',
    home_sets_won: 2, away_sets_won: 0,
    set1_home_games: 6, set1_away_games: 1,
    set2_home_games: 6, set2_away_games: 2,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-4', fixture_id: 'fix-1', match_number: 4, status: 'completed',
    home_player1_id: 'p-1b', home_player2_id: 'p-1c',
    away_player1_id: 'p-2b', away_player2_id: 'p-2c',
    home_sets_won: 0, away_sets_won: 2,
    set1_home_games: 3, set1_away_games: 6,
    set2_home_games: 4, set2_away_games: 6,
    set3_home_games: null, set3_away_games: null,
  },
  // fix-2 matches (assigned, in progress)
  {
    id: 'lm-5', fixture_id: 'fix-2', match_number: 1, status: 'assigned',
    home_player1_id: 'p-3a', home_player2_id: 'p-3b',
    away_player1_id: 'p-4a', away_player2_id: 'p-4b',
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-6', fixture_id: 'fix-2', match_number: 2, status: 'assigned',
    home_player1_id: 'p-3c', home_player2_id: 'p-3d',
    away_player1_id: 'p-4c', away_player2_id: 'p-4d',
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-7', fixture_id: 'fix-2', match_number: 3, status: 'assigned',
    home_player1_id: 'p-3a', home_player2_id: 'p-3d',
    away_player1_id: 'p-4a', away_player2_id: 'p-4d',
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-8', fixture_id: 'fix-2', match_number: 4, status: 'assigned',
    home_player1_id: 'p-3b', home_player2_id: 'p-3c',
    away_player1_id: 'p-4b', away_player2_id: 'p-4c',
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  // fix-3 matches (pending, no players)
  {
    id: 'lm-9', fixture_id: 'fix-3', match_number: 1, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-10', fixture_id: 'fix-3', match_number: 2, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-11', fixture_id: 'fix-3', match_number: 3, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-12', fixture_id: 'fix-3', match_number: 4, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  // fix-4 matches (pending, no players)
  {
    id: 'lm-13', fixture_id: 'fix-4', match_number: 1, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-14', fixture_id: 'fix-4', match_number: 2, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-15', fixture_id: 'fix-4', match_number: 3, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
  {
    id: 'lm-16', fixture_id: 'fix-4', match_number: 4, status: 'pending',
    home_player1_id: null, home_player2_id: null,
    away_player1_id: null, away_player2_id: null,
    home_sets_won: null, away_sets_won: null,
    set1_home_games: null, set1_away_games: null,
    set2_home_games: null, set2_away_games: null,
    set3_home_games: null, set3_away_games: null,
  },
];
