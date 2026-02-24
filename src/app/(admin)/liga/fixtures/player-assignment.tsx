'use client'

import { useState, useEffect } from 'react'
import { assignPlayers } from './actions'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface Player {
  id: string
  name: string
}

interface Match {
  id: string
  match_number: number
  home_player1_id: string | null
  home_player2_id: string | null
  away_player1_id: string | null
  away_player2_id: string | null
}

interface Fixture {
  id: string
  home_club_name: string
  away_club_name: string
}

interface PlayerAssignmentProps {
  fixture: Fixture
  matches: Match[]
  homeMembers: Player[]
  awayMembers: Player[]
}

export function PlayerAssignment({
  fixture,
  matches,
  homeMembers,
  awayMembers,
}: PlayerAssignmentProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [assignments, setAssignments] = useState<Record<number, {
    homePlayer1Id: string
    homePlayer2Id: string
    awayPlayer1Id: string
    awayPlayer2Id: string
  }>>({})
  const [warnings, setWarnings] = useState<string[]>([])

  useEffect(() => {
    // Initialize assignments from existing data
    const init: Record<number, {
      homePlayer1Id: string;
      homePlayer2Id: string;
      awayPlayer1Id: string;
      awayPlayer2Id: string;
    }> = {};
    matches.forEach((match) => {
      init[match.match_number] = {
        homePlayer1Id: match.home_player1_id || '',
        homePlayer2Id: match.home_player2_id || '',
        awayPlayer1Id: match.away_player1_id || '',
        awayPlayer2Id: match.away_player2_id || '',
      }
    })
    setAssignments(init)
  }, [matches])

  const handlePlayerChange = (matchNumber: number, field: string, value: string) => {
    setAssignments((prev) => ({
      ...prev,
      [matchNumber]: {
        ...prev[matchNumber],
        [field]: value,
      },
    }))
  }

  const validateAssignments = () => {
    const newWarnings: string[] = []
    const allPlayers: Record<string, number> = {}

    Object.entries(assignments).forEach(([matchNum, assignment]) => {
      // Check if all players are assigned
      if (!assignment.homePlayer1Id || !assignment.homePlayer2Id || !assignment.awayPlayer1Id || !assignment.awayPlayer2Id) {
        newWarnings.push(`Match ${matchNum}: Not all players assigned`)
        return
      }

      // Track players for duplicate warnings
      ;[assignment.homePlayer1Id, assignment.homePlayer2Id, assignment.awayPlayer1Id, assignment.awayPlayer2Id].forEach(
        (playerId) => {
          allPlayers[playerId] = (allPlayers[playerId] || 0) + 1
        }
      )
    })

    // Warn about players in multiple matches
    Object.entries(allPlayers).forEach(([playerId, count]) => {
      if (count > 1) {
        const player = [...homeMembers, ...awayMembers].find((p) => p.id === playerId)
        if (player) {
          newWarnings.push(`${player.name} appears in ${count} matches (limited squad?)`)
        }
      }
    })

    setWarnings(newWarnings)
    return newWarnings.filter((w) => w.includes('Not all players')).length === 0
  }

  const handleSubmit = async () => {
    setError(null)

    if (!validateAssignments()) {
      return
    }

    try {
      setLoading(true)

      const assignmentsList = matches.map((match) => ({
        matchNumber: match.match_number,
        homePlayer1Id: assignments[match.match_number]?.homePlayer1Id || '',
        homePlayer2Id: assignments[match.match_number]?.homePlayer2Id || '',
        awayPlayer1Id: assignments[match.match_number]?.awayPlayer1Id || '',
        awayPlayer2Id: assignments[match.match_number]?.awayPlayer2Id || '',
      }))

      const result = await assignPlayers(fixture.id, assignmentsList)

      if (!result.success) {
        setError(result.error || 'Failed to assign players')
        return
      }

      // Trigger page refresh
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-rnkd-text-primary">
          {fixture.home_club_name} <span className="text-rnkd-text-secondary font-normal mx-2">vs</span> {fixture.away_club_name}
        </h2>
        <p className="text-sm text-rnkd-text-secondary mt-1">Assign Players to Matches</p>
      </div>

      {error && (
        <div className="p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-lg text-sm text-rnkd-red">
          {error}
        </div>
      )}

      {warnings.length > 0 && (
        <div className="p-4 bg-[rgba(255,159,10,0.1)] border border-[rgba(255,159,10,0.2)] rounded-lg text-sm text-rnkd-orange">
          <p className="font-medium mb-2 flex items-center gap-2">
            ⚠️ Warnings:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-1 text-rnkd-text-secondary">
            {warnings.map((w, i) => (
              <li key={`warning-${i}`}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        {matches.map((match) => {
          const assignment = assignments[match.match_number]
          if (!assignment) return null

          return (
            <Card key={match.id} className="bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)]">
              <CardHeader className="pb-3 border-b border-[rgba(255,255,255,0.05)]">
                <CardTitle className="text-base text-rnkd-text-primary">
                  Match {match.match_number}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Home Team */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rnkd-volt"></div>
                      <p className="text-sm font-medium text-rnkd-text-primary">
                        {fixture.home_club_name}
                      </p>
                    </div>
                    
                    <div className="space-y-4 bg-[rgba(0,0,0,0.2)] p-4 rounded-lg border border-[rgba(255,255,255,0.03)]">
                      <div className="space-y-2">
                        <Label htmlFor={`h1-m${match.match_number}`} className="text-xs text-rnkd-text-secondary">
                          Player 1
                        </Label>
                        <Select 
                          value={assignment.homePlayer1Id} 
                          onValueChange={(val) => handlePlayerChange(match.match_number, 'homePlayer1Id', val)}
                        >
                          <SelectTrigger id={`h1-m${match.match_number}`} className="bg-rnkd-bg-surface border-rnkd-border-light focus:ring-rnkd-volt text-sm h-9">
                            <SelectValue placeholder="Select player..." />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-rnkd-border-light max-h-[300px]">
                            {homeMembers.map((player) => (
                              <SelectItem key={player.id} value={player.id} className="hover:bg-rnkd-bg-elevated cursor-pointer">
                                {player.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`h2-m${match.match_number}`} className="text-xs text-rnkd-text-secondary">
                          Player 2
                        </Label>
                        <Select 
                          value={assignment.homePlayer2Id} 
                          onValueChange={(val) => handlePlayerChange(match.match_number, 'homePlayer2Id', val)}
                        >
                          <SelectTrigger id={`h2-m${match.match_number}`} className="bg-rnkd-bg-surface border-rnkd-border-light focus:ring-rnkd-volt text-sm h-9">
                            <SelectValue placeholder="Select player..." />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-rnkd-border-light max-h-[300px]">
                            {homeMembers.map((player) => (
                              <SelectItem key={player.id} value={player.id} className="hover:bg-rnkd-bg-elevated cursor-pointer">
                                {player.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rnkd-blue"></div>
                      <p className="text-sm font-medium text-rnkd-text-primary">
                        {fixture.away_club_name}
                      </p>
                    </div>
                    
                    <div className="space-y-4 bg-[rgba(0,0,0,0.2)] p-4 rounded-lg border border-[rgba(255,255,255,0.03)]">
                      <div className="space-y-2">
                        <Label htmlFor={`a1-m${match.match_number}`} className="text-xs text-rnkd-text-secondary">
                          Player 1
                        </Label>
                        <Select 
                          value={assignment.awayPlayer1Id} 
                          onValueChange={(val) => handlePlayerChange(match.match_number, 'awayPlayer1Id', val)}
                        >
                          <SelectTrigger id={`a1-m${match.match_number}`} className="bg-rnkd-bg-surface border-rnkd-border-light focus:ring-rnkd-volt text-sm h-9">
                            <SelectValue placeholder="Select player..." />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-rnkd-border-light max-h-[300px]">
                            {awayMembers.map((player) => (
                              <SelectItem key={player.id} value={player.id} className="hover:bg-rnkd-bg-elevated cursor-pointer">
                                {player.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`a2-m${match.match_number}`} className="text-xs text-rnkd-text-secondary">
                          Player 2
                        </Label>
                        <Select 
                          value={assignment.awayPlayer2Id} 
                          onValueChange={(val) => handlePlayerChange(match.match_number, 'awayPlayer2Id', val)}
                        >
                          <SelectTrigger id={`a2-m${match.match_number}`} className="bg-rnkd-bg-surface border-rnkd-border-light focus:ring-rnkd-volt text-sm h-9">
                            <SelectValue placeholder="Select player..." />
                          </SelectTrigger>
                          <SelectContent className="glass-panel border-rnkd-border-light max-h-[300px]">
                            {awayMembers.map((player) => (
                              <SelectItem key={player.id} value={player.id} className="hover:bg-rnkd-bg-elevated cursor-pointer">
                                {player.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex pt-4">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto px-8 bg-rnkd-volt text-black hover:bg-rnkd-volt-dark font-semibold"
        >
          {loading ? 'Saving Assignments...' : 'Save Player Assignments'}
        </Button>
      </div>
    </div>
  )
}
