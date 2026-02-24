import {
  mockSeasons,
  mockFixtures,
  mockClubs,
  mockLigaMatches,
  mockClubMembers,
  type Season,
  type Fixture,
  type Organization,
  type LigaMatch,
  type Player,
} from '../mock-data/liga';

// Data Access Layer (DAL) for Liga
// Phase 0: Returns mock data
// Phase 11: Will be swapped to Supabase calls

export async function getSeasons(): Promise<Season[]> {
  return mockSeasons;
}

export async function getFixtures(seasonId: string): Promise<Fixture[]> {
  return mockFixtures.filter((f) => f.season_id === seasonId);
}

export async function getClubs(): Promise<Organization[]> {
  return mockClubs;
}

export async function getFixtureById(fixtureId: string) {
  const fixture = mockFixtures.find((f) => f.id === fixtureId);
  if (!fixture) return null;

  const season = mockSeasons.find((s) => s.id === fixture.season_id);
  return {
    ...fixture,
    liga_seasons: season ? { id: season.id, name: season.name, liga: season.liga } : null,
  };
}

export async function getMatchesForFixture(fixtureId: string): Promise<LigaMatch[]> {
  return mockLigaMatches
    .filter((m) => m.fixture_id === fixtureId)
    .sort((a, b) => a.match_number - b.match_number);
}

export async function getClubMembers(clubId: string): Promise<Player[]> {
  return mockClubMembers[clubId] || [];
}
