import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Fixtures & Scores</h1>
        <p className="text-muted-foreground">
          Manage liga fixtures and match scores.
        </p>
      </div>

      {/* Season Selector as Tabs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm uppercase tracking-wide">Select Season</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Content */}
      {!selectedSeasonId ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Select a season to view fixtures</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Fixtures by Gameweek */}
          <div className="space-y-6">
            {sortedGameweeks.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">
                    No fixtures yet for {selectedSeason?.name}
                  </p>
                </CardContent>
              </Card>
            ) : (
              sortedGameweeks.map((gameweek) => {
                const gameweekFixtures = fixturesByGameweek[gameweek];

                return (
                  <Card key={gameweek}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle>Gameweek {gameweek}</CardTitle>
                      <Button size="sm" variant="outline" disabled title="Coming soon — requires Supabase integration">
                        + Add Fixture
                      </Button>
                    </CardHeader>
                    <CardContent className="p-0">
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
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Season summary footer */}
          <CardDescription className="text-center">
            {selectedSeason?.name} \u2014 {fixtures.length} fixture(s) across{' '}
            {sortedGameweeks.length} gameweek(s)
          </CardDescription>
        </>
      )}
    </div>
  );
}
