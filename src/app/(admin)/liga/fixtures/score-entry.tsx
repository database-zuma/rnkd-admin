'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { enterScores } from './actions';

interface Match {
  id: string;
  match_number: number;
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

interface Fixture {
  id: string;
  home_club_name: string;
  away_club_name: string;
}

interface PlayerMap {
  [playerId: string]: string;
}

interface ScoreState {
  set1Home: number;
  set1Away: number;
  set2Home: number;
  set2Away: number;
  set3Home?: number;
  set3Away?: number;
  homeSetsWon: number;
  awaySetsWon: number;
}

interface ScoreEntryProps {
  fixture: Fixture;
  matches: Match[];
  playerMap: PlayerMap;
}

export function ScoreEntry({ fixture, matches, playerMap }: ScoreEntryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [scores, setScores] = useState<Record<number, ScoreState>>({});

  useEffect(() => {
    const init: Record<number, ScoreState> = {};
    matches.forEach((match) => {
      init[match.match_number] = {
        set1Home: match.set1_home_games ?? 0,
        set1Away: match.set1_away_games ?? 0,
        set2Home: match.set2_home_games ?? 0,
        set2Away: match.set2_away_games ?? 0,
        set3Home: match.set3_home_games ?? 0,
        set3Away: match.set3_away_games ?? 0,
        homeSetsWon: match.home_sets_won ?? 0,
        awaySetsWon: match.away_sets_won ?? 0,
      };
    });
    setScores(init);
  }, [matches]);

  const handleScoreChange = (matchNumber: number, field: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    const currentScore = scores[matchNumber] || ({} as ScoreState);

    const newScore: ScoreState = {
      ...currentScore,
      [field]: numValue,
    };

    // Auto-calculate sets won
    let homeSetsWon = 0;
    let awaySetsWon = 0;

    if (newScore.set1Home > newScore.set1Away) homeSetsWon++;
    else if (newScore.set1Away > newScore.set1Home) awaySetsWon++;

    if (newScore.set2Home > newScore.set2Away) homeSetsWon++;
    else if (newScore.set2Away > newScore.set2Home) awaySetsWon++;

    newScore.homeSetsWon = homeSetsWon;
    newScore.awaySetsWon = awaySetsWon;

    setScores((prev) => ({
      ...prev,
      [matchNumber]: newScore,
    }));
  };

  const matchesCompleted = matches.filter((m) => {
    const score = scores[m.match_number];
    return (
      score && score.set1Home > 0 && score.set1Away > 0 && score.set2Home > 0 && score.set2Away > 0
    );
  }).length;

  const allMatches = matches.length;
  const isFullyComplete = matchesCompleted === allMatches;

  const calculateFixtureScore = () => {
    let homeMatches = 0;
    let awayMatches = 0;

    Object.values(scores).forEach((score) => {
      if ((score.homeSetsWon ?? 0) > (score.awaySetsWon ?? 0)) {
        homeMatches++;
      } else if ((score.awaySetsWon ?? 0) > (score.homeSetsWon ?? 0)) {
        awayMatches++;
      }
    });

    return { homeMatches, awayMatches };
  };

  const getPlayerName = (playerId: string | null): string => {
    if (!playerId) return 'TBD';
    return playerMap[playerId] || 'Unknown';
  };

  const needsSet3 = (matchNumber: number) => {
    const score = scores[matchNumber];
    if (!score) return false;
    return score.homeSetsWon === 1 && score.awaySetsWon === 1;
  };

  const handleSubmit = () => {
    if (!isFullyComplete) {
      setError('All sets for all matches must be completed');
      return;
    }
    setShowPreview(true);
  };

  const handleConfirmAndSave = async () => {
    setError(null);

    try {
      setLoading(true);

      const scoresList = matches.map((match) => {
        const score = scores[match.match_number];
        return {
          matchNumber: match.match_number,
          set1Home: score?.set1Home || 0,
          set1Away: score?.set1Away || 0,
          set2Home: score?.set2Home || 0,
          set2Away: score?.set2Away || 0,
          set3Home: needsSet3(match.match_number) ? score?.set3Home || 0 : undefined,
          set3Away: needsSet3(match.match_number) ? score?.set3Away || 0 : undefined,
          homeSetsWon: score?.homeSetsWon || 0,
          awaySetsWon: score?.awaySetsWon || 0,
        };
      });

      const result = await enterScores(fixture.id, scoresList);

      if (!result.success) {
        setError(result.error || 'Failed to save scores');
        return;
      }

      alert('Scores saved successfully!');
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // --- Preview Mode ---
  if (showPreview) {
    const { homeMatches, awayMatches } = calculateFixtureScore();

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Fixture Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {matches.map((match) => {
              const score = scores[match.match_number];
              if (!score) return null;

              const homeWins = score.homeSetsWon > score.awaySetsWon;

              return (
                <div
                  key={match.id}
                  className="rounded-md border bg-muted/50 p-3 space-y-1"
                >
                  <p className="text-sm font-medium">
                    Match {match.match_number}: {getPlayerName(match.home_player1_id || '')} +{' '}
                    {getPlayerName(match.home_player2_id || '')} vs{' '}
                    {getPlayerName(match.away_player1_id || '')} +{' '}
                    {getPlayerName(match.away_player2_id || '')}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <span className={homeWins ? 'font-semibold text-primary' : ''}>
                      Home wins {score.homeSetsWon}-{score.awaySetsWon}
                    </span>
                    {' \u2014 '}
                    <span className="font-mono text-xs">
                      Sets: {score.set1Home}-{score.set1Away}, {score.set2Home}-{score.set2Away}
                    {needsSet3(match.match_number) ? `, ${score.set3Home}-${score.set3Away}` : ''}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="rounded-md border border-primary/30 bg-primary/10 p-4 mt-4">
              <p className="text-lg font-semibold">
                Fixture Result: {fixture.home_club_name}{' '}
                <span className="font-mono">{homeMatches}</span> \u2013{' '}
                <span className="font-mono">{awayMatches}</span>{' '}
                {fixture.away_club_name}
              </p>
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
                disabled={loading}
                className="flex-1"
              >
                Back to Edit
              </Button>
              <Button
                onClick={handleConfirmAndSave}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Saving...' : 'Confirm & Save'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Edit Mode ---
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          {fixture.home_club_name} vs {fixture.away_club_name}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {matchesCompleted}/{allMatches} matches completed
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {matches.map((match) => {
        const score = scores[match.match_number];
        if (!score) return null;

        const set3Needed = needsSet3(match.match_number);

        return (
          <Card key={match.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Match {match.match_number}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {getPlayerName(match.home_player1_id || '')} +{' '}
                {getPlayerName(match.home_player2_id || '')} vs{' '}
                {getPlayerName(match.away_player1_id || '')} +{' '}
                {getPlayerName(match.away_player2_id || '')}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="w-16 text-sm shrink-0">Set 1:</Label>
                <Input
                  type="number"
                  min={0}
                  max={7}
                  className="w-20 text-center"
                  value={score.set1Home}
                  onChange={(e) =>
                    handleScoreChange(match.match_number, 'set1Home', e.target.value)
                  }
                />
                <span className="text-muted-foreground">\u2014</span>
                <Input
                  type="number"
                  min={0}
                  max={7}
                  className="w-20 text-center"
                  value={score.set1Away}
                  onChange={(e) =>
                    handleScoreChange(match.match_number, 'set1Away', e.target.value)
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Label className="w-16 text-sm shrink-0">Set 2:</Label>
                <Input
                  type="number"
                  min={0}
                  max={7}
                  className="w-20 text-center"
                  value={score.set2Home}
                  onChange={(e) =>
                    handleScoreChange(match.match_number, 'set2Home', e.target.value)
                  }
                />
                <span className="text-muted-foreground">\u2014</span>
                <Input
                  type="number"
                  min={0}
                  max={7}
                  className="w-20 text-center"
                  value={score.set2Away}
                  onChange={(e) =>
                    handleScoreChange(match.match_number, 'set2Away', e.target.value)
                  }
                />
              </div>

              {set3Needed && (
                <div className="flex items-center gap-2">
                  <Label className="w-16 text-sm shrink-0">Set 3:</Label>
                  <Input
                    type="number"
                    min={0}
                    max={7}
                    className="w-20 text-center"
                    value={score.set3Home || 0}
                    onChange={(e) =>
                      handleScoreChange(match.match_number, 'set3Home', e.target.value)
                    }
                  />
                  <span className="text-muted-foreground">\u2014</span>
                  <Input
                    type="number"
                    min={0}
                    max={7}
                    className="w-20 text-center"
                    value={score.set3Away || 0}
                    onChange={(e) =>
                      handleScoreChange(match.match_number, 'set3Away', e.target.value)
                    }
                  />
                </div>
              )}

              <div className="mt-3 rounded-md bg-muted p-3">
                <p className="text-sm font-medium">
                  Result:{' '}
                  {score.homeSetsWon > score.awaySetsWon ? (
                    <Badge className="ml-1">
                      Home wins {score.homeSetsWon}-{score.awaySetsWon}
                    </Badge>
                  ) : score.awaySetsWon > score.homeSetsWon ? (
                    <Badge variant="secondary" className="ml-1">
                      Away wins {score.awaySetsWon}-{score.homeSetsWon}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="ml-1">
                      Tied {score.homeSetsWon}-{score.awaySetsWon}
                    </Badge>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={loading || !isFullyComplete} size="lg">
          {isFullyComplete ? 'Review & Save' : 'Complete all sets to continue'}
        </Button>
      </div>
    </div>
  );
}