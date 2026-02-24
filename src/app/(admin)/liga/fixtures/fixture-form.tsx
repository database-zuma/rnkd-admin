'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createFixture } from './actions';

interface Club {
  id: string;
  name: string;
}

interface FixtureFormProps {
  seasonId: string;
  gameweek: number;
  clubs: Club[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function FixtureForm({
  seasonId,
  gameweek,
  clubs,
  open,
  onOpenChange,
  onSuccess,
}: FixtureFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [homeClubId, setHomeClubId] = useState('');
  const [awayClubId, setAwayClubId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [venueName, setVenueName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!homeClubId || !awayClubId) {
      setError('Please select both home and away clubs');
      return;
    }

    if (homeClubId === awayClubId) {
      setError('Home and away clubs must be different');
      return;
    }

    if (!scheduledDate || !scheduledTime || !venueName) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('seasonId', seasonId);
      formData.append('homeClubId', homeClubId);
      formData.append('awayClubId', awayClubId);
      formData.append('gameweek', gameweek.toString());
      formData.append('scheduledDate', scheduledDate);
      formData.append('scheduledTime', scheduledTime);
      formData.append('venueName', venueName);

      const result = await createFixture(formData);

      if (!result.success) {
        setError(result.error || 'Failed to create fixture');
        return;
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const availableAwayClubs = clubs.filter((c) => c.id !== homeClubId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Fixture — Gameweek {gameweek}</DialogTitle>
          <DialogDescription>
            Create a new fixture for the selected gameweek.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="home-club">Home Club</Label>
            <Select value={homeClubId} onValueChange={setHomeClubId}>
              <SelectTrigger id="home-club">
                <SelectValue placeholder="Select home club..." />
              </SelectTrigger>
              <SelectContent>
                {clubs.map((club) => (
                  <SelectItem key={club.id} value={club.id}>
                    {club.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="away-club">Away Club</Label>
            <Select value={awayClubId} onValueChange={setAwayClubId}>
              <SelectTrigger id="away-club">
                <SelectValue placeholder="Select away club..." />
              </SelectTrigger>
              <SelectContent>
                {availableAwayClubs.map((club) => (
                  <SelectItem key={club.id} value={club.id}>
                    {club.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Scheduled Date</Label>
            <Input
              id="date"
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Scheduled Time</Label>
            <Input
              id="time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue Name</Label>
            <Input
              id="venue"
              type="text"
              placeholder="e.g., Central Court"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Fixture'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
