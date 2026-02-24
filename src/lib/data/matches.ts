import { mockMatches, mockChartData, mockTierDistribution } from '../mock-data/matches';

export async function getMatches(opts?: { status?: string; type?: string; search?: string }) {
  let matches = [...mockMatches];

  if (opts?.status) {
    matches = matches.filter(m => m.status === opts.status);
  }

  if (opts?.type) {
    matches = matches.filter(m => m.type === opts.type);
  }

  if (opts?.search) {
    const s = opts.search.toLowerCase();
    matches = matches.filter(m =>
      m.team1.players.some(p => p.name.toLowerCase().includes(s)) ||
      m.team2.players.some(p => p.name.toLowerCase().includes(s)) ||
      m.venue.toLowerCase().includes(s) ||
      m.id.toLowerCase().includes(s)
    );
  }

  return matches;
}

export async function getMatchById(id: string) {
  return mockMatches.find(m => m.id === id) || null;
}

export async function getChartData() {
  return mockChartData;
}

export async function getTierDistribution() {
  return mockTierDistribution;
}
