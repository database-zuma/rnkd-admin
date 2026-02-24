import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getSeasons, getFixtures } from '@/lib/data/liga';
import type { Season, Fixture } from '@/lib/mock-data/liga';

// --- Helpers ---

const getStatusVariant = (
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'in_progress':
      return 'secondary';
    case 'scheduled':
      return 'outline';
    default:
      return 'outline';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'Scheduled';
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    default:
      return status;
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// --- Page ---

export default async function FixturesPage({
  searchParams,
}: {
  searchParams: { seasonId?: string };
}) {
  const seasons = await getSeasons();
  const selectedSeasonId = searchParams.seasonId || seasons[0]?.id;
  const fixtures = selectedSeasonId ? await getFixtures(selectedSeasonId) : [];

  const selectedSeason = seasons.find((s) => s.id === selectedSeasonId);

  // Group fixtures by gameweek
  const fixturesByGameweek = fixtures.reduce(
    (acc, fixture) => {
      if (!acc[fixture.gameweek]) {
        acc[fixture.gameweek] = [];
      }
      acc[fixture.gameweek].push(fixture);
      return acc;
    },
    {} as Record<number, Fixture[]>
  );

  const sortedGameweeks = Object.keys(fixturesByGameweek)
    .map(Number)
    .sort((a, b) => a - b);

  // Group seasons by liga type for tabs
  const seasonsByLiga = seasons.reduce(
    (acc, season) => {
      if (!acc[season.liga]) {
        acc[season.liga] = [];
      }
      acc[season.liga].push(season);
      return acc;
    },
    {} as Record<string, Season[]>
  );

  const ligaLabels: Record<string, string> = {
    liga1: 'Liga 1',
    liga1_women: 'Liga 1 Women',
    liga2: 'Liga 2',
  };

  // Determine which liga tab is active
  const activeLiga = selectedSeason?.liga || Object.keys(seasonsByLiga)[0] || 'liga1';

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#F5F5F7]">Fixtures & Scores</h1>
        <p className="mt-1.5 text-sm text-[#A1A1A6]">
          Manage liga fixtures and match scores.
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-[#D2F802]/20 via-white/[0.06] to-transparent" />
      </div>

      {/* Season Selector as Tabs */}
      <div className="glass-card rounded-[16px] overflow-hidden">
        <div className="p-5 border-b border-white/[0.06]">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8E8E93]">Select Season</p>
        </div>
        <div className="p-5">
          <Tabs defaultValue={activeLiga}>
            <TabsList className="mb-4">
              {Object.keys(seasonsByLiga).map((liga) => (
                <TabsTrigger key={liga} value={liga}>
                  {ligaLabels[liga] || liga}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(seasonsByLiga).map(([liga, seasonList]) => (
              <TabsContent key={liga} value={liga}>
                <div className="flex flex-wrap gap-2">
                  {seasonList.map((season) => (
                    <Button
                      key={season.id}
                      variant={selectedSeasonId === season.id ? 'default' : 'outline'}
                      size="sm"
                      asChild
                    >
                      <Link href={`/liga/fixtures?seasonId=${season.id}`}>{season.name}</Link>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Content */}
      {!selectedSeasonId ? (
        <div className="glass-card rounded-[16px] p-10 text-center">
          <p className="text-[#A1A1A6]">Select a season to view fixtures</p>
        </div>
      ) : (
        <>
          {/* Fixtures by Gameweek */}
          <div className="space-y-6">
            {sortedGameweeks.length === 0 ? (
              <div className="glass-card rounded-[16px] p-10 text-center">
                <p className="text-[#A1A1A6] mb-4">
                  No fixtures yet for {selectedSeason?.name}
                </p>
              </div>
            ) : (
              sortedGameweeks.map((gameweek) => {
                const gameweekFixtures = fixturesByGameweek[gameweek];

                return (
                  <div className="glass-card rounded-[16px] overflow-hidden" key={gameweek}>
                    <div className="flex flex-row items-center justify-between p-5 border-b border-white/[0.06]">
                      <h3 className="text-base font-semibold text-[#F5F5F7]">Gameweek {gameweek}</h3>
                      <Button size="sm" variant="outline" disabled title="Coming soon — requires Supabase integration">
                        + Add Fixture
                      </Button>
                    </div>
                    <div className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Home</TableHead>
                            <TableHead>Away</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Venue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gameweekFixtures.map((fixture) => {
                            const hasScore =
                              fixture.home_matches_won !== null &&
                              fixture.away_matches_won !== null;
                            const scoreDisplay = hasScore
                              ? `${fixture.home_matches_won}\u2013${fixture.away_matches_won}`
                              : '\u2014';

                            return (
                              <TableRow key={fixture.id}>
                                <TableCell className="font-medium">
                                  {fixture.home_club?.name}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {fixture.away_club?.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {formatDate(fixture.scheduled_date)} at{' '}
                                  {fixture.scheduled_time}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {fixture.venue_name}
                                </TableCell>
                                <TableCell>
                                  <Badge variant={getStatusVariant(fixture.status)}>
                                    {getStatusLabel(fixture.status)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-sm font-medium">
                                  {scoreDisplay}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/liga/fixtures/${fixture.id}`}>
                                      Manage
                                    </Link>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Season summary footer */}
          <p className="text-center text-sm text-[#8E8E93]">
            {selectedSeason?.name} \u2014 {fixtures.length} fixture(s) across{' '}
            {sortedGameweeks.length} gameweek(s)
          </p>
        </>
      )}
    </div>
  );
}
