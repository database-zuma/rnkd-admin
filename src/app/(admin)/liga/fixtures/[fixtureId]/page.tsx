import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  getFixtureById,
  getMatchesForFixture,
  getClubMembers,
} from '@/lib/data/liga';
import { PlayerAssignment } from '../player-assignment';
import { ScoreEntry } from '../score-entry';

export const dynamic = 'force-dynamic';

export default async function FixtureDetailPage({
  params,
}: {
  params: { fixtureId: string };
}) {
  const fixtureId = params.fixtureId;

  // Fetch fixture with related data via DAL
  const fixture = await getFixtureById(fixtureId);

  if (!fixture) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fixture Not Found</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/liga/fixtures">\u2190 Back to Fixtures</Link>
        </Button>
      </div>
    );
  }

  // Fetch matches and members via DAL
  const matches = await getMatchesForFixture(fixtureId);
  const homePlayers = await getClubMembers(fixture.home_club_id);
  const awayPlayers = await getClubMembers(fixture.away_club_id);

  const homeClub = fixture.home_club;
  const awayClub = fixture.away_club;

  // Determine state
  const hasPlayers = matches.some((m) => m.home_player1_id);
  const allCompleted = matches.every((m) => m.status === 'completed');

  // Build fixture object matching component interfaces
  const fixtureForComponents = {
    id: fixtureId,
    home_club_name: homeClub?.name || '',
    away_club_name: awayClub?.name || '',
  };

  // Build playerMap for ScoreEntry: { [playerId]: playerName }
  const allPlayers = [...homePlayers, ...awayPlayers];
  const playerMap: Record<string, string> = {};
  allPlayers.forEach((p) => {
    playerMap[p.id] = p.name;
  });

  // Determine default tab
  const defaultTab = allCompleted ? 'scores' : hasPlayers ? 'scores' : 'players';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F5F5F7]">
            {homeClub?.name || '?'} vs {awayClub?.name || '?'}
          </h1>
          <p className="mt-1.5 text-sm text-[#A1A1A6]">
            Gameweek {fixture.gameweek} \u00b7 {fixture.scheduled_date || 'TBD'} \u00b7{' '}
            {fixture.venue_name || 'TBD'}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/liga/fixtures?seasonId=${fixture.season_id}`}>
            \u2190 Back to Fixtures
          </Link>
        </Button>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-3">
        <Badge
          variant={
            fixture.status === 'completed'
              ? 'default'
              : fixture.status === 'in_progress'
                ? 'secondary'
                : 'outline'
          }
        >
          {fixture.status}
        </Badge>
        {allCompleted && fixture.home_matches_won !== null && (
          <span className="text-lg font-bold font-mono">
            {fixture.home_matches_won} \u2013 {fixture.away_matches_won}
          </span>
        )}
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="players" disabled={allCompleted}>
            {hasPlayers ? '\u2713 Players' : '1. Assign Players'}
          </TabsTrigger>
          <TabsTrigger value="scores" disabled={!hasPlayers}>
            {allCompleted ? '\u2713 Match Results' : '2. Enter Scores'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          {!allCompleted ? (
            <Card>
              <CardContent className="pt-6">
                <PlayerAssignment
                  fixture={fixtureForComponents}
                  matches={matches}
                  homeMembers={homePlayers}
                  awayMembers={awayPlayers}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                All matches completed. Player assignments are locked.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scores">
          {hasPlayers ? (
            <Card>
              <CardContent className="pt-6">
                <ScoreEntry
                  fixture={fixtureForComponents}
                  matches={matches}
                  playerMap={playerMap}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Assign players first before entering scores.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
