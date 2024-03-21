import { httpClient } from '@equinor/lighthouse-portal-client';

export async function getUserPresence(userId: string): Promise<Presence> {
  const { fusionPeople } = httpClient();

  const res = await fusionPeople.fetch(`persons/${userId}/presence`);

  return await res.json();
}

interface Presence {
  activity: Activity;
  availability: Availability;
  id: string;
}

export type Availability =
  | 'Busy'
  | 'Available'
  | 'Offline'
  | 'Away'
  | 'BeRightBack'
  | 'DoNotDisturb';
export type Activity = 'Busy' | 'Available' | 'OffWork' | 'Offline' | 'Away' | 'BeRightBack';
